---
title: 안쓰는 노트북을 Proxmox 서버로 이용하기
date: 2022-10-03 18:47:33
tags:
categories: "home lab"
---

# proxmox란?

Hyper-V, ESXi, XenServer, KVM 등과 유사한 기능을 제공하는 Type-1 hypervisor  
오픈소스라는 장점이 있으며, 오픈소스 중 대체품으론 XenServer의 포크인 XCP-ng가 있음  
~~써보진 않았다~~

## proxmox 설치

### 설치 환경

Lenovo ThinkPad E485 (Ryzen 3 2200U + 12GB RAM + 1TB HDD)
무조건 Bare Metal에 설치해야한다.  

최소사양은 다음과 같다.
```
CPU: 64비트(Intel EMT64 또는 AMD64)

KVM 전체 가상화 지원을 위한 Intel VT/AMD-V 지원 CPU/메인보드

RAM: 1GB RAM 및 게스트용 추가 RAM 필요

하드 드라이브

네트워크 카드(NIC) 1개
```

### 설치 과정

1. [공식 홈페이지](https://www.proxmox.com/en/downloads/category/iso-images-pve)에서 ISO 파일을 다운로드한다.  
2. ISO 파일을 USB에 설치한다. (원도우의 경우 rufus, 리눅스의 경우 dd)
3. USB를 노트북에 꽂고 부팅한다.
![image](/images/pve-grub-menu.png)
다음과 같은 화면이 나오면 `Install Proxmox VE`를 선택한다.
4. 적절하게 디스크 선택, 적절하게 비밀번호 선택, 적절한 타임존 적절한 선택으로 설치를 완료한다.
5. https://server-ip:8006 접속 후 로그인한다.

### 기업용 레포지토리 제거

## 구독용 저장소 제거

```bash
# vim /etc/apt/sources.list.d/pve-enterprise.list
```

다음과 같이 주석처리 해주자

```bash
# deb https://enterprise.proxmox.com/debian/pve buster pve-enterprise
```

## 로그인 시 구독 안내  메시지 제거

```bash
# vim /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js
```

513번째 줄 근처의

```bash
if (res == null || res == undefined ||
		!res || res.data.status.toLowerCase() ! = 'active') {
```

를 다음코드로 대체

```bash
if (false) {
```

다음 명령어로 변경 사항 적용

```bash
# systemctl restart pveproxy.service
```

### 미구독자용 레포지토리 추가

```bash
# vim /etc/apt/sources.list
```

다음 내용 추가

```bash
# no subscription
deb http://download.proxmox.com/debian/pve bullseye pve-no-subscription
```

![Untitled](/images/setup-proxmox/pve-no-subscription.png)

저장 후 업데이트

```bash
# apt update && apt dist-upgrade -y
```

![web console에서 경고를 주긴 하지만 개발용 서버이기 때문에 상관 없다!](/images/setup-proxmox/web-console-warning.png)

web console에서 경고를 주긴 하지만 개발용 서버이기 때문에 상관 없다!

### 노트북에 설치시 절전모드 설정

proxmox를 서버로 사용해야 하는데 덮개를 닫아서 절전 모드에 들어간다면 불편할 것이다.

```bash
# vim /etc/systemd/logind.conf
```

다음과 같은 줄을 

```bash
#HandleLidSwitch=suspend
```

다음과 같이 바꿔주자

```bash
HandleLidSwitch=ignore
```

그런 다음 명령어를 입력해주자

```bash
# systemctl restart systemd-logind
```

이제 덮개를 닫아도 절전모드로 돌아가는 일은 없을 것이다.

### 웹 콘솔에 다크모드 적용

```bash
bash <(curl -s https://raw.githubusercontent.com/Weilbyte/PVEDiscordDark/master/PVEDiscordDark.sh ) install
```

![F5로 reload를 하면 테마가 적용됨!!](/images/setup-proxmox/proxmox-dark-theme.png)

F5로 reload를 하면 테마가 적용됨!!

[https://github.com/Weilbyte/PVEDiscordDark](https://github.com/Weilbyte/PVEDiscordDark)

### amd gpu backlight fix

`/etc/default/grub` 파일 중

`GRUB_CMDLINE_LINUX_DEFAULT` 에 

`acpi_backlight=native` 추가하고

`update-grub` 실행 후 `reboot`


## 앞으로 활용 방안

Kubernetes 클러스터 구축, Jenkins CI/CD, private Docker Registry 등등으로 이용할 예정이다.  
일단은 테스트 배포 & 배포를 진행할 온프라미스 서버가 생겼다는 것에 의의를 두고 싶다.  