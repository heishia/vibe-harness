---
name: webview-external-flows
description: >-
  앱 웹뷰의 소셜 로그인, 딥링크, PG 결제를 붙인다. Use when the user says
  소셜 로그인, OAuth, 카카오 로그인, 네이버 로그인, Apple 로그인, 딥링크, 결제 연동, PG, 인앱 결제.
---

# 웹뷰 외부 플로우

`.cursor/rules/capacitor-webview.mdc`를 따른다. 앱 웹뷰 `https://localhost`를 OAuth redirect로 쓰지 않는다.

## 소셜 로그인

1. Redirect URI는 콘솔에 등록 가능한 **공개 https**다. 예: `https://<고객도메인>/auth/<provider>/callback`.
2. 앱에서도 그 공개 URI를 쓴다. 네이티브 origin을 redirect로 바꾸지 않는다.
3. 공급사·PG 도메인을 Capacitor `server.allowNavigation`에 넣는다.
4. 앱에서는 인앱 브라우저로 인가 URL을 연다. 콜백이 공개 URL로 돌아오면 인앱 브라우저를 닫고, `appUrlOpen`으로 앱 라우터와 URL을 맞춘다.
5. 앱에서 시작한 로그인은 state에 앱 표시를 넣고, 웹 콜백이 그 state를 보면 커스텀 스킴으로 앱에 되돌린다.
6. Apple처럼 POST 콜백이 있으면 SPA와 서버 프록시를 나눈다.

## 딥링크

7. https 앱링크와 커스텀 스킴을 둘 다 둔다.
8. `/.well-known/apple-app-site-association`, `/.well-known/assetlinks.json`은 **웹 서버**가 낸다. 패키지명·서명 지문은 자리 표시자로. 지문 값을 채팅에 반복하지 않는다.

## 결제

9. 앱/웹 진입이 다르면 서버가 채널을 보고 PG 폼을 고른다. 클라 헤더만으로 인가하지 않는다.
10. 안드로이드 인텐트 URL은 웹뷰가 가로채 외부 앱을 띄우고, 없으면 스토어.
11. 결제 완료 URL은 고객 도메인을 유지한 채 서버로 프록시한다.
12. 자체 결제는 승인 후에야 주문을 확정한다. 원가 이행이 있으면 `deferred-fulfillment`를 탄다.

완료: 콘솔 redirect·allowNavigation·콜백 라우트가 공개 도메인으로 맞고, 앱에서 로그인/결제가 앱으로 돌아온다.
