---
description: Deploy the project to Netlify via Drop or CLI (Detailed)
---

It seems the Netlify CLI is throwing an internal error during interactive setup. This often happens on Windows or when the auth token is in a weird state.

### Option 1: Manual Drag & Drop (Recommended)
This is the **fastest and most reliable method** right now.

1.  **Open Netlify Drop**: Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2.  **Open Explorer**: Press `Win + E` to open your file explorer.
3.  **Navigate**: Go to your project folder: `C:\Users\techn\Downloads\My Portfolio`.
4.  **Drag**: Drag the **`dist`** folder (make sure to drag the *folder itself*, not just the contents) onto the Netlify drop zone.
5.  **Done!**: Your site will be live instantly. You can then change the site name in "Site Settings" -> "Change site name".

### Option 2: Try CLI Again (Reset Auth)
If you prefer the command line, we can try to reset the cached login.

1.  **Logout**: Clear the cached credentials.
    ```bash
    npx netlify logout
    ```
2.  **Login**: Re-authenticate (this will open a browser).
    ```bash
    npx netlify login
    ```
3.  **Deploy (Create Site First)**: Instead of letting `deploy` prompt you, try creating the site explicitly if possible, or just run deploy again hoping the fresh login fixed the list issue.
    ```bash
    npx netlify deploy --prod --dir=dist
    ```

### Option 3: Use Surge (Alternative)
If Netlify CLI continues to fail, you can try `surge.sh` for instant deployment.
1.  Run: `npx surge dist`
2.  Enter an email/password (creates an account instantly).
3.  It will deploy to a `.surge.sh` domain.
