---
title: "2부 Ruby와 Jekyll 그리고 github-pages"
date: 2021-08-23 15:51:38 +0900
tags: ["github","github pages","jekyll","ruby"]
categories: "blog"
---
자ㅏ자... 이제 github-pages 설정하는 방법를 알아보도록 하자.

일단 github-pages를 사용하는 방법은 생각보다 많은데 그 중 한가지 방법을 소개하는 것이니 감안하고 보는 것이 좋을 것 같다.

## Ruby 설치하기

루비를 설치하는 방법은 여러가지가 있다.
나는 루비를 사용하지도 사용할줄도 모른다.
하지만 검색을 해보니 rvm이라는 루비 버전 메니저가 있었는데, NodeJS에 nvm처럼 편리할것이라고 예상되어 rvm을 이용한 설치를 진행하였다!!
~~이게 실수일꺼라고는 생각을 안했었지..~~

추천은 [rvm.io](https://rvm.io/rvm/install)의 공식 문서를 참고하는것이지만 간단하게 설명하면

```bash
$ gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB #install GPG keys
```

```bash
$ \curl -sSL https://get.rvm.io | bash
```

한 뒤에 터미널을 한번 재시작해주면 rvm명령어가 작동할 것이다.

킹치만.. 여기시 한가지 작은 문제가 발생하는데 zsh을 이용할경우 [zsh 설치과정](https://rvm.io/integration/zsh)를 통해 설정을 해야되는데 이게 어려울 뿐만 아니라 거의 모든 zsh 유저가 사용하는 oh-my-zsh를 이용할 경우 공식페이지에서 직접 rvm를 안쓰는걸 추천한다고 하니..

zsh + oh-my-zsh 조합을 사용하는 나로써는 최악이였다.

사실 이걸 몰랐을때만 하더라고도

```bash
$ \curl -sSL https://get.rvm.io | zsh
```

명령어를 통해 설치했는데 모르고 사용하다보니 문제가 생겼다..

터미널 실행시 rvm이 자동실행이 안되고 매번 수동으로 시작을 해줘야되는...

undefined

## jekyll, bundler 설치하기 & 프로젝트 만들기

일단 설치한 뒤로는 문제가 없었다, 사실 본인도 루비를 몰라서 무슨 문젠지 모르겠다..ㅜ

계속하자면

```bash
$ gem install jekyll bundler # jekyll, bundler 설치
$ jekyll new username.github.io #username에는 자신의 github id를 입력
$ cd username.github.io #username.github.io 폴더로 이동
```

여기까지 실행했다면 기본적으로 설정되어있는 테마로 블로그를 실행시킬수 있는데 다음 명령어를 입력하면 된다.

```bash
$ bundle exec jekyll serve #jekyll 서버 실행
```

이후 브라우저로 127.0.0.1:4000에 접속하면 블로그가 보일 것이다.

undefined

## 테마 설정하기

내가 적용한 테마는 [chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)라는 테마이다.
해당 github repo README 파일에 잘 설명되어있기 때문에 간단하게 설명하겠다.

`Gemfile`을 만들거나 편집해야되는데 맨 아랫줄에 다음 내용을 적어주면 된다.

```Gemfile
gem "jekyll-theme-chirpy"
```

`_config.yml`을 만든경우 추가해주고 편집한 경우 theme를 찾아 변경해주자

```yml
theme: jekyll-theme-chirpy
```

그리고 아래 명령을 실행하자

```bash
$ bundle
```

다음으로는 조금 까다로운 단계인데

```bash
$ cd "$(bundle info --path jekyll-theme-chirpy)"
```

명령으로 chirpy테마가 설치된 폴더로 이동하고 해당 디렉토리의

```
.
├── _data
├── _plugins
├── _tabs
├── _config.yml
└──  index.html
```

파일을 프로젝트 폴더에 복사해 주자 (중복되는경우 덮어쓰기)
이제 서버를 실행하면 기본 chirpy 테마가 로컬 4000번에서 실행될 것이다.
이후 단계는 설명하기가 어렵다.
\_config.yml 파일을 잘 찾아서 알맞게 이름, 이메일 등으로 대체해 주고 about.md 등으로 수정한 뒤 서버을 실행하면 적용된 모습을 볼수 있을 것이다!!

- 참고로 index.md 파일이 존재할경우 삭제해야 정상적으로 작동된다.
- 게시글 작성은 \_posts 디렉토리에 `날짜-게시글재목.md` 형식으로 생성하면 된다.

## github-pages에 배포하기

이 부분에서 난 한가지 결심을 했다.
사실 많은 (많지는 않다) 정적 사이트 생성기 중에서 처음보는 ruby의 jekyll를 고른 이유는 github pages에서 강력하게 지원하고 있어서인데.. 내가 고른 테마는 깃허브 내의 어떤 빌드 옵션으로 인해 바로 빌드가 불가능하다고 한다.

따라서 `GitHub Actions`를 이용해야 한다고 한다.
actions으로 빌드한 뒤에 빌드내용을 따로 브랜치를 만들어서 해당 브랜치를 github pages에 등록한다는 것인데...
사실 이를 이용하면 다른 정적사이트 생성기를 사용해도 문제가 없다!!

따라서! rvm의 zsh issue, github pages의 비밀이 더해져.. 이 블로그는 한동안 사용하다가 go로 만들어진 사이트 생성기 HUGO로 이동할까 생각중이다..
~~솔직히 RVM oh-my-zsh은 선넘었지..ㅜ~~
