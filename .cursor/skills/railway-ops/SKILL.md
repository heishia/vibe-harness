---
name: railway-ops
description: >-
  Railway 배포와 운영 DB 조회. Use when the user says 배포해, 레일웨이,
  프로덕션 반영, 운영 DB, 건수가 달라, railway, production deploy.
---

# Railway 운영

시작 전 이 하네스의 `.cursor/rules/railway-fastlane.mdc`와 `git-ops.mdc`를 따른다.

## 절차

1. `railway status`로 프로젝트·환경·서비스를 확인한다. 추측하지 않는다.
2. 코드 반영이면 커밋(허용된 경우) 후 git push. 로컬 `railway up`을 기본으로 쓰지 않는다.
3. 해당 서비스 배포가 끝날 때까지 상태를 확인한다.
4. 운영 DB·마이그레이션·건수 조회는 아래 형식만 쓴다.

```powershell
railway status
railway run --service api --environment production -- <명령>
```

마이그레이션 예:

```powershell
railway run --service api --environment production -- pnpm --filter <db-pkg> db:migrate:deploy
```

데이터가 다르다는 말은 운영을 먼저 숫자로 조회한 뒤 개발과 비교한다. DB URL·키를 응답에 적지 않는다.

완료: 배포 성공 또는 조회 숫자를 사용자에게 보고.
