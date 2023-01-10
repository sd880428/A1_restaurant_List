# 餐廳清單
![login](https://github.com/sd880428/restaurant_List_ACP/blob/master/public/img/loginPage.jpg?raw=true)
![index](https://github.com/sd880428/restaurant_List_ACP/blob/master/public/img/indexPreview.jpg)
![show](https://raw.githubusercontent.com/sd880428/restaurant_List_ACP/master/public/img/Screenshot_3.jpg)
## 規格:
+ 程式編輯器: [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/ "Visual Studio Code") 
+ 使用框架: [express](https://www.npmjs.com/package/express)@4.16.4
+ 模板引擎: [express-handlebars](https://www.npmjs.com/package/express-handlebars)@3.0.0
+ [method-override](https://www.npmjs.com/package/method-override)@3.0.0
+ [mongoose](https://www.npmjs.com/package/mongoose)@5.9.7
+ [dotenv](https://www.npmjs.com/package/dotenv)@16.0.3
+ [bcryptjs](https://www.npmjs.com/package/bcryptjs)@2.4.3
+ [connect-flash](https://www.npmjs.com/package/connect-flash)@0.1.1
+ [express-session](https://www.npmjs.com/package/express-session)@1.17.3
+ [passport](https://www.npmjs.com/package/passport)@0.6.0
+ [passport-facebook](https://www.npmjs.com/package/passport-facebook)@3.0.0
+ [passport-local](https://www.npmjs.com/package/passport-local)@1.0.0
---
## 功能:
+ 使用者可以註冊帳號，資料包刮名字、email、密碼、確認密碼
+ 使用者也可以透過Facebook註冊帳號
+ 使用者必須登入才可使用餐廳清單
+ 使用者可以在首頁看到所有餐廳的
  - 圖片
  - 店名
  - 評分
  - 分類

+ 使用者可以用店名或分類搜尋餐廳
+ 使用者可以點選餐廳來瀏覽該家餐廳的詳細資訊
+ 餐廳詳細資訊有
  - 地址
  - 電話
  - 簡述
  - 圖片  
+ 使用者可以新增餐廳
+ 使用者可以刪除餐廳
+ 使用者可以編輯餐廳
+ 使用者可以搜尋餐廳
---
## 安裝與執行:
1. clone此專案
```
git clone https://github.com/sd880428/A1_restaurant_List.git
```

2. 使用終端機到此專案目錄下
```
cd ~/.../A1_restaurant_List/
```
3. 安裝套件
```
npm i
```
4. 自行加入.env 檔

5. 執行
```
npm run dev
```
如成功終端機會顯示:
![serverStarted](https://raw.githubusercontent.com/sd880428/A1_restaurant_List/master/public/img/Screenshot_1.jpg)

6. 開啟瀏覽器進入 http://localhost:3000 即可

