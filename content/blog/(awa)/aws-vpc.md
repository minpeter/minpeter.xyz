---
title: "AWS - VPC"
description: "Virtual Private Cloud에 대해 알아보자!!"
date: 2022-06-16T03:03:07.156Z
tags: ["Subnet", "aws", "vpc"]
categories: "aws"
---

## 이론

### VPC (가상 사설 클라우드)

Virtual Private Cloud의 약자로 AWS 상에서 논리적으로 독립된 공간을 제공하여 리소스를 실행할 수 있게 도움

### VPC의 종류

AWS에는 리전 별 Default VPC와 Custom VPC가 존재한다.
Default VPC는 각 리전에 기본적으로 하나씩 생성되어 있고,
Custom VPC는 리전 별로 최대 5개까지 생성할 수 있다.

### Subnet (서브넷)

네트워크 영역을 나눈 망
클라우드 환경의 VPC에서도 서브넷을 통해 네트워크를 분리하여 나눌 수 있다.

#### 서브넷에서 예약된 IP 주소

서브넷에 할당한 IP 대역이 10.0.0.0/24라면 10.0.0.0 ~ 10.0.0.255 중에서

| 주소       | 설명                         |
| ---------- | ---------------------------- |
| 10.0.0.0   | 네트워크 주소                |
| 10.0.0.1   | AWS VPC 가상 라우터 주소     |
| 10.0.0.2   | AWS DNS 서버 주소            |
| 10.0.0.3   | 향후 새로운 기능을 위해 예약 |
| 10.0.0.255 | 네트워크 브로드캐스트 주소   |

또한 AWS Subnet에는 Public Subnet과 Private Subnet이 존재한다.
Public Subnet은 외부 인터넷과 직접적인 통신을 할 수 있는 네트워크이고,
Private Subnet은 외부 인터넷과 직접적인 통신을 할 수 없는 패쇄적인 네트워크이다. \*단 Private 서브넷의 경우에도 NAT 게이트웨이가 있다면 외부와의 통신이 가능하다.

### Security Group과 ACL

인스턴스 단계에서 보안 기술은 Security Group이다.
서브넷에서 사용하는 보안 기술도 존재하는데 Access Control List (ACL)이다.

## 실습 - Public Subnet VPC 구성

#### 실습 단계

| Public Subnet VPC 생성                   | 검증                           |
| ---------------------------------------- | ------------------------------ |
| VPC 생성                                 | EC2 인스턴스 생성              |
| 퍼블릭 서브넷 생성                       | EC2 인스턴스 접근 후 통신 확인 |
| 인터넷 게이트웨이 생성 및 VPC 연결       |                                |
| 퍼블릭 라우팅 테이블 생성 및 서브넷 연결 |                                |
| 퍼블릭 라우팅 테이블 경로 추가           |                                |

### VPC 생성

1. VPC Console 접속 -> VPC
   ![](/images/bbe6166b-3c0c-425b-bf37-c20789281d48-image.png)
2. 이름: CloudPeter-VPC
   IPv4 CIDR 블록: 10.0.0.0/16
   ![](/images/c910f84f-9e0b-46d1-93e1-a87fb3a031e2-image.png)
3. 생성 확인
   ![](/images/73329ad0-576c-4e66-9b2f-f8439c3e1998-image.png) \*나중에 기본 VPC와 사용자 VPC를 구분할때 Name Tag의 유무를 확인할 수 있음

### Public Subnet 생성

1. VPC Console 접속 -> 서브넷
   ![](/images/3cd9199a-6553-4856-bed2-399a6ddf9b15-image.png)
2. VPC ID: 생성한 VPC 선택 (CloudPeter-VPC)
   이름 태그: CloudPeter-Public-SN
   가용 영역: ap-northeast-2a
   IPv4 CIDR 블록: 10.0.0.0/24
   ![](/images/b0f6ea91-d67f-4124-a2ab-b7e432a17df3-image.png)
3. 생성 확인
   ![](/images/dddcd0e4-0b0f-483e-b660-1585cc8990dd-image.png)

### 인터넷 게이트웨이 생성 및 VPC 연결

외부 인터넷 구간과 통신을 위해 IGW을 생성하고 VPC와 연결

1. VPC Console 접속 -> 인터넷 게이트웨이
   ![](/images/d2585bd8-5971-4375-a094-f4b63ecfa5ea-image.png)
2. 이름 태그: CloudPeter-IGW
   ![](/images/038ff117-33b8-40e6-9b93-67064fa7e92a-image.png)
3. IGW와 VPC 연결
   ![](/images/0303ebce-9833-4e95-a3a8-4b7de36f63a4-image.png)
   사용 가능한 VPC: 생성한 VPC 선택 (CloudPeter-VPC)
   ![](/images/201acf68-3746-4742-9421-a28b5f73cc06-image.png)
4. 연결 확인
   ![](/images/001db724-5d88-4f93-b6d8-b99eedb6270f-image.png)

여기까지 진행했다면 인터넷과 통신하기 위한 IGW가 VPC와 연결되었고, 서브넷도 생성된 상태이다.
단 아직 외부인터넷에 접근은 불가능한데 VPC의 가상 라우팅 테이블에 외부 인터넷으로 가는 라우팅 경로가 없기 때문이다.

### 퍼블릭 라우팅 테이블 생성 및 서브넷 연결

1. VPC Console 접속 -> 라우팅 테이블
   ![](/images/f5bef8c4-c90e-4370-8f14-b24ffaf58fc5-image.png)
2. 이름 태그: CloudPeter-Public-RT
   VPC: 생성한 VPC 선택 (CloudPeter-VPC)
   ![](/images/78b91042-182a-4dba-9547-cfbc8eeb54a4-image.png)
3. 생성 확인 및 서브넷 연결
   ![](/images/68d0b1b0-36cd-4f22-a6ea-e769c3eb8e7c-image.png)
   서브넷 연결 클릭
   ![](/images/1144f945-24bd-423c-99a1-5917c2d24c5e-image.png)
   서브넷 연결 편집 클릭
   ![](/images/c11ea166-62c1-4d49-850b-fa66e25df326-image.png)
   전에 생성한 서브넷 선택

### 퍼블릭 라우팅 테이블 경로 추가

1. VPC Console -> 라우팅 테이블
2. CloudPeter-Public-RT 선
3. 라우팅 탭 진입
   ![](/images/09711401-bc5e-4737-8ade-6ed9edef3bd6-image.png)
4. 대상: 0.0.0.0/0
   대상: 인터넷 게이트웨이 -> igw-어쩌고 저쩌고 선택
   ![](/images/8e7b9d54-eadf-43cd-a57f-0ceb6dd430c4-image.png)
5. 적용 확인
   ![](/images/b6be05f1-b54a-490e-84e9-51ff333b3a86-image.png)

이제 모든 설정을 완료하였습니다.
실제 통신이 가능한지 검증하도록 하겠습니다.

### EC2 인스턴스 생성

통신 여부를 확인하기 위해 EC2 인스턴스 생성

1. EC2 Console 접속 -> 인스턴스

2. 인스턴스 시작 클릭
   ![](/images/5a95d94c-bc0d-4626-a62f-2d6315dc86b4-image.png)

3. 이름: Public-EC2
   OS 이미지: Amazon Machine Image(AMI), 64bit,
   인스턴스 유형: T2.mirco
   키 페어: 항상 사용하는 그거

4. 네트워크 설정 -> 편집
   ![](/images/768d6c88-d81e-43d6-8bd6-7317858386fa-image.png)

5. VPC: 생성한 VPC 선택 (CloudPeter-VPC)
   서브넷: 생성한 Subnet 선택 (CloudPeter-Public-SN)
   퍼플릭 IP 자동 할당: 활성화
   ![](/images/3f8ec53e-0f7c-4295-af5c-772cb1780cf8-image.png)

6. 보안그룹: default
   ![](/images/27954cef-a255-4cc1-99c8-f37f7e19b031-image.png)

7. 생성 확인
   ![](/images/00cd2548-1e35-4825-a324-2e8e3b07e853-image.png)

### EC2 인스턴스 접근 후 통신 확인

퍼블릭 IP로 SSH 접근 후
`ping google.com`
만약 핑이 잘 된다면 성공!!

## 실습 - Private Subnet VPC 구성

#### 실습 단계

| Private Subnet 추가                        | 검증                                       |
| ------------------------------------------ | ------------------------------------------ |
| 프라이빗 서브넷 생성                       | EC2 인스턴스 생성                          |
| NAT 게이트웨이 생성                        | EC2 인스턴스 접근 후 통신 확인             |
| 프라이빗 라우팅 테이블 생성 및 서브넷 연결 | 퍼블릭 서브넷과 프라이빗 서브넷의 통신흐름 |
| 프라이빗 라우팅 테이블 경로 추가           |                                            |

### Private Subnet 생성

1. VPC Console 접속 -> 서브넷

2. 서브넷 생성
   VPC ID: 생성한 VPC 선택 (CloudPeter-VPC)
   이름 태그: CloudPeter-Private-SN
   가용 영역 설정: ap-northeast-2c
   IPv4 CIDR 블록: 10.0.1.0/24
   ![](/images/447dd7cd-c68e-4397-b966-080eeecac7f2-image.png)

3. 생성 확인
   ![](/images/acbeabeb-f41a-4d35-a7a4-a06b56e11aa7-image.png)

### NAT 게이트웨이 생성

1. VPC Console 접속 -> NAT 게이트웨이
   ![](/images/6af2950a-c904-445c-81bf-d3daf7b9c4b8-image.png)

2. 이름: CloudPeter-NAT
   서브넷: 퍼플릭 서브넷 선택 (CloudPeter-Public-SN)
   탄력적 IP 할당 클릭!
   ![](/images/b9e00de5-9e66-416e-903a-a6d1d73d8467-image.png)

3. 생성 확인
   ![](/images/6ea302a7-768f-4336-831d-f8c4111c748a-image.png)

### 프라이빗 라우팅 테이블 생성 및 서브넷 연결

1. VPC Console 접속 -> 라우팅 테이블

2. 이름 태그: CloudPeter-Private-RT
   VPC: 생성한 VPC 선택 (CloudPeter-VPC)
   ![](/images/e7d00c76-57f5-4e83-8677-6ef88edc38e8-image.png)

3. 프라이빗 라우팅 테이블 선택

4. 라우팅 편집 클릭
   ![](/images/9358db91-15f0-49f3-ac62-bad69f38a5be-image.png)

5. 프라이빗 서브넷 (CloudPeter-Private-SN) 선택
   ![](/images/dffb377c-e33d-46a4-a8a8-69d43c3b88cf-image.png)

### 프라이빗 라우팅 테이블 경로 추가

1. VPC Console 접속 -> 라우팅 테이블

2. 프라이빗 라우팅 테이블 선택

3. 라우팅 편집 클릭
   ![](/images/9b49470c-9bd7-4732-ad71-095303ba3cc0-image.png)
   다음과 같이 편집 (NAT 게이트웨이 선택)
   ![](/images/fec49ebe-9c14-4b4d-9055-2be184273abb-image.png)

### EC2 인스턴스 생성

1. EC2 Console 접속 -> 인스턴스

2. 이름: Private-EC2
   네트워크: 생성한 VPC 선택 (CloudPeter-VPC)
   서브넷: 생성한 프라이빗 서브넷 (CloudPeter-Private-SN)

3. 네트워크 설정
   ![](/images/88cbd21f-a09e-44db-9736-510684ef9b21-image.png)

4. 고급 세부 정보
   ![](/images/a93a7eeb-32d2-41e3-889f-b51ee48956b1-image.png)

```bash
#!/bin/bash
(
echo "qwe123"
echo "qwe123"
) | passwd --stdin root
sed -i "s/^PasswordAuthentication no/PasswordAuthentication yes/g" /etc/ssh/sshd_config
sed -i "s/^#PermitRootLogin yes/PermitRootLogin yes/g" /etc/ssh/sshd_config
service sshd restart
```

위에 사용자 데이터는 암호 방식으로 ssh에 접근할 수 있게 하는 설정이다.
EC2 인스턴스가 부팅될 때 읽어서 적용한다.

5. 생성 확인
   ![](/images/a2caa957-0db1-431d-829a-7e2973c337fa-image.png)

Private-EC2의 네트워크를 확인해보면 퍼플릭 아이피가 부여되지 않은 것을 확인할 수 있다.

### EC2 인스턴스 접근 후 통신 확인

1. Public-EC2의 IP로 SSH 접속

2. SSH 접속한 상태에서 Private-EC2의 프라이빗 IPv4 주소로 SSH 접속
   <!-- ![](/images/c6a5061b-6b4e-4434-8eda-911386d55770-image.png) -->
   <!-- FIXME: MISSING IMAGE -->

3. NAT를 이용해 `ping google.com`에 핑이 가는지 확인
   ![](/images/e1c8161d-bdb8-4d1c-b3cd-e732a9dc679b-image.png)

\*NAT의 경우 안에서 밖으로 나가는건 가능하지만 외부에서 Private Subnet으로 접근하는건 불가능

### 자원 삭제

1. EC2 인스턴스 종료 (EC2 -> 인스턴스 -> 인스턴스 선택 -> 작업 -> 인스턴스 상태 -> 종료)
2. NAT 게이트웨이 삭제 (VPC -> NAT 게이트웨이 -> 작업 -> NAT 게이트웨이 삭제)
   ⚠️ NAT 게이트웨이가 삭제될 때까지 대기
3. 탄력적 IP 삭제 (VPC -> 탄력적 IP -> Actions -> 탄력적 IP 주소 릴리스)
4. VPC 삭제 (VPC -> VPC -> 작업 -> VPC 삭제)
