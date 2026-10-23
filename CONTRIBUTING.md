# Contributing to PicShot

Bug reports, thoughtful feature proposals, and pull requests are welcome.

## Report a bug

Before opening a report, check existing [issues](https://github.com/M003aad/PicShot/issues). Use the [bug report template](./.github/ISSUE_TEMPLATE/bug_report.md), and include the browser version, steps to reproduce, expected behavior, and actual behavior. Do not post secrets or private data.

## Propose a feature

Check for a similar open or closed issue, then use the [feature request template](./.github/ISSUE_TEMPLATE/feature_request.md). Describe the user need and the expected behavior.

## Local development

1. Clone the repository and open it in your editor:

   ```sh
   git clone https://github.com/M003aad/PicShot.git
   cd PicShot
   ```

2. No package installation or build is needed to run the extension. Load the repository directory in Chrome from `chrome://extensions/` with **Developer mode** enabled and **Load unpacked**.
3. After changing extension files, reload the extension and test both popup actions on an ordinary web page.
4. To run the configured lint check locally, install Node.js and npm, then install ESLint 9 globally with `npm install --global eslint@9` and run `eslint .`.
5. To validate the manifest and extension files loaded or injected by the background script, run:

   ```sh
   node -e "const fs=require('node:fs'); const m=JSON.parse(fs.readFileSync('manifest.json','utf8')); const paths=[m.background.service_worker,m.action.default_popup,...Object.values(m.icons),'fullscreen.js','content.js']; for (const p of paths) if (!fs.existsSync(p)) throw new Error('Missing extension file: '+p); if (m.manifest_version!==3) throw new Error('Expected Manifest V3'); console.log('Manifest and extension files are valid.');"
   ```

There are no environment variables or build scripts in the current project.

## Pull requests

- Keep changes focused and explain the user-visible effect.
- Update documentation when behavior changes.
- Test the affected functionality in Chrome and run the lint and manifest checks when practical.
- Complete the [pull-request template](./.github/PULL_REQUEST_TEMPLATE.md).
