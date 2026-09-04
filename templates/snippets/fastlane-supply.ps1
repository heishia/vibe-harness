# Fastlane supply — Play production
# <FASTLANE_BAT> <PACKAGE_ID> <PATH_TO_AAB> <PATH_TO_PLAY_JSON> 를 채운다.
# --track internal 을 쓰지 않는다.
# Windows 예: C:\Ruby32-x64\bin\fastlane.bat

$env:LANG = 'en_US.UTF-8'
$env:LC_ALL = 'en_US.UTF-8'
& '<FASTLANE_BAT>' supply `
  --package_name <PACKAGE_ID> `
  --track production `
  --aab '<PATH_TO_AAB>' `
  --json_key '<PATH_TO_PLAY_JSON>' `
  --skip_upload_metadata true `
  --skip_upload_images true `
  --skip_upload_screenshots true `
  --skip_upload_changelogs true `
  --release_status completed
