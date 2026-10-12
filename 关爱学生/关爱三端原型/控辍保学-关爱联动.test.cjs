const assert = require("node:assert/strict");
const { load, change, choose } = require("./原型测试工具-V2.0-20261008.cjs");
async function test() {
  const {
    window: w,
    document: d,
    errors,
  } = await load("老师端关爱管理-V2.9-20260929.html");
  const api = w.CARE_CASE_V3_API;
  const dictionary = w.CARE_DICTIONARY_V1;
  assert.equal(dictionary.typeLabels.length, 12);
  assert.equal(dictionary.methodLabels.length, 15);
  for (const item of api.cases) {
    assert.ok(
      item.types.every((value) => dictionary.typeLabels.includes(value)),
    );
    assert.ok(
      item.records.every((record) =>
        dictionary.methodLabels.includes(record.method),
      ),
    );
  }
  assert.deepEqual(errors, []);
  assert.equal(d.getElementById("sc-care-add"), null);
  assert.equal(
    d.getElementById("sc-care-menu").parentElement,
    d.querySelector(".phone"),
  );
  w.CARE_CURRENT_USER_NAME = "王老师";
  w.go("sc-list");
  const warning = w.wlData[1];
  d.querySelector(
    '[data-warning-index="1"] [data-warning-action="care"]',
  ).click();
  assert.equal(w.location.hash, "#sc-case-v3-warning-setup");
  const setup = d.getElementById("sc-case-v3-warning-setup");
  assert.equal(setup.querySelector(".sub-hd b").textContent, "确认关爱信息");
  assert.deepEqual(
    [...setup.querySelectorAll(".cv3-title")].map((x) => x.textContent),
    ["学生信息", "关爱信息"],
  );
  assert.deepEqual(
    [...setup.querySelectorAll(".cv3-field > label")].map((x) =>
      x.textContent.replace("*", ""),
    ),
    ["关爱来源", "关联控辍保学", "关爱类型", "关爱原因"],
  );
  setup.querySelector(".cv3-bottom button").click();
  assert.equal(w.location.hash, "#sc-case-v3-warning-setup");
  setup.querySelector("[data-warning-type]").click();
  assert.deepEqual(
    [...d.querySelectorAll("#cv3-picker-overlay input")].map((x) => x.value),
    Array.from(dictionary.typeLabels),
    "第二版类型选择器完整12项，不混入旧值",
  );
  d.querySelector("#cv3-picker-overlay [data-cancel]").click();
  choose(w, setup.querySelector("[data-warning-type]"), [0, 1]);
  setup.querySelector("[data-warning-association]").click();
  assert.ok(d.querySelector("#cv3-picker-overlay input:disabled").checked);
  assert.ok(d.querySelectorAll("#cv3-picker-overlay input").length > 5);
  assert.equal(
    d.querySelector(".cv3-picker-hint").textContent,
    "当前预警自动关联。其他预警可作为历史参考；每个预警记录的关爱内容都单独保存",
  );
  d.querySelector("#cv3-picker-overlay [data-cancel]").click();
  choose(w, setup.querySelector("[data-warning-association]"), [3, 1]);
  setup.querySelector("textarea").value = "了解缺勤原因";
  setup.querySelector(".cv3-bottom button").click();
  assert.equal(api.findForWarning(warning), null, "第一步不提前建案");
  const form = d.getElementById("sc-case-v3-record");
  function submit(result, follow = "不需要") {
    change(w, form.querySelector("[data-care-method]"), "学业帮扶与个性化辅导");
    change(w, form.querySelector("[data-care-follow]"), follow);
    form.querySelector("[data-care-result]").value = result;
    form.querySelector(".cv3-bottom button").click();
  }
  assert.equal(form.querySelector("[data-care-next]"), null);
  assert.equal(
    form.querySelector("[data-care-method]").value,
    "",
    "新建方式不默认代选措施",
  );
  assert.deepEqual(
    [...form.querySelector("[data-care-method]").options]
      .slice(1)
      .map((x) => x.value),
    Array.from(dictionary.methodLabels),
    "两版内容表单统一15项关爱方式",
  );
  choose(w, form.querySelector("[data-care-method]").nextElementSibling, [4]);
  assert.equal(
    form
      .querySelector("[data-care-method]")
      .nextElementSibling.querySelector(".cv3-select-value").textContent,
    dictionary.methodLabels[4],
    "长方式标签保存完整值",
  );
  assert.equal(
    form.querySelector("[data-care-method]").nextElementSibling.title,
    dictionary.methodLabels[4],
  );
  const methodSelect = form.querySelector("[data-care-method]");
  const obsoleteMethod = new w.Option("谈心谈话", "谈心谈话");
  methodSelect.add(obsoleteMethod);
  methodSelect.value = obsoleteMethod.value;
  form.querySelector("[data-care-result]").value = "保留草稿";
  form.querySelector(".cv3-bottom button").click();
  assert.equal(api.findForWarning(warning), null, "伪造旧方式不可提交建案");
  assert.equal(form.querySelector("[data-care-result]").value, "保留草稿");
  obsoleteMethod.remove();
  assert.deepEqual(
    [...form.querySelectorAll("[data-care-fields] .cv3-kv .k")].map(
      (x) => x.textContent,
    ),
    [],
  );
  submit("首次关爱", "不需要");
  const c = api.findForWarning(warning);
  assert.ok(c);
  assert.deepEqual(Array.from(c.warningIds), [warning.id]);
  assert.ok(c.referenceWarningIds.length);
  assert.equal(c.records[0].filledByName, "王老师");
  assert.match(c.records[0].filledAt, /T\d{2}:\d{2}:\d{2}Z$/);
  assert.equal(c.records[0].next, undefined);
  assert.ok(!d.querySelector("#sc-detail").textContent.includes("个案状态"));
  function show() {
    w.go("sc-list");
    d.querySelector(
      '[data-warning-index="1"] [data-warning-action="detail"]',
    ).click();
    d.querySelector('[data-warning-tab="care"]').click();
  }
  let actionScope = "#sc-detail";
  function more(id, action) {
    d.querySelector(
      actionScope + ' [data-record-id="' + id + '"] [data-record-more]',
    ).click();
    assert.deepEqual(
      [...d.querySelectorAll(".cv3-record-actions button")].map(
        (x) => x.textContent,
      ),
      ["编辑", "删除", "取消"],
    );
    d.querySelector(
      '.cv3-record-actions [data-action="' + action + '"]',
    ).click();
    if (action === "delete")
      assert.equal(
        d.querySelector("#cv3-confirm p").textContent,
        "确认删除该关爱内容吗？删除后不可恢复！",
      );
  }
  show();
  assert.equal(d.querySelectorAll("[data-warning-case-info]").length, 1);
  assert.deepEqual(
    [
      ...d
        .querySelector('[data-warning-pane="care"] [data-record-id]')
        .querySelectorAll(".k"),
    ].map((x) => x.textContent),
    [
      "关爱时间",
      "执行人员",
      "关爱方式",
      "关爱结果",
      "证明材料",
      "继续跟进",
      "填写人",
      "填写时间",
    ],
  );
  assert.match(
    d.querySelector("[data-record-id] .cv3-kv:last-child .v").textContent,
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
  );
  w.go("sc-list");
  const next = d.querySelector(
    '[data-warning-index="1"] [data-warning-action="care"]',
  );
  assert.equal(next.textContent, "继续关爱");
  assert.equal(next.disabled, false, "不需要跟进不阻断继续关爱");
  w.CARE_CURRENT_PERMISSIONS = { care: false };
  next.click();
  assert.equal(w.location.hash, "#sc-list", "关爱权限关闭应阻止直接表单入口");
  w.CARE_CURRENT_PERMISSIONS = { care: true };
  next.click();
  submit("再次关爱");
  assert.equal(c.records.length, 2);
  form.querySelector(".cv3-bottom button").click();
  assert.equal(c.records.length, 2, "已完成表单不接受重复提交");
  const first = c.records[0],
    second = c.records[1];
  first.filledAt = "2026-09-30T09:31:01+08:00";
  second.filledAt = "2026-09-30T09:31:02+08:00";
  first.date = "2026-09-01";
  second.date = "2026-09-30";
  show();
  assert.equal(
    d.querySelector('[data-warning-pane="care"] [data-record-id]').dataset
      .recordId,
    String(second.id),
    "关爱日期优先于提交时间",
  );
  first.date = second.date;
  show();
  assert.equal(
    d.querySelector('[data-warning-pane="care"] [data-record-id]').dataset
      .recordId,
    String(second.id),
    "同日再按创建时间到秒排序",
  );
  const createdTime = first.filledAt;
  const original = first.originalFilledAt;
  more(first.id, "edit");
  first.revision++;
  submit("过期编辑不应覆盖");
  assert.equal(first.result, "首次关爱", "过期编辑必须拒绝覆盖");
  show();
  more(first.id, "edit");
  for (const field of ["date", "people", "method", "follow"])
    assert.equal(
      form.querySelector("[data-care-" + field + "]").disabled,
      false,
    );
  change(w, form.querySelector("[data-care-date]"), "2026-10-01");
  change(w, form.querySelector("[data-care-people]"), "陈老师");
  submit("修改早期记录");
  assert.equal(first.people, "陈老师");
  assert.equal(first.filledByName, "王老师", "填写人不等于执行人员");
  assert.equal(first.originalFilledAt, original);
  assert.equal(first.filledAt, createdTime, "编辑不改原始创建时间");
  assert.ok(first.editedAt, "修改时间单独审计");
  assert.ok(
    w.CARE_OPERATION_ARCHIVE.some(
      (x) =>
        x.operation === "edit-record" &&
        x.before.result === "首次关爱" &&
        x.after.result === "修改早期记录",
    ),
  );
  assert.equal(
    d.querySelector('[data-warning-pane="care"] [data-record-id]').dataset
      .recordId,
    String(first.id),
  );
  assert.match(
    d.querySelector('[data-warning-pane="care"] [data-record-id] b')
      .textContent,
    /第2次关爱/,
  );
  second.filledById = "another-teacher";
  show();
  assert.equal(
    d.querySelector(
      '#sc-detail [data-record-id="' + second.id + '"] [data-record-more]',
    ),
    null,
  );
  w.CARE_CURRENT_USER_ID = "another-teacher";
  w.CARE_CURRENT_USER_NAME = "李老师";
  show();
  more(second.id, "delete");
  assert.ok(d.getElementById("cv3-confirm"));
  d.querySelector("#cv3-confirm [data-close]").click();
  assert.equal(c.records.length, 2, "二次确认取消保留内容");
  more(second.id, "delete");
  second.revision++;
  d.querySelector("#cv3-confirm [data-yes]").click();
  assert.equal(c.records.length, 2, "二次确认期间记录更新必须阻止过期删除");
  more(second.id, "delete");
  d.querySelector("#cv3-confirm [data-yes]").click();
  assert.equal(c.records.length, 1, "可删除本人非最新内容");
  assert.ok(
    w.CARE_OPERATION_ARCHIVE.some(
      (x) => x.operation === "delete-record" && x.operatorName === "李老师",
    ),
  );
  w.CARE_CURRENT_USER_ID = "teacher-wang-demo";
  w.CARE_CURRENT_USER_NAME = "王老师";
  show();
  more(first.id, "delete");
  d.querySelector("#cv3-confirm [data-yes]").click();
  assert.equal(
    api.findForWarning(warning),
    null,
    "最后一条删除自动移除该预警个案",
  );
  assert.equal(d.querySelector("[data-warning-case-info]"), null);
  assert.ok(
    w.CARE_OPERATION_ARCHIVE.some(
      (x) => x.operation === "auto-remove-warning-case",
    ),
  );
  w.go("sc-list");
  const reset = d.querySelector(
    '[data-warning-index="1"] [data-warning-action="care"]',
  );
  assert.equal(reset.textContent, "关爱");
  reset.click();
  assert.equal(w.location.hash, "#sc-case-v3-warning-setup");
  assert.equal(
    setup.querySelector("textarea").value,
    "",
    "重新建案不沿用已删除信息",
  );
  assert.ok(api.findForWarning(w.wlData[0]), "参考预警个案不受影响");
  const demo = d.querySelector(".care-demo-switch select");
  change(w, demo, "readonly");
  assert.equal(w.CARE_CURRENT_USER_NAME, "赵老师");
  w.go("sc-care-menu");
  assert.equal(d.getElementById("cv3-new").disabled, true);
  assert.ok(
    [...d.querySelectorAll("[data-act=delete]")].every((x) => x.disabled),
  );
  w.cmOpen();
  assert.equal(w.location.hash, "#sc-care-menu", "无权限不能绕过新增入口");
  w.go("sc-list");
  assert.ok(
    [...d.querySelectorAll('[data-warning-action="care"]')].every(
      (x) => x.disabled,
    ),
  );
  api.openFromWarning(warning);
  assert.equal(w.location.hash, "#sc-list", "直接调用也重验权限");
  change(w, demo, "wang");
  w.CARE_AUTHORIZED_STUDENT_IDS = [];
  api.openFromWarning(warning);
  assert.equal(w.location.hash, "#sc-list", "权限打开但学生范围为空仍不能进入");
  w.CARE_AUTHORIZED_STUDENT_IDS = ["student-scope-demo"];
  const scopedWarning = Object.assign({}, warning, {
    studentId: "student-scope-demo",
  });
  api.openFromWarning(scopedWarning);
  assert.equal(
    w.location.hash,
    "#sc-case-v3-warning-setup",
    "优先校验学生ID，而非显示姓名",
  );
  delete w.CARE_AUTHORIZED_STUDENT_IDS;
  // 第一版独立个案：空内容后才允许删除；删除内容不自动删除个案。
  const v1 = api.cases.find(
    (x) => !(x.warningIds || []).length && x.records.length,
  );
  assert.ok(v1);
  v1.records.forEach((r) => (r.filledById = "teacher-wang-demo"));
  w.go("sc-care-menu");
  function v1Card() {
    return d.querySelector('.cv3-case[data-id="' + v1.id + '"]');
  }
  v1Card().querySelector("[data-act=delete]").click();
  assert.equal(d.getElementById("cv3-confirm"), null, "有关爱内容不能删个案");
  v1Card().click();
  actionScope = "#sc-case-v3-detail";
  while (v1.records.length) {
    more(v1.records[0].id, "delete");
    d.querySelector("#cv3-confirm [data-yes]").click();
  }
  assert.ok(api.cases.includes(v1), "第一版保留空个案");
  w.go("sc-care-menu");
  v1Card().querySelector("[data-act=delete]").click();
  assert.equal(
    d.querySelector("#cv3-confirm p").textContent,
    "确认删除该关爱个案？删除后不可恢复！",
  );
  v1.revision++;
  d.querySelector("#cv3-confirm [data-yes]").click();
  assert.ok(api.cases.includes(v1), "个案版本变化不能按过期确认删除");
  v1Card().querySelector("[data-act=delete]").click();
  d.querySelector("#cv3-confirm [data-yes]").click();
  assert.ok(!api.cases.includes(v1));
  assert.ok(
    w.CARE_OPERATION_ARCHIVE.every(
      (x) => x.operatedAt && x.operatorId && x.operatorName && x.operatorRole,
    ),
  );
  w.cmOpen();
  const v1Form = d.getElementById("sc-case-v3-add");
  v1Form.querySelector('[data-picker="关爱类型"]').click();
  assert.deepEqual(
    [...d.querySelectorAll("#cv3-picker-overlay input")].map((x) => x.value),
    Array.from(dictionary.typeLabels),
    "第一版类型选择器完整12项",
  );
  d.querySelector("#cv3-picker-overlay [data-picker-cancel]").click();
  d.getElementById("cv3-add-record").click();
  assert.deepEqual(
    [...v1Form.querySelector("[data-care-method]").options]
      .slice(1)
      .map((x) => x.value),
    Array.from(dictionary.methodLabels),
    "第一版方式选择器完整15项",
  );
  assert.equal(v1Form.querySelector("[data-care-method]").value, "");
  assert.deepEqual(errors, []);
  console.log(
    "PASS 两版老师端：字段/秒级排序/本人全字段编辑/快照/二次删除/空个案分支",
  );
}
test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
