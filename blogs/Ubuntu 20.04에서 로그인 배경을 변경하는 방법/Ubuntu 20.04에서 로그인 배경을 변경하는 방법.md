---
title: "Ubuntu 20.04에서 로그인 배경을 변경하는 방법"
date: 2020-01-01
tags: ["linux","ubuntu"]
---

### 개요

우분투 20.04의 기본 로그인 배경은 보라색이다.

보통의 경우 이를 변경하지 않고 사용하지만 로그인 전과 로그인 후의 테마가 일치 하지 않아 변경하고 싶었다

이를 변경하는 방법은 우분투 19까지는 간단하게 ccs파일만 수정하면 됬다.

하지만 20부터는 .gresource파일을 수정하고 다시 컴파일까지 해야한다.

다행이도 이를 간단하게 해주는 스크립트가 여러가지 있는데 그 중 하나가 focalgdm3이다.

### 해결방법

1. 필용한 페키지 설치 : sudo apt install git libglib2.0-dev

2. 스크립트 복제 : git clone https://github.com/PRATAP-KUMAR/focalgdm3.git

3. 스크립트 실행 : sudo ./focalgdm3/focalgdm3 --set

4. 사용자 암호 입력, 1을 선택한경우 이미지 경로입력, 2를 선택한 경우 색상 코드를 입력하자.

**END**