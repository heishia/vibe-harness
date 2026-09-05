# vibe-harness

바이브코딩용 앱 하네스. 기본은 **Capacitor로 iOS·Android를 같이** 만드는 것이다. 폴더를 손으로 복붙하지 말고 **git으로 붙인 뒤 설치 스크립트**로 Cursor에 연결한다.

Cursor는 레포 **루트**의 `.cursor`만 읽는다. 설치 스크립트는 pnpm `.pnpm` 경로가 아니라 프로젝트 루트에 연결한다. 패키지로 붙이면 대상은 `node_modules/vibe-harness/.cursor`다.

이미 루트 `.cursor`가 하네스 연결이면 새 경로로 다시 연결한다. 직접 만든 `.cursor` 폴더는 건드리지 않는다.

## 새 프로젝트에 설치

```powershell
pnpm add -D github:heishia/vibe-harness#main --allow-build=vibe-harness
```

`--allow-build`가 있어야 pnpm 10이 설치 스크립트를 실행하고, 프로젝트 루트 `.cursor`를 `node_modules/vibe-harness/.cursor`에 연결한다. 이 플래그 없는 `pnpm add`만으로는 연결이 생기지 않는다.

또는 submodule:

```powershell
git submodule add https://github.com/heishia/vibe-harness.git vibe-harness && node ./vibe-harness/scripts/install.mjs
```

### 웹 뼈대

필요할 때만 `vibe-harness/templates`의 `design`, `public`, `src/lib`을 앱에 복사한다.

## 이 폴더 구조

- `.cursor/rules` — 원칙. 기본은 앱 UI·Capacitor. 랜딩·관리자는 `optional-web-surfaces` (요청 시에만)
- `.cursor/skills` — 배포·에셋·스토어 절차
- `templates` — 에셋 폴더, lib 뼈대, 명령 스니펫
- `scripts/install.mjs` — 프로젝트 루트 `.cursor` 연결
