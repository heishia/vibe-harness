---
name: store-release
description: >-
  화면을 감싼 뒤 iOS와 Android 스토어에 같이 올린다. Use when the user says
  스토어 올려, 앱 올려, 앱 배포, 스토어 배포, 둘 다 올려. 한 플랫폼만 말한 경우에는 쓰지 않는다.
---

# 스토어 같이 올리기

`.cursor/rules/railway-fastlane.mdc`를 따른다. 사용자가 iOS만 또는 Android만 말하면 이 스킬 대신 해당 스킬만 탄다.

## 절차

1. `sync-web-to-app`으로 웹 산출물을 iOS·Android 둘 다 감싼다.
2. `android-play-upload` — versionCode 상향, AAB, Fastlane **production**. 내부 트랙 금지.
3. `ios-testflight` — 빌드번호 상향, 푸시, CI TestFlight. 로컬 Xcode 없다고 중단하지 않는다.
4. 둘 다 성공 로그를 본 뒤에야 완료다. 한쪽만 되고 멈추면 실패 사유를 말한다.

완료: Play production 업로드 + TestFlight 업로드.
