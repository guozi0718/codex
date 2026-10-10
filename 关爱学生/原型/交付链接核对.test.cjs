const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { load, root } = require("./原型测试工具-V2.0-20261008.cjs");
async function test() {
  const { document, errors } = await load("index.html");
  assert.deepEqual(errors, []);
  const links = [...document.querySelectorAll("a[href]")];
  assert.equal(links.length, 17, "六端两入口及五份需求入口");
  assert.ok(!document.body.textContent.includes("家长端"), "当前入口不得保留家长端");
  assert.ok(!fs.readdirSync(root).some(name => name.startsWith("家长端")), "当前原型不得保留家长端文件");
  const documents = [];
  for (const link of links) {
    const ref = link.getAttribute("href").split("#")[0];
    const target = path.resolve(root, ref);
    assert.ok(fs.existsSync(target), "入口失效：" + ref);
    if (target.endsWith(".md")) documents.push(target);
  }
  for (const file of documents) {
    assert.ok(!fs.readdirSync(path.dirname(file)).some(name => name.startsWith("家长端")), "正式文档不得保留家长端专属 PRD");
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(/\[[^\]\n]+\]\(([^)\n]+)\)/g)) {
      const ref = match[1];
      if (/^(?:https?:|#|mailto:)/.test(ref)) continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), ref.split("#")[0])), path.basename(file) + "文档链接失效：" + ref);
    }
  }
  console.log("PASS 两版六端统一入口及最新需求文档相对链接");
}
test().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
