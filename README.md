# @dandy1103/ui

Noah 相關專案共用的 Angular 元件。套件在 GitHub Packages，Storybook 在 https://dandy1103.github.io/noah-ui/ 。

## 開發

在這個專案根目錄開元件。`header` 可換成 `navbar` 或其他名字。

```
npm run component header
```

會建立 `projects/ui/src/lib/header/`，選擇器是 `noah-header`，不會產生 spec。同一個指令會把元件寫進 `projects/ui/src/public-api.ts`，並在同一層放 `header.stories.ts`。一個元件一個資料夾，跟 button、field 一樣，不要再包 form、layout 這層。

```
npm run storybook
```

開 http://localhost:6006/ 。

## 元件介面

- `noah-page-heading` 接收 `title` 與 `breadcrumbs`。每個麵包屑有 `label`，需要連結時再提供 `href` 或 `route`。
- `noah-sidebar` 接收 `sections`，每個分組有 `title` 和 `links`。連結有 `label` 和 `path`。
- `noah-navbar` 接收 `groups` 和 `currentLabel`。目錄來源、網址和預覽狀態由各 App 處理。
- `noah-header` 接收 `homeHref`、`userName` 和 `actions`。表單送出可以用 `(submitted)` 接管。
- `noah-button` 接收 `message`、`variant`、`size`、`type` 和 `disabled`，沿用原生點擊和表單送出。`size` 可使用 `large`（桌機 160×40、手機 100×40）或 `small`（桌機 120×40、手機 80×40）。
  - 主要按鈕 `variant="primary"` 是預設樣式，用於搜尋、提交、確認等主要操作。
  - 次要按鈕 `variant="secondary"` 使用白底、淺灰框線和藍字，用於取消、返回、清除等輔助操作。
- `noah-input` 接收 `label`、`errorMessage`、`placeholder`、`value`、`type`、`disabled` 和 `invalid`。有 `errorMessage` 時，紅字顯示在輸入框底下。
- `noah-select` 接收 `label`、`errorMessage`、`placeholder`、`value` 和 `options`。未選取時預設顯示「請選擇」，可用 `placeholder` 自訂。有 `errorMessage` 時，下拉框會顯示紅框，錯誤訊息顯示在下方。每個選項有 `value` 與 `label`，選到之後用 `(valueChange)` 回傳。

## 發布

```
npm run publish patch
```

`patch` 可換成 `minor` 或 `major`。會改 `projects/ui/package.json` 的版本，再打包發到 GitHub Packages。失敗會把版本改回去。若原始碼版本落後於已發布套件，請先同步對應的原始碼與版本。

用 `npm run publish -- patch --dry-run` 可以先建置並預演發佈，原始碼版本會復原。

本機要有 `.npmrc`，這份檔案不進 git。金鑰永久放在 Windows 使用者環境變數，做法看 [GitHub Packages 金鑰](docs/github-packages.md)。

Storybook 網站推上 `master` 就會部署。

## 更新

在要用這個套件的專案目錄執行。套件名稱是 `@dandy1103/ui`。

```
npm install
npm install @dandy1103/ui@latest
```

`npm install` 照 `package.json` 裡的版本裝。`@latest` 裝目前最新版，並把版本寫回 `package.json`。之後再發新版不會自動跟著升，要再執行一次。

裝完重開 dev server。

## 本機即時開發

HRM 和 Shell 可直接編譯相鄰的 `noah-ui` 原始碼，不需要發版或重新安裝套件：

- HRM（會一併啟動 Shell）：在 `noah-hrm` 執行 `npm start`。若要測試已發布套件，執行 `npm run start:package`。
- 單獨啟動 Shell：在 `noah-shell` 執行 `npm run start:ui-local`。

此模式直接編譯 `../noah-ui/projects/ui/src`；修改 library 後 Angular 會自動重建並刷新，不用另外開 library watch。一般 `npm start` 和正式 build 仍使用已安裝的 npm 套件。HRM 啟動時若 Shell 已在 4200 執行，會沿用現有 Shell；要讓 Shell 也使用本機 library，先停止一般模式的 Shell，或先用 `npm run start:ui-local` 啟動 Shell。
