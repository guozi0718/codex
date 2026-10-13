const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { load, root } = require("./原型测试工具-V2.0-20261008.cjs");
async function test() {
  const context = { window: {} };
  vm.runInNewContext(
    fs.readFileSync(path.join(root, "关爱字典-共享-V1.0-20261010.js"), "utf8"),
    context,
  );
  const dictionary = context.window.CARE_DICTIONARY_V1;
  assert.equal(dictionary.types.length, 12);
  assert.equal(dictionary.methods.length, 15);
  const { document, errors } = await load("index.html");
  assert.deepEqual(errors, []);
  const links = [...document.querySelectorAll("a[href]")];
  assert.equal(links.length, 19, "六端两入口、总览及六份独立PRD");
  assert.ok(
    !document.body.textContent.includes("家长端"),
    "当前入口不得保留家长端",
  );
  assert.ok(
    !fs.readdirSync(root).some((name) => name.startsWith("家长端")),
    "当前原型不得保留家长端文件",
  );
  const documents = [];
  for (const link of links) {
    const ref = link.getAttribute("href").split("#")[0];
    const target = path.resolve(root, ref);
    assert.ok(fs.existsSync(target), "入口失效：" + ref);
    if (target.endsWith(".md")) documents.push(target);
  }
  for (const file of documents) {
    assert.ok(
      !fs
        .readdirSync(path.dirname(file))
        .some((name) => name.startsWith("家长端")),
      "正式文档不得保留家长端专属 PRD",
    );
    const source = fs.readFileSync(file, "utf8");
    if (/^第[一二]版-/.test(path.basename(file))) {
      assert.ok(source.length > 5000, "六份PRD必须完整独立");
      for (const entry of [...dictionary.types, ...dictionary.methods]) {
        assert.ok(
          source.includes(entry.id) && source.includes(entry.label),
          path.basename(file) + "缺少完整枚举：" + entry.label,
        );
      }
      assert.equal(
        new Set(source.match(/CARE_TYPE_\d{2}＝/g) || []).size,
        12,
        "每份PRD单独完整列12项类型",
      );
      assert.equal(
        new Set(source.match(/CARE_METHOD_\d{2}＝/g) || []).size,
        15,
        "每份PRD单独完整列15项方式",
      );
      if (path.basename(file).startsWith("第一版")) {
        assert.ok(
          !/^\| 当前预警关联为空/m.test(source),
          "独立关爱菜单不得强制关联入口预警",
        );
        assert.ok(
          !/^\| 首次建案时被并发创建/m.test(source),
          "独立关爱菜单不套用单预警唯一建案校验",
        );
      } else {
        assert.ok(
          !/^\| 学生联动未完成/m.test(source) &&
            !/^\| 关爱来源未选/m.test(source),
          "控辍关爱学生自动带入且来源锁定，不套用自由选择校验",
        );
        assert.ok(
          source.includes("当前预警自动关联。其他预警可作为历史参考；每个预警记录的关爱内容都单独保存") &&
            source.includes("关爱次数") &&
            source.includes("原预警"),
          "控辍业务必须说明单预警独立关爱、次数及原预警不被替换",
        );
      }
      assert.ok(
        source.includes("36ac07c8e721808726e286311c76bca31201085b") &&
          source.includes("8fecf490895c595ca9219058a4b4ec8d7ca80c7b") &&
          source.includes("## 7. 提交前检查"),
        "每份PRD必须采用本次GitHub main最新模板",
      );
      for (const rule of [
        "填写人",
        "填写时间",
        "首次创建时间",
        "同日",
        "服务端",
        "关爱类型",
        "关爱方式",
      ])
        assert.ok(
          source.includes(rule),
          path.basename(file) + "缺少规则：" + rule,
        );
      if (path.basename(file).includes("老师端")) {
        for (const rule of [
          "确认删除该关爱内容吗？删除后不可恢复！",
          "暂无权限",
          "底部操作面板：编辑、删除、取消",
        ])
          assert.ok(
            source.includes(rule),
            path.basename(file) + "缺少老师端规则：" + rule,
          );
      } else {
        assert.ok(
          source.includes("本端只读") && source.includes("不提供新增、编辑或删除"),
          path.basename(file) + "缺少学校/监管只读边界",
        );
      }
      assert.ok(
        !/\]\([^\n)]*PRD[^\n)]*\.md(?:#.*?)?\)/.test(source),
        "独立PRD不能引用另一份文档省略细节",
      );
    }
    for (const match of source.matchAll(/\[[^\]\n]+\]\(([^)\n]+)\)/g)) {
      const ref = match[1];
      if (/^(?:https?:|#|mailto:)/.test(ref)) continue;
      assert.ok(
        fs.existsSync(path.resolve(path.dirname(file), ref.split("#")[0])),
        path.basename(file) + "文档链接失效：" + ref,
      );
    }
  }
  assert.equal(
    documents.filter((file) => /^第[一二]版-/.test(path.basename(file))).length,
    6,
  );
  console.log("PASS 两版六端统一入口及最新需求文档相对链接");
}
test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
