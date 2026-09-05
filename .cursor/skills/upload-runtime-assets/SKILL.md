---
name: upload-runtime-assets
description: >-
  자주 바뀌는 캠페인·포스트 이미지를 버킷에 올리고 DB에는 절대 URL을 넣는다. Use when the user says
  버킷, 캠페인 이미지, 이벤트 배너 올려, 운영 이미지, 스토리지 업로드.
---

# 운영 에셋 버킷

`.cursor/rules/assets.mdc`를 따른다. 로고·파비콘·고정 가이드는 public에 두고 이 스킬을 쓰지 않는다. 화면 시안은 `place-design-assets`.

## 절차

1. 파일이 로고/UI 시안이면 중단하고 `place-design-assets`로 돌린다.
2. Railway 버킷(S3 호환)에 올린다. 공개 베이스는 `STORAGE_PUBLIC_BASE_URL` / `VITE_ASSET_PUBLIC_BASE_URL`.
3. DB 필드에는 가능하면 **절대 URL**을 저장한다.
4. 프론트는 `templates/src/lib/assetUrl.ts`처럼 절대 URL을 그대로, 상대 경로만 베이스를 붙인다.
5. 같은 파일을 public·docs·버킷에 복제하지 않는다. 올린 뒤 inbox 배포본을 남기지 않는다.
6. URL·버킷 키를 채팅에 다시 적지 않는다.

완료: DB의 URL로 화면이 이미지를 보여 주고, 앱 public에는 없다.
