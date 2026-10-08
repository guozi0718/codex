/* 本地 DOM 行为测试；不访问网络，不替代浏览器视觉验收。 */
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL, fileURLToPath } = require("node:url");
let jsdom;
try {
  jsdom = require("jsdom");
} catch {
  jsdom = require(
    path.resolve(
      __dirname,
      "../../90-临时产物/代码核对依赖-20261008/node_modules/jsdom",
    ),
  );
}
const { JSDOM, VirtualConsole, ResourceLoader } = jsdom;
const root = __dirname;
const pages = [
  "老师端关爱管理-V2.9-20260929.html",
  "学校端关爱管理-V4.0-20260929.html",
  "区县端关爱管理-V1.7-20260929.html",
  "地市监管端关爱监管-V3.7-20260929.html",
  "省级监管端关爱监管-V1.6-20260929.html",
  "部级监管端关爱监管-V1.5-20260929.html",
  "家长端关爱查看-V1.0-20260929.html",
];
class LocalResources extends ResourceLoader {
  fetch(url) {
    if (!url.startsWith("file:")) return null;
    const file = fileURLToPath(url);
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) return null;
    return Promise.resolve(fs.readFileSync(file));
  }
}
async function load(name) {
  const errors = [],
    messages = [],
    console = new VirtualConsole();
  console.on("jsdomError", (error) => {
    if (!/parse CSS stylesheet/.test(error.message)) errors.push(error.message);
  });
  const dom = new JSDOM(fs.readFileSync(path.join(root, name), "utf8"), {
    url: pathToFileURL(path.join(root, name)).href,
    runScripts: "dangerously",
    resources: new LocalResources(),
    virtualConsole: console,
    beforeParse(window) {
      window.alert = (message) => messages.push(String(message));
      window.confirm = () => true;
      window.scrollTo = () => {};
      window.lucide = { createIcons() {} };
      window.ResizeObserver = class {
        observe() {}
        disconnect() {}
      };
    },
  });
  await new Promise((resolve) =>
    dom.window.addEventListener("load", resolve, { once: true }),
  );
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    window: dom.window,
    document: dom.window.document,
    errors,
    messages,
  };
}
function change(window, input, value) {
  input.value = value;
  input.dispatchEvent(new window.Event("change", { bubbles: true }));
}
function choose(window, button, indexes) {
  button.click();
  const inputs = [
    ...window.document.querySelectorAll("#cv3-picker-overlay input"),
  ];
  for (const index of indexes) {
    inputs[index].checked = true;
    inputs[index].dispatchEvent(new window.Event("change", { bubbles: true }));
  }
  window.document
    .querySelector("#cv3-picker-overlay .cv3-picker-confirm")
    .click();
  return indexes.map((index) => inputs[index].value);
}
module.exports = { load, root, pages, change, choose };
