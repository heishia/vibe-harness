---
name: check-harness
description: >-
  vibe-harness가 프로젝트 루트 .cursor에 연결됐는지 검사한다. Use when the user says
  하네스 설치, 하네스 확인, 설치됐는지, .cursor 연결, vibe-harness.
---

# 하네스 설치 확인

추측하지 말고 파일시스템을 본다.

## 합격

1. 이 창 워크스페이스 루트에 `.cursor`가 있다.
2. 루트 `.cursor`는 복붙 폴더가 아니라 연결이다.
   - 패키지: `프로젝트루트/node_modules/vibe-harness/.cursor`
   - submodule: `프로젝트루트/vibe-harness/.cursor`
3. 연결 **이름**에 `.pnpm`이 있으면 실패.
4. `vibe-harness` 버전은 `package.json` 기준 최신. `0.1.0`이면 예전 커밋.
5. `rules`에 `00-do-not`, `product-structure`, `app-ui`, `app-ui-patterns`, `capacitor-webview`가 있다.
6. `skills`에 `scaffold-app`, `sync-web-to-app`, `store-release`가 있다.

## 보고

- 결론: 통과 또는 실패
- 프로젝트 루트, 버전, `.cursor` 출발 → 도착
- 실패면 고치는 명령:

```powershell
pnpm add -D github:heishia/vibe-harness#main --allow-build=vibe-harness
```

연결만 다시 하려면 `pnpm exec vibe-harness-install`.
