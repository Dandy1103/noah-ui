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
- `noah-select` 接收 `value` 和 `options`。每個選項有 `value` 與 `label`，選到之後用 `(valueChange)` 回傳。

## 發布

```
npm run publish patch
```

`patch` 可換成 `minor` 或 `major`。會改 `projects/ui/package.json` 的版本，再打包發到 GitHub Packages。失敗會把版本改回去。

本機要有 `.npmrc`，這份檔案不進 git。金鑰永久放在 Windows 使用者環境變數，做法看 [GitHub Packages 金鑰](docs/github-packages.md)。

Storybook 網站推上 `develop` 就會部署。

## 更新

在要用這個套件的專案目錄執行。套件名稱是 `@dandy1103/ui`。

```
npm install
npm install @dandy1103/ui@latest
```

`npm install` 照 `package.json` 裡的版本裝。`@latest` 裝目前最新版，並把版本寫回 `package.json`。之後再發新版不會自動跟著升，要再執行一次。

裝完重開 dev server。
