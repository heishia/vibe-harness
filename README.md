# vibe-harness

바이브코딩용 범용 하네스. 폴더를 손으로 복붙하지 말고 **git으로 붙인 뒤 설치 스크립트**로 Cursor에 연결한다.

Cursor는 레포 루트의 `.cursor`만 읽는다. 설치 스크립트가 그걸 이 패키지의 `.cursor`에 연결한다.

## 새 프로젝트에 설치

GitHub(또는 다른 git 호스트)에 이 레포를 올린 뒤, URL을 바꿔 쓴다.

### 1) submodule (추천)

```powershell
cd <새-프로젝트>
git submodule add <HARNESS_GIT_URL> vibe-harness
node ./vibe-harness/scripts/install.mjs
```

이후 하네스 업데이트:

```powershell
git submodule update --remote vibe-harness
```

연결은 그대로 두면 된다. `.cursor`가 하네스 쪽을 가리키기 때문이다.

### 2) npm/pnpm git 의존성

```powershell
pnpm add -D github:<USER>/vibe-harness
# 또는
pnpm add -D git+ssh://git@github.com/<USER>/vibe-harness.git
node ./node_modules/vibe-harness/scripts/install.mjs
```

이미 루트에 `.cursor` 폴더가 있으면 스크립트가 덮어쓰지 않는다. 지우고 다시 실행하거나 수동으로 합친다.

### 웹 뼈대

필요할 때만 `vibe-harness/templates`의 `design`, `public`, `src/lib`을 앱에 복사한다.

## 이 폴더 구조

- `.cursor/rules` — 원칙
- `.cursor/skills` — 배포·에셋·스토어 절차
- `templates` — 에셋 폴더, lib 뼈대, 명령 스니펫
- `scripts/install.mjs` — 프로젝트 루트 `.cursor` 연결
