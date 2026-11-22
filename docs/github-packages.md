# GitHub Packages 金鑰

`@dandy1103/ui` 放在 GitHub Packages。本機的 `.npmrc` 只寫變數名稱，金鑰放在 Windows 使用者環境變數 `NODE_AUTH_TOKEN`。這把金鑰可以永久留在這台電腦，Portal、HRM、UI 共用同一把。不要把金鑰寫進 Git、`.npmrc` 或文件。

## 產生金鑰

1. 打開 GitHub → **Settings → Developer settings → Personal access tokens → Tokens (classic)**。
2. 點 **Generate new token (classic)**。
3. Note 填 `noah-packages`。效期自己選。
4. 勾選 `repo`、`read:packages`、`write:packages`。`write:packages` 是發布 UI 用的；只裝套件的電腦也可以用同一把。
5. 點 **Generate token**，立刻複製。這頁關掉就看不到了。

已貼在終端機紀錄裡的金鑰，到同一個頁面按 **Delete** 作廢，再發一支新的。

## 永久寫入這台電腦

用設定畫面，避免把金鑰留在指令紀錄裡。

1. 開始功能表搜尋「環境變數」，打開 **編輯此帳戶的環境變數**。
2. 在上方的 **使用者變數** 點 **新增**。
3. 變數名稱填 `NODE_AUTH_TOKEN`，值貼上金鑰，按 **確定**。
4. 關掉所有終端機和 Cursor，再打開。已經開著的視窗讀不到新變數。

也可以用 PowerShell。命令提示字元沒有 `$env:`，在那邊貼不會寫進去。

```powershell
[System.Environment]::SetEnvironmentVariable('NODE_AUTH_TOKEN', '貼上金鑰', 'User')
```

執行完一樣要開新的終端機。

專案根目錄的 `.npmrc` 維持這兩行，不要改成金鑰本身。這份檔案不進 Git，換電腦時自己再建一份。

```
@dandy1103:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

新開終端機後，在任一專案目錄執行。有印出 GitHub 帳號就代表金鑰有效。

```powershell
npm whoami --registry https://npm.pkg.github.com
```

## 發布 UI

在 `noah-ui` 執行。`patch` 可換成 `minor` 或 `major`。

```powershell
npm run publish patch
```

成功會印出新版本。失敗會把 `projects/ui/package.json` 的版本改回去。Portal 和 HRM 不會自動跟著升，到該專案再執行 `npm install @dandy1103/ui@最新版本`。
