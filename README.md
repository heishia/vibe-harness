# vibe-harness

바이브코딩용 범용 하네스. 폴더를 손으로 복붙하지 말고 **git으로 붙인 뒤 설치 스크립트**로 Cursor에 연결한다.

Cursor는 레포 **루트**의 `.cursor`만 읽는다. 설치 스크립트는 pnpm `.pnpm` 경로가 아니라 프로젝트 루트에 연결한다. 패키지로 붙이면 대상은 `node_modules/vibe-harness/.cursor`다.

이미 루트 `.cursor`가 하네스 연결이면 새 경로로 다시 연결한다. 직접 만든 `.cursor` 폴더는 건드리지 않는다.

## 새 프로젝트에 설치

pnpm 10은 의존성 `postinstall`을 기본으로 실행하지 않는다. 패키지만 받고 멈추면 루트 `.cursor`가 생기지 않으니, **연결 명령을 꼭 한 번 더** 실행한다.

```powershell
pnpm add -D github:heishia/vibe-harness#main
pnpm exec vibe-harness-install
```

또는 submodule:

```powershell
git submodule add https://github.com/heishia/vibe-harness.git vibe-harness
node ./vibe-harness/scripts/install.mjs
```

성공하면 프로젝트 루트에 `.cursor` junction이 생기고, 대상은 `node_modules/vibe-harness/.cursor`다. 같은 `pnpm add`만 다시 치면 lock에 묶인 예전 커밋이 유지되므로, 업데이트 때도 위 두 줄을 그대로 쓴다.

### 웹 뼈대

필요할 때만 `vibe-harness/templates`의 `design`, `public`, `src/lib`을 앱에 복사한다.

## 이 폴더 구조

- `.cursor/rules` — 원칙
- `.cursor/skills` — 배포·에셋·스토어 절차
- `templates` — 에셋 폴더, lib 뼈대, 명령 스니펫
- `scripts/install.mjs` — 프로젝트 루트 `.cursor` 연결
