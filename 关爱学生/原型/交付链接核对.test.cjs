const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { load, root } = require("./原型测试工具-V2.0-20261008.cjs");
async function test() {
  const { document, errors } = await load("index.html");
  assert.deepEqual(errors, []);
  const links = [...document.querySelectorAll("a[href]")];
  assert.equal(links.length, 19, "六端两入口、家长只读入口及六份需求入口");
  const documents = [];
  for (const link of links) {
    const ref = link.getAttribute("href").split("#")[0];
    const target = path.resolve(root, ref);
    assert.ok(fs.existsSync(target), "入口失效：" + ref);
    if (target.endsWith(".md")) documents.push(target);
  }
  for (const file of documents) {
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(/\[[^\]\n]+\]\(([^)\n]+)\)/g)) {
      const ref = match[1];
      if (/^(?:https?:|#|mailto:)/.test(ref)) continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), ref.split("#")[0])), path.basename(file) + "文档链接失效：" + ref);
    }
  }
  console.log("PASS 两版七端统一入口及最新需求文档相对链接");
}
test().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
