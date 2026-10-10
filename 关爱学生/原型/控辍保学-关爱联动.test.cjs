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
  first
    .closest("[data-warning-index]")
    .querySelector('[data-warning-action="detail"]')
    .click();
  d.querySelector('[data-warning-tab="care"]').click();
  assert.equal(
    d.querySelector("[data-warning-case-info]"),
    null,
    "未建案不显示个案卡",
  );
  first.click();
  assert.equal(w.location.hash, "#sc-case-v3-warning-setup");
  const form = d.getElementById("sc-case-v3-warning-setup");
  assert.deepEqual(
    [...form.querySelectorAll(".cv3-field > label")].map((x) =>
      x.textContent.replace("*", ""),
    ),
    ["关爱来源", "关联控辍保学", "关爱类型", "关爱原因"],
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
  const automatic = d.querySelector("#cv3-picker-overlay input:disabled");
  assert.ok(automatic && automatic.checked, "当前预警自动关联且不可取消");
  const automaticText = automatic.value;
  assert.equal(
    d.querySelector(".cv3-picker-hint").textContent,
    "当前预警自动关联。其他预警可作为历史参考；每个预警记录的关爱内容都单独保存",
  );
  assert.ok(
    d.querySelectorAll("#cv3-picker-overlay input").length > 5,
    "示例应超过可见五行",
  );
  d.querySelector("#cv3-picker-overlay [data-cancel]").click();
  assert.equal(
    form.querySelector("[data-warning-association-summary]").textContent,
    "已选1条关联信息",
    "取消不得保存临时选择",
  );
  const selected = [automaticText].concat(
    choose(w, form.querySelector("[data-warning-association]"), [3, 1]),
  );
  assert.equal(
    form.querySelector("[data-warning-association-summary]").textContent,
    "已选3条关联信息",
  );
  form.querySelector("textarea").value = "需要了解缺勤原因并持续关爱";
  form.querySelector(".cv3-bottom button").click();
  assert.equal(w.location.hash, "#sc-case-v3-record");
  assert.equal(w.CARE_CASE_V3_API.cases.length, c0, "下一步不得提前创建空个案");
  const record = d.getElementById("sc-case-v3-record");
  assert.deepEqual(
    [...record.querySelectorAll(".cv3-card:first-child .cv3-kv .k")].map(
      (x) => x.textContent,
    ),
    ["关爱来源", "关联信息", "关爱类型", "关爱原因"],
    "第二步只读摘要顺序与第一步一致",
  );
  record.querySelector("[data-teacher-evidence]").click();
  assert.ok(d.querySelector(".care-evidence-mask"));
  d.querySelector(".care-evidence-close").click();
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
  assert.equal(record.querySelector("[data-next-wrap]").style.display, "flex");
  assert.equal(
    record
      .querySelector("[data-care-next]")
      .nextElementSibling.textContent.trim(),
    "请选择日期",
  );
  assert.equal(
    record.querySelector("[data-next-wrap] .req"),
    null,
    "日期不应标必填",
  );
  record.querySelector("[data-care-next]").value = "";
  record.querySelector(".cv3-bottom button").click();
  assert.equal(w.location.hash, "#sc-detail");
  const warning = w.wlData[1],
    created = w.CARE_CASE_V3_API.findForWarning(warning);
  assert.ok(created);
  assert.equal(created.records.length, 1);
  assert.equal(created.createdAt, today);
  assert.equal(created.records[0].next, "", "第二版需要跟进但无日期允许保存");
  const infoCard = d.querySelector("[data-warning-case-info]");
  assert.ok(infoCard);
  assert.deepEqual(
    [...infoCard.querySelectorAll(".k")].map((x) => x.textContent),
    ["创建日期", "关爱来源", "关联信息", "关爱类型", "关爱原因"],
  );
  assert.equal(
    infoCard.parentElement.querySelector(".card"),
    infoCard,
    "个案卡在所有关爱内容之前",
  );
  infoCard.querySelector("[data-warning-case-evidence]").click();
  assert.ok(d.querySelector(".care-evidence-mask"));
  d.querySelector(".care-evidence-close").click();
  const nextDateRow = [
    ...d.querySelectorAll('[data-warning-pane="care"] .kv'),
  ].find((row) => row.querySelector(".k").textContent === "下次跟进日期");
  assert.equal(nextDateRow.querySelector(".v").textContent, "--");
  assert.deepEqual(
    Array.from(created.warningIds),
    [warning.id],
    "归案仅包含入口预警",
  );
  assert.ok(created.referenceWarningIds.length, "其他勾选项保存为参考线索");
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
  assert.equal(
    d.querySelectorAll("[data-warning-case-info]").length,
    1,
    "多次关爱不重复生成个案卡",
  );
  const savedRecords = created.records.splice(0);
  w.go("sc-list");
  d.querySelector(
    '[data-warning-index="1"] [data-warning-action="detail"]',
  ).click();
  d.querySelector('[data-warning-tab="care"]').click();
  assert.ok(
    d.querySelector("[data-warning-case-info]"),
    "已建案零内容仍显示个案卡",
  );
  assert.equal(
    d.querySelectorAll('[data-warning-pane="care"] .care-warning-record')
      .length,
    0,
  );
  created.records.push(...savedRecords);
  assert.equal(created.createdAt, today);
  w.go("sc-list");
  assert.equal(
    d.querySelector('[data-warning-index="1"] [data-warning-action="care"]')
      .disabled,
    true,
    "完结不可继续",
  );
  const closedButton = d.querySelector(
    '[data-warning-index="1"] [data-warning-action="care"]',
  );
  assert.equal(closedButton.textContent, "继续关爱");
  assert.equal(closedButton.getAttribute("aria-disabled"), "true");
  assert.equal(w.getComputedStyle(closedButton).color, "rgb(154, 166, 181)");
  assert.equal(
    w.getComputedStyle(closedButton).backgroundColor,
    "rgb(241, 243, 246)",
  );
  const closedWrap = closedButton.closest("[data-warning-closed]");
  assert.ok(closedWrap && closedWrap.title.includes("已完结"));
  assert.match(
    d.getElementById(closedWrap.getAttribute("aria-describedby")).textContent,
    /不能继续关爱/,
  );
  const originalToast = w.toast,
    closedMessages = [];
  w.toast = (text) => closedMessages.push(text);
  closedButton.click();
  closedWrap.click();
  closedWrap.dispatchEvent(
    new w.KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
  );
  w.CARE_CASE_V3_API.openFromWarning(warning);
  record.querySelector(".cv3-bottom button").click();
  assert.equal(
    w.location.hash,
    "#sc-list",
    "禁用按钮、提示及API入口均不得跳转",
  );
  assert.equal(created.records.length, 2, "完结后不得通过旧表单重复提交");
  assert.ok(closedMessages.length >= 4);
  assert.ok(closedMessages.every((text) => /已完结.*不能继续关爱/.test(text)));
  w.toast = originalToast;
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
  const beforeOriginal = JSON.stringify(original);
  const oldRecords = original.records.map((x) => x.id);
  const extra = Object.assign({}, w.wlData[0], {
    id: "separate-extra-warning",
    reason: "新增独立预警",
    visits: [],
  });
  w.wlData.push(extra);
  const referenceOnly = Object.assign({}, extra, {
    id: "reference-only-warning",
    reason: "仅供参考的预警",
  });
  w.wlData.push(referenceOnly);
  api.openFromWarning(extra);
  choose(w, form.querySelector("[data-warning-type]"), [0]);
  form.querySelector("[data-warning-association]").click();
  assert.equal(
    d.querySelector("#cv3-picker-overlay .cv3-picker-title button"),
    null,
  );
  assert.equal(
    d.querySelectorAll("#cv3-picker-overlay .cv3-picker-actions button").length,
    2,
  );
  assert.equal(
    d.querySelector(".cv3-picker-hint").textContent,
    "当前预警自动关联。其他预警可作为历史参考；每个预警记录的关爱内容都单独保存",
  );
  const originalOption = [
    ...d.querySelectorAll("#cv3-picker-overlay input"),
  ].find(
    (input) =>
      input.value === w.wlData[0].reason + "（" + w.wlData[0].time + "）",
  );
  assert.ok(originalOption && !originalOption.disabled);
  originalOption.checked = true;
  originalOption.dispatchEvent(new w.Event("change", { bubbles: true }));
  const referenceOnlyOption = [
    ...d.querySelectorAll("#cv3-picker-overlay input"),
  ].find(
    (input) =>
      input.value === referenceOnly.reason + "（" + referenceOnly.time + "）",
  );
  referenceOnlyOption.checked = true;
  referenceOnlyOption.dispatchEvent(new w.Event("change", { bubbles: true }));
  d.querySelector("#cv3-picker-overlay .cv3-picker-confirm").click();
  form.querySelector("textarea").value = "同生不同预警单独保存测试";
  form.querySelector(".cv3-bottom button").click();
  change(w, record.querySelector("[data-care-method]"), "谈心谈话");
  record.querySelector("[data-care-result]").value = "新预警的独立关爱";
  change(w, record.querySelector("[data-care-follow]"), "需要");
  record.querySelector("[data-care-next]").value = today;
  record.querySelector(".cv3-bottom button").click();
  const independent = api.findForWarning(extra);
  assert.ok(independent, "新预警提交成功");
  assert.equal(
    api.findForWarning(w.wlData[0]),
    original,
    "参考预警仍指向自己的个案",
  );
  assert.notEqual(independent, original);
  assert.equal(independent.records.length, 1, "不吸收参考预警的旧记录");
  assert.ok(api.cases.includes(original), "不删除参考预警原个案");
  assert.equal(
    JSON.stringify(original),
    beforeOriginal,
    "原个案、材料、版本和记录均不改写",
  );
  assert.equal(independent.createdAt, today, "创建日期不继承参考个案");
  assert.deepEqual(Array.from(independent.warningIds), [extra.id]);
  assert.ok(independent.referenceWarningIds.includes(w.wlData[0].id));
  assert.equal(
    api.findForWarning(referenceOnly),
    null,
    "勾选参考预警不自动为其创建个案",
  );
  assert.ok(!independent.records.some((r) => oldRecords.includes(r.id)));
  w.go("sc-list");
  api.openFromWarning(extra);
  record.querySelector("[data-care-result]").value = "新预警的第二条独立关爱";
  change(w, record.querySelector("[data-care-method]"), "谈心谈话");
  change(w, record.querySelector("[data-care-follow]"), "需要");
  record.querySelector("[data-care-next]").value = today;
  record.querySelector(".cv3-bottom button").click();
  assert.equal(independent.records.length, 2);
  assert.equal(
    JSON.stringify(original),
    beforeOriginal,
    "继续关爱仍不改动参考个案",
  );
  assert.equal(
    d.querySelectorAll('[data-warning-pane="care"] .care-warning-record')
      .length,
    2,
    "当前预警只展示自己的记录",
  );
  api.openFromWarning(w.wlData[0]);
  assert.equal(w.location.hash, "#sc-case-v3-record");
  assert.match(record.textContent, /张小明/);
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
  w.cmOpen();
  const firstVersionForm = d.getElementById("sc-case-v3-add");
  change(w, firstVersionForm.querySelector("#cv3-grade"), "七年级（2025级）");
  change(w, firstVersionForm.querySelector("#cv3-class"), "1班");
  const newStudent = [
    ...firstVersionForm.querySelector("#cv3-student").options,
  ].find(
    (o) => o.value && !o.disabled && !api.cases.some((c) => c.name === o.value),
  );
  assert.ok(newStudent, "应有第一版新增示例学生");
  change(w, firstVersionForm.querySelector("#cv3-student"), newStudent.value);
  choose(w, firstVersionForm.querySelector('[data-picker="关爱类型"]'), [0]);
  choose(w, firstVersionForm.querySelector('[data-picker="关爱来源"]'), [0, 1]);
  const labels = [
    ...firstVersionForm.querySelectorAll(".cv3-field > label"),
  ].map((x) => x.textContent.replace("*", ""));
  assert.ok(labels.indexOf("关爱来源") < labels.indexOf("关联控辍保学"));
  assert.ok(labels.indexOf("关联心理测评") < labels.indexOf("关爱类型"));
  firstVersionForm.querySelector("#cv3-reason").value = "第一版选填日期验证";
  firstVersionForm.querySelector("#cv3-add-record").click();
  const firstFields = firstVersionForm.querySelector("[data-care-fields]");
  change(w, firstFields.querySelector("[data-care-method]"), "谈心谈话");
  firstFields.querySelector("[data-care-result]").value =
    "已开展关爱，暂不约定下次日期";
  change(w, firstFields.querySelector("[data-care-follow]"), "需要");
  assert.equal(
    firstFields
      .querySelector("[data-care-next]")
      .nextElementSibling.textContent.trim(),
    "请选择日期",
  );
  firstFields.querySelector("[data-care-next]").value = "";
  firstVersionForm.querySelector(".cv3-bottom button").click();
  assert.equal(w.location.hash, "#sc-care-menu");
  const firstCreated = api.cases.find((c) => c.name === newStudent.value);
  assert.equal(firstCreated.records[0].next, "");
  [...d.querySelectorAll("#cv3-list .cv3-case")]
    .find((card) => card.dataset.id === firstCreated.id)
    .click();
  const firstNextRow = [
    ...d.querySelectorAll("#sc-case-v3-detail .cv3-kv"),
  ].find((row) => row.querySelector(".k").textContent === "下次跟进日期");
  assert.equal(firstNextRow.querySelector(".v").textContent, "--");
  assert.deepEqual(
    [
      ...d.querySelectorAll(
        "#sc-case-v3-detail .cv3-card:first-child .cv3-kv .k",
      ),
    ].map((x) => x.textContent),
    ["创建日期", "关爱来源", "关联信息", "关爱类型", "关爱原因"],
  );
  console.log(
    "PASS 老师端：预警独立归案、参考不合并、记录与次数隔离、第一二版下次跟进日期选填与空值回显、第一版回归",
  );
}
test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
