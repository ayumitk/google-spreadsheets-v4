# google-spreadsheets-v4

## 1. GAS側

Googleスプレッドシートを開き、メニューの __Tools > Script editor__ をクリックして、GAS編集画面を開く。

functionを2つ用意する。

### function 1: `getData`

スプレッドシートのデータを取得する。

[Class SpreadsheetApp](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)

### function 2: `doGet`

取得したデータを提供する。

[Class ContentService](https://developers.google.com/apps-script/reference/content/content-service)

書き終わったら保存して、メニューから __Publish > Deploy as web app__ をクリック。

モーダルウィンドウが出るので、

- Execute the app as: __Me__
- Who has access to the app: __Anyone, even anonymous__

に設定する。

__web app URL__ をコピーしておく。  
コピペしたURLを直接ブラウザで見ると、JSONデータが表示されるはずです。

[公開したWeb app URL](https://script.googleusercontent.com/macros/echo?user_content_key=p9d-fcKtgrgEMAhgqpk4XDr_W285WtrkUqJKcVthvVyi9CkS_WOQfg9aTvCE6cKM3HoaxyxJDXlQkg2eub9dSvdhw26S9palm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnP2rgGKjcrtYBJ-2I5bI52mdRlJcHBjxQZIsd6IqZ_hMuco-216wQMcwxGkg_iFjBKOIp7sEUsJ2&lib=MMq1tVr6UW_E01TntsBOM9_RWp2vJfyNW)

※ もしGASのスクリプトを編集した場合、公開時に毎回 __Project version__ を `new` にしないと、編集後のスクリプトが反映されないので注意。

## 2. Javascript側

先ほどコピペしたURLを、JavaScriptでfetchします。

詳しくはGoogleの公式ドキュメントを参照してね。

[Method: spreadsheets.get](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get?apix_params=%7B%22spreadsheetId%22%3A%221Xlw2faMX2GEPSmfe7gthLgTP07I_EMleq_TX0y30ZGE%22%7D)