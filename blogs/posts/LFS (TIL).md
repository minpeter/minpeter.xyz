---
title: "LFS (TIL)"
date: 2021-08-29 12:59:59 +0900
tags: ["LFS","TIL","linux"]
---

## 오늘 공부한 것
오늘부터 시간이 날때마다 커널에 대해 조금씩 공부하기로 마음먹었다!  
원도우에서 wsl2, sandbox, hyper-V 같은 가상화를 이용하는 기술에 대해 공부하던 중,  
hyper-v에 type1과 type2에 대해 알게되었고, 이로 인해 전에 wsl2와 VMware을 같이 못쓰는 이유에 대해 이해하게 되었다!  
![](/images/12-Hypervisor-Types.png)
(VMware는 type1을 이용 WSL2, sandbox는 type2이용)  

이때 hyper-v type 1의 형테에서 흥미를 느꼈는데, 저 구조대로면 windows도 hypervisor 상의 GuestOS가 되어야 되기 때문이다.  
조금 더 자료를 찾아보니 이런 사진을 찾을 수 있었다.  
![](/images/05-image-537.png)

역시 예상대로였다.  
windows NT Kernel 이라는 이름으로 hypervisor에 Linux Kernel과 동급하게 올라가있는 모습을 볼 수 있다.  

그리고 Windows NT 커널은 하이브리드 커널이고 Linux 커널은 모놀리식 커널이라는 커널의 종류 같은 것도 알게 되었고, 다시금 커널 공부를 하고 싶게 만들었다.  

마침 리눅스 30주년으로 뽕에 차있던 나, 커널 공부를 시작했다고한다.  