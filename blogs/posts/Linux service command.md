---
title: "Linux service command"
date: 2020-01-01
tags: ["command","linux"]
---

### 개요

라즈베라파이 제로 세팅중 ssh 접속을 위해 nmap스캔을 하던 도중

내 노트북에 22번 포트가 오픈돼 있다는 것을 발견했다.

### 해결방법

ssh 서버를 종료하면 간단하게 해결된다. 따라서

1. `sudo service ssh stop`

2. `sudo systemctl status ssh` (서버스 상태 확인)


추가로! 명령어 service를 알아보도록 하자

`Usage: service < option > | --status-all | [ service_name [ command | --full-restart ] ]`

위에 command에는 `start|stop|reload|force-reload|restart|try-restart|status`가 있다

**END**

작성이유는... 나중에 ssh 쓸일있을때 서버 실행하게 ㅎ
