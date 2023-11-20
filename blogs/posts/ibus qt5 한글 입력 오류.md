---
title: "ibus qt5 한글 입력 오류"
date: 2020-01-01
tags: ["QT5","ibus","linux","한글입력기"]
---

### 개요

위 사진에 보이는 '포맷(F)...'' 버튼이 잠시 동안 버그가 있었다.

Sobi.Tips에 따르면 qt5 라이브러리 최신버전의 문제 라고 한다

[만자로 KDE : ibus 한글 모드에서 특정 키 오작동 증상 해결하기](https://www.sobi.tips/manjaro-kde-ibus-hangul-solve/)

### 해결방법

qtbase 5.13에서 fix할꺼라고 하지만 기다리기 싫으니 다른 방법을 사용하자

1. ctrl+alt+T

2. gsettings get org.freedesktop.ibus.engine.hangul use-event-forwarding (기본값 확인)

3. gsettings set org.freedesktop.ibus.engine.hangul use-event-forwarding false

4. 재부팅

**END**

작성이유는... qtbase 5.13 패치 이후 gsettings set org.freedesktop.ibus.engine.hangul use-event-forwarding true 를 입력해 값을 원복 해야되기 때문에 작성한다.