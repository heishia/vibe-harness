---
name: sync-web-to-app
description: >-
  웹 UI를 앱 셸에 다시 감싼다. Use when the user says 앱에도 반영,
  모바일 앱 동기화, Capacitor sync, 웹 바꿨으니 앱.
---

# 웹 → 앱 동기화

`.cursor/rules/product-structure.mdc`와 `capacitor-webview.mdc`를 따른다. 앱 전용 UI를 웹과 따로 만들지 않는다.

## 절차

1. 사용자 웹앱에서 프로덕션(또는 요청된) 모바일 빌드를 돌린다.
2. Capacitor sync (android/ios).
3. 스토어에 올릴 거면 이어서 `android-play-upload` 또는 `ios-testflight` 스킬을 탄다. sync만 하고 스토어 요청을 무시하지 않는다.
4. 웹만 배포하고 앱 번들을 안 올리면, 스토어 앱에는 안 보인다. 사용자에게 그 사실을 말한다.

완료: sync 성공. 스토어 요청이 있으면 해당 업로드 성공까지.
