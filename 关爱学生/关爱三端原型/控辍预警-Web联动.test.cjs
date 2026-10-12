const assert = require("node:assert/strict");
const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm");
const { load, root, pages } = require("./原型测试工具-V2.0-20261008.cjs");
function checkTimeline(modal, selector) {
  assert.ok(!modal.textContent.includes("个案状态"));
  assert.ok(!modal.textContent.includes("下次跟进日期"));
  const cards = [...modal.querySelectorAll(selector)];
  assert.ok(cards.length);
  for (const card of cards) {
    const labels = [...card.querySelectorAll(".label")].map(
      (x) => x.textContent,
    );
    assert.deepEqual(labels.slice(-2), ["填写人", "填写时间"]);
    assert.match(
      card.querySelectorAll(".value")[labels.length - 1].textContent,
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
    );
  }
}
function checkFixedColumn(w, table) {
  assert.ok(table);
  const wrapper = table.parentElement;
  assert.equal(w.getComputedStyle(wrapper).overflow, "auto");
  assert.equal(w.getComputedStyle(wrapper).scrollbarWidth, "none");
  assert.equal(wrapper.tabIndex, 0);
  for (const row of table.rows) {
    const cell = row.cells[row.cells.length - 1];
    if (cell.colSpan > 1) continue;
    const style = w.getComputedStyle(cell);
    assert.equal(style.position, "sticky");
    assert.equal(style.right, "0px");
    assert.equal(style.textAlign, "center");
    assert.ok(Number(style.zIndex) >= 2);
  }
}
function checkWebOrder(w, records, open, modal, selector, first) {
  const original = {
    date: first.date,
    filledAt: first.filledAt,
    result: first.result,
  };
  const added = Object.assign({}, first, {
    id: "sort-probe",
    result: "sort-probe-B",
  });
  records.push(added);
  try {
    first.result = "sort-probe-A";
    first.date = "2026-10-05";
    added.date = "2026-10-06";
    first.filledAt = "2026-10-07T15:31:02+08:00";
    added.filledAt = "2026-10-07T15:31:01+08:00";
    function results() {
      open();
      return [...modal.querySelectorAll(selector)]
        .filter((card) => card.textContent.includes("sort-probe-"))
        .map((card) => (card.textContent.includes("sort-probe-A") ? "A" : "B"));
    }
    assert.deepEqual(
      results(),
      ["B", "A"],
      "Web实际关爱日期优先，不按补录创建时间",
    );
    first.date = added.date;
    assert.deepEqual(results(), ["A", "B"], "Web同日按创建时间到秒倒序");
    assert.equal(w.CARE_RECORD_V3.compare(first, added) > 0, true);
  } finally {
    Object.assign(first, original);
    records.splice(records.indexOf(added), 1);
    open();
  }
}
function checkEnumColumns(w, care, records, render) {
  const saved = records.map((r) => [r, r.caseSources, r.caseTypes]);
  const source = ["班主任发现", "任课教师反映", "学生主动反映"];
  const types = [
    "家庭经济困难学生",
    "农村留守儿童",
    "心理行为偏差 / 情绪困扰学生",
  ];
  records.forEach((r) => {
    r.caseSources = source;
    r.caseTypes = types;
  });
  render();
  const row = [...care.querySelectorAll("tbody tr")].find(
    (row) => parseInt(row.cells[8].textContent) > 0,
  );
  assert.ok(row, "选取有内容的个案，不依赖默认行序");
  [4, 6].forEach((index, n) => {
    const td = row.cells[index],
      full = (n ? types : source).join("、");
    assert.ok(
      care.querySelectorAll("th")[index].classList.contains("care-enum-cell"),
    );
    assert.equal(w.getComputedStyle(td).textAlign, "center");
    assert.equal(td.querySelector(".care-enum-value").title, full);
    assert.equal(
      td.textContent,
      Array.from(full).slice(0, 10).join("") + "...",
    );
  });
  saved.forEach(([r, sources, types]) => {
    if (sources === undefined) delete r.caseSources;
    else r.caseSources = sources;
    if (types === undefined) delete r.caseTypes;
    else r.caseTypes = types;
  });
  render();
}
async function test() {
  for (const name of pages) {
    const html = fs.readFileSync(path.join(root, name), "utf8");
    for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))
      new vm.Script(match[1], { filename: name });
    const { window: w, document: d, errors } = await load(name);
    assert.equal(w.CARE_DICTIONARY_V1.typeLabels.length, 12, name + "类型字典");
    assert.equal(
      w.CARE_DICTIONARY_V1.methodLabels.length,
      15,
      name + "方式字典",
    );
    assert.deepEqual(errors, [], name + "启动异常");
    const ids = [...d.querySelectorAll("[id]")].map((x) => x.id);
    assert.equal(ids.length, new Set(ids).size, name + "重复 ID");
    for (const el of d.querySelectorAll("script[src],link[href],a[href]")) {
      const ref = el.getAttribute("src") || el.getAttribute("href");
      if (ref.startsWith("./"))
        assert.ok(
          fs.existsSync(path.join(root, ref)),
          name + "引用缺失：" + ref,
        );
    }
    if (name.startsWith("老师")) continue;
    const list = d.getElementById("section-warning-list");
    if (!name.startsWith("学校")) {
      w.cityMenuGo("warning-district");
      const summary = d.getElementById("section-warning-district");
      const expected = name.startsWith("部级")
        ? "省份"
        : name.startsWith("省级")
          ? "地市"
          : name.startsWith("地市")
            ? "区县"
            : "学校";
      assert.equal(
        summary.querySelector("th").textContent,
        expected,
        name + "层级起点错误",
      );
      assert.deepEqual(
        [...summary.querySelectorAll("th")].slice(1).map((x) => x.textContent),
        ["预警记录数", "待处理数", "已处理数"],
        "必须保留原统计字段",
      );
      assert.equal(
        summary.querySelectorAll("th").length,
        4,
        "不得添加查看操作列",
      );
      const target = name.startsWith("部级")
        ? ["陕西省", "宝鸡市", "凤翔区", "凤翔区第一实验小学"]
        : name.startsWith("省级")
          ? ["宝鸡市", "凤翔区", "凤翔区第一实验小学"]
          : name.startsWith("地市")
            ? ["凤翔区", "凤翔区第一实验小学"]
            : ["凤翔区第一实验小学"];
      let schoolSummary;
      for (const value of target) {
        const button = [
          ...summary.querySelectorAll("[data-warning-drill]"),
        ].find((x) => x.textContent === value);
        assert.ok(button, "层级缺失 " + value);
        schoolSummary = [...button.closest("tr").cells]
          .slice(1)
          .map((cell) => Number(cell.textContent));
        button.click();
      }
      assert.equal(
        list.classList.contains("hidden"),
        false,
        "点击学校进入明细",
      );
      const visible = [...list.querySelectorAll("tbody tr")].filter(
        (x) => !x.hidden,
      );
      assert.ok(visible.length);
      assert.equal(visible.length, 10, "学校明细第一页10条示例");
      const schoolRows = [...list.querySelectorAll("tbody tr")].filter(
        (row) => row.dataset.warningSchool === "凤翔区第一实验小学",
      );
      assert.ok(schoolRows.length >= 12, "每校至少12条预警示例");
      assert.deepEqual(
        schoolSummary,
        [
          schoolRows.length,
          schoolRows.filter((row) => row.cells[6].textContent === "待处理")
            .length,
          schoolRows.filter((row) => row.cells[6].textContent === "已处理")
            .length,
        ],
        "预警汇总按处理状态统计，不以关爱个案有无代替",
      );
      const next = list.querySelector('[data-warning-page="2"]');
      assert.ok(next && !next.disabled);
      next.click();
      const secondPage = [...list.querySelectorAll("tbody tr")].filter(
        (row) => !row.hidden,
      );
      assert.equal(secondPage.length, schoolRows.length - 10);
      assert.ok(
        secondPage.every(
          (row) => row.dataset.warningSchool === "凤翔区第一实验小学",
        ),
      );
      assert.ok(
        secondPage.every((row) => !visible.includes(row)),
        "分页不能重复第一页",
      );
      list.querySelector('[data-warning-page="1"]').click();
      assert.ok(
        visible.every((x) => x.dataset.warningSchool === "凤翔区第一实验小学"),
        "不得混入其他学校",
      );
    } else w.switchPage("warning-list");
    assert.equal(
      list.querySelector('[data-dom-id^="btn-care-"]'),
      null,
      "旧查看关爱操作应移除",
    );
    const first = [...list.querySelectorAll("tbody tr")].find((x) => !x.hidden);
    assert.equal(first.cells.length, 11);
    assert.deepEqual(
      [...list.querySelectorAll("thead th")].map((th) => th.textContent.trim()),
      [
        "学生姓名",
        "年级",
        "班级",
        "预警类型",
        "预警原因",
        "预警时间",
        "处理状态",
        "处理结果",
        "最后处理时间",
        "关爱次数",
        "操作",
      ],
      "学校与监管原字段、顺序保持一致",
    );
    const ledger = first.closest("table");
    assert.equal(ledger.querySelectorAll("colgroup col").length, 11);
    assert.equal(w.getComputedStyle(ledger).tableLayout, "fixed");
    assert.equal(w.getComputedStyle(ledger.parentElement).overflow, "auto");
    checkFixedColumn(w, ledger);
    assert.equal(
      ledger.querySelector("colgroup col:last-child").style.width,
      "180px",
    );
    [...list.querySelectorAll("tbody tr")].forEach((row, rowIndex) => {
      assert.equal(row.cells.length, 11);
      if (rowIndex < 10)
        [...row.cells].forEach((cell, index) => {
          const align = [4, 7].includes(index) ? "left" : "center";
          assert.equal(
            w.getComputedStyle(cell).textAlign,
            align,
            name + "正文列对齐",
          );
          assert.equal(
            w.getComputedStyle(ledger.tHead.rows[0].cells[index]).textAlign,
            align,
            name + "表头对齐",
          );
        });
      [4, 7].forEach((index) => {
        const span = row.cells[index].querySelector(".care-warning-cell-text");
        assert.ok(span && span.title === span.textContent);
      });
      if (!name.startsWith("学校")) {
        assert.deepEqual(
          [...row.cells[10].querySelectorAll("button,a")].map(
            (x) => x.textContent,
          ),
          ["详情"],
          "监管仅居中详情",
        );
      }
    });
    if (!name.startsWith("学校")) {
      const schoolCounts = new Map();
      [...list.querySelectorAll("tbody tr")].forEach((row) => {
        const key = row.dataset.warningSchool;
        schoolCounts.set(key, (schoolCounts.get(key) || 0) + 1);
      });
      assert.ok([...schoolCounts.values()].every((count) => count >= 12));
      assert.equal(
        new Set(
          [...list.querySelectorAll("tbody tr")].map(
            (row) => row.dataset.domId,
          ),
        ).size,
        list.querySelectorAll("tbody tr").length,
      );
    }
    const count = first.querySelector(".care-warning-web-link");
    assert.ok(count);
    assert.match(count.textContent, /^\d+次$/);
    assert.equal(list.querySelectorAll("thead th")[9].textContent, "关爱次数");
    const warningRows = [...list.querySelectorAll("tbody tr")];
    assert.ok(
      warningRows.some(
        (row) =>
          row.querySelector("[data-warning-care-count]").textContent === "--",
      ),
      "无关爱内容显示 --",
    );
    const beforeReferenceCounts = warningRows.map(
      (row) => row.querySelector("[data-warning-care-count]").textContent,
    );
    const recordSource = w.schoolCareV3Data || w.careRegV3Data;
    recordSource
      .filter((record) => !record.deletedAt && !record.superseded)
      .forEach((record) => {
        assert.ok(
          w.CARE_DICTIONARY_V1.typeLabels.includes(record.type),
          name + "当前示例类型必须有效：" + record.type,
        );
        assert.ok(
          w.CARE_DICTIONARY_V1.methodLabels.includes(record.method),
          name + "当前示例方式必须有效：" + record.method,
        );
        assert.ok(
          (record.caseTypes || []).every((type) =>
            w.CARE_DICTIONARY_V1.typeLabels.includes(type),
          ),
        );
      });
    const currentWarningId =
      "warning-" +
      first.getAttribute("data-dom-id").replace("row-warning-", "");
    assert.equal(
      count.textContent,
      recordSource.filter(
        (r) =>
          !r.deletedAt &&
          !r.superseded &&
          (r.warningId === currentWarningId ||
            (r.warningIds || []).includes(currentWarningId)),
      ).length + "次",
    );
    const obsolete = Object.assign(
      {},
      recordSource.find((r) => r.warningId === currentWarningId),
      { superseded: true },
    );
    const liveCount = count.textContent;
    recordSource.push(obsolete);
    w.refreshWarningCareLinks();
    assert.equal(
      first.querySelector(".care-warning-web-link").textContent,
      liveCount,
      "审计旧版本不得重复计次",
    );
    recordSource.splice(recordSource.indexOf(obsolete), 1);
    w.refreshWarningCareLinks();
    const sampleRecord = recordSource.find((r) => r.warningId && !r.deletedAt);
    if (sampleRecord && warningRows.length > 1) {
      const oldReferences = sampleRecord.referenceWarningIds;
      sampleRecord.referenceWarningIds = warningRows.map(
        (row) =>
          "warning-" +
          row.getAttribute("data-dom-id").replace("row-warning-", ""),
      );
      w.refreshWarningCareLinks();
      assert.deepEqual(
        warningRows.map(
          (row) => row.querySelector("[data-warning-care-count]").textContent,
        ),
        beforeReferenceCounts,
        "学校和监管端参考线索不得进入归案计数",
      );
      sampleRecord.referenceWarningIds = oldReferences;
    }
    count.click();
    const firstWarningId =
      "warning-" +
      first.getAttribute("data-dom-id").replace("row-warning-", "");
    const dateRecord = recordSource.find(
      (r) =>
        !r.deletedAt &&
        (r.warningId === firstWarningId ||
          (r.warningIds || []).includes(firstWarningId)),
    );
    if (dateRecord) {
      assert.equal(dateRecord.next, undefined);
      assert.ok(dateRecord.filledAt && dateRecord.filledByName);
      const rows = [
        ...d.querySelectorAll("#care-warning-web-detail .care-warning-web-row"),
      ];
      assert.ok(
        !rows.some(
          (row) => row.firstElementChild.textContent === "下次跟进日期",
        ),
      );
      assert.ok(
        rows.some((row) => row.firstElementChild.textContent === "填写人"),
      );
      assert.ok(
        rows.some(
          (row) =>
            row.firstElementChild.textContent === "填写时间" &&
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(
              row.lastElementChild.textContent,
            ),
        ),
      );
      assert.ok(
        !d
          .getElementById("care-warning-web-detail")
          .textContent.includes("个案状态"),
      );
    }
    assert.ok(d.getElementById("care-warning-web-detail"));
    const detail = d.getElementById("care-warning-web-detail");
    checkWebOrder(
      w,
      recordSource,
      () => count.click(),
      detail,
      "[data-web-pane='care'] .care-warning-web-card:not([data-warning-case-info])",
      dateRecord,
    );
    assert.equal(detail.querySelector('[data-web-pane="care"]').hidden, false);
    assert.deepEqual(
      [
        ...detail
          .querySelector('[data-web-pane="care"] .care-warning-web-card')
          .querySelectorAll(".care-warning-web-row > span:first-child"),
      ].map((x) => x.textContent),
      ["创建日期", "关爱来源", "关联信息", "关爱类型", "关爱原因"],
      name + "第二版详情顺序",
    );
    detail.querySelector("[data-web-evidence]").click();
    const evidence = d.querySelector(".care-evidence-dialog");
    assert.ok(evidence, name + "复用第一版关联信息弹窗");
    assert.ok(evidence.querySelectorAll(".care-evidence-list li").length > 0);
    assert.match(evidence.textContent, /关联信息（共\d+条）/);
    evidence.querySelector(".care-evidence-close").click();
    assert.equal(d.querySelector(".care-evidence-mask"), null);
    detail.querySelector('[data-web-tab="visit"]').click();
    assert.equal(detail.querySelector('[data-web-pane="visit"]').hidden, false);
    assert.equal(detail.querySelector('[data-web-pane="care"]').hidden, true);
    detail.querySelector('[data-web-tab="care"]').click();
    assert.equal(detail.querySelector('[data-web-pane="care"]').hidden, false);
    assert.equal(
      detail.querySelectorAll("[data-warning-case-info]").length,
      1,
      "多次关爱仅一张顶部个案卡",
    );
    const noCare = warningRows.find(
      (row) =>
        row.querySelector("[data-warning-care-count]").textContent === "--",
    );
    noCare.querySelector('[data-dom-id^="btn-view-detail-"]').click();
    assert.equal(
      detail.querySelector("[data-warning-case-info]"),
      null,
      "未建案不显示个案卡",
    );
    const emptyCase = {
      caseId: "empty-case-test",
      warningId:
        "warning-" +
        noCare.getAttribute("data-dom-id").replace("row-warning-", ""),
      caseCreatedAt: "2026-10-10",
      type: "学业困难学生",
      careReason: "已建案零内容",
    };
    w.CARE_WARNING_CASES.push(emptyCase);
    noCare.querySelector('[data-dom-id^="btn-view-detail-"]').click();
    assert.ok(
      detail.querySelector("[data-warning-case-info]"),
      "已建案零内容仍显示个案卡",
    );
    assert.equal(
      noCare.querySelector("[data-warning-care-count]").textContent,
      "--",
      "个案卡不伪造关爱次数",
    );
    w.CARE_WARNING_CASES.splice(w.CARE_WARNING_CASES.indexOf(emptyCase), 1);
    count.click();
    const query = list.querySelector('[data-dom-id="btn-search"]'),
      reset = list.querySelector('[data-dom-id="btn-reset"]');
    const student = list.querySelector('[data-dom-id="filter-student"]');
    assert.ok(query && reset && student);
    const year = list.querySelector('[data-dom-id="filter-year"]');
    const grade = list.querySelector('[data-dom-id="filter-grade"]');
    const klass = list.querySelector('[data-dom-id="filter-class"]');
    assert.deepEqual(
      [year, grade, klass, student].map((x) =>
        x.parentElement.querySelector("label").textContent.trim(),
      ),
      ["学年", "年级", "班级", "学生姓名"],
    );
    assert.ok(year.options.length > 1);
    const dateParts = first.cells[5].textContent
      .trim()
      .match(/^(\d{4})-(\d{2})/);
    year.value = String(
      Number(dateParts[1]) - (Number(dateParts[2]) < 9 ? 1 : 0),
    );
    year.dispatchEvent(new w.Event("change"));
    grade.value = first.cells[1].textContent.trim();
    grade.dispatchEvent(new w.Event("change"));
    klass.value = first.cells[2].textContent.trim();
    student.value = first.cells[0].textContent.trim();
    query.click();
    assert.ok(
      [...list.querySelectorAll("tbody tr")].some((x) => !x.hidden),
      "四维组合应匹配真实学生",
    );
    assert.ok(
      [...list.querySelectorAll("tbody tr")]
        .filter((x) => !x.hidden)
        .every((x) => x.cells[0].textContent.trim() === student.value),
    );
    reset.click();
    assert.equal(year.value, "");
    assert.equal(grade.value, "");
    assert.equal(klass.value, "");
    student.value = "不存在的学生";
    query.click();
    assert.ok([...list.querySelectorAll("tbody tr")].every((x) => x.hidden));
    reset.click();
    assert.ok([...list.querySelectorAll("tbody tr")].some((x) => !x.hidden));
    if (!name.startsWith("学校")) {
      w.backToWarningSchool();
      const summary = d.getElementById("section-warning-district");
      assert.equal(
        summary.classList.contains("hidden"),
        false,
        "从明细返回学校层",
      );
      assert.equal(summary.querySelector("th").textContent, "学校");
      w.cityCareOpen();
      const linkedCase = w.CARE_REGULATOR_V31.cases.find(
        (c) => c.first.caseId === sampleRecord.caseId,
      );
      assert.equal(
        linkedCase.rows.length,
        recordSource.filter(
          (r) =>
            !r.deletedAt && !r.superseded && r.caseId === sampleRecord.caseId,
        ).length,
        "第一版关爱台账不得保留第二版追加前的旧计数缓存",
      );
      const care = d.getElementById("section-care-menu-v1");
      assert.deepEqual(
        [...care.querySelectorAll("thead th")]
          .slice(3)
          .map((x) => x.textContent),
        Array.from(w.CARE_DICTIONARY_V1.typeLabels),
        "四级汇总完整12项分类且顺序一致",
      );
      assert.deepEqual(
        [...care.querySelector("#reg31-type").options]
          .slice(1)
          .map((x) => x.value),
        Array.from(w.CARE_DICTIONARY_V1.typeLabels),
        "监管筛选完整12项",
      );
      assert.equal(
        care.classList.contains("hidden"),
        false,
        "第一版关爱菜单应可用",
      );
      assert.ok(care.querySelector("[data-drill]"));
      for (
        let level = 0;
        level < 4 && care.querySelector("[data-drill]");
        level++
      )
        care.querySelector("[data-drill]").click();
      assert.deepEqual(
        [...care.querySelectorAll("thead th")]
          .slice(4, 7)
          .map((x) => x.textContent),
        ["关爱来源", "关联信息", "关爱类型"],
        name + "第一版学校台账字段顺序",
      );
      [...care.querySelectorAll("tbody tr")]
        .find((row) => parseInt(row.cells[8].textContent) > 0)
        .querySelector("[data-view]")
        .click();
      checkTimeline(
        d.getElementById("city-care-modal-v1"),
        ".care-reg-timeline",
      );
      const orderRecord = recordSource.find(
        (r) => !r.superseded && !r.deletedAt && r.caseId && r.date,
      );
      checkWebOrder(
        w,
        recordSource,
        () => w.cityCareView(recordSource.indexOf(orderRecord)),
        d.getElementById("city-care-modal-v1"),
        ".care-reg-timeline",
        orderRecord,
      );
      assert.ok(!care.textContent.includes("个案状态"));
      assert.deepEqual(
        [...d.querySelectorAll("#city-care-modal-v1 .crv3-row .label")]
          .slice(5, 8)
          .map((x) => x.textContent),
        ["关爱来源", "关联信息", "关爱类型"],
        name + "第一版详情字段顺序",
      );
      w.cityCareClose();
      checkEnumColumns(w, care, recordSource, w.careRegV3Render);
      checkFixedColumn(w, care.querySelector("table.care-record-table"));
    } else {
      const visit = d.getElementById("section-visit-ledger");
      const visitReset = visit.querySelector('[data-dom-id="btn-visit-reset"]');
      visitReset.click();
      const visitName = visit.querySelector(
        '[data-dom-id="visit-filter-student"]',
      );
      const visitYear = visit.querySelector(
        '[data-dom-id="visit-filter-year"]',
      );
      assert.ok(visitYear.options.length > 1);
      visitName.value = "不存在的学生";
      visit.querySelector('[data-dom-id="btn-visit-search"]').click();
      assert.ok([...visit.querySelectorAll("tbody tr")].every((x) => x.hidden));
      visitReset.click();
      assert.ok([...visit.querySelectorAll("tbody tr")].some((x) => !x.hidden));
      visitYear.value = "2025";
      visitYear.dispatchEvent(new w.Event("change"));
      visit.querySelector('[data-dom-id="btn-visit-search"]').click();
      assert.ok(
        [...visit.querySelectorAll("tbody tr")].some((x) => !x.hidden),
        "2026年5月应属于2025学年",
      );
      visitReset.click();
      w.schoolMenuGo("care");
      assert.equal(
        d.getElementById("section-care-menu-v1").classList.contains("hidden"),
        false,
      );
      const care = d.getElementById("section-care-menu-v1");
      const expected = [
        "学生姓名",
        "年级",
        "班级",
        "创建日期",
        "关爱来源",
        "关联信息",
        "关爱类型",
        "关爱原因",
        "关爱次数",
        "最近关爱日期",
        "关爱结果",
        "操作",
      ];
      assert.deepEqual(
        [...care.querySelectorAll("th")].map((x) => x.textContent),
        expected,
        "学校第一版字段不得被菜单重开重置",
      );
      care.querySelector("[data-school-view]").click();
      checkTimeline(
        d.getElementById("school-care-modal-v1"),
        ".school-care-timeline",
      );
      assert.ok(
        [...d.querySelectorAll(".school-care-timeline")].every(
          (card) => card.firstElementChild.children.length === 1,
        ),
        "学校关爱卡不重复展示右侧日期",
      );
      const orderRecord = recordSource.find(
        (r) => !r.superseded && !r.deletedAt && r.caseId && r.date,
      );
      checkWebOrder(
        w,
        recordSource,
        () => w.schoolCareView(recordSource.indexOf(orderRecord)),
        d.getElementById("school-care-modal-v1"),
        ".school-care-timeline",
        orderRecord,
      );
      assert.ok(
        d
          .querySelector("#school-care-modal-v1 .scm-modal-body")
          .textContent.includes("关爱情况"),
      );
      assert.deepEqual(
        [...d.querySelectorAll("#school-care-modal-v1 .scm-v2-row .label")]
          .slice(5, 8)
          .map((x) => x.textContent),
        ["关爱来源", "关联信息", "关爱类型"],
      );
      w.schoolCareClose();
      checkEnumColumns(w, care, recordSource, w.schoolV3Render);
      checkFixedColumn(w, care.querySelector("table.care-record-table"));
      w.schoolMenuGo("warning-list");
      w.schoolMenuGo("care");
      assert.deepEqual(
        [...care.querySelectorAll("th")].map((x) => x.textContent),
        expected,
      );
      assert.equal(
        care.querySelector("[data-school-delete]"),
        null,
        "学校不提供删除个案",
      );
      assert.equal(w.schoolCareDeleteCase, undefined, "不保留隐藏写入接口");
    }
    assert.deepEqual(errors, [], name + "交互异常");
    for (const hash of ["#care-v1", "#care-v2"]) {
      const entry = await load(name, hash);
      const target =
        hash === "#care-v1"
          ? "section-care-menu-v1"
          : name.startsWith("学校")
            ? "section-warning-list"
            : "section-warning-district";
      assert.equal(
        entry.document.getElementById(target).classList.contains("hidden"),
        false,
        name + hash + "直达链接",
      );
      assert.deepEqual(entry.errors, [], name + hash);
    }
    console.log(
      "PASS " +
        name +
        "：字段、名称下钻、学校范围、计数、双 tab、查询、重置与关爱入口",
    );
  }
  console.log("PASS 六端启动、语法、资源引用及唯一 ID");
}
test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
