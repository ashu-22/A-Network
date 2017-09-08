
+let NodeGit = require(`nodegit`);
+let shell = require(`shelljs`);
+let pathToRepo = require(`path`).resolve(`.`);
+
+let getStatus = (repo) => repo.getStatus();
+
+let runDeploy = (remote) => {
+  shell.echo(`Running deployment now...`);
+
+  shell.exec(`npm run build`);
+
+  shell.echo(`${new Date}\n\n\n`).to(`last-built.txt`);
+  shell.exec(`git log -n 1 >> last-built.txt`);
+
+  shell.exec(`git branch -D gh-pages`);
+  shell.exec(`git checkout --orphan gh-pages`);
+
+  shell.rm(`.gitignore`);
+
+  shell.echo(`/*\n`).toEnd(`.gitignore`);
+  shell.echo(`!css\n`).toEnd(`.gitignore`);
+  shell.echo(`!images\n`).toEnd(`.gitignore`);
+  shell.echo(`!index.html\n`).toEnd(`.gitignore`);
+  shell.echo(`!last-built.txt\n`).toEnd(`.gitignore`);
+
+  shell.mv(`dest/*`, `./`);
+
+  shell.exec(`git reset`);
+  shell.exec(`git add .`);
+  shell.exec(`git commit -m 'Deployed via stage.js script'`);
+  shell.exec(`git push ${remote} gh-pages -f`);
+
+  shell.echo(`Finished deploying!`);
+};
+
+// Check that local repo is clean before deploying
+
+NodeGit.Repository.open(pathToRepo)
+  .then(getStatus)
+  .then(status => {
+    if (status.length) {
+      shell.echo(`Repo is dirty. Aborting deploy!`);
+      shell.exit(1);
+    } else {
+      // Check for remote argument
+      if (process.argv[2]) {
+        runDeploy(process.argv[2]);
+      } else {
+        shell.echo(`Missing target remote!`);
+        shell.exit(2);
+      }
+    }
+  });

+<svg width="481" height="122" viewBox="0 0 481 122" xmlns="http://www.w3.org/2000/svg">
+    <path d="M20.635 34.86c1.454 2.187 2.095 4.138 2.908 8.253 5.686-5.407 12.7-8.252 20.353-8.252 6.912 0 12.585 2.19 16.975 6.65 1.186 1.12 2.327 2.56 3.31 3.98 7.64-7.62 14.48-10.626 23.646-10.626 6.527 0 12.713 1.902 16.49 5.068 4.718 3.97 6.214 8.746 6.214 19.86v57.83H89.32V63.93c0-9.73-1.183-11.612-6.87-11.612-4.077 0-9.806 2.708-14.51 6.837v58.46H47.245v-52.92c0-10.148-1.51-12.53-7.582-12.53-4.034 0-9.62 2.034-14.324 6.185v59.266H3.984V60.89c0-11.745-.827-16.82-3.12-20.81l19.767-5.22M149.31 58.67c-1.497 4.303-2.294 10.016-2.294 18.124 0 9.35.982 16.375 2.764 20.49 1.967 4.45 6.885 6.672 11.088 6.672 9.465 0 13.513-8.254 13.513-27.474 0-10.97-1.465-18.132-4.39-21.796-2.092-2.68-5.5-4.276-9.432-4.276-5.23 0-9.478 3.164-11.245 8.26zm39.294-11.745c6.67 7.622 9.65 16.513 9.65 29.696 0 13.98-3.292 23.53-10.49 31.46-6.328 6.985-14.666 11.29-27.523 11.29-22.7 0-37.51-16.53-37.51-42.094 0-25.588 14.966-42.594 37.514-42.594 11.902 0 21.196 3.986 28.364 12.246zm79.944-10.648v14.617l-36.885 51.944h38.325l-5.23 14.778H203.3v-13.18l39.267-53.22h-35.99v-14.94h61.97m34.395-1.916v83.256h-21.85v-79.91l21.85-3.345zm2.565-20.477c0 7.318-5.972 13.16-13.526 13.16-7.31 0-13.322-5.842-13.322-13.16 0-7.302 6.214-13.196 13.695-13.196 7.328 0 13.158 5.894 13.158 13.196zm37.228 7.317v63.375c0 14 .17 15.882 1.483 18.103.826 1.444 2.593 2.222 4.418 2.222.784 0 1.254 0 2.437-.293l3.735 12.696c-3.735 1.423-8.31 2.216-13.04 2.216-9.323 0-16.82-4.28-19.415-11.098-1.64-4.136-1.995-6.69-1.995-18.283V29.43c0-10.634-.284-17.13-1.098-24.47L341.61.04c.783 4.444 1.125 9.69 1.125 21.16m45.323 0v63.375c0 14 .187 15.882 1.527 18.103.77 1.444 2.536 2.222 4.36 2.222.827 0 1.326 0 2.48-.293l3.72 12.696c-3.72 1.423-8.295 2.216-13.04 2.216-9.307 0-16.818-4.28-19.427-11.098-1.667-4.136-1.94-6.69-1.94-18.283V29.43c0-10.634-.325-17.13-1.167-24.47L386.89.04c.9 4.444 1.17 9.69 1.17 21.16m62.612 60.835c-15.108 0-20.41 2.68-20.41 12.41 0 6.33 4.133 10.62 9.677 10.62 4.06 0 8.164-2.068 11.4-5.552l.356-17.478h-1.028zm-28.32-42.733c8.124-3.346 15.11-4.762 22.805-4.762 14.053 0 23.66 5.07 26.95 14.133 1.085 3.333 1.584 5.874 1.484 14.618l-.524 27.31v1.446c0 8.733 1.483 12.08 7.87 16.675l-11.603 13.05c-5.103-2.083-9.65-5.75-11.773-9.865-1.61 1.604-3.42 3.16-5.075 4.283-4.048 2.86-9.962 4.457-16.804 4.457-18.6 0-28.703-9.233-28.703-25.406 0-19.096 13.57-28.003 40.134-28.003 1.597 0 3.108 0 4.918.18V64.1c0-9.072-1.81-12.092-9.848-12.092-6.93 0-15.15 3.317-24.105 9.21l-9.307-15.256c4.432-2.708 7.697-4.283 13.582-6.658z" fill="#FFF" fill-rule="evenodd"/>
+</svg>

source/index.pug
+doctype html
+html
+  head
+    meta(charset='utf-8')
+
+    meta(name='viewport', content='width=device-width, initial-scale=1')
+    meta(name='description', content='TODO')
+
+    meta(property='og:type', content='website')
+    meta(property='og:site_name', content='TODO')
+    meta(property='og:locale', content='en_US')
+    meta(property='og:url', content='TODO')
+    meta(property='og:image', content='TODO')
+    meta(property='og:title', content='TODO')
+    meta(property='og:description', content='TODO')
+
+    link(rel='stylesheet', href='css/main.compiled.css')
+    link(rel='stylesheet', href='//code.cdn.A-Network.net/fonts/fira.css')
+    link(rel='icon', href='images/favicon.png')
+
+    title A-Network
+  body
+    header.container
+      img(src='/images/A-Network-wordmark.svg', style='background: #ccc;')
+      h1 Mozilla Leadership Network
+      include:markdown markdown/example-partial.md
+
+    .container
+      .row
+        .col-xs-4 Column 1
+        .col-xs-4 Column 2
+        .col-xs-4 Column 3
+
+  footer
