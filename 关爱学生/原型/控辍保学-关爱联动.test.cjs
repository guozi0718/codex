const assert = require("node:assert/strict");
const { load, change, choose } = require("./原型测试工具-V2.0-20261008.cjs");
async function test() {
  const {
    window: w,
    document: d,
    errors,
  } = await load("老师端关爱管理-V2.9-20260929.html");
  assert.deepEqual(errors, [], "页面启动应无脚本异常");
  assert.equal(d.getElementById("sc-care-add"), null, "旧页面不应保留");
  assert.equal(
    d.getElementById("sc-care-menu").parentElement,
    d.querySelector(".phone"),
  );
  assert.equal(
    d.querySelector("#sc-list .back").disabled,
    true,
    "外部返回暂时禁用",
  );
  w.go("sc-list");
  const c0 = w.CARE_CASE_V3_API.cases.length;
  const first = d.querySelector(
    '[data-warning-index="1"] [data-warning-action="care"]',
  );
  assert.equal(first.textContent, "关爱");
  first.click();
  assert.equal(w.location.hash, "#sc-case-v3-warning-setup");
  const form = d.getElementById("sc-case-v3-warning-setup");
  assert.deepEqual(
    [...form.querySelectorAll(".cv3-field > label")].map((x) =>
      x.textContent.replace("*", ""),
    ),
    ["关爱类型", "关爱来源", "关联控辍保学", "关爱原因"],
  );
  assert.equal(
    form.querySelector(".cv3-warning-source").textContent,
    "控辍保学",
  );
  assert.equal(form.querySelector(".cv3-warning-source button"), null);
  form.querySelector(".cv3-bottom button").click();
  assert.equal(
    w.location.hash,
    "#sc-case-v3-warning-setup",
    "空表单不可进入下一步",
  );
  choose(w, form.querySelector("[data-warning-type]"), [0, 1]);
  form.querySelector("[data-warning-association]").click();
  assert.ok(
    d.querySelectorAll("#cv3-picker-overlay input").length > 5,
    "示例应超过可见五行",
  );
  d.querySelector("#cv3-picker-overlay [data-cancel]").click();
  assert.equal(
    form.querySelector("[data-warning-association-summary]").textContent,
    "请选择关联信息",
    "取消不得保存临时选择",
  );
  const selected = choose(
    w,
    form.querySelector("[data-warning-association]"),
    [3, 1],
  );
  assert.equal(
    form.querySelector("[data-warning-association-summary]").textContent,
    "已选2条关联信息",
  );
  form.querySelector("textarea").value = "需要了解缺勤原因并持续关爱";
  form.querySelector(".cv3-bottom button").click();
  assert.equal(w.location.hash, "#sc-case-v3-record");
  assert.equal(w.CARE_CASE_V3_API.cases.length, c0, "下一步不得提前创建空个案");
  const record = d.getElementById("sc-case-v3-record");
  assert.deepEqual(
    [...record.querySelectorAll("[data-care-fields] label")].map((x) =>
      x.textContent.replace("*", ""),
    ),
    [
      "关爱时间",
      "执行人员",
      "关爱方式",
      "关爱结果",
      "证明材料",
      "继续跟进",
      "下次跟进日期",
    ],
  );
  assert.equal(
    record.querySelector("[data-care-people]").value,
    "李老师",
    "应默认学生班主任",
  );
  const today = record.querySelector("[data-care-date]").value;
  assert.ok(today);
  record.querySelector("[data-care-date]").nextElementSibling.click();
  await new Promise((resolve) => w.setTimeout(resolve, 0));
  assert.equal(d.querySelectorAll(".cv3-picker-actions button").length, 2);
  d.querySelector("[data-day]:not([disabled])").click();
  assert.equal(
    record.querySelector("[data-care-date]").value,
    today,
    "日期选择应暂存",
  );
  d.querySelector("[data-picker-cancel]").click();
  assert.equal(
    record.querySelector("[data-care-date]").value,
    today,
    "日期取消不提交",
  );
  record.querySelector(".cv3-bottom button").click();
  assert.equal(w.CARE_CASE_V3_API.cases.length, c0, "无结果时不可提交");
  change(w, record.querySelector("[data-care-method]"), "谈心谈话");
  record.querySelector("[data-care-result]").value = "已沟通，继续了解返校情况";
  change(w, record.querySelector("[data-care-follow]"), "需要");
  record.querySelector("[data-care-next]").value = today;
  record.querySelector(".cv3-bottom button").click();
  assert.equal(w.location.hash, "#sc-detail");
  const warning = w.wlData[1],
    created = w.CARE_CASE_V3_API.findForWarning(warning);
  assert.ok(created);
  assert.equal(created.records.length, 1);
  assert.equal(created.createdAt, today);
  assert.deepEqual(
    Array.from(created.evidence["辍学预警"]),
    selected,
    "应保存所选明细及选择顺序",
  );
  assert.equal(
    w.CARE_CASE_V3_API.cases.length,
    c0 + 1,
    "允许同一学生不同预警各自建案",
  );
  assert.equal(
    d.querySelector('[data-warning-tab="visit"]').textContent,
    "劝返信息",
  );
  d.querySelector('[data-warning-tab="care"]').click();
  assert.equal(d.querySelector('[data-warning-pane="care"]').hidden, false);
  w.go("sc-list");
  const follow = d.querySelector(
    '[data-warning-index="1"] [data-warning-action="care"]',
  );
  assert.equal(follow.textContent, "继续关爱");
  follow.click();
  assert.equal(w.location.hash, "#sc-case-v3-record", "继续关爱直接填写记录");
  assert.equal(record.querySelector(".sub-hd b").textContent, "继续关爱");
  record.querySelector("[data-care-result]").value = "第二次关爱完成";
  change(w, record.querySelector("[data-care-method]"), "谈心谈话");
  change(w, record.querySelector("[data-care-follow]"), "不需要");
  record.querySelector(".cv3-bottom button").click();
  assert.equal(created.records.length, 2);
  assert.equal(created.createdAt, today);
  w.go("sc-list");
  assert.equal(
    d.querySelector('[data-warning-index="1"] [data-warning-action="care"]')
      .disabled,
    true,
    "完结不可继续",
  );
  w.go("sc-care-menu");
  d.querySelector("#cv3-new").click();
  assert.equal(w.location.hash, "#sc-case-v3-add", "第一版独立菜单仍可新增");
  const caseForm = d.getElementById("sc-case-v3-add");
  change(w, caseForm.querySelector("#cv3-grade"), "七年级（2025级）");
  change(w, caseForm.querySelector("#cv3-class"), "2班");
  change(w, caseForm.querySelector("#cv3-student"), "张小明");
  choose(w, caseForm.querySelector('[data-picker="关爱类型"]'), [0]);
  choose(w, caseForm.querySelector('[data-picker="关爱来源"]'), [2]);
  caseForm.querySelector("#cv3-reason").value = "重复个案校验";
  const countBefore = w.CARE_CASE_V3_API.cases.length;
  caseForm.querySelector(".cv3-bottom button").click();
  assert.equal(
    w.CARE_CASE_V3_API.cases.length,
    countBefore,
    "第一版仍禁止同生未完结重复建案",
  );
  assert.equal(w.location.hash, "#sc-case-v3-add");
  const api = w.CARE_CASE_V3_API;
  const original = api.findForWarning(w.wlData[0]);
  const oldRecords = original.records.map((x) => x.id);
  const extra = Object.assign({}, w.wlData[0], {
    id: "merge-extra-warning",
    reason: "新增预警",
    visits: [],
  });
  w.wlData.push(extra);
  api.openFromWarning(extra);
  choose(w, form.querySelector("[data-warning-type]"), [0]);
  form.querySelector("[data-warning-association]").click();
  await new Promise((resolve) => w.setTimeout(resolve, 0));
  assert.equal(
    d.querySelector("#cv3-picker-overlay .cv3-picker-title button"),
    null,
  );
  assert.equal(
    d.querySelectorAll("#cv3-picker-overlay .cv3-picker-actions button").length,
    2,
  );
  assert.match(
    d.querySelector(".cv3-picker-hint").textContent,
    /合并为一个个案/,
  );
  d.querySelector("#cv3-picker-overlay [data-cancel]").click();
  choose(w, form.querySelector("[data-warning-association]"), [0, 1]);
  form.querySelector("textarea").value = "多预警合并测试";
  form.querySelector(".cv3-bottom button").click();
  change(w, record.querySelector("[data-care-method]"), "谈心谈话");
  record.querySelector("[data-care-result]").value = "合并后新关爱";
  change(w, record.querySelector("[data-care-follow]"), "需要");
  record.querySelector("[data-care-next]").value = today;
  record.querySelector(".cv3-bottom button").click();
  const merged = api.findForWarning(extra);
  assert.ok(merged, "合并提交成功");
  assert.equal(api.findForWarning(w.wlData[0]), merged, "两个预警指向同一个案");
  assert.equal(merged.records.length, oldRecords.length + 1);
  oldRecords.forEach((id) =>
    assert.ok(merged.records.some((x) => x.id === id)),
  );
  assert.equal(api.cases.includes(original), false, "不保留重复活动个案");
  assert.equal(merged.createdAt, original.createdAt, "合并保留最早创建日期");
  const freshLi = Object.assign({}, warning, {
    id: "fresh-li-warning",
    reason: "新预警",
  });
  w.wlData.push(freshLi);
  api.openFromWarning(freshLi);
  form.querySelector("[data-warning-association]").click();
  assert.ok(
    ![...d.querySelectorAll("#cv3-picker-overlay input")].some(
      (x) => x.value === warning.reason + "（" + warning.time + "）",
    ),
    "已完结个案对应预警不应可选",
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS 老师端：手机容器、底部并列操作、日期取消、两步建案、多预警合并、历史保留、完结排除及第一版回归",
  );
}
test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
