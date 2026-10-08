/* 第二版 Web 预警记录：学校与四级监管共用只读的预警—个案展示。 */
(function () {
  "use strict";
  function esc(value) {
    return String(value == null ? "" : value).replace(
      /[&<>"']/g,
      function (ch) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[ch];
      },
    );
  }
  function boot() {
    var firstRow = document.querySelector(
      '#section-warning-list tr[data-dom-id^="row-warning-"]',
    );
    var table = firstRow && firstRow.closest("table");
    var modal = document.getElementById("modal-detail");
    var records = window.schoolCareV3Data || window.careRegV3Data;
    if (!table || !modal || !Array.isArray(records)) return;
    var school = !!window.schoolCareV3Data;
    if (!school) {
      var examples = records.filter(function (r) {
        return r.sourceKey === "warning" && r.warning && r.school;
      });
      var used = new Set();
      examples = examples.filter(function (r) {
        var key = r.caseId || r.name + "|" + r.school;
        if (used.has(key)) return false;
        used.add(key);
        return true;
      });
      examples.push({
        name: "待关爱学生",
        grade: "七年级（2025级）",
        className: "1班",
        school: "凤翔区第二中学",
        province: "陕西省",
        city: "宝鸡市",
        district: "凤翔区",
        warning: {
          type: "连续缺勤",
          reason: "连续缺勤3个工作日",
          time: "2026-09-20 17:30",
        },
        _noCase: true,
      });
      examples.forEach(function (r, i) {
        if (r._noCase) return;
        r.warningId = "warning-" + (i + 1);
        r.caseId = r.caseId || "case-" + r.warningId;
        r.caseCreatedAt = r.caseCreatedAt || r.date;
        r.careReason =
          r.careReason || "该生有缺勤预警，需要了解实际原因并持续开展关爱。";
        r.warning.time = String(r.warning.time || "").replace(
          "2026-05-",
          "2026-09-",
        );
        if (r.dataSource)
          r.dataSource = r.dataSource.replace("2026-05-", "2026-09-");
      });
      var body = table.tBodies[0];
      body.innerHTML = examples
        .map(function (r, i) {
          var warning = r.warning || {},
            time = String(warning.time || "2026-09-18 17:30").replace(
              "2026-05-",
              "2026-09-",
            ),
            done = !r._noCase;
          return (
            '<tr data-dom-id="row-warning-' +
            (i + 1) +
            '" data-warning-school="' +
            esc(r.school) +
            '"><td>' +
            esc(r.name) +
            "</td><td>" +
            esc(r.grade) +
            "</td><td>" +
            esc(r.className) +
            "</td><td>" +
            esc(warning.type || "连续缺勤") +
            "</td><td>" +
            esc(warning.reason || "连续缺勤3个工作日") +
            "</td><td>" +
            esc(time) +
            "</td><td>" +
            (done ? "已处理" : "待处理") +
            "</td><td>" +
            (done ? "已联系家长并开展劝返" : "--") +
            "</td><td>" +
            (done ? time.slice(0, 10) : "--") +
            '</td><td><button type="button" data-dom-id="btn-view-detail-' +
            (i + 1) +
            '" onclick="showDetailModal(\'' +
            (done ? "done" : "pending") +
            "')\">详情</button></td></tr>"
          );
        })
        .join("");
    }
    var rows = Array.from(
      table.querySelectorAll('tbody tr[data-dom-id^="row-warning-"]'),
    );
    rows.forEach(function (row) {
      [5, 8].forEach(function (index) {
        var cell = row.cells[index];
        if (cell)
          cell.textContent = cell.textContent.replace("2026-05-", "2026-09-");
      });
    });
    var selected = rows[0] || null,
      selectedTab = "visit",
      currentSchool = "";
    var section = document.getElementById("section-warning-list");
    function filterInput(key) {
      return section.querySelector('[data-dom-id="filter-' + key + '"]');
    }
    function resetInputs() {
      ["student", "class", "status", "type"].forEach(function (key) {
        var input = filterInput(key);
        if (input) input.value = "";
      });
      var start = filterInput("date-start"),
        end = filterInput("date-end");
      if (start) start.value = "2026-09-01";
      if (end) end.value = "2026-09-30";
    }
    function applyFilters() {
      var name = (filterInput("student") || {}).value || "",
        klass = (filterInput("class") || {}).value || "",
        status = (filterInput("status") || {}).value || "",
        type = (filterInput("type") || {}).value || "",
        start = (filterInput("date-start") || {}).value || "",
        end = (filterInput("date-end") || {}).value || "";
      var typeText =
        {
          "continuous-absence": "连续缺勤",
          absence: "连续缺勤",
          "periodic-absence": "周期缺勤",
          period: "周期缺勤",
          "continuous-leave": "连续请假",
          leave: "连续请假",
        }[type] || type;
      rows.forEach(function (row) {
        var w = info(row),
          classNumber = String(klass).match(/(\d+)$/),
          schoolOK =
            !currentSchool || row.dataset.warningSchool === currentSchool;
        row.hidden = !(
          schoolOK &&
          (!name || w.name.includes(name)) &&
          (!klass ||
            w.klass.includes((classNumber ? classNumber[1] : klass) + "班")) &&
          (!status ||
            w.status === (status === "pending" ? "待处理" : "已处理")) &&
          (!type || w.type === typeText) &&
          (!start || w.time.slice(0, 10) >= start) &&
          (!end || w.time.slice(0, 10) <= end)
        );
      });
    }
    resetInputs();
    section.addEventListener(
      "click",
      function (event) {
        var button = event.target.closest(
          '[data-dom-id="btn-search"],[data-dom-id="btn-reset"]',
        );
        if (!button) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (button.dataset.domId === "btn-reset") resetInputs();
        applyFilters();
      },
      true,
    );
    function info(row) {
      var cells = row.cells,
        id =
          "warning-" +
          row.getAttribute("data-dom-id").replace("row-warning-", "");
      return {
        id: id,
        name: cells[0].textContent.trim(),
        grade: cells[1].textContent.trim(),
        klass: cells[2].textContent.trim(),
        type: cells[3].textContent.trim(),
        reason: cells[4].textContent.trim(),
        time: cells[5].textContent.trim(),
        status: cells[6].textContent.trim(),
        result: (cells[7].getAttribute("title") || cells[7].textContent).trim(),
        last: cells[8].textContent.trim(),
      };
    }
    function linked(w) {
      return records
        .filter(function (r) {
          return !r.deletedAt && r.warningId === w.id;
        })
        .sort(function (a, b) {
          return String(a.date).localeCompare(String(b.date));
        });
    }
    function seed() {
      rows.forEach(function (row, index) {
        var w = info(row);
        /* 只在初始化演示数据时按静态行定位；后续查看始终使用显式 warningId。 */
        if (index === 0) {
          var first = records.find(function (r) {
            return (
              r.sourceKey === "warning" &&
              r.name === w.name &&
              r.grade === w.grade &&
              r.className === w.klass
            );
          });
          if (!first) {
            first = {
              name: w.name,
              grade: w.grade,
              className: w.klass,
              school: school ? "凤翔区第一实验小学" : "示例学校",
              sourceKey: "warning",
              source: "预警信息",
              date: "2026-09-18",
              people: "王老师、李老师",
              type: "家庭关怀",
              method: "家访",
              result: "已与家长沟通返校安排，约定持续关注学生返校情况。",
              status: "need",
              next: "2026-09-25",
              proofs: [],
            };
            records.push(first);
          }
          first.warningId = w.id;
          first.caseId = first.caseId || "case-" + w.id;
          first.caseCreatedAt = first.caseCreatedAt || first.date;
          first.careReason =
            first.careReason ||
            "该生存在缺勤预警，需要持续了解原因并开展关爱。";
          records
            .filter(function (r) {
              return r.caseId === first.caseId;
            })
            .forEach(function (r) {
              r.warningId = w.id;
            });
          first.warning = { type: w.type, reason: w.reason, time: w.time };
          if (first.dataSource)
            first.dataSource = first.dataSource.replace("2026-05-", "2026-09-");
          if (!first.result)
            first.result = "已与家长沟通返校安排，约定持续关注学生返校情况。";
          if (linked(w).length < 2)
            records.push({
              name: w.name,
              grade: w.grade,
              className: w.klass,
              school: first.school,
              district: first.district,
              sourceKey: "warning",
              source: "控辍预警",
              warningId: w.id,
              caseId: first.caseId,
              caseCreatedAt: first.caseCreatedAt,
              careReason: first.careReason,
              warning: first.warning,
              date: "2026-09-23",
              people: "王老师、李老师",
              type: first.type,
              method: "谈心谈话",
              result: "已再次了解学生返校后的适应情况，并约定继续跟进。",
              status: "need",
              next: "2026-09-30",
              proofs: [],
            });
        } else if (index === 2 && !linked(w).length) {
          records.push({
            name: w.name,
            grade: w.grade,
            className: w.klass,
            school: school ? "凤翔区第一实验小学" : "示例学校",
            sourceKey: "warning",
            source: "控辍预警",
            warningId: w.id,
            caseId: "case-" + w.id,
            caseCreatedAt: "2026-09-19",
            careReason: "该生出现缺勤，需要了解实际困难并持续跟进。",
            warning: { type: w.type, reason: w.reason, time: w.time },
            date: "2026-09-19",
            people: "班主任",
            type: "学业困难",
            method: "谈心谈话",
            result: "已了解缺勤原因并建立持续联系。",
            status: "done",
            next: "",
            proofs: [],
          });
        }
      });
      if (school && typeof window.schoolV3Render === "function")
        window.schoolV3Render();
      if (!school && typeof window.careRegV3Render === "function")
        window.careRegV3Render();
    }
    function decorateRows() {
      var head = table.tHead && table.tHead.rows[0];
      if (!head) return;
      var th = document.createElement("th");
      th.textContent = "关联关爱";
      th.className = head.lastElementChild.className;
      head.insertBefore(th, head.lastElementChild);
      rows.forEach(function (row) {
        var td = document.createElement("td");
        td.className = "px-4 py-3 text-center whitespace-nowrap";
        td.dataset.warningCareCount = "1";
        refreshCount(row, td);
        row.insertBefore(td, row.lastElementChild);
        var operation = row.lastElementChild;
        operation.classList.add("care-warning-operation");
        if (school) {
          var old = row.querySelector('[data-dom-id^="btn-care-"]');
          if (old) old.remove();
          var actions = document.createElement("div");
          actions.className = "care-warning-school-actions";
          while (operation.firstChild)
            actions.appendChild(operation.firstChild);
          operation.appendChild(actions);
        }
      });
    }
    function refreshCount(row, td) {
      var w = info(row),
        chain = linked(w);
      td.replaceChildren();
      if (!chain.length) {
        td.textContent = "--";
        return;
      }
      var button = document.createElement("button");
      button.type = "button";
      button.className = "care-warning-web-link";
      button.textContent = chain.length + "条";
      button.onclick = function () {
        selected = row;
        selectedTab = "care";
        window.showDetailModal(w.status === "待处理" ? "pending" : "done");
      };
      td.appendChild(button);
    }
    window.refreshWarningCareLinks = function () {
      rows.forEach(function (row) {
        var td = row.querySelector("[data-warning-care-count]");
        if (td) refreshCount(row, td);
      });
      if (selected) renderDetail();
    };
    function field(label, value) {
      return (
        '<div class="care-warning-web-row"><span>' +
        esc(label) +
        "</span><span>" +
        esc(value || "--") +
        "</span></div>"
      );
    }
    function careCards(w) {
      var chain = linked(w),
        last = chain[chain.length - 1],
        state = !last ? "待关爱" : last.status === "need" ? "关爱中" : "已完结";
      return (
        '<div class="care-warning-web-heading"><b>关爱情况（共' +
        chain.length +
        "次）</b><span>个案状态：" +
        state +
        "</span></div>" +
        (chain.length
          ? '<div class="care-warning-web-card">' +
            field("创建日期", chain[0].caseCreatedAt || chain[0].date) +
            field("关爱类型", chain[0].type) +
            field("关爱来源", "控辍保学") +
            field("关爱原因", chain[0].careReason || w.reason) +
            "</div>" +
            chain
              .slice()
              .reverse()
              .map(function (r, i) {
                return (
                  '<div class="care-warning-web-card"><b>第' +
                  (chain.length - i) +
                  "次关爱</b>" +
                  field("关爱时间", r.date) +
                  field("执行人员", r.people) +
                  field("关爱方式", r.method) +
                  field("关爱结果", r.result) +
                  field(
                    "证明材料",
                    (r.proofs || []).length
                      ? (r.proofs || []).length + "张"
                      : "--",
                  ) +
                  field("继续跟进", r.status === "need" ? "需要" : "暂不需要") +
                  (r.status === "need" ? field("下次跟进日期", r.next) : "") +
                  "</div>"
                );
              })
              .join("")
          : '<div class="care-warning-web-card">暂无关爱记录</div>')
      );
    }
    function visitCards(w) {
      var hasVisit =
        w.status !== "待处理" && w.last && w.last !== "-" && w.last !== "--";
      return (
        '<div class="care-warning-web-heading"><b>劝返信息（共' +
        (hasVisit ? 1 : 0) +
        "次）</b></div>" +
        (hasVisit
          ? '<div class="care-warning-web-card"><b>第1次劝返</b>' +
            field("劝返日期", w.last) +
            field("劝返方式", "电话联系") +
            field("劝返老师", "班主任") +
            field("劝返结果", w.result) +
            field("佐证材料", "--") +
            "</div>"
          : '<div class="care-warning-web-card">暂无劝返记录</div>')
      );
    }
    function renderDetail() {
      if (!selected) return;
      var w = info(selected),
        body = modal.querySelector(".flex-1.overflow-y-auto");
      if (!body) return;
      Array.from(body.children).forEach(function (child) {
        if (child.id !== "care-warning-web-detail")
          child.style.display = "none";
      });
      var root = document.getElementById("care-warning-web-detail");
      if (!root) {
        root = document.createElement("div");
        root.id = "care-warning-web-detail";
        body.appendChild(root);
      }
      root.innerHTML =
        '<div class="care-warning-web-heading"><b>预警信息</b></div><div class="care-warning-web-card">' +
        field("学生姓名", w.name) +
        field("年级", w.grade) +
        field("班级", w.klass) +
        field("预警类型", w.type) +
        field("预警原因", w.reason) +
        field("预警时间", w.time) +
        field("处理状态", w.status) +
        "</div>" +
        '<div class="care-warning-web-tabs"><button type="button" data-web-tab="visit" class="' +
        (selectedTab === "visit" ? "on" : "") +
        '">劝返信息</button><button type="button" data-web-tab="care" class="' +
        (selectedTab === "care" ? "on" : "") +
        '">关爱情况</button></div>' +
        '<div data-web-pane="visit" ' +
        (selectedTab === "visit" ? "" : "hidden") +
        ">" +
        visitCards(w) +
        '</div><div data-web-pane="care" ' +
        (selectedTab === "care" ? "" : "hidden") +
        ">" +
        careCards(w) +
        "</div>";
      root.querySelectorAll("[data-web-tab]").forEach(function (button) {
        button.onclick = function () {
          selectedTab = button.dataset.webTab;
          root.querySelectorAll("[data-web-tab]").forEach(function (tab) {
            tab.classList.toggle("on", tab === button);
          });
          root.querySelectorAll("[data-web-pane]").forEach(function (pane) {
            pane.hidden = pane.dataset.webPane !== selectedTab;
          });
        };
      });
    }
    seed();
    decorateRows();
    if (!school && window.CARE_REGULATOR_V31) {
      var hierarchy = window.CARE_REGULATOR_V31,
        root = hierarchy.getPath().slice(),
        warningPath = root.slice(),
        summarySection = document.getElementById("section-warning-district");
      var originalHeads = Array.from(
        summarySection.querySelectorAll("thead th"),
      ).map(function (th) {
        return th.textContent.trim();
      });
      var warningDates = { start: "2026-09-01", end: "2026-09-30" };
      /* 复用关爱菜单的实际 CSS 规则，避免仅复用类名却漏掉限定作用域。 */
      var sharedStyle = document.createElement("style"),
        sharedRules = [];
      Array.from(document.styleSheets).forEach(function (sheet) {
        try {
          Array.from(sheet.cssRules).forEach(function (rule) {
            if (
              rule.selectorText &&
              rule.selectorText.includes("#section-care-menu-v1")
            )
              sharedRules.push(
                rule.cssText.replaceAll(
                  "#section-care-menu-v1",
                  "#section-warning-district",
                ),
              );
          });
        } catch (error) {
          /* 跨域样式表不可读；本地关爱规则仍可复用。 */
        }
      });
      sharedStyle.textContent = sharedRules.join("\n");
      document.head.appendChild(sharedStyle);
      function inWarningScope(r, path) {
        return path.every(function (value, index) {
          return [r.province, r.city, r.district, r.school][index] === value;
        });
      }
      function warningTotals(list) {
        return [
          list.length,
          list.filter(function (r) {
            return r._noCase;
          }).length,
          list.filter(function (r) {
            return !r._noCase;
          }).length,
        ];
      }
      function renderWarningHierarchy() {
        var branch = hierarchy.tree;
        warningPath.forEach(function (name) {
          branch = branch[name];
        });
        var names = Array.isArray(branch) ? branch : Object.keys(branch || {}),
          labels = ["省份", "地市", "区县", "学校"];
        var scoped = examples.filter(function (r) {
          var day = String((r.warning || {}).time || "").slice(0, 10);
          return (
            inWarningScope(r, warningPath) &&
            (!warningDates.start || day >= warningDates.start) &&
            (!warningDates.end || day <= warningDates.end)
          );
        });
        var heads = [labels[warningPath.length]].concat(originalHeads.slice(1));
        function totalCells(list) {
          return warningTotals(list)
            .map(function (count) {
              return "<td>" + count + "</td>";
            })
            .join("");
        }
        summarySection.innerHTML =
          '<div class="crv3-wrap"><div class="crv3-panel"><div class="crv3-head">' +
          (warningPath.length > root.length
            ? '<button type="button" class="crv3-back" data-warning-back>← 返回</button>'
            : "") +
          "<h2>控辍预警汇总" +
          (warningPath.length
            ? "-" + esc(warningPath[warningPath.length - 1])
            : "") +
          '</h2></div><div class="crv3-toolbar"><div class="reg31-filter"><label>预警时间</label><div class="reg31-range"><input type="date" data-warning-start value="' +
          esc(warningDates.start) +
          '"><span>—</span><input type="date" data-warning-end value="' +
          esc(warningDates.end) +
          '"></div></div><span class="crv3-spacer"></span><button type="button" class="crv3-btn query" data-warning-query>查询</button><button type="button" class="crv3-btn reset" data-warning-reset>重置</button></div><div class="crv3-table-wrap"><table class="crv3-table"><thead><tr>' +
          heads
            .map(function (head) {
              return "<th>" + esc(head) + "</th>";
            })
            .join("") +
          "</tr></thead><tbody>" +
          names
            .map(function (name) {
              var matched = scoped.filter(function (r) {
                return inWarningScope(r, warningPath.concat(name));
              });
              return (
                '<tr><td><button type="button" class="crv3-name" data-warning-drill="' +
                esc(name) +
                '">' +
                esc(name) +
                "</button></td>" +
                totalCells(matched) +
                "</tr>"
              );
            })
            .join("") +
          '<tr class="crv3-total"><td>合计</td>' +
          totalCells(scoped) +
          "</tr></tbody></table></div></div></div>";
        var back = summarySection.querySelector("[data-warning-back]");
        if (back)
          back.onclick = function () {
            warningPath.pop();
            renderWarningHierarchy();
          };
        summarySection.querySelector("[data-warning-query]").onclick =
          function () {
            warningDates.start = summarySection.querySelector(
              "[data-warning-start]",
            ).value;
            warningDates.end =
              summarySection.querySelector("[data-warning-end]").value;
            renderWarningHierarchy();
          };
        summarySection.querySelector("[data-warning-reset]").onclick =
          function () {
            warningDates = { start: "2026-09-01", end: "2026-09-30" };
            renderWarningHierarchy();
          };
        summarySection
          .querySelectorAll("[data-warning-drill]")
          .forEach(function (button) {
            button.onclick = function () {
              if (warningPath.length === 3) {
                currentSchool = button.dataset.warningDrill;
                var heading = document.getElementById(
                  "warning-list-school-name",
                );
                if (heading) heading.textContent = "— " + currentSchool;
                var breadcrumb = document.getElementById(
                  "warning-list-breadcrumb",
                );
                if (breadcrumb) breadcrumb.style.display = "flex";
                window.switchPage("warning-list");
                var start = filterInput("date-start"),
                  end = filterInput("date-end");
                if (start) start.value = warningDates.start;
                if (end) end.value = warningDates.end;
                applyFilters();
              } else {
                warningPath.push(button.dataset.warningDrill);
                renderWarningHierarchy();
              }
            };
          });
      }
      var originalMenu = window.cityMenuGo;
      window.cityMenuGo = function (key) {
        var result = originalMenu.apply(this, arguments);
        if (key === "warning-district") {
          warningPath = root.slice();
          renderWarningHierarchy();
        }
        return result;
      };
      window.backToWarningSchool = function () {
        window.switchPage("warning-district");
        renderWarningHierarchy();
      };
      window.backToWarningDistrict = window.backToWarningSchool;
      renderWarningHierarchy();
    }
    document.addEventListener(
      "click",
      function (event) {
        var target = event.target.closest('[data-dom-id^="btn-view-detail-"]');
        if (!target || !table.contains(target)) return;
        selected = target.closest("tr");
        selectedTab = "visit";
      },
      true,
    );
    var original = window.showDetailModal;
    if (typeof original === "function")
      window.showDetailModal = function () {
        var result = original.apply(this, arguments);
        renderDetail();
        return result;
      };
  }
  /* HTML 显式先加载关爱层级模块，再初始化第二版预警适配。 */
  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
