---
layout: post
title: GPU 서버에서 3D Gaussian Splatting으로 사진을 3D 모델로 만들기
date: 2026-01-07
categories: [tech]
tags: [3dgs, nerf, nerfstudio, docker, cuda]
---

여러 장의 2D 사진으로 3D 모델을 생성하는 3D Gaussian Splatting 환경을 Docker로 구축한 경험을 정리했습니다.

## 🎯 프로젝트 목표
자연 바위를 촬영한 사진들로 3D 모델을 생성하는 시스템을 구축하려고 합니다. 최종적으로는 외부 서버에서 이미지를 받아 GPU 서버에서 AI 작업을 수행하고 결과를 반환하는 파이프라인을 만드는 것이 목표입니다.

## 🔧 환경 설정
### 서버 사양
| 항목 | 내용 |
| --- | --- |
| GPU | NVIDIA GeForce RTX 3080 Ti (12GB VRAM) |
| CUDA Version | 12.4 |
| OS | Linux (Ubuntu) |
| 접속 | SSH (Port 2222) |

### 기술 스택
- Docker + nvidia-container-toolkit
- NeRF Studio (3D Gaussian Splatting)
- CUDA 11.8

## 📚 배경 지식: NeRF vs 3D Gaussian Splatting
3D 재구성 기술을 선택하기 전에 두 가지 주요 방법을 비교했습니다.

### NeRF (Neural Radiance Fields)
- 장점: 고품질, 부드러운 렌더링
- 단점: 학습 느림 (수 시간), 렌더링 느림

### 3D Gaussian Splatting (3DGS)
- 장점: 학습 빠름 (10-30분), 실시간 렌더링
- 단점: 메모리 사용량 높음

결론: 빠른 학습과 실시간 렌더링이 가능한 3DGS를 선택했습니다.

## 🚀 구축 과정
### 1) Docker GPU 지원 설정
첫 번째 난관은 Docker에서 GPU를 사용하는 것이었습니다.

```bash
# nvidia-container-toolkit 설치
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
  sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit

# Docker 설정 및 재시작
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

발생한 에러:

```
docker: Error response from daemon: could not select device driver "" with capabilities: [[gpu]]
```

해결: nvidia-container-toolkit 설치 후 해결되었습니다.

### 2) NeRF Studio 이미지 다운로드
```bash
docker pull nerfstudio/nerfstudio:latest
```

> ⚠️ 이미지 크기가 10GB 이상이라 첫 다운로드는 약 1시간 소요되었습니다.

### 3) 컨테이너 실행
```bash
docker run --gpus '"device=1"' -it --rm \
  -v /home/sslab2/sso/data:/workspace/data \
  -p 7007:7007 \
  nerfstudio/nerfstudio:latest
```

옵션 설명:
- `--gpus '"device=1"'`: GPU 1번 할당 (핵심)
- `-v`: 호스트 디렉토리 마운트 (데이터 영속성)
- `-p 7007:7007`: 뷰어 포트 포워딩
- `--rm`: 종료 시 컨테이너 자동 삭제

## ⚠️ 트러블슈팅
### Issue #1: CUDA 버전 불일치
증상:
```
RuntimeError: CUDA error: no kernel image is available for execution on the device
```

원인 분석:
```bash
# 컨테이너 안에서
nvidia-smi
# CUDA Version: 12.4 (호스트)

# 하지만 컨테이너 이미지는 CUDA 11.8
```

시도한 해결책:
```bash
pip uninstall torch torchvision torchaudio -y
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
pip install ninja git+https://github.com/NVlabs/tiny-cuda-nn/#subdirectory=bindings/torch
```

결과: tinycudann 컴파일 시 여전히 버전 불일치 발생
```
RuntimeError: The detected CUDA version (11.8) mismatches the version 
that was used to compile PyTorch (12.1)
```

최종 해결: PyTorch를 CUDA 11.8로 다운그레이드
```bash
pip install torch==2.0.1 torchvision==0.15.2 --index-url https://download.pytorch.org/whl/cu118
```

### Issue #2: 샘플 데이터 다운로드 실패
```bash
ns-download-data nerfstudio --capture-name=poster
# FileURLRetrievalError: Cannot retrieve the public link
```

원인: Google Drive API 제한  
해결: 대안 데이터셋 사용

```bash
# Mip-NeRF 360 데이터셋
wget http://storage.googleapis.com/gresearch/refraw360/garden.zip
unzip garden.zip
```

### Issue #3: 데이터 손실 문제
컨테이너를 종료한 후 추출한 모델이 사라지는 문제가 발생했습니다.

원인:
- `--rm` 옵션으로 컨테이너 종료 시 내부 데이터 삭제
- `/workspace/exports/` 경로는 마운트되지 않은 컨테이너 내부 경로

해결: 반드시 마운트된 경로에 저장

```bash
# ❌ 잘못된 경로
--output-dir /workspace/exports/splat/

# ✅ 올바른 경로
--output-dir /workspace/data/exports/splat/
```

## 🎓 3DGS 워크플로우
### 1) 데이터 준비
필요한 사진 수:

| 사진 수 | 결과 품질 | 비고 |
| --- | --- | --- |
| 20장 | ❌ 매우 부족 | 구멍 많음, 흐릿함 |
| 50-70장 | ⚠️ 최소 가능 | 기본적인 형태 |
| 100-150장 | ✅ 권장 | 좋은 품질 |
| 200장+ | ✨ 매우 좋음 | 디테일 살아남 |

촬영 팁:
- 대상 물체를 360도 회전하며 촬영
- 높이를 다르게 (상/중/하)
- 조명을 일정하게 유지
- 겹치는 부분이 충분하도록

### 2) 데이터 처리 (COLMAP)
```bash
ns-process-data images \
  --data /workspace/data/garden/images \
  --output-dir /workspace/data/garden_processed
```

이 단계에서 COLMAP이 각 사진의 카메라 포즈(위치, 각도)를 추정합니다.

### 3) 3DGS 학습
```bash
ns-train splatfacto \
  --data /workspace/data/garden_processed \
  --output-dir /workspace/data/outputs \
  --max-num-iterations 7000
```

학습 파라미터:
- `splatfacto`: 3DGS 알고리즘
- `--max-num-iterations 7000`: 테스트용 (실제는 30000 권장)

학습 시간 (RTX 3080 Ti 기준):
- 100장 이미지: 약 15-25분
- 200장 이미지: 약 25-40분

모니터링:
```
Step: 1234/7000
Train Rays/Sec: 1.2M
PSNR: 25.3
ETA: 5m 23s
```

### 4) 실시간 뷰어
학습이 시작되면 자동으로 뷰어가 실행됩니다.

```
Viewer running at: http://0.0.0.0:7007
```

브라우저에서 `http://localhost:7007` 접속하면:
- ✨ 실시간으로 학습 진행 상황 확인
- 🖱️ 마우스로 360도 회전하며 결과 확인
- 📊 학습 메트릭 모니터링

### 5) 모델 추출
```bash
ns-export gaussian-splat \
  --load-config /workspace/data/outputs/garden_processed/splatfacto/2026-01-07_144641/config.yml \
  --output-dir /workspace/data/exports/splat/
```

출력 형식:
- `.ply`: 3D Gaussian Splat 포인트 클라우드
- 크기: 약 300-500MB (데이터셋에 따라)

### 6) 로컬로 다운로드
```bash
# SSH 포트가 기본(22)이 아닌 경우
scp -P 2222 sslab2@203.253.25.80:/home/sslab2/sso/data/exports/splat/*.ply ./
```

주의사항:
- ssh는 `-p` (소문자), scp는 `-P` (대문자)
- 비밀번호 입력 시 화면에 표시되지 않음 (정상)

## 📊 실험 결과
테스트 환경:
- 데이터셋: Mip-NeRF 360 garden
- 이미지 수: 약 100장
- Iterations: 7000
- 학습 시간: 약 20분

출력물:
- `splat.ply`: 371MB
- CloudCompare, MeshLab 등에서 열어볼 수 있는 3D 모델 생성

## 💡 핵심 인사이트
### 1) Docker GPU 사용의 핵심
```bash
# 일반 Docker 컨테이너 (GPU 접근 불가)
docker run -it ubuntu

# GPU 컨테이너 (GPU 사용 가능)
docker run --gpus all -it nvidia/cuda
```

`--gpus` 옵션이 모든 것의 시작입니다.

### 2) 데이터 영속성
```bash
# ❌ 데이터 손실
컨테이너 내부 경로에 저장 → 컨테이너 종료 시 삭제

# ✅ 데이터 보존
-v 호스트경로:컨테이너경로 → 호스트에 영구 저장
```

### 3) CUDA 호환성
| 레이어 | 버전 | 중요도 |
| --- | --- | --- |
| GPU 드라이버 | 550.163.01 | 최상위 |
| CUDA Toolkit | 12.4 | 호스트 |
| 컨테이너 CUDA | 11.8 | 호환 필요 |
| PyTorch CUDA | 11.8/12.1 | 일치 필수 |

교훈: 전체 스택의 CUDA 버전 호환성이 중요합니다.

### 4) 3DGS vs 전통적 방법
| 항목 | Photogrammetry (Meshroom, RealityCapture) | 3D Gaussian Splatting |
| --- | --- | --- |
| 사진 수 | 적은 사진으로 가능 (40-50장) | 더 많은 사진 필요 (50-100장+) |
| 출력 | Mesh | 포인트 클라우드 |
| 하드웨어 | CPU로도 가능 (느림) | GPU 필수 |
| 렌더링 | 오프라인 | 실시간 가능 |

## 🔮 향후 계획
### 1) API 서버 구축
```python
# FastAPI 예시
@app.post("/reconstruct")
async def reconstruct_3d(images: List[UploadFile]):
    # 1. 이미지 저장
    # 2. COLMAP 처리
    # 3. 3DGS 학습
    # 4. .ply 파일 반환
    pass
```

### 2) 백그라운드 작업 처리
```bash
# tmux 사용
tmux new -s nerf_training

# 또는 Docker daemon 모드
docker run -d --name nerfstudio ...
docker logs -f nerfstudio
```

### 3) 자동화 파이프라인
이미지 업로드 → 자동 전처리 → 학습 → 결과 추출 → 다운로드 링크 제공

## 📝 명령어 치트시트
```bash
# === Docker 관리 ===
docker run --gpus '"device=1"' -it --rm \
  -v /home/sslab2/sso/data:/workspace/data \
  -p 7007:7007 nerfstudio/nerfstudio:latest

docker ps
docker exec -it $(docker ps -q) bash

# === 3DGS 워크플로우 ===
ns-process-data images \
  --data /workspace/data/raw_images/ \
  --output-dir /workspace/data/processed

ns-train splatfacto \
  --data /workspace/data/processed \
  --output-dir /workspace/data/outputs \
  --max-num-iterations 7000

ns-export gaussian-splat \
  --load-config /workspace/data/outputs/.../config.yml \
  --output-dir /workspace/data/exports/splat/

# === 파일 전송 ===
scp -P 2222 user@host:/path/to/file.ply ./

# === GPU 확인 ===
nvidia-smi
python -c "import torch; print(torch.cuda.is_available())"
```

## 🎯 결론
Docker와 NeRF Studio를 활용하여 2D 이미지로부터 3D 모델을 생성하는 전체 파이프라인을 구축했습니다. 과정에서 여러 CUDA 호환성 문제를 겪었지만, 이를 통해 GPU 가속 컨테이너 환경에 대한 깊은 이해를 얻을 수 있었습니다.

핵심 교훈:
- GPU Docker 환경 구축은 nvidia-container-toolkit이 필수
- CUDA 버전 호환성 체크가 매우 중요
- 데이터 영속성을 위한 볼륨 마운트 필수
- 3DGS는 NeRF보다 빠르지만 더 많은 사진 필요
- 실시간 뷰어로 학습 과정 모니터링 가능

다음 단계는 이를 REST API로 래핑하여 외부에서 쉽게 사용할 수 있는 서비스로 발전시키는 것입니다.

참고 링크:
- GitHub: nerfstudio-project/nerfstudio
- Documentation: docs.nerf.studio
