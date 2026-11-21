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

## 發布

```
npm run publish patch
```

`patch` 可換成 `minor` 或 `major`。會改 `projects/ui/package.json` 的版本，再打包發到 GitHub Packages。失敗會把版本改回去。

本機要有 `.npmrc`，這份檔案不進 git。換電腦時自己帶過去。

Storybook 網站推上 `develop` 就會部署。

## 更新

在要用這個套件的專案目錄執行。套件名稱是 `@dandy1103/ui`。

```
npm install
npm install @dandy1103/ui@latest
```

`npm install` 照 `package.json` 裡的版本裝。`@latest` 裝目前最新版，並把版本寫回 `package.json`。之後再發新版不會自動跟著升，要再執行一次。

裝完重開 dev server。
