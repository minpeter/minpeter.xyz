---
title: "wsl docker sandbox and VMware (TIL)"
description: "windows hypervisor 위에서 돌아가는 WSL, docker, vmware의 합의점 구경"
date: 2021-10-18 14:25:00 +0900
tags: ["TIL","VMware","Virtualization"]
---

난 아직 맥북을 사지 못했다.  
~~사실 맥북을 사도 별로 달라질꺼같진않는데~~  
아무튼 터미널을 사용해야되기 때문에 wsl의 힘을 빌려서 windows에서의 생활을 이어나가는 중이다.  
그런데.. 그런데.. 막 gnome 41, fedora 35 beta 이런 뉴스가 들려올때면 리눅스 데스크톱 환경의 발전을 체험해 보고 싶어진다.  
wsl이 좋은 프로그램인건 문명하지만 내가 원하는 데스크톱 환경 체험은 완전히 다른 목적으로 개발된 프로그램이기에 걍 가상머신을 돌리는 편이 낫다.  

## 🔏 wsl와 VMware의 공존
내가 노트북에 VMware을 설치하길 꺼린 이유는 hyper-v 이슈 때문이다.  
wsl을 사용하게되면 hypervisor가 자동으로 활성화되어 하드웨어단의 가상화 자원에 hypervisor가 올라가고 그 위에서 wsl 배포판들이 돌아간다.  
원도우를 일회용으로 사용할수 있게 해주는 windows sandbox도 hypervisor 위에서 돌아가고 docker-desktop도 hypervisor 위에서 돌아간다.  

근데!! 기존 안드로이드 에뮬레이터(블루스택)이나 가상머신 프로그램(VMware, VirtualBox)는 하드웨어 단의 자원 바로 위에서 돌아가야 되는데 이미 해당 자원을 hypervisor가 차지하고 있어 실행시 hyper-v을 종료해 달라는 오류 뜨는 이슈가 있었다.  

## 🔓 문제의 해결
VMware의 엄청난 소식이 들려왔다.  
hyper-v가 활성화된 경우 자동으로 인식하고 WHP 위에서 돌아가도록 하는 모드가 추가되었다는 것이다.  
이제 wsl을 이용하고 있어도 VMware을 동시에 구동할 수 있다.  
그래서 VMware을 이용해 fedora을 구동했고, 만족했다. :)