---
name: place-design-assets
description: >-
  디자인툴 에셋을 폴더에 넣는다. Use when the user says 에셋 넣었어,
  디자인 보냈어, 시안 보냈어, inbox, 이미지 보냈어.
---

# 디자인 에셋 배치

`.cursor/rules/assets.mdc`를 따른다. CSS로 시안을 비슷하게 그리지 않는다.

## 절차

1. 받은 파일을 프로젝트 `design/inbox/`에 둔다. (없으면 하네스 `templates/design/inbox` 구조를 만든다.)
2. 역할 폴더로 옮긴다.
   - 로고/파비콘 → `public/brand/`
   - 화면 일러스트·히어로 → `public/ui/<화면>/`
3. 파일명은 영어 kebab-case. 한글명·공백·`최종2`는 고친다. 웹은 WebP 우선.
4. 코드에는 `/brand/...` 또는 `/ui/<화면>/...` 만 적는다.
5. `design/inbox`와 `docs`에 배포용 복제본을 남기지 않는다.
6. 캠페인·포스트처럼 자주 바뀌면 버킷+절대 URL. public에 넣지 않는다.

완료: 코드가 새 경로를 가리키고, 해당 화면이 에셋을 쓴다.
