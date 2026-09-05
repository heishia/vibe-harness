---
name: ios-testflight
description: >-
  iOS TestFlight. Use when the user says iOS 올려, 테스트플라이트,
  TestFlight, IPA, 앱스토어 빌드.
---

# iOS TestFlight

로컬 Windows에 Xcode가 없어도 중단하지 않는다. 스니펫: `templates/snippets/ios-testflight.ps1`.

## 절차

1. 프로덕션 웹 번들을 iOS 셸에 sync한다. 화면을 바꿨으면 Android도 같이 갱신한다. 사용자가 iOS만 올리라고 하면 Play 업로드는 건너뛴다.
2. `CURRENT_PROJECT_VERSION`(빌드번호)을 이전 업로드보다 올린다.
3. 변경을 커밋하고 원격에 푸시한다. (사용자가 커밋을 금지하면 중단하고 알린다.)
4. GitHub Actions 워크플로를 실행한다.

```powershell
gh workflow run <ios-testflight.yml> -f upload_testflight=true
gh run list --workflow <ios-testflight.yml> --limit 3
```

실패 시 `gh run view <RUN_ID> --log-failed`.

완료: 워크플로 성공 또는 TestFlight 업로드 성공.
