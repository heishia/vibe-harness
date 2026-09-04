# iOS TestFlight — 로컬 Xcode가 없어도 중단하지 않는다.
# 웹 sync + 빌드번호 상향 + push 후에 실행.
# <ios-testflight.yml> 을 워크플로 파일명으로 바꾼다.

gh workflow run <ios-testflight.yml> -f upload_testflight=true
gh run list --workflow <ios-testflight.yml> --limit 3
