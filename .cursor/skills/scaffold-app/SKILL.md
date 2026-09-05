---
name: scaffold-app
description: >-
  새 앱 골격을 깐다. Capacitor로 iOS·Android를 같이, 웹이 원천. Use when the user says
  앱 만들어, 앱 만들고 싶, 새 프로젝트, 프로젝트 시작, 앱 시작.
---

# 새 앱 골격

`.cursor/rules/product-structure.mdc`, `app-ui.mdc`, `app-ui-patterns.mdc`, `capacitor-webview.mdc`를 먼저 읽는다. 빠진 정보가 있으면 만들고 추측하지 말고 묻는다.

## 기본으로 깐다

1. API 하나(모듈형 모놀리스).
2. 사용자 웹 하나. 폰 폭 셸, `templates/src/lib`의 `api.ts`·`assetUrl.ts`를 이 앱에 복사.
3. 그 웹을 Capacitor로 iOS·Android 둘 다 감싼다. 네이티브 UI를 따로 짜지 않는다.
4. 디자인 폴더: `templates/design`, `public/brand`, `public/ui`.
5. 배포는 Railway(API+웹) + 스토어 업로드 경로.

## 기본으로 깔지 않는다

- 랜딩, 관리자 콘솔 (`optional-web-surfaces`는 요청 전에 읽지 않는다)
- 공유 UI/타입 패키지
- 4층 주문·확정 후 이행 (상거래 이행을 말하기 전)
- 브랜드 포인트색. CTA는 검정/흰

## 절차

1. 이름, 누가 쓰는지, 핵심 기능 3개, 로그인/결제 여부를 확인한다. 없으면 짧게 묻는다.
2. 웹 화면을 `app-ui-patterns`대로 짠다. 시안이 있으면 `place-design-assets`를 탄다.
3. 앱 셸(안전영역, 하단 탭, 뒤로가기)을 웹에 넣고 Capacitor 설정만 네이티브에 둔다.
4. 끝은 웹 빌드가 아니라 iOS·Android 감싸기까지다. 스토어 업로드는 사용자가 올리면 그때 `store-release`.

완료: 웹이 앱 화면 원천이고, 두 플랫폼 셸이 같은 산출물을 가리킨다.
