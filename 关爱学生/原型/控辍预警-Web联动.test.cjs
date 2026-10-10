const assert = require("node:assert/strict");
const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm");
const { load, root, pages } = require("./原型测试工具-V2.0-20261008.cjs");
async function test() {
  for (const name of pages) {
    const html = fs.readFileSync(path.join(root, name), "utf8");
    for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))
      new vm.Script(match[1], { filename: name });
    const { window: w, document: d, errors } = await load(name);
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
    if (name.startsWith("老师") || name.startsWith("家长")) continue;
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
      for (const value of target) {
        const button = [
          ...summary.querySelectorAll("[data-warning-drill]"),
        ].find((x) => x.textContent === value);
        assert.ok(button, "层级缺失 " + value);
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
    const count = first.querySelector(".care-warning-web-link");
    assert.ok(count);
    assert.match(count.textContent, /^\d+次$/);
    assert.equal(list.querySelectorAll("thead th")[9].textContent, "关爱次数");
    const warningRows = [...list.querySelectorAll("tbody tr")];
    assert.ok(warningRows.some(row => row.querySelector("[data-warning-care-count]").textContent === "--"), "无关爱内容显示 --");
    const beforeReferenceCounts = warningRows.map(
      (row) => row.querySelector("[data-warning-care-count]").textContent,
    );
    const recordSource = w.schoolCareV3Data || w.careRegV3Data;
    const currentWarningId = "warning-" + first.getAttribute("data-dom-id").replace("row-warning-", "");
    assert.equal(count.textContent, recordSource.filter(r => !r.deletedAt && !r.superseded && (r.warningId === currentWarningId || (r.warningIds || []).includes(currentWarningId))).length + "次");
    const obsolete = Object.assign({}, recordSource.find(r => r.warningId === currentWarningId), { superseded: true });
    const liveCount = count.textContent;
    recordSource.push(obsolete);
    w.refreshWarningCareLinks();
    assert.equal(first.querySelector(".care-warning-web-link").textContent, liveCount, "审计旧版本不得重复计次");
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
      const oldNext = dateRecord.next;
      dateRecord.next = "";
      count.click();
      assert.ok(
        [
          ...d.querySelectorAll(
            "#care-warning-web-detail .care-warning-web-row",
          ),
        ].some(
          (row) =>
            row.firstElementChild.textContent === "下次跟进日期" &&
            row.lastElementChild.textContent === "--",
        ),
        "空日期显示 --：" + name,
      );
      dateRecord.next = "2026-10-12";
      count.click();
      assert.ok(
        [
          ...d.querySelectorAll(
            "#care-warning-web-detail .care-warning-web-row",
          ),
        ].some(
          (row) =>
            row.firstElementChild.textContent === "下次跟进日期" &&
            row.lastElementChild.textContent === "2026-10-12",
        ),
        "已填日期应回显：" + name,
      );
      dateRecord.next = oldNext;
      count.click();
    }
    assert.ok(d.getElementById("care-warning-web-detail"));
    const detail = d.getElementById("care-warning-web-detail");
    assert.equal(detail.querySelector('[data-web-pane="care"]').hidden, false);
    assert.deepEqual(
      [...detail.querySelector('[data-web-pane="care"] .care-warning-web-card').querySelectorAll(".care-warning-web-row > span:first-child")].map(x => x.textContent),
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
      const linkedCase = w.CARE_REGULATOR_V31.cases.find(c => c.first.caseId === sampleRecord.caseId);
      assert.equal(linkedCase.rows.length, recordSource.filter(r => !r.deletedAt && !r.superseded && r.caseId === sampleRecord.caseId).length, "第一版关爱台账不得保留第二版追加前的旧计数缓存");
      const care = d.getElementById("section-care-menu-v1");
      assert.equal(
        care.classList.contains("hidden"),
        false,
        "第一版关爱菜单应可用",
      );
      assert.ok(care.querySelector("[data-drill]"));
      for (let level = 0; level < 4 && care.querySelector("[data-drill]"); level++)
        care.querySelector("[data-drill]").click();
      assert.deepEqual(
        [...care.querySelectorAll("thead th")].slice(4, 7).map(x => x.textContent),
        ["关爱来源", "关联信息", "关爱类型"],
        name + "第一版学校台账字段顺序",
      );
      care.querySelector("[data-view]").click();
      assert.deepEqual(
        [...d.querySelectorAll("#city-care-modal-v1 .crv3-row .label")].slice(5, 8).map(x => x.textContent),
        ["关爱来源", "关联信息", "关爱类型"],
        name + "第一版详情字段顺序",
      );
      w.cityCareClose();
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
        "个案状态",
        "操作",
      ];
      assert.deepEqual(
        [...care.querySelectorAll("th")].map((x) => x.textContent),
        expected,
        "学校第一版字段不得被菜单重开重置",
      );
      care.querySelector("[data-school-view]").click();
      assert.ok(
        d
          .querySelector("#school-care-modal-v1 .scm-modal-body")
          .textContent.includes("关爱情况"),
      );
      assert.deepEqual(
        [...d.querySelectorAll("#school-care-modal-v1 .scm-v2-row .label")].slice(5, 8).map(x => x.textContent),
        ["关爱来源", "关联信息", "关爱类型"],
      );
      w.schoolCareClose();
      w.schoolMenuGo("warning-list");
      w.schoolMenuGo("care");
      assert.deepEqual(
        [...care.querySelectorAll("th")].map((x) => x.textContent),
        expected,
      );
      w.CARE_CURRENT_PERMISSIONS = { delete: false };
      care.querySelector("[data-school-delete]").click();
      assert.equal(
        d.getElementById("school-care-case-delete-mask"),
        null,
        "无权限不允许删除",
      );
      w.CARE_CURRENT_PERMISSIONS = { delete: true };
      care.querySelector("[data-school-delete]").click();
      d.querySelector(
        '#school-care-case-delete-mask [data-action="cancel"]',
      ).click();
      assert.ok(care.querySelector("[data-school-view]"), "取消保留个案");
      const countBefore = w.schoolCareV3Data.length;
      care.querySelector("[data-school-delete]").click();
      d.querySelector(
        '#school-care-case-delete-mask [data-action="confirm"]',
      ).click();
      assert.ok(w.schoolCareV3Data.length < countBefore, "确认删除整案");
      assert.equal(
        first.querySelector("[data-warning-care-count]").textContent,
        "--",
        "预警计数随个案删除刷新",
      );
    }
    assert.deepEqual(errors, [], name + "交互异常");
    for (const hash of ["#care-v1", "#care-v2"]) {
      const entry = await load(name, hash);
      const target = hash === "#care-v1"
        ? "section-care-menu-v1"
        : name.startsWith("学校") ? "section-warning-list" : "section-warning-district";
      assert.equal(entry.document.getElementById(target).classList.contains("hidden"), false, name + hash + "直达链接");
      assert.deepEqual(entry.errors, [], name + hash);
    }
    console.log(
      "PASS " +
        name +
        "：字段、名称下钻、学校范围、计数、双 tab、查询、重置与关爱入口",
    );
  }
  console.log("PASS 七端启动、语法、资源引用及唯一 ID");
}
test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
