# GoogleスプレッドシートをGASでデプロイし、JavaScriptで取得して表示する方法

## 1. GAS側

Googleスプレッドシートを開きデータを入力する。こんな感じ。

|Name          |Description                                                              |Price  |Available|
|--------------|:-----------------------------------------------------------------------:|:-----:|:-------:|
|Cofee Mug     |Mug	Minim aute aliqua est laboris incididunt exercitation qui ut.        |$9     |Yes      |
|Coffee Grinder|Consectetur consectetur tempor exercitation in minim qui exercitation in.|$54    |No       |

入力が終わったら、メニューの __Tools > Script editor__ をクリックして、GAS編集画面を開き、functionを2つ用意する。

### function 1: `getData`

スプレッドシートのデータを取得する。

```
function getData(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var rows = sheet.getDataRange().getValues();
  var keys = rows.splice(0, 1)[0];
  return rows.map(function(row) {
    var obj = {};
    row.map(function(item, index) {
      obj[String(keys[index])] = String(item);
    });
    return obj;
  });
}
```

[Class SpreadsheetApp](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)

### function 2: `doGet`

取得したデータを提供する。

```
function doGet() {
  var data = getData('Sheet1');
  return ContentService.createTextOutput(JSON.stringify(data, null, 2))
  .setMimeType(ContentService.MimeType.JSON);
}
```

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