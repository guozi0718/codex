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
  function academicYear(date) {
    var match = String(date || "").match(/^(\d{4})-(\d{2})/);
    return match
      ? String(Number(match[1]) - (Number(match[2]) < 9 ? 1 : 0))
      : "";
  }
  // 共享学生维度筛选，原处理状态、类型、方式和日期控件不替换。
  function studentFilters(scope, prefix, getRows) {
    function input(key) {
      return scope.querySelector('[data-dom-id="' + prefix + key + '"]');
    }
    var nameInput = input("student");
    if (!nameInput) return null;
    var namePair = nameInput.parentElement,
      toolbar = namePair.parentElement;
    var oldClass = input("class");
    if (oldClass) oldClass.parentElement.remove();
    function pair(key, title) {
      var wrapper = namePair.cloneNode(false),
        label = namePair.querySelector("label").cloneNode(true),
        select = document.createElement("select");
      label.textContent = title;
      select.className = nameInput.className;
      select.style.cssText = nameInput.style.cssText;
      select.dataset.domId = prefix + key;
      wrapper.append(label, select);
      toolbar.insertBefore(wrapper, namePair);
      return select;
    }
    var year = pair("year", "学年"),
      grade = pair("grade", "年级"),
      klass = pair("class", "班级");
    toolbar.style.display = "flex";
    toolbar.style.flexWrap = "wrap";
    toolbar.style.gap = "16px 40px";
    Array.from(toolbar.children).forEach(function (wrapper) {
      wrapper.style.whiteSpace = "nowrap";
      wrapper.style.flex = "0 0 auto";
    });
    [year, grade, klass, nameInput].forEach(function (control) {
      control.style.width = control === nameInput ? "170px" : "140px";
      control.style.flex = "0 0 auto";
    });
    function options(control, values, emptyTitle) {
      var previous = control.value;
      control.innerHTML =
        '<option value="">' +
        emptyTitle +
        "</option>" +
        Array.from(new Set(values.filter(Boolean)))
          .sort()
          .map(function (value) {
            return (
              '<option value="' +
              esc(value) +
              '">' +
              esc(control === year ? value + "学年" : value) +
              "</option>"
            );
          })
          .join("");
      control.value = Array.from(control.options).some(function (o) {
        return o.value === previous;
      })
        ? previous
        : "";
    }
    function refresh() {
      var rows = getRows();
      options(
        year,
        rows.map(function (r) {
          return academicYear(r.time);
        }),
        "全部学年",
      );
      var byYear = rows.filter(function (r) {
        return !year.value || academicYear(r.time) === year.value;
      });
      options(
        grade,
        byYear.map(function (r) {
          return r.grade;
        }),
        "全部年级",
      );
      options(
        klass,
        byYear
          .filter(function (r) {
            return !grade.value || r.grade === grade.value;
          })
          .map(function (r) {
            return r.klass;
          }),
        "全部班级",
      );
    }
    year.onchange = function () {
      grade.value = "";
      klass.value = "";
      refresh();
    };
    grade.onchange = function () {
      klass.value = "";
      refresh();
    };
    refresh();
    return {
      matches: function (row) {
        return (
          (!year.value || academicYear(row.time) === year.value) &&
          (!grade.value || row.grade === grade.value) &&
          (!klass.value || row.klass === klass.value) &&
          (!nameInput.value.trim() || row.name.includes(nameInput.value.trim()))
        );
      },
      reset: function () {
        year.value = "";
        grade.value = "";
        klass.value = "";
        nameInput.value = "";
        refresh();
      },
    };
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
    var warningCases = window.CARE_WARNING_CASES || [];
    window.CARE_WARNING_CASES = warningCases;
    function isProcessed(r) {
      return r._processed === undefined ? !r._noCase : r._processed;
    }
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
      // 每所学校至少12条预警，覆盖无关爱、待处理、已处理与长文本；
      // 新增预警样例不伪造关爱内容，也不写入第一版个案台账。
      var demoNames = [
        "周子涵",
        "吴思远",
        "郑雨桐",
        "钱嘉宁",
        "冯梓轩",
        "褚若溪",
        "卫晨曦",
        "蒋乐言",
        "沈书航",
        "韩可欣",
        "杨沐阳",
        "朱欣然",
      ];
      function addWarningExamples(branch, path) {
        if (!Array.isArray(branch)) {
          Object.keys(branch || {}).forEach(function (name) {
            addWarningExamples(branch[name], path.concat(name));
          });
          return;
        }
        branch.forEach(function (schoolName) {
          var existing = examples.filter(function (r) {
            return (
              r.province === path[0] &&
              r.city === path[1] &&
              r.district === path[2] &&
              r.school === schoolName
            );
          }).length;
          for (var i = existing; i < 12; i++) {
            var kind = i % 3;
            examples.push({
              name: demoNames[i],
              grade: [
                "七年级（2025级）",
                "八年级（2024级）",
                "九年级（2023级）",
              ][kind],
              className: (i % 4) + 1 + "班",
              school: schoolName,
              province: path[0],
              city: path[1],
              district: path[2],
              warning: {
                type: ["连续缺勤", "周期缺勤", "连续请假"][kind],
                reason: [
                  "连续缺勤3个工作日（09-15~09-17）",
                  "10个工作日内缺勤4个工作日（09-14、09-17、09-22、09-25）",
                  "连续请假3个工作日（09-21~09-23）",
                ][kind],
                time:
                  "2026-09-" +
                  String([18, 25, 23][kind] + Math.floor(i / 3)).padStart(
                    2,
                    "0",
                  ) +
                  " 09:30",
              },
              _noCase: true,
              _processed: kind !== 0,
              _result: kind
                ? "已联系家长核实缺勤原因，约定由班主任持续了解学生的到校与学习情况。"
                : "--",
            });
          }
        });
      }
      if (window.CARE_REGULATOR_V31)
        addWarningExamples(window.CARE_REGULATOR_V31.tree, []);
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
            done = isProcessed(r);
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
            (done ? esc(r._result || "已联系家长并开展劝返") : "--") +
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
      currentSchool = "",
      listPage = 1,
      pageSize = 10,
      listFooter = table.parentElement.nextElementSibling;
    if (!listFooter) {
      listFooter = document.createElement("div");
      table.parentElement.after(listFooter);
    }
    listFooter.className = "care-warning-ledger-footer";
    listFooter.addEventListener("click", function (event) {
      var button = event.target.closest("[data-warning-page]");
      if (!button || button.disabled) return;
      listPage = Number(button.dataset.warningPage);
      applyFilters(false);
      table.parentElement.scrollTop = 0;
    });
    var section = document.getElementById("section-warning-list");
    var dimensions = studentFilters(section, "filter-", function () {
      return rows.map(info);
    });
    var visitSection = document.getElementById("section-visit-ledger");
    if (visitSection && window.schoolCareV3Data) {
      function visitRows() {
        return Array.from(visitSection.querySelectorAll("tbody tr")).filter(
          function (row) {
            return row.cells.length > 6;
          },
        );
      }
      function visitInfo(row) {
        return {
          name: row.cells[3].textContent.trim(),
          grade: row.cells[4].textContent.trim(),
          klass: row.cells[5].textContent.trim(),
          time: row.cells[1].textContent.trim(),
        };
      }
      var visitDimensions = studentFilters(
        visitSection,
        "visit-filter-",
        function () {
          return visitRows().map(visitInfo);
        },
      );
      visitSection.addEventListener(
        "click",
        function (event) {
          var button = event.target.closest(
            '[data-dom-id="btn-visit-search"],[data-dom-id="btn-visit-reset"]',
          );
          if (!button) return;
          event.preventDefault();
          event.stopImmediatePropagation();
          function field(key) {
            return visitSection.querySelector(
              '[data-dom-id="visit-filter-' + key + '"]',
            );
          }
          if (button.dataset.domId === "btn-visit-reset") {
            visitDimensions.reset();
            ["method", "date-start", "date-end"].forEach(function (key) {
              if (field(key)) field(key).value = "";
            });
          }
          var methods = {
            phone: "电话沟通",
            visit: "实地劝返",
            wechat: "微信问询",
            "school-visit": "到校劝返",
            meeting: "集中座谈",
          };
          var method = field("method").value,
            start = field("date-start").value,
            end = field("date-end").value;
          visitRows().forEach(function (row) {
            var info = visitInfo(row);
            row.hidden = !(
              visitDimensions.matches(info) &&
              (!method ||
                row.cells[2].textContent.trim() ===
                  (methods[method] || method)) &&
              (!start || info.time.slice(0, 10) >= start) &&
              (!end || info.time.slice(0, 10) <= end)
            );
          });
        },
        true,
      );
    }
    function filterInput(key) {
      return section.querySelector('[data-dom-id="filter-' + key + '"]');
    }
    function resetInputs() {
      if (dimensions) dimensions.reset();
      ["student", "class", "status", "type"].forEach(function (key) {
        var input = filterInput(key);
        if (input) input.value = "";
      });
      var start = filterInput("date-start"),
        end = filterInput("date-end");
      if (start) start.value = "2026-09-01";
      if (end) end.value = "2026-09-30";
    }
    function applyFilters(resetPage) {
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
      var matched = rows.filter(function (row) {
        var w = info(row),
          classNumber = String(klass).match(/(\d+)$/),
          schoolOK =
            !currentSchool || row.dataset.warningSchool === currentSchool;
        return (
          schoolOK &&
          (!dimensions || dimensions.matches(w)) &&
          (!name || w.name.includes(name)) &&
          (!klass ||
            w.klass === klass ||
            w.klass.includes((classNumber ? classNumber[1] : klass) + "班")) &&
          (!status ||
            w.status === (status === "pending" ? "待处理" : "已处理")) &&
          (!type || w.type === typeText) &&
          (!start || w.time.slice(0, 10) >= start) &&
          (!end || w.time.slice(0, 10) <= end)
        );
      });
      if (resetPage !== false) listPage = 1;
      var totalPages = Math.max(1, Math.ceil(matched.length / pageSize));
      listPage = Math.min(listPage, totalPages);
      var startIndex = (listPage - 1) * pageSize;
      rows.forEach(function (row) {
        row.hidden = true;
      });
      matched.slice(startIndex, startIndex + pageSize).forEach(function (row) {
        row.hidden = false;
      });
      listFooter.innerHTML =
        "<span>显示 " +
        (matched.length ? startIndex + 1 : 0) +
        "–" +
        Math.min(startIndex + pageSize, matched.length) +
        " 条，共 " +
        matched.length +
        ' 条</span><div class="care-warning-ledger-pages">' +
        '<button type="button" data-warning-page="' +
        (listPage - 1) +
        '"' +
        (listPage === 1 ? " disabled" : "") +
        ">上一页</button><span>" +
        listPage +
        " / " +
        totalPages +
        '</span><button type="button" data-warning-page="' +
        (listPage + 1) +
        '"' +
        (listPage === totalPages ? " disabled" : "") +
        ">下一页</button></div>";
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
          return (
            !r.deletedAt &&
            !r.superseded &&
            (r.warningId === w.id || (r.warningIds || []).includes(w.id))
          );
        })
        .map(window.CARE_RECORD_V3.normalize)
        .sort(window.CARE_RECORD_V3.compare);
    }
    function seed() {
      rows.forEach(function (row, index) {
        var w = info(row);
        /* 只在初始化演示数据时按静态行定位；后续查看始终使用显式 warningId。 */
        if (index === 0) {
          var first = records.find(function (r) {
            return (
              !r.deletedAt &&
              !r.superseded &&
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
              type: "家庭突发变故学生",
              method: "常态化家访与家校沟通",
              result: "已与家长沟通返校安排，约定持续关注学生返校情况。",
              follow: "需要",
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
              method: "学业帮扶与个性化辅导",
              result: "已再次了解学生返校后的适应情况，并约定继续跟进。",
              follow: "需要",
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
            type: "学业困难学生",
            method: "学业帮扶与个性化辅导",
            result: "已了解缺勤原因并建立持续联系。",
            follow: "不需要",
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
      th.textContent = "关爱次数";
      th.className = head.lastElementChild.className;
      head.insertBefore(th, head.lastElementChild);
      table.classList.add("care-warning-ledger");
      table.parentElement.classList.add("care-warning-ledger-scroll");
      table.parentElement.tabIndex = 0;
      table.parentElement.setAttribute(
        "aria-label",
        "预警列表，可左右滑动查看字段",
      );
      var columns = document.createElement("colgroup");
      [90, 140, 60, 90, 180, 150, 90, 190, 130, 90, 180].forEach(
        function (width) {
          var col = document.createElement("col");
          col.style.width = width + "px";
          columns.appendChild(col);
        },
      );
      table.prepend(columns);
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
        [4, 7].forEach(function (index) {
          var cell = row.cells[index],
            text = cell.textContent.trim(),
            span = document.createElement("span");
          cell.classList.add("care-warning-long-cell");
          span.className = "care-warning-cell-text";
          span.title =
            cell.title || (cell.querySelector("[title]") || {}).title || text;
          span.textContent = text;
          cell.replaceChildren(span);
        });
        var statusCell = row.cells[6],
          statusText = statusCell.textContent.trim(),
          badge = document.createElement("span");
        badge.className =
          "care-warning-status " +
          (statusText === "待处理" ? "pending" : "done");
        badge.textContent = statusText;
        statusCell.replaceChildren(badge);
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
      button.textContent = chain.length + "次";
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
    function careEvidence(w) {
      var first = warningCase(w);
      if (!first) return { caseEvidence: [] };
      if (window.careCaseEvidenceItemsV3(first).length) return first;
      var ids = [w.id].concat(first.referenceWarningIds || []);
      return {
        caseEvidence: {
          控辍保学: rows
            .map(info)
            .filter(function (item) {
              return ids.includes(item.id);
            })
            .map(function (item) {
              return item.reason + "（" + item.time + "）";
            }),
        },
      };
    }
    function warningCase(w) {
      return warningCases.find(function (c) {
        return (
          !c.deletedAt &&
          (c.warningId === w.id || (c.warningIds || []).includes(w.id))
        );
      });
    }
    function evidenceField(w) {
      var count = window.careCaseEvidenceItemsV3(careEvidence(w)).length;
      return (
        '<div class="care-warning-web-row"><span>关联信息</span><span>' +
        (count
          ? '<button type="button" class="care-evidence-button" data-web-evidence>关联' +
            count +
            "条信息</button>"
          : "--") +
        "</span></div>"
      );
    }
    function careCards(w) {
      var chain = linked(w),
        c = warningCase(w);
      return (
        '<div class="care-warning-web-heading"><b>关爱情况（共' +
        chain.length +
        "次）</b></div>" +
        (c
          ? '<div class="care-warning-web-card" data-warning-case-info>' +
            field("创建日期", c.caseCreatedAt || c.createdAt || c.date) +
            field("关爱来源", "控辍保学") +
            evidenceField(w) +
            field("关爱类型", (c.caseTypes || [c.type]).join("、")) +
            field("关爱原因", c.caseReason || c.careReason || w.reason) +
            "</div>"
          : "") +
        (chain.length
          ? chain
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
                  field("继续跟进", r.follow) +
                  field("填写人", r.filledByName) +
                  field(
                    "填写时间",
                    window.CARE_RECORD_V3.displayTime(r.filledAt),
                  ) +
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
      var evidenceButton = root.querySelector("[data-web-evidence]");
      if (evidenceButton)
        evidenceButton.onclick = function () {
          window.openCareEvidenceV3(careEvidence(w));
        };
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
    rows.forEach(function (row) {
      var w = info(row),
        first = linked(w)[0];
      if (first && !warningCase(w))
        warningCases.push(Object.assign({}, first, { id: first.caseId }));
    });
    decorateRows();
    applyFilters();
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
            return !isProcessed(r);
          }).length,
          list.filter(function (r) {
            return isProcessed(r);
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
    // 同一交付页提供第一期两种入口，链接直达不依赖菜单默认态。
    function routeEntry() {
      var hash = window.location.hash;
      if (hash === "#care-v1") {
        if (school) window.schoolMenuGo("care");
        else window.cityCareOpen();
      } else if (hash === "#care-v2") {
        if (school) window.schoolMenuGo("warning-list");
        else window.cityMenuGo("warning-district");
      }
    }
    window.addEventListener("hashchange", routeEntry);
    routeEntry();
  }
  /* HTML 显式先加载关爱层级模块，再初始化第二版预警适配。 */
  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
