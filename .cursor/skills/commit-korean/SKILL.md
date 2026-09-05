---
name: commit-korean
description: >-
  PowerShell에서 한국어 커밋이 깨지지 않게 파일로 커밋하고 푸시한다. Use when the user says
  커밋해, 커밋하고 푸시, 커밋, commit, push, 올려.
---

# 한국어 커밋

`.cursor/rules/git-ops.mdc`를 따른다. 조사만이면 커밋하지 않는다. `git config`로 author를 바꾸지 않는다. 강제 푸시하지 않는다.

## 절차

1. `git status`와 `git diff`로 이번 요청 파일만 확인한다. 비밀값·키 파일은 넣지 않는다.
2. 필요한 파일만 `git add`. `git add .`는 사용자가 전체를 승인한 때만.
3. 커밋 메시지를 UTF-8 파일에 쓴다. 터미널 `-m`으로 한글을 넣지 않는다.

```powershell
# 1) .git/COMMIT_MSG_TEMP 에 UTF-8로 메시지 작성 (Write 도구)
# 2)
git commit -F .git/COMMIT_MSG_TEMP
# 3) 그 파일을 삭제
```

4. 커밋 후 `git status`로 확인한다.
5. 사용자가 금지하지 않으면 `git push`. 배포가 필요하면 `railway-ops` 또는 스토어 스킬로 이어간다.

완료: 커밋 성공. 푸시까지 했으면 원격 반영까지.
