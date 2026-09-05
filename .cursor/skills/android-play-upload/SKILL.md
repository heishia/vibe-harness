---
name: android-play-upload
description: >-
  Android Play 업로드. Use when the user says 안드로이드 올려, 플레이 올려,
  AAB, Fastlane, supply, 스토어 올려 (Android).
---

# Android Play 업로드

`.cursor/rules/railway-fastlane.mdc`와 `capacitor-webview.mdc`를 따른다. 스니펫: `templates/snippets/fastlane-supply.ps1`.

## 절차

1. `android/app/build.gradle`의 `versionCode`를 이전 업로드보다 올린다. 필요하면 `versionName`도.
2. 웹 UI를 바꿨으면 프로덕션 웹 빌드 후 Capacitor sync. iOS도 같이 갱신한다. 웹만 바꾸고 끝내지 않는다. 사용자가 Android만 올리라고 하면 iOS 업로드는 건너뛴다.
3. AAB를 빌드한다.
4. Fastlane `supply`를 **production** 트랙으로 실행한다. `--track internal`을 쓰지 않는다.
5. 업로드 성공 로그를 확인한 뒤에야 완료다. AAB만 만들고 끝내지 않는다.

Windows에서 `fastlane`이 PATH에 없으면 `C:\Ruby32-x64\bin\fastlane.bat`를 쓴다.

패키지명·JSON 키는 환경에 맞게 치환한다. 키 내용·토큰을 채팅에 적지 않는다. 키 파일은 레포에 커밋하지 않는다.
