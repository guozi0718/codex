/* 关爱个案 V3：个案与每次关爱分离。仅增强关爱模块，不改变其他菜单。 */
(function () {
  "use strict";
  var TYPE_OPTIONS = window.CARE_DICTIONARY_V1.typeLabels;
  var SOURCE_OPTIONS = [
    "辍学预警",
    "心理测评",
    "班主任发现",
    "任课教师反映",
    "学生主动反映",
    "家长反映",
    "困难学生",
    "欺凌事件",
    "其他",
  ];
  var METHOD_OPTIONS = window.CARE_DICTIONARY_V1.methodLabels;
  var DEMO_WARNING_EVIDENCE = [
    "连续缺勤2个工作日（09-28~09-29）",
    "10个工作日内缺勤4个工作日（09-14、09-17、09-22、09-25）",
    "连续缺勤2个工作日（09-21~09-22）",
    "10个工作日内缺勤3个工作日（09-09、09-15、09-18）",
    "连续缺勤3个工作日（09-15~09-17）",
    "10个工作日内缺勤2个工作日（09-03、09-10）",
    "连续缺勤2个工作日（09-09~09-10）",
    "10个工作日内缺勤2个工作日（09-01、09-08）",
  ];
  var DEMO_PSYCH_EVIDENCE = [
    "（本学期）重点关注（09-29测评）",
    "（本学期）一般关注（09-25测评）",
    "（本学期）紧急关注（09-22测评）",
    "（本学期）无需关注（09-18测评）",
    "（本学期）重点关注（09-15测评）",
    "（本学期）一般关注（09-12测评）",
    "（本学期）无需关注（09-09测评）",
  ];
  var SCHOOL_YEAR = window.CARE_ACADEMIC_YEAR_RANGE || {
    start: "2026-09-01",
    end: "2027-08-31",
  };
  function el(id) {
    return document.getElementById(id);
  }
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  function short(value, n) {
    var chars = Array.from(String(value || ""));
    return chars.length > n
      ? chars.slice(0, n).join("") + "..."
      : chars.join("");
  }
  function today() {
    var d = new Date();
    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0"),
    ].join("-");
  }
  window.careCaseEnumHtmlV3 = function (value) {
    var full = String(value || "--");
    return (
      '<span class="care-enum-value" title="' +
      esc(full) +
      '">' +
      esc(short(full, 10)) +
      "</span>"
    );
  };
  function person() {
    return window.CARE_CURRENT_USER_ID || "teacher-wang-demo";
  }
  function role() {
    return window.CARE_CURRENT_ROLE || "班主任";
  }
  function stamp() {
    return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  }
  function personName() {
    return window.CARE_CURRENT_USER_NAME || "王老师";
  }
  function normalizeRecord(r, index) {
    r.filledById = r.filledById || r.createdById || "teacher-wang-demo";
    r.filledByName = r.filledByName || "王老师";
    r.filledByRole = r.filledByRole || "班主任";
    r.revision = r.revision || 1;
    r.filledAt =
      r.filledAt ||
      (r.date || "2026-09-01") +
        "T" +
        String(9 + ((index || 0) % 8)).padStart(2, "0") +
        ":31:00+08:00";
    r.originalFilledAt = r.originalFilledAt || r.filledAt;
    r.follow = r.follow || (r.status === "need" ? "需要" : "不需要");
    delete r.next;
    delete r.status;
    return r;
  }
  function compareRecords(a, b) {
    return (
      String(a.date || "").localeCompare(String(b.date || "")) ||
      Date.parse(a.filledAt) - Date.parse(b.filledAt) ||
      String(a.id || "").localeCompare(String(b.id || ""))
    );
  }
  function sortedRecords(records) {
    return records.map(normalizeRecord).slice().sort(compareRecords);
  }
  function displayTime(value) {
    if (!value || !Number.isFinite(Date.parse(value))) return "--";
    var parts = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(new Date(value));
    return parts;
  }
  var auditLog =
    window.CARE_OPERATION_ARCHIVE || (window.CARE_OPERATION_ARCHIVE = []);
  function archive(operation, c, before, after) {
    auditLog.push(
      JSON.parse(
        JSON.stringify({
          operation: operation,
          caseId: c.id,
          warningIds: c.warningIds || [],
          operatorId: person(),
          operatorName: personName(),
          operatorRole: role(),
          operatedAt: stamp(),
          before: before,
          after: after,
        }),
      ),
    );
  }
  window.CARE_RECORD_V3 = {
    normalize: normalizeRecord,
    sorted: sortedRecords,
    compare: compareRecords,
    displayTime: displayTime,
  };
  function toast(s) {
    if (typeof window.toast === "function") window.toast(s);
    else alert(s);
  }
  function proofImages(list) {
    return (list || [])
      .slice(0, 9)
      .map(function (src, i) {
        return (
          '<img src="' +
          esc(typeof src === "string" ? src : (src && src.src) || "") +
          '" alt="证明材料' +
          (i + 1) +
          '" onclick="openPhotoViewer(this)">'
        );
      })
      .join("");
  }
  function caseEvidenceGroups(record) {
    if (!record) return [];
    var raw =
        record.caseEvidence != null
          ? record.caseEvidence
          : record.evidence != null
            ? record.evidence
            : record.dataSource,
      groups = [];
    function add(category, value) {
      var values = [];
      function collect(x) {
        if (Array.isArray(x)) {
          x.forEach(collect);
          return;
        }
        if (x && typeof x === "object") {
          if (x.text || x.label || x.summary) {
            collect(x.text || x.label || x.summary);
            return;
          }
          Object.keys(x).forEach(function (k) {
            collect(x[k]);
          });
          return;
        }
        var s = String(x == null ? "" : x).trim();
        if (s && s !== "--" && !values.includes(s)) values.push(s);
      }
      collect(value);
      if (values.length) groups.push({ category: category, items: values });
    }
    if (
      raw &&
      typeof raw === "object" &&
      !Array.isArray(raw) &&
      !raw.text &&
      !raw.label &&
      !raw.summary
    ) {
      Object.keys(raw).forEach(function (k) {
        add(k, raw[k]);
      });
    } else {
      var source =
        record.sourceKey === "psych" || record.source === "心理测评"
          ? "心理测评"
          : record.sourceKey === "warning" || record.source === "预警信息"
            ? "控辍保学"
            : "关联信息";
      add(source, raw);
    }
    return groups;
  }
  function caseEvidenceItems(record) {
    return caseEvidenceGroups(record).reduce(function (a, g) {
      return a.concat(g.items);
    }, []);
  }
  window.careCaseEvidenceItemsV3 = caseEvidenceItems;
  window.openCareEvidenceV3 = function (record, mobile) {
    var groups = caseEvidenceGroups(record),
      count = caseEvidenceItems(record).length;
    if (!count) return;
    var host = mobile ? document.querySelector(".phone") : document.body,
      old = document.querySelector(".care-evidence-mask");
    if (old) old.remove();
    var mask = document.createElement("div");
    mask.className =
      "care-evidence-mask" + (mobile ? " care-evidence-mobile" : "");
    mask.innerHTML =
      '<div class="care-evidence-dialog" role="dialog" aria-modal="true" aria-label="关联信息"><div class="care-evidence-title"><b>关联信息（共' +
      count +
      '条）</b></div><div class="care-evidence-list">' +
      groups
        .map(function (g) {
          return (
            "<section><h4>" +
            esc(
              g.category === "辍学预警"
                ? "关联控辍保学"
                : g.category === "心理测评"
                  ? "关联心理测评"
                  : g.category,
            ) +
            "</h4><ol>" +
            g.items
              .map(function (item) {
                return "<li>" + esc(item) + "</li>";
              })
              .join("") +
            "</ol></section>"
          );
        })
        .join("") +
      '</div><button type="button" class="care-evidence-close">关闭</button></div>';
    mask.onclick = function (e) {
      if (
        e.target === mask ||
        e.target.classList.contains("care-evidence-close")
      )
        mask.remove();
    };
    host.appendChild(mask);
  };
  var style = document.createElement("style");
  style.id = "care-case-v3-style";
  style.textContent = `
  *{scrollbar-width:none;-ms-overflow-style:none}*::-webkit-scrollbar{width:0!important;height:0!important;display:none!important}
  .care-evidence-button{border:0;background:none;padding:0;color:#078d42;cursor:pointer;font:inherit}.care-evidence-mask{position:fixed;inset:0;z-index:2147483100;background:rgba(15,27,45,.42);display:flex;align-items:center;justify-content:center}.care-evidence-dialog{width:min(640px,calc(100vw - 32px));max-height:70vh;display:flex;flex-direction:column;box-sizing:border-box;background:#fff;border-radius:8px;box-shadow:0 10px 35px #0003;padding:18px;color:#203451}.care-evidence-title{border-bottom:1px solid #e5ebf3;padding-bottom:12px;font-size:15px}.care-evidence-list{overflow-y:auto;max-height:270px;min-height:0;padding:8px 0 0;font-size:13px;line-height:1.6}.care-evidence-list section{padding:2px 0 8px}.care-evidence-list h4{font-size:13px;margin:8px 0;color:#365a8c}.care-evidence-list ol{margin:0;padding-left:24px}.care-evidence-list li{display:list-item;padding:8px 0;border-bottom:1px solid #eef1f6;white-space:normal;overflow-wrap:anywhere;word-break:break-word;text-overflow:clip;line-height:1.65}.care-evidence-close{align-self:flex-end;min-width:60px;height:32px;margin-top:12px;padding:0 12px;border:1px solid #d5dfed;border-radius:5px;background:#fff;color:#506480;cursor:pointer;font-size:12px}.care-evidence-mobile{position:absolute;align-items:flex-end}.care-evidence-mobile .care-evidence-dialog{width:100%;max-height:65%;border-radius:14px 14px 0 0;padding:16px}.care-evidence-mobile .care-evidence-list{max-height:230px}.care-evidence-mobile .care-evidence-close{align-self:stretch;width:100%;height:36px;background:#3079ed;border-color:#3079ed;color:#fff}.care-evidence-mobile .care-evidence-button{color:#3079ed}#section-care-menu-v1 table th.care-enum-cell,#section-care-menu-v1 table td.care-enum-cell{text-align:center!important;white-space:nowrap!important}.care-enum-value{display:inline-block;white-space:nowrap}
  .care-demo-switch{position:fixed;top:8px;left:12px;z-index:100;font:12px/24px system-ui,sans-serif;color:#526581;background:#fff;padding:3px 8px;border:1px solid #dce5f1;border-radius:6px}.care-demo-switch select{font:inherit;color:#243f64;border:0;background:#fff;max-width:190px}@media(max-width:700px){.care-demo-switch{left:50%;transform:translateX(-50%);top:4px;white-space:nowrap}}
  #sc-care-menu .cv3-list-shell{display:flex;flex-direction:column;height:100%;min-height:0;background:var(--bg)}
  #sc-care-menu .cv3-scroll{flex:1;min-height:0;overflow:auto;padding:12px 16px 18px}
  #sc-care-menu .cv3-search{width:100%;box-sizing:border-box;height:39px;border:1px solid #dce5f1;border-radius:20px;padding:0 15px;background:#fff}
  #sc-care-menu .cv3-count{font-size:11px;color:#8a99af;margin:12px 1px}
  #sc-care-menu .cv3-case{background:#fff;border-radius:14px;padding:14px;margin-bottom:11px;box-shadow:0 3px 12px rgba(34,67,120,.06)}
  .cv3-student{display:flex;align-items:center;gap:10px;margin-bottom:10px}.cv3-avatar{display:grid;place-items:center;border-radius:50%;width:43px;height:43px;background:#e7f0fd;color:#2358a6;font-weight:700}
  .cv3-student b{font-size:15px;color:#152d51}.cv3-sub{font-size:11px;color:#8a9ab1;margin-top:3px}
  .cv3-kv{display:flex;align-items:flex-start;gap:10px;min-height:32px;box-sizing:border-box;padding:6px 0;margin:0;font-size:12px;line-height:20px}.cv3-kv .k{color:#8a9ab1;flex:0 0 66px;font-size:11px}.cv3-kv .v{color:#1e3556;min-width:0;overflow-wrap:anywhere;white-space:pre-wrap}
  .cv3-result-summary{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
  .cv3-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}.cv3-actions button,.cv3-edit-controls button{height:32px;box-sizing:border-box;border:1px solid #d5dfed;background:#fff;border-radius:7px;padding:0 12px;color:#506480;font-size:12px;font-weight:400;line-height:30px}.cv3-actions .danger{border-color:#d5dfed;color:#506480}
  .cv3-bottom{flex:0 0 auto;background:#fff;padding:10px 16px 15px}.cv3-bottom button{width:100%;height:36px;border:1px solid #3079ed;border-radius:7px;background:#3079ed;color:#fff;font-size:12px}.cv3-bottom button:disabled{border-color:#b9c7d9;background:#b9c7d9}
  .cv3-screen .body{min-height:0;background:var(--bg)}.cv3-pad{padding:12px 16px 18px}.cv3-card{background:#fff;border-radius:14px;padding:14px;margin-bottom:12px;box-shadow:0 3px 12px rgba(34,67,120,.05)}
  .cv3-title{font-size:12px;color:#607798;font-weight:600;margin:16px 2px 8px}.cv3-field{margin:0;min-height:46px;box-sizing:border-box;display:flex;align-items:center;gap:10px}
  .cv3-field label{flex:0 0 83px;font-size:11px;color:#607798}.cv3-field .req{color:#e45555}.cv3-field select,.cv3-field input{flex:1;min-width:0;border:0;background:transparent;text-align:right;color:#1e3556;font:inherit;font-size:12px;padding:10px 2px;box-sizing:border-box}
  .cv3-field select:disabled,.cv3-field input:disabled{color:#9aa8bb}.cv3-field textarea{width:100%;min-height:90px;box-sizing:border-box;padding:10px;border:1px solid #dce5f1;border-radius:7px;resize:vertical;font:inherit;font-size:12px;color:#1e3556}
  .cv3-field.stack{display:block;padding:12px 0}.cv3-field.stack label{display:block;margin-bottom:9px}.cv3-field.stack small{display:block;color:#96a5b9;margin-top:6px;font-size:11px;line-height:16px}
  .cv3-picker-head{width:100%;border:0;background:none;display:flex;align-items:center;justify-content:space-between;min-height:46px;text-align:right;color:#1e3556;font-size:12px}
  .cv3-picker-head::after{content:'';width:7px;height:7px;flex:0 0 7px;display:inline-block;border-right:1.5px solid #506480;border-bottom:1.5px solid #506480;transform:translateY(-2px) rotate(45deg);align-self:center;margin-left:7px}
  .cv3-picker-row .cv3-picker-head{width:auto;flex:1;min-width:0;justify-content:flex-end;gap:6px}.cv3-picker-row [data-summary]{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cv3-warning-source{margin-left:auto;font-size:12px;color:#1e3556}
  .cv3-picker-overlay{position:absolute;inset:0;z-index:2147482001;background:rgba(18,31,53,.48);display:flex;align-items:flex-end}.cv3-picker-sheet{width:100%;max-height:70%;box-sizing:border-box;display:flex;flex-direction:column;background:#fff;border-radius:14px 14px 0 0;padding:16px}.cv3-picker-title{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#1e3556}.cv3-picker-title button{border:0;background:none;color:#8a9ab1;font-size:12px}.cv3-picker-options{overflow:auto;padding:12px 0;min-height:0}.cv3-picker-options label{display:flex;align-items:center;gap:10px;min-height:42px;font-size:12px;color:#1e3556}.cv3-picker-options input{accent-color:#3079ed}.cv3-picker-confirm{width:100%;height:36px;border:1px solid #3079ed;border-radius:7px;background:#3079ed;color:#fff;font-size:12px}
  .cv3-note{font-size:11px;color:#8d9fb7;line-height:16px;margin:7px 0}.cv3-evidence{padding:12px 0}.cv3-evidence b{font-size:12px;color:#36506f}.cv3-evidence label{display:flex;gap:8px;align-items:flex-start;padding:8px 0;font-size:12px;line-height:20px}
  .cv3-secondary{display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 12px;background:#fff;border:1px solid #d5dfed;color:#506480;border-radius:7px;font-size:12px}
  .cv3-record-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:12px}.cv3-record-top b{color:#25456c}
  .cv3-photos{display:grid;grid-template-columns:repeat(3,58px);gap:7px;margin-top:9px}.cv3-photos img{width:58px;height:58px;object-fit:cover;border-radius:6px;border:1px solid #e0e7f1;cursor:pointer}
  .cv3-thumb{position:relative;width:58px;height:58px}.cv3-thumb button{position:absolute;right:-5px;top:-5px;width:18px;height:18px;border:0;border-radius:50%;background:#e95555;color:#fff;font-size:13px;line-height:18px;padding:0}
  .cv3-upload{height:32px;border:1px solid #d5dfed;background:#fff;border-radius:7px;padding:0 12px;color:#506480;font-size:12px}.cv3-edit-controls{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}
  .cv3-record-top [data-remove-care]{height:30px;padding:0 12px;border:1px solid #d5dfed;border-radius:7px;background:#fff;color:#506480;font-size:12px}
  .cv3-photos .cv3-upload{width:58px;height:58px;padding:0;border:1px dashed #b9c9de;background:#f7faff;display:grid;place-items:center;font-size:20px;color:#8297b5}
  .cv3-photos .cv3-upload[hidden]{display:none}
  #cv3-add-record{display:block;margin:0 auto;min-width:132px;height:36px;border-color:#3079ed;background:#3079ed;color:#fff;font-size:12px}
  .cv3-select-trigger,.cv3-date-trigger{flex:1;min-width:0;border:0;background:transparent;display:flex;align-items:center;justify-content:flex-end;gap:6px;text-align:right;color:#1e3556;font-size:12px;min-height:45px;padding:0 2px}
  .cv3-select-trigger::after,.cv3-date-trigger::after{content:'';width:7px;height:7px;flex:0 0 7px;display:inline-block;border-right:1.5px solid #506480;border-bottom:1.5px solid #506480;transform:translateY(-2px) rotate(45deg);align-self:center;margin-left:3px}
  .phone select{appearance:none!important;-webkit-appearance:none!important;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath d='m3 5 4 4 4-4' fill='none' stroke='%23506480' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:right 7px center!important;padding-right:22px!important}
  .cv3-select-trigger:disabled,.cv3-date-trigger:disabled{color:#9aa8bb}
  .cv3-picker-options.five-rows{max-height:234px;overflow-y:auto}.cv3-picker-options label{line-height:1.6;overflow-wrap:anywhere}.cv3-picker-options input{flex:0 0 auto}.cv3-select-value{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cv3-calendar-nav{display:flex;justify-content:space-between;align-items:center;margin:14px 0}.cv3-calendar-nav button{border:1px solid #d5dfed;background:#fff;border-radius:7px;width:32px;height:30px;color:#506480}.cv3-calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.cv3-calendar-grid span,.cv3-calendar-grid button{height:34px;display:grid;place-items:center;font-size:12px}.cv3-calendar-grid button{border:0;border-radius:7px;background:#fff;color:#1e3556}.cv3-calendar-grid button:disabled{color:#c7d0dd}.cv3-calendar-grid button.on{background:#3079ed;color:#fff}
  .cv3-screen .sub-hd{position:relative}.cv3-help-dot{position:absolute;right:110px;top:14px;width:13px;height:13px;border:0;border-radius:50%;background:#e54d56;box-shadow:0 0 0 3px #fff;padding:0}.cv3-help-pop{position:absolute;right:12px;top:48px;z-index:12;width:220px;padding:10px 12px;border:1px solid #dce5f1;border-radius:8px;background:#fff;box-shadow:0 5px 20px rgba(30,53,86,.16);font-size:11px;line-height:1.5;color:#607798}
  .cv3-dialog{position:absolute;inset:0;z-index:2147482000;background:rgba(18,31,53,.5);display:grid;place-items:center}.cv3-dialog-box{width:min(320px,calc(100% - 44px));background:#fff;border-radius:13px;padding:18px;box-sizing:border-box}.cv3-dialog-box h3{margin:0 0 11px;font-size:15px}.cv3-dialog-box p{font-size:12px;line-height:1.5}.cv3-dialog-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:18px}.cv3-dialog-actions button{height:32px;border:1px solid #d5dfed;background:#fff;border-radius:7px;padding:0 12px;color:#506480;font-size:12px}.cv3-dialog-actions .confirm{border-color:#3079ed;background:#3079ed;color:#fff}
  `;
  document.head.appendChild(style);
  // 旧版原型在 window.load 中还会重写关爱菜单与详情函数；待其完成后再接入个案层。
  function boot() {
    if (el("sc-care-menu")) initTeacher();
    else if (el("section-care-menu-v1")) initWeb();
  }
  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);

  function initTeacher() {
    var oldRows = window.teacherCareRows || [];
    var teacherCases = [];
    var groups = {};
    oldRows.forEach(function (r) {
      if (r.deletedAt || r.superseded) return;
      var key = r.caseId || r.id || r.name;
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    });
    Object.keys(groups).forEach(function (key, idx) {
      var rows = groups[key].sort(function (a, b) {
          return String(a.date).localeCompare(String(b.date));
        }),
        first = rows[0],
        gradeClass = String(first.cls || "").split("·");
      var type = first.type;
      var source =
        first.source === "心理测评"
          ? "心理测评"
          : first.source === "预警" || first.source === "预警信息"
            ? "辍学预警"
            : "班主任发现";
      teacherCases.push({
        id: "cv3-" + key,
        name: first.name,
        grade: (gradeClass[0] || "七年级（2025级）").trim(),
        klass: (gradeClass[1] || "2班").trim(),
        studentId: first.studentId || first.name,
        school: "市实验一小",
        createdAt: first.caseCreatedAt || first.date,
        createdById: first.createdById || person(),
        types: [type],
        sources: [source],
        evidence: {
          辍学预警:
            source === "辍学预警"
              ? [first.sourceInfo || first.warningReason || "连续缺勤3个工作日"]
              : [],
          心理测评:
            source === "心理测评" ? [first.sourceInfo || "重点关注学生"] : [],
        },
        reason:
          source === "辍学预警"
            ? "该生近期连续缺勤，需要了解原因并持续开展关爱。"
            : source === "心理测评"
              ? "测评提示该生需要重点关注，应及时沟通并提供支持。"
              : "该生学习遇到困难，需要持续关注和帮助。",
        caseVersions: [],
        records: rows.map(function (r, i) {
          return {
            id: r.id || key + "-" + i,
            date: r.date,
            people: r.people || "王老师",
            method: r.method || "--",
            result: r.result || "",
            proofs: (r.proofs || []).slice(0, 9),
            follow: r.follow === "需要" ? "需要" : "不需要",
            filledById: r.filledById || r.createdById || person(),
            filledByName: r.filledByName || "王老师",
            filledAt: r.filledAt,
          };
        }),
      });
    });
    if (!teacherCases.length)
      teacherCases = [
        {
          id: "cv3-demo-1",
          name: "张小明",
          grade: "七年级（2025级）",
          klass: "2班",
          studentId: "张小明",
          school: "市实验一小",
          createdAt: "2026-09-18",
          createdById: person(),
          types: ["学业困难学生"],
          sources: ["辍学预警"],
          evidence: { 辍学预警: DEMO_WARNING_EVIDENCE.slice() },
          reason: "该生近期连续缺勤，需要了解原因并持续开展关爱。",
          caseVersions: [],
          records: [],
        },
      ];
    teacherCases.forEach(function (c) {
      c.records = sortedRecords(c.records);
      if (
        c.name === "张小明" &&
        c.sources.includes("辍学预警") &&
        (c.evidence["辍学预警"] || []).length === 1
      )
        c.evidence["辍学预警"] = DEMO_WARNING_EVIDENCE.slice();
      if (
        c.name === "李小红" &&
        c.sources.includes("心理测评") &&
        (c.evidence["心理测评"] || []).length === 1
      )
        c.evidence["心理测评"] = DEMO_PSYCH_EVIDENCE.slice();
    });
    window.CARE_CASE_V3_DATA = teacherCases;
    var demoRoster = [
      {
        name: "张小明",
        grade: "七年级（2025级）",
        klass: "2班",
        status: "在读",
        homeroomTeachers: ["王老师", "李老师"],
      },
      {
        name: "李小红",
        grade: "七年级（2025级）",
        klass: "1班",
        status: "在读",
        homeroomTeachers: ["李老师"],
      },
      {
        name: "陈小强",
        grade: "八年级（2024级）",
        klass: "3班",
        status: "在读",
        homeroomTeachers: ["陈老师"],
      },
    ];
    [
      "一年级（2026级）",
      "二年级（2025级）",
      "三年级（2024级）",
      "四年级（2023级）",
      "五年级（2022级）",
      "六年级（2021级）",
      "七年级（2025级）",
      "八年级（2024级）",
    ].forEach(function (grade, gi) {
      for (var ci = 1; ci <= 6; ci++) {
        ["赵一诺", "钱子涵", "孙可欣", "周宇辰", "吴思源", "郑嘉怡"].forEach(
          function (name, si) {
            demoRoster.push({
              name: name,
              grade: grade,
              klass: ci + "班",
              status: "在读",
              homeroomTeachers:
                ci === 2 && gi === 6
                  ? ["王老师", "李老师"]
                  : [
                      [
                        "王老师",
                        "李老师",
                        "陈老师",
                        "赵老师",
                        "周老师",
                        "吴老师",
                      ][ci - 1],
                    ],
            });
          },
        );
      }
    });
    var roster = (window.CARE_TEACHER_STUDENT_ROSTER || demoRoster).filter(
      function (x) {
        return !x.status || x.status === "在读" || x.status === "active";
      },
    );
    var currentCase = null,
      formMode = "new",
      editingRecord = null,
      editingRevision = null,
      recordCase = null,
      recordBackTarget = "sc-case-v3-detail",
      caseReturn = "sc-care-menu",
      caseSelections = {},
      evidenceSelections = {},
      warningSetup = null,
      photosByRoot = new WeakMap();
    var menu = el("sc-care-menu"),
      menuBody = menu.querySelector(".body");
    // 静态菜单位于文档末尾，必须与所有移动页面共用手机定位容器。
    var phone = document.querySelector(".phone");
    phone.appendChild(menu);
    if (!menu.querySelector(".statusbar") && phone.querySelector(".statusbar"))
      menu.prepend(phone.querySelector(".statusbar").cloneNode(true));
    function alignPickerActions(overlay) {
      var sheet = overlay.querySelector(".cv3-picker-sheet");
      if (!sheet || sheet.querySelector(".cv3-picker-actions")) return;
      var cancel = sheet.querySelector(".cv3-picker-title button"),
        confirm = sheet.querySelector(".cv3-picker-confirm");
      if (!cancel || !confirm) return;
      var actions = document.createElement("div");
      actions.className = "cv3-picker-actions";
      cancel.classList.add("cv3-picker-cancel");
      actions.append(cancel, confirm);
      sheet.appendChild(actions);
    }
    function mountPicker(sheet) {
      alignPickerActions(sheet);
      document.querySelector(".phone").appendChild(sheet);
    }
    var pickerStyle = document.createElement("style");
    pickerStyle.textContent =
      ".cv3-picker-actions{display:flex;gap:12px;flex-shrink:0;margin-top:12px}.cv3-picker-actions button{flex:1;width:0;height:36px;border-radius:7px;font-size:12px}.cv3-picker-cancel{border:1px solid #dce5f1;background:#fff;color:#536b90}.cv3-picker-hint{font-size:12px;line-height:1.6;color:#8292aa;margin:10px 0 0}";
    document.head.appendChild(pickerStyle);
    pickerStyle.textContent +=
      ".cv3-record-actions{display:flex;flex-direction:column;gap:8px}.cv3-record-actions button{height:42px;border:0;border-radius:7px;background:#f5f8fc;font:inherit;font-size:14px;color:#203451}.cv3-record-actions [data-action=delete]{color:#d24f4f}.cv3-kv .v{white-space:normal;overflow-wrap:anywhere}#sc-detail .cv3-card{background:#fff;border-radius:14px;padding:14px;margin-bottom:10px}";
    menuBody.innerHTML =
      '<div class="cv3-list-shell"><div class="cv3-scroll"><input class="cv3-search" id="cv3-search" placeholder="搜索学生姓名"><div class="cv3-count" id="cv3-count"></div><div id="cv3-list"></div></div><div class="cv3-bottom"><button type="button" id="cv3-new">新增关爱个案</button></div></div>';
    menu.querySelector(".sub-hd b").textContent = "关爱个案";
    var legacyAdd = document.querySelector("#care-mobile-upload > button");
    if (legacyAdd) legacyAdd.textContent = "新增关爱个案";
    menuBody.querySelector("#cv3-search").oninput = renderList;
    el("cv3-new").onclick = function () {
      openCaseForm("new");
    };
    var statusBar =
      menu.querySelector(".statusbar") || document.querySelector(".statusbar");
    function screen(id, title) {
      var s = document.createElement("div");
      s.className = "screen cv3-screen";
      s.id = id;
      if (statusBar) s.appendChild(statusBar.cloneNode(true));
      s.innerHTML +=
        '<div class="sub-hd"><button type="button" class="back">‹</button><b>' +
        title +
        '</b><span class="capsule" style="margin-left:auto"><span class="half"><span class="cap-dots"><i></i><i></i><i></i></span></span><span class="half"><span class="cap-ring"></span></span></span></div><div class="body"><div class="cv3-pad"></div></div><div class="cv3-bottom"><button type="button"></button></div>';
      document.querySelector(".phone").appendChild(s);
      return s;
    }
    var caseForm = screen("sc-case-v3-add", "新增关爱个案"),
      detail = screen("sc-case-v3-detail", "关爱个案详情"),
      recordForm = screen("sc-case-v3-record", "新建关爱"),
      warningScreen = screen("sc-case-v3-warning-setup", "确认关爱信息");
    function addHelp(target, message) {
      var head = target.querySelector(".sub-hd"),
        dot = document.createElement("button"),
        pop = document.createElement("div");
      dot.className = "cv3-help-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "提示文案");
      pop.className = "cv3-help-pop";
      pop.hidden = true;
      pop.textContent = message;
      dot.onclick = function () {
        pop.hidden = !pop.hidden;
      };
      head.appendChild(dot);
      head.appendChild(pop);
      return function () {
        pop.hidden = true;
      };
    }
    var closeCaseHelp = addHelp(
        caseForm,
        "请选择学生并填写个案信息；可在建案时新增多次关爱。",
      ),
      closeRecordHelp = addHelp(
        recordForm,
        "关爱时间不能晚于今天；证明材料最多上传九张。",
      ),
      closeWarningHelp = addHelp(
        warningScreen,
        "先确认关爱类型和关爱原因，下一步填写关爱内容；提交首条关爱后形成个案。",
      );
    caseForm.querySelector(".back").onclick = function () {
      go(caseReturn);
    };
    detail.querySelector(".back").onclick = function () {
      go("sc-care-menu");
      renderList();
    };
    recordForm.querySelector(".back").onclick = function () {
      if (recordBackTarget === "sc-case-v3-detail") renderDetail();
      go(recordBackTarget);
    };
    warningScreen.querySelector(".back").onclick = function () {
      closePicker();
      closeWarningHelp();
      go((warningSetup && warningSetup.origin) || "sc-list");
    };
    function callGo(id) {
      if (typeof window.go === "function") window.go(id);
    }
    function getCase(id) {
      return teacherCases.find(function (c) {
        return c.id === id;
      });
    }
    function sourceText(c) {
      return c.sources.join("、") || "--";
    }
    function typeText(c) {
      return c.types.join("、") || "--";
    }
    function inYear(date) {
      return (
        String(date || "") >= SCHOOL_YEAR.start &&
        String(date || "") <= SCHOOL_YEAR.end
      );
    }
    function canTake(c) {
      if (
        window.CARE_CURRENT_PERMISSIONS &&
        window.CARE_CURRENT_PERMISSIONS.care === false
      )
        return false;
      var students = window.CARE_AUTHORIZED_STUDENT_IDS,
        classes = window.CARE_AUTHORIZED_CLASS_KEYS;
      if (Array.isArray(students)) return students.includes(c.studentId);
      if (Array.isArray(classes))
        return classes.includes(c.grade + "|" + c.klass);
      return true;
    }
    function latest(c) {
      return sortedRecords(c.records).at(-1);
    }
    function row(k, v, extra) {
      return (
        '<div class="cv3-kv"><span class="k">' +
        esc(k) +
        '</span><span class="v ' +
        (extra || "") +
        '">' +
        (v || "--") +
        "</span></div>"
      );
    }
    function renderList() {
      el("cv3-new").disabled = !!(
        window.CARE_CURRENT_PERMISSIONS &&
        window.CARE_CURRENT_PERMISSIONS.care === false
      );
      var search = (el("cv3-search") || {}).value || "";
      var list = teacherCases
        .filter(function (c) {
          return (
            c.createdAt >= SCHOOL_YEAR.start &&
            c.createdAt <= SCHOOL_YEAR.end &&
            (!search || c.name.includes(search))
          );
        })
        .sort(function (a, b) {
          return b.createdAt.localeCompare(a.createdAt);
        });
      el("cv3-count").textContent = "本学年共 " + list.length + " 个关爱个案";
      el("cv3-list").innerHTML =
        list
          .map(function (c) {
            var last = latest(c);
            return (
              '<div class="cv3-case" data-id="' +
              esc(c.id) +
              '"><div class="cv3-student"><span class="cv3-avatar">' +
              esc(c.name.slice(0, 1)) +
              '</span><span style="flex:1"><b>' +
              esc(c.name) +
              "</b> " +
              '<div class="cv3-sub">' +
              esc(c.grade + " · " + c.klass) +
              "</div></span></div>" +
              row("创建日期", esc(c.createdAt)) +
              row("关爱类型", esc(typeText(c))) +
              row("关爱来源", esc(sourceText(c))) +
              row("关爱原因", esc(c.reason)) +
              row("关爱次数", c.records.length + "次") +
              (last
                ? row("最近关爱", esc(last.date)) +
                  row(
                    "关爱结果",
                    '<span class="cv3-result-summary">' +
                      esc(last.result) +
                      "</span>",
                  )
                : "") +
              '<div class="cv3-actions"><button type="button" class="danger" data-act="delete" ' +
              (!canTake(c) ||
              (window.CARE_CURRENT_PERMISSIONS &&
                window.CARE_CURRENT_PERMISSIONS.delete === false)
                ? "disabled"
                : "") +
              ">删除个案</button></div></div>"
            );
          })
          .join("") ||
        '<div class="cv3-note" style="text-align:center;padding:28px">暂无符合条件的关爱个案</div>';
      el("cv3-list")
        .querySelectorAll(".cv3-case")
        .forEach(function (card) {
          card.onclick = function (e) {
            var c = getCase(card.dataset.id),
              act = e.target.dataset.act;
            if (!c) return;
            if (act === "delete") {
              if (c.records.length) {
                toast("请先删除全部关爱内容，再删除个案");
                return;
              }
              if (
                !canTake(c) ||
                (window.CARE_CURRENT_PERMISSIONS &&
                  window.CARE_CURRENT_PERMISSIONS.delete === false)
              ) {
                toast("暂无权限");
                return;
              }
              var caseRevision = c.revision || 0;
              confirmBox(
                "删除个案",
                "确认删除该关爱个案？删除后不可恢复！",
                function () {
                  if (
                    !teacherCases.includes(c) ||
                    (c.revision || 0) !== caseRevision ||
                    c.records.length ||
                    !canTake(c) ||
                    (window.CARE_CURRENT_PERMISSIONS &&
                      window.CARE_CURRENT_PERMISSIONS.delete === false)
                  ) {
                    toast("个案已变化或暂无权限，请重新检查");
                    return;
                  }
                  archive("delete-case", c, c, null);
                  teacherCases.splice(teacherCases.indexOf(c), 1);
                  renderList();
                  toast("已删除关爱个案");
                },
              );
              return;
            }
            currentCase = c;
            renderDetail();
            callGo("sc-case-v3-detail");
          };
        });
    }
    function confirmBox(title, body, yes) {
      var old = el("cv3-confirm");
      if (old) old.remove();
      var m = document.createElement("div");
      m.className = "cv3-dialog";
      m.id = "cv3-confirm";
      m.innerHTML =
        '<div class="cv3-dialog-box"><h3>' +
        esc(title) +
        "</h3><p>" +
        esc(body) +
        '</p><div class="cv3-dialog-actions"><button type="button" data-close>取消</button><button type="button" class="confirm" data-yes>确定</button></div></div>';
      m.querySelector("[data-close]").onclick = function () {
        m.remove();
      };
      m.querySelector("[data-yes]").onclick = function () {
        m.remove();
        yes();
      };
      document.querySelector(".phone").appendChild(m);
    }
    function choices(opts, chosen, kind, locked) {
      return (
        '<div class="cv3-field cv3-picker-row"><label>' +
        kind +
        '<span class="req">*</span></label><button type="button" class="cv3-picker-head" data-picker="' +
        kind +
        '" ' +
        (locked ? "disabled" : "") +
        '><span data-summary="' +
        kind +
        '">' +
        esc(chosen.join("、") || "请选择" + kind) +
        "</span></button></div>"
      );
    }
    function caseFormHtml(c) {
      var lock = !!(c && c.records.length),
        editing = !!c,
        grades = Array.from(
          new Set(
            roster.map(function (x) {
              return x.grade;
            }),
          ),
        ),
        selectedGrade = (c && c.grade) || "",
        selectedClass = (c && c.klass) || "",
        selectedName = (c && c.name) || "";
      return (
        '<div class="cv3-title">学生信息</div><div class="cv3-card">' +
        '<div class="cv3-field"><label>年级<span class="req">*</span></label><select id="cv3-grade" ' +
        (editing ? "disabled" : "") +
        '><option value="" disabled hidden>请选择年级</option>' +
        grades
          .map(function (g) {
            return (
              "<option " +
              (g === selectedGrade ? "selected" : "") +
              ">" +
              esc(g) +
              "</option>"
            );
          })
          .join("") +
        "</select></div>" +
        '<div class="cv3-field"><label>班级<span class="req">*</span></label><select id="cv3-class" ' +
        (editing ? "disabled" : "") +
        "></select></div>" +
        '<div class="cv3-field"><label>学生姓名<span class="req">*</span></label><select id="cv3-student" ' +
        (editing ? "disabled" : "") +
        "></select></div></div>" +
        '<div class="cv3-title">个案信息</div><div class="cv3-card">' +
        choices(SOURCE_OPTIONS, (c && c.sources) || [], "关爱来源", lock) +
        '<div id="cv3-evidence"></div>' +
        choices(TYPE_OPTIONS, (c && c.types) || [], "关爱类型", false) +
        '<div class="cv3-field stack"><label>关爱原因<span class="req">*</span></label><textarea id="cv3-reason" maxlength="100" placeholder="请概述需要关爱的实际情况，最多100字">' +
        esc((c && c.reason) || "") +
        "</textarea></div></div>" +
        (!editing
          ? '<div class="cv3-title">关爱情况</div><div id="cv3-records"></div><div class="cv3-card"><button type="button" class="cv3-secondary" id="cv3-add-record">新建关爱</button></div>'
          : "")
      );
    }
    function selected(kind) {
      return (caseSelections[kind] || []).slice();
    }
    function syncSummary(kind) {
      var target = caseForm.querySelector('[data-summary="' + kind + '"]'),
        values = selected(kind);
      if (target) target.textContent = values.join("、") || "请选择" + kind;
    }
    function closePicker() {
      var sheet = el("cv3-picker-overlay");
      if (sheet) sheet.remove();
    }
    function openPicker(kind) {
      var opts = kind === "关爱类型" ? TYPE_OPTIONS : SOURCE_OPTIONS,
        chosen = new Set(selected(kind)),
        phone = document.querySelector(".phone");
      closePicker();
      var sheet = document.createElement("div");
      sheet.id = "cv3-picker-overlay";
      sheet.className = "cv3-picker-overlay";
      sheet.innerHTML =
        '<div class="cv3-picker-sheet"><div class="cv3-picker-title"><b>选择' +
        kind +
        '</b><button type="button" data-picker-cancel>取消</button></div><div class="cv3-picker-options five-rows">' +
        opts
          .map(function (o) {
            return (
              '<label><input type="checkbox" value="' +
              esc(o) +
              '" ' +
              (chosen.has(o) ? "checked" : "") +
              ">" +
              esc(o) +
              "</label>"
            );
          })
          .join("") +
        '</div><button type="button" class="cv3-picker-confirm" data-picker-confirm>确定</button></div>';
      sheet.onclick = function (e) {
        if (e.target === sheet) closePicker();
      };
      sheet.querySelector("[data-picker-cancel]").onclick = closePicker;
      sheet.querySelector("[data-picker-confirm]").onclick = function () {
        caseSelections[kind] = Array.from(
          sheet.querySelectorAll(".cv3-picker-options input:checked"),
        ).map(function (x) {
          return x.value;
        });
        syncSummary(kind);
        if (kind === "关爱来源")
          renderEvidence(formMode === "edit" ? currentCase : null, true);
        closePicker();
      };
      mountPicker(sheet);
    }
    function evidenceItems(key, name) {
      var external =
          key === "辍学预警"
            ? window.CARE_WARNING_RECORDS
            : window.CARE_PSYCH_RECORDS,
        dates =
          key === "辍学预警"
            ? [
                "2026-09-29",
                "2026-09-25",
                "2026-09-22",
                "2026-09-19",
                "2026-09-17",
                "2026-09-12",
                "2026-09-10",
                "2026-09-08",
              ]
            : [
                "2026-09-29",
                "2026-09-25",
                "2026-09-22",
                "2026-09-18",
                "2026-09-15",
                "2026-09-12",
                "2026-09-09",
              ],
        demo = (
          key === "辍学预警" ? DEMO_WARNING_EVIDENCE : DEMO_PSYCH_EVIDENCE
        ).map(function (text, i) {
          return { studentName: name, date: dates[i], text: text };
        });
      return (Array.isArray(external) ? external : demo)
        .filter(function (x) {
          return (
            (x.studentName || x.name) === name &&
            x.date >= SCHOOL_YEAR.start &&
            x.date <= SCHOOL_YEAR.end
          );
        })
        .map(function (x) {
          return x.text || x.label || x.summary || x.date;
        });
    }
    function evidenceLabel(key) {
      return key === "辍学预警" ? "关联控辍保学" : "关联心理测评";
    }
    function renderEvidence(c) {
      var source = selected("关爱来源"),
        target = el("cv3-evidence");
      if (!target) return;
      target.innerHTML = ["辍学预警", "心理测评"]
        .filter(function (k) {
          return source.includes(k);
        })
        .map(function (k) {
          var count = (evidenceSelections[k] || []).length;
          return (
            '<div class="cv3-field cv3-picker-row"><label>' +
            evidenceLabel(k) +
            '</label><button type="button" class="cv3-picker-head" data-evidence-picker="' +
            k +
            '" ' +
            (c && c.records.length ? "disabled" : "") +
            '><span data-evidence-summary="' +
            k +
            '">' +
            (count ? "已选" + count + "条关联信息" : "请选择关联信息") +
            "</span></button></div>"
          );
        })
        .join("");
      target
        .querySelectorAll("[data-evidence-picker]")
        .forEach(function (button) {
          button.onclick = function () {
            openEvidencePicker(button.dataset.evidencePicker);
          };
        });
    }
    function openEvidencePicker(key) {
      var name = (el("cv3-student") || {}).value;
      if (!name) {
        toast("请先选择学生");
        return;
      }
      var opts = Array.from(
          new Set(
            evidenceItems(key, name).concat(evidenceSelections[key] || []),
          ),
        ),
        order = (evidenceSelections[key] || []).slice(),
        chosen = new Set(order);
      closePicker();
      var sheet = document.createElement("div");
      sheet.id = "cv3-picker-overlay";
      sheet.className = "cv3-picker-overlay";
      sheet.innerHTML =
        '<div class="cv3-picker-sheet"><div class="cv3-picker-title"><b>' +
        evidenceLabel(key) +
        '</b><button type="button" data-picker-cancel>取消</button></div><div class="cv3-picker-options five-rows">' +
        (opts.length
          ? opts
              .map(function (x) {
                return (
                  '<label><input type="checkbox" value="' +
                  esc(x) +
                  '" ' +
                  (chosen.has(x) ? "checked" : "") +
                  ">" +
                  esc(x) +
                  "</label>"
                );
              })
              .join("")
          : '<p class="cv3-note">本学年暂无该学生对应数据信息</p>') +
        '</div><button type="button" class="cv3-picker-confirm" data-picker-confirm>确定</button></div>';
      sheet.onclick = function (e) {
        if (e.target === sheet) closePicker();
      };
      sheet
        .querySelectorAll(".cv3-picker-options input")
        .forEach(function (input) {
          input.onchange = function () {
            order = order.filter(function (x) {
              return x !== input.value;
            });
            if (input.checked) order.push(input.value);
          };
        });
      sheet.querySelector("[data-picker-cancel]").onclick = closePicker;
      sheet.querySelector("[data-picker-confirm]").onclick = function () {
        evidenceSelections[key] = order;
        renderEvidence(formMode === "edit" ? currentCase : null);
        closePicker();
      };
      mountPicker(sheet);
    }
    function refreshSelect(select) {
      var button = select && select.nextElementSibling;
      if (button && button.classList.contains("cv3-select-trigger")) {
        var value =
          select.value ||
          (select.options[0] && select.options[0].textContent) ||
          "请选择";
        var span = document.createElement("span");
        span.className = "cv3-select-value";
        span.textContent = value;
        button.replaceChildren(span);
        button.title = value;
        button.disabled = select.disabled;
      }
    }
    function bindSelectSheet(select, title) {
      if (
        !select ||
        (select.nextElementSibling &&
          select.nextElementSibling.classList.contains("cv3-select-trigger"))
      ) {
        refreshSelect(select);
        return;
      }
      select.style.display = "none";
      var button = document.createElement("button");
      button.type = "button";
      button.className = "cv3-select-trigger";
      select.after(button);
      refreshSelect(select);
      button.onclick = function () {
        if (select.disabled) return;
        closePicker();
        var multiple = title === "执行人员",
          values = multiple
            ? Array.from(
                new Set(
                  [
                    "王老师",
                    "李老师",
                    "陈老师",
                    "赵老师",
                    "周老师",
                    "吴老师",
                    "孙老师",
                    "郑老师",
                  ].concat(
                    String(select.value || "")
                      .split("、")
                      .filter(Boolean),
                  ),
                ),
              ).map(function (x) {
                return { value: x, textContent: x };
              })
            : Array.from(select.options).filter(function (o) {
                return o.value && !o.disabled;
              }),
          selected = String(select.value || "").split("、"),
          sheet = document.createElement("div");
        sheet.id = "cv3-picker-overlay";
        sheet.className = "cv3-picker-overlay";
        sheet.innerHTML =
          '<div class="cv3-picker-sheet"><div class="cv3-picker-title"><b>选择' +
          title +
          '</b><button type="button" data-picker-cancel>取消</button></div><div class="cv3-picker-options five-rows">' +
          (values.length
            ? values
                .map(function (o) {
                  return (
                    '<label><input type="' +
                    (multiple ? "checkbox" : "radio") +
                    '" ' +
                    (multiple ? "" : 'name="cv3-single" ') +
                    'value="' +
                    esc(o.value) +
                    '" ' +
                    ((
                      multiple
                        ? selected.includes(o.value)
                        : o.value === select.value
                    )
                      ? "checked"
                      : "") +
                    ">" +
                    esc(o.textContent) +
                    "</label>"
                  );
                })
                .join("")
            : '<p class="cv3-note">暂无可选信息</p>') +
          '</div><button type="button" class="cv3-picker-confirm" data-picker-confirm>确定</button></div>';
        sheet.onclick = function (e) {
          if (e.target === sheet) closePicker();
        };
        sheet.querySelector("[data-picker-cancel]").onclick = closePicker;
        sheet.querySelector("[data-picker-confirm]").onclick = function () {
          var checked = Array.from(sheet.querySelectorAll("input:checked")),
            value = multiple
              ? checked
                  .map(function (x) {
                    return x.value;
                  })
                  .join("、")
              : checked[0] && checked[0].value;
          if (value) {
            if (
              !Array.from(select.options).some(function (o) {
                return o.value === value;
              })
            )
              select.add(new Option(value, value));
            select.value = value;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            refreshSelect(select);
          }
          closePicker();
        };
        mountPicker(sheet);
      };
    }
    function localToday() {
      var d = new Date();
      return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0"),
      ].join("-");
    }
    function homeroomForCurrentStudent(root) {
      var fromCaseForm = caseForm.contains(root),
        c = fromCaseForm ? null : recordCase,
        name = fromCaseForm ? (el("cv3-student") || {}).value : c && c.name,
        grade = fromCaseForm ? (el("cv3-grade") || {}).value : c && c.grade,
        klass = fromCaseForm ? (el("cv3-class") || {}).value : c && c.klass,
        student = roster.find(function (x) {
          return x.name === name && x.grade === grade && x.klass === klass;
        }),
        raw =
          (student &&
            (student.homeroomTeachers ||
              student.classTeachers ||
              student.homeroomTeacher ||
              student.classTeacher)) ||
          window.CARE_CURRENT_TEACHER_NAME ||
          "王老师";
      return (Array.isArray(raw) ? raw : String(raw).split(/[、,，]/))
        .map(function (x) {
          return String(x).trim();
        })
        .filter(Boolean)
        .join("、");
    }
    function bindDateSheet(input) {
      if (
        !input ||
        (input.nextElementSibling &&
          input.nextElementSibling.classList.contains("cv3-date-trigger"))
      )
        return;
      input.style.display = "none";
      var button = document.createElement("button");
      button.type = "button";
      button.className = "cv3-date-trigger";
      input.after(button);
      function refresh() {
        button.textContent = input.value || "请选择日期";
        button.disabled = input.disabled;
      }
      refresh();
      button.onclick = function () {
        if (input.disabled) return;
        closePicker();
        var selected = input.value || localToday(),
          parts = selected.split("-").map(Number),
          year = parts[0],
          month = parts[1],
          sheet = document.createElement("div");
        sheet.id = "cv3-picker-overlay";
        sheet.className = "cv3-picker-overlay";
        sheet.innerHTML =
          '<div class="cv3-picker-sheet"><div class="cv3-picker-title"><b>选择' +
          "关爱时间" +
          '</b><button type="button" data-picker-cancel>取消</button></div><div class="cv3-calendar-nav"><button type="button" data-prev>‹</button><b data-month></b><button type="button" data-next>›</button></div><div class="cv3-calendar-grid" data-calendar></div></div>';
        var pendingDate = input.value;
        var confirmDate = document.createElement("button");
        confirmDate.type = "button";
        confirmDate.className = "cv3-picker-confirm";
        confirmDate.textContent = "确定";
        confirmDate.onclick = function () {
          if (!pendingDate) return;
          input.value = pendingDate;
          input.dispatchEvent(new Event("change", { bubbles: true }));
          refresh();
          closePicker();
        };
        sheet.querySelector(".cv3-picker-sheet").appendChild(confirmDate);
        function draw() {
          sheet.querySelector("[data-month]").textContent =
            year + "年" + month + "月";
          var first = new Date(year, month - 1, 1).getDay(),
            days = new Date(year, month, 0).getDate(),
            html = ["日", "一", "二", "三", "四", "五", "六"]
              .map(function (x) {
                return "<span>" + x + "</span>";
              })
              .join("");
          for (var i = 0; i < first; i++) html += "<span></span>";
          for (var day = 1; day <= days; day++) {
            var value = [
                year,
                String(month).padStart(2, "0"),
                String(day).padStart(2, "0"),
              ].join("-"),
              blocked = value > localToday();
            html +=
              '<button type="button" data-day="' +
              value +
              '" ' +
              (blocked ? "disabled" : "") +
              ' class="' +
              (value === pendingDate ? "on" : "") +
              '">' +
              day +
              "</button>";
          }
          sheet.querySelector("[data-calendar]").innerHTML = html;
          sheet.querySelectorAll("[data-day]").forEach(function (b) {
            b.onclick = function () {
              pendingDate = b.dataset.day;
              draw();
            };
          });
        }
        sheet.querySelector("[data-prev]").onclick = function () {
          month--;
          if (month < 1) {
            month = 12;
            year--;
          }
          draw();
        };
        sheet.querySelector("[data-next]").onclick = function () {
          month++;
          if (month > 12) {
            month = 1;
            year++;
          }
          draw();
        };
        sheet.querySelector("[data-picker-cancel]").onclick = closePicker;
        sheet.onclick = function (e) {
          if (e.target === sheet) closePicker();
        };
        draw();
        mountPicker(sheet);
      };
    }
    function fillCascade(c) {
      var grade = el("cv3-grade"),
        klass = el("cv3-class"),
        stu = el("cv3-student");
      if (!grade || !klass || !stu) return;
      function updateClass() {
        var list = Array.from(
          new Set(
            roster
              .filter(function (x) {
                return x.grade === grade.value;
              })
              .map(function (x) {
                return x.klass;
              }),
          ),
        );
        klass.innerHTML =
          '<option value="" disabled hidden>请选择班级</option>' +
          list
            .map(function (x) {
              return (
                "<option " +
                (c && c.klass === x ? "selected" : "") +
                ">" +
                esc(x) +
                "</option>"
              );
            })
            .join("");
        if (!c) klass.value = "";
        updateStudent();
        refreshSelect(klass);
      }
      function updateStudent() {
        var list = roster.filter(function (x) {
          return x.grade === grade.value && x.klass === klass.value;
        });
        stu.innerHTML =
          '<option value="" disabled hidden>请选择学生</option>' +
          list
            .map(function (x) {
              return (
                "<option " +
                (c && c.name === x.name ? "selected" : "") +
                ">" +
                esc(x.name) +
                "</option>"
              );
            })
            .join("");
        if (!c) stu.value = "";
        evidenceSelections = {};
        renderEvidence(c);
        refreshSelect(stu);
      }
      grade.onchange = function () {
        updateClass();
        refreshSelect(grade);
      };
      klass.onchange = function () {
        updateStudent();
        refreshSelect(klass);
      };
      stu.onchange = function () {
        evidenceSelections = {};
        renderEvidence(c);
        refreshSelect(stu);
      };
      if (c) grade.value = c.grade;
      else grade.value = "";
      updateClass();
    }
    function bindCaseForm(c) {
      caseSelections = {
        关爱类型: (c && c.types.slice()) || [],
        关爱来源: (c && c.sources.slice()) || [],
      };
      fillCascade(c);
      evidenceSelections = JSON.parse(JSON.stringify((c && c.evidence) || {}));
      renderEvidence(c);
      [
        ["cv3-grade", "年级"],
        ["cv3-class", "班级"],
        ["cv3-student", "学生姓名"],
      ].forEach(function (pair) {
        bindSelectSheet(el(pair[0]), pair[1]);
      });
      caseForm.querySelectorAll("[data-picker]").forEach(function (button) {
        button.onclick = function () {
          openPicker(button.dataset.picker);
        };
      });
      var button = el("cv3-add-record");
      if (button)
        button.onclick = function () {
          var holder = el("cv3-records"),
            card = document.createElement("div");
          card.innerHTML = careFields(
            null,
            true,
            holder.querySelectorAll("[data-care-fields]").length + 1,
          );
          card = card.firstElementChild;
          holder.appendChild(card);
          bindCareFields(card, null);
          card.querySelector("[data-remove-care]").onclick = function () {
            photosByRoot.delete(card);
            card.remove();
            holder
              .querySelectorAll("[data-care-fields] .cv3-record-top b")
              .forEach(function (title, i) {
                title.textContent = "第" + (i + 1) + "次关爱";
              });
          };
        };
    }
    function openCaseForm(mode, c) {
      if (
        (window.CARE_CURRENT_PERMISSIONS &&
          window.CARE_CURRENT_PERMISSIONS.care === false) ||
        (mode === "edit" && (!c || !canTake(c) || c.createdById !== person()))
      ) {
        toast("暂无权限");
        return;
      }
      closePicker();
      closeCaseHelp();
      formMode = mode;
      var existing = mode === "edit" ? c : null;
      if (existing) currentCase = existing;
      caseReturn = mode === "edit" ? "sc-case-v3-detail" : "sc-care-menu";
      caseForm.querySelector(".sub-hd b").textContent =
        mode === "edit" ? "编辑个案" : "新增关爱个案";
      caseForm.querySelector(".cv3-pad").innerHTML = caseFormHtml(existing);
      caseForm.querySelector(".cv3-bottom button").textContent = "确定";
      caseForm.querySelector(".cv3-bottom button").onclick = saveCase;
      bindCaseForm(existing);
      callGo("sc-case-v3-add");
    }
    function snapshot(c) {
      return {
        types: c.types.slice(),
        sources: c.sources.slice(),
        evidence: JSON.parse(JSON.stringify(c.evidence)),
        reason: c.reason,
      };
    }
    function readEvidence() {
      var result = {};
      ["辍学预警", "心理测评"].forEach(function (key) {
        if (selected("关爱来源").includes(key))
          result[key] = (evidenceSelections[key] || []).slice();
      });
      return result;
    }
    function readCare(root) {
      if (root.dataset.uploading === "1") {
        toast("图片上传处理中，请稍后");
        return null;
      }
      var date = root.querySelector("[data-care-date]"),
        people = root.querySelector("[data-care-people]"),
        method = root.querySelector("[data-care-method]"),
        result = root.querySelector("[data-care-result]"),
        follow = root.querySelector("[data-care-follow]");
      if (!date.value || !/^\d{4}-\d{2}-\d{2}$/.test(date.value)) {
        toast("请选择关爱时间（YYYY-MM-DD）");
        return null;
      }
      if (date.value > localToday()) {
        toast("关爱时间不能晚于今天");
        return null;
      }
      if (!people.value) {
        toast("请选择执行人员");
        return null;
      }
      if (!METHOD_OPTIONS.includes(method.value)) {
        toast("请选择关爱方式");
        return null;
      }
      if (!result.value.trim()) {
        toast("请填写关爱结果");
        return null;
      }
      if (!follow.value) {
        toast("请选择是否继续跟进");
        return null;
      }
      return {
        date: date.value,
        people: people.value,
        method: method.value,
        result: result.value.trim(),
        follow: follow.value,
        proofs: (photosByRoot.get(root) || []).slice(0, 9),
      };
    }
    function saveCase() {
      var grade = el("cv3-grade").value,
        klass = el("cv3-class").value,
        name = el("cv3-student").value,
        types = selected("关爱类型"),
        sources = selected("关爱来源"),
        reason = el("cv3-reason").value.trim(),
        old = formMode === "edit" ? currentCase : null;
      if (old && old.records.length) {
        toast("已有的关爱内容，个案信息不可编辑");
        return;
      }
      if (!grade || !klass || !name) {
        toast("请依次选择年级、班级、学生姓名");
        return;
      }
      if (
        !types.length ||
        types.some(function (value) {
          return !TYPE_OPTIONS.includes(value);
        })
      ) {
        toast("请选择关爱类型");
        return;
      }
      if (!sources.length) {
        toast("请选择关爱来源");
        return;
      }
      if (!reason) {
        toast("请填写关爱原因");
        return;
      }
      if (Array.from(reason).length > 100) {
        toast("关爱原因最多100字");
        return;
      }
      var evidence = readEvidence();
      var recordHolder = el("cv3-records"),
        cards = recordHolder
          ? Array.from(recordHolder.querySelectorAll("[data-care-fields]"))
          : [],
        careValues = [];
      for (var i = 0; i < cards.length; i++) {
        var values = readCare(cards[i]);
        if (!values) return;
        careValues.push(values);
      }
      if (!canTake(old || { studentId: name, grade: grade, klass: klass })) {
        toast("暂无权限");
        return;
      }
      if (old) {
        if (old.createdById !== person() || !inYear(old.createdAt)) {
          toast("暂无权限");
          return;
        }
        var before = snapshot(old);
        old.types = types;
        old.reason = reason;
        if (!old.records.length) {
          old.sources = sources;
          old.evidence = evidence;
        }
        var changed = JSON.stringify(before) !== JSON.stringify(snapshot(old));
        if (changed) archive("edit-case", old, before, snapshot(old));
        if (changed) old.revision = (old.revision || 0) + 1;
        if (changed)
          old.caseVersions.push({
            version: old.caseVersions.length + 1,
            before: before,
            after: snapshot(old),
            editedById: person(),
            editedByRole: role(),
            editedAt: stamp(),
          });
        currentCase = old;
        renderDetail();
        callGo("sc-case-v3-detail");
        toast("个案已更新");
        return;
      }
      var c = {
        id: "cv3-" + Date.now(),
        name: name,
        grade: grade,
        klass: klass,
        studentId: name,
        school: "市实验一小",
        createdAt: today(),
        createdById: person(),
        createdByRole: role(),
        types: types,
        sources: sources,
        evidence: evidence,
        reason: reason,
        caseVersions: [],
        records: [],
      };
      c.caseVersions.push({
        version: 1,
        kind: "create",
        after: snapshot(c),
        filledById: person(),
        filledByRole: role(),
        filledAt: stamp(),
      });
      careValues.forEach(function (values) {
        addRecord(c, values);
      });
      teacherCases.unshift(c);
      renderList();
      callGo(caseReturn);
      toast(
        careValues.length
          ? "个案及" + careValues.length + "次关爱已创建"
          : "个案已创建",
      );
    }
    function careFields(r, first, sequence) {
      return (
        '<div data-care-fields class="cv3-card"><div class="cv3-record-top"><b>' +
        (first ? "第" + sequence + "次关爱" : "关爱内容") +
        "</b>" +
        (first ? '<button type="button" data-remove-care>取消</button>' : "") +
        "</div>" +
        '<div class="cv3-field"><label>关爱时间<span class="req">*</span></label><input data-care-date type="text" placeholder="请选择日期" value="' +
        esc((r && r.date) || localToday()) +
        '"></div>' +
        '<div class="cv3-field"><label>执行人员<span class="req">*</span></label><select data-care-people><option value="" disabled hidden>请选择执行人员</option>' +
        [
          "王老师",
          "李老师",
          "陈老师",
          "赵老师",
          "周老师",
          "吴老师",
          "孙老师",
          "郑老师",
          "王老师、李老师",
          "王老师、李老师、陈老师",
        ]
          .map(function (x) {
            return (
              "<option " +
              (r && r.people === x ? "selected" : "") +
              ">" +
              x +
              "</option>"
            );
          })
          .join("") +
        "</select></div>" +
        '<div class="cv3-field"><label>关爱方式<span class="req">*</span></label><select data-care-method><option value="" disabled hidden ' +
        (!(r && r.method) ? "selected" : "") +
        ">请选择关爱方式</option>" +
        METHOD_OPTIONS.map(function (x) {
          return (
            "<option " +
            (r && r.method === x ? "selected" : "") +
            ">" +
            x +
            "</option>"
          );
        }).join("") +
        "</select></div>" +
        '<div class="cv3-field stack"><label>关爱结果<span class="req">*</span></label><textarea data-care-result placeholder="请填写关爱过程和结果">' +
        esc((r && r.result) || "") +
        "</textarea></div>" +
        '<div class="cv3-field stack"><label>证明材料</label><input type="file" data-file accept="image/jpeg,image/jpg,image/png" multiple style="display:none"><div class="cv3-photos" data-photos></div><small>支持JPEG、JPG、PNG格式图片，最多九张，每张不超过10M</small></div>' +
        '<div class="cv3-field"><label>继续跟进<span class="req">*</span></label><select data-care-follow><option value="" disabled hidden>请选择</option><option value="需要" ' +
        (r && r.follow === "需要" ? "selected" : "") +
        '>需要</option><option value="不需要" ' +
        (r && r.follow === "不需要" ? "selected" : "") +
        ">不需要</option></select></div>" +
        "</div>"
      );
    }
    function bindCareFields(root, r) {
      var peopleSelect = root.querySelector("[data-care-people]");
      if (!r && peopleSelect) {
        var defaults = homeroomForCurrentStudent(root);
        if (
          defaults &&
          !Array.from(peopleSelect.options).some(function (o) {
            return o.value === defaults;
          })
        )
          peopleSelect.add(new Option(defaults, defaults));
        peopleSelect.value = defaults;
      } else if (
        r &&
        peopleSelect &&
        r.people &&
        !Array.from(peopleSelect.options).some(function (o) {
          return o.value === r.people;
        })
      ) {
        peopleSelect.add(new Option(r.people, r.people));
        peopleSelect.value = r.people;
      }
      var photos = ((r && r.proofs) || []).slice(0, 9);
      photosByRoot.set(root, photos);
      var input = root.querySelector("[data-file]"),
        grid = root.querySelector("[data-photos]");
      function renderPhotos() {
        grid.innerHTML =
          (photos.length < 9
            ? '<button type="button" class="cv3-upload" data-upload aria-label="上传图片">＋</button>'
            : "") +
          photos
            .map(function (src, i) {
              var url = typeof src === "string" ? src : (src && src.src) || "";
              return (
                '<div class="cv3-thumb"><img src="' +
                esc(url) +
                '" alt="证明材料' +
                (i + 1) +
                '" onclick="openPhotoViewer(this)"><button type="button" data-remove-photo="' +
                i +
                '" aria-label="移除图片">×</button></div>'
              );
            })
            .join("");
        var upload = grid.querySelector("[data-upload]");
        if (upload)
          upload.onclick = function () {
            input.click();
          };
        grid.querySelectorAll("[data-remove-photo]").forEach(function (button) {
          button.onclick = function () {
            photos.splice(Number(button.dataset.removePhoto), 1);
            photosByRoot.set(root, photos);
            renderPhotos();
          };
        });
      }
      renderPhotos();
      input.onchange = function () {
        var files = Array.from(input.files || []);
        if (photos.length + files.length > 9) {
          toast("图片上传最多九张");
          input.value = "";
          return;
        }
        var bad = files.find(function (f) {
          return !["image/jpeg", "image/png"].includes(f.type);
        });
        if (bad) {
          toast("暂不支持该格式图片，请上传JPEG、JPG或PNG格式图片");
          input.value = "";
          return;
        }
        if (
          files.some(function (f) {
            return f.size > 10 * 1024 * 1024;
          })
        ) {
          toast("单张图片不能超过10M");
          input.value = "";
          return;
        }
        root.dataset.uploading = "1";
        Promise.all(
          files.map(function (f) {
            return new Promise(function (resolve) {
              var reader = new FileReader();
              reader.onload = function () {
                resolve(String(reader.result));
              };
              reader.readAsDataURL(f);
            });
          }),
        )
          .then(function (urls) {
            photos = photos.concat(urls).slice(0, 9);
            photosByRoot.set(root, photos);
            renderPhotos();
          })
          .finally(function () {
            delete root.dataset.uploading;
          });
        input.value = "";
      };
      [
        ["[data-care-people]", "执行人员"],
        ["[data-care-method]", "关爱方式"],
        ["[data-care-follow]", "继续跟进"],
      ].forEach(function (pair) {
        bindSelectSheet(root.querySelector(pair[0]), pair[1]);
      });
      bindDateSheet(root.querySelector("[data-care-date]"));
    }
    function addRecord(c, values) {
      var when = stamp(),
        record = Object.assign(
          {
            id:
              "cv3-record-" +
              Date.now() +
              "-" +
              Math.random().toString(36).slice(2),
            filledById: person(),
            filledByName: personName(),
            filledByRole: role(),
            filledAt: when,
          },
          values,
        );
      c.records.push(record);
      c.revision = (c.revision || 0) + 1;
      normalizeRecord(record);
      c.records.sort(compareRecords);
    }
    function openRecordForm(c, mode, index, returnTarget) {
      if (!c) return;
      if (
        !canTake(c) ||
        (mode === "edit" &&
          (!c.records[index] ||
            c.records[index].filledById !== person() ||
            (window.CARE_CURRENT_PERMISSIONS &&
              window.CARE_CURRENT_PERMISSIONS.edit === false)))
      ) {
        toast("暂无权限");
        return;
      }
      closePicker();
      closeRecordHelp();
      recordBackTarget = returnTarget || "sc-case-v3-detail";
      currentCase = recordCase = c;
      editingRecord = mode === "edit" ? c.records[index] : null;
      editingRevision = editingRecord ? editingRecord.revision : null;
      recordForm.querySelector(".sub-hd b").textContent =
        mode === "edit"
          ? "编辑关爱"
          : c.records.length
            ? "继续关爱"
            : "新建关爱";
      recordForm.querySelector(".cv3-pad").innerHTML =
        '<div class="cv3-card"><div class="cv3-student"><span class="cv3-avatar">' +
        esc(c.name.slice(0, 1)) +
        "</span><span><b>" +
        esc(c.name) +
        '</b><div class="cv3-sub">' +
        esc(c.grade + " · " + c.klass) +
        "</div></span></div>" +
        row(
          "关爱来源",
          esc(returnTarget === "sc-detail" ? "控辍保学" : sourceText(c)),
        ) +
        teacherEvidenceRow(c) +
        row("关爱类型", esc(typeText(c))) +
        row("关爱原因", esc(c.reason)) +
        "</div>" +
        careFields(editingRecord, false);
      bindTeacherEvidence(recordForm, c);
      bindCareFields(recordForm, editingRecord);
      recordForm.querySelector(".cv3-bottom button").textContent = "确定";
      recordForm.querySelector(".cv3-bottom button").onclick = saveRecord;
      callGo("sc-case-v3-record");
    }
    function saveRecord() {
      var c = recordCase,
        r = editingRecord;
      if (!c) return;
      if (!c._warningDraft && !teacherCases.includes(c)) {
        toast("个案已变化，请重新进入");
        return;
      }
      if (
        !canTake(c) ||
        (r &&
          (r.filledById !== person() ||
            !c.records.includes(r) ||
            (window.CARE_CURRENT_PERMISSIONS &&
              window.CARE_CURRENT_PERMISSIONS.edit === false)))
      ) {
        toast("暂无权限");
        return;
      }
      var values = readCare(recordForm);
      if (!values) return;
      if (r) {
        if (r.revision !== editingRevision) {
          toast("记录已更新，请重新打开编辑");
          return;
        }
        var before = JSON.parse(JSON.stringify(r));
        Object.assign(r, values, {
          editedAt: stamp(),
          revision: r.revision + 1,
        });
        archive("edit-record", c, before, r);
        c.revision = (c.revision || 0) + 1;
        toast("关爱记录已更新");
      } else {
        if (c._warningDraft) {
          var primaryId = c.warningIds[0],
            emptyCase = teacherCases.find(function (item) {
              return item.id === c._warningReplaceId;
            }),
            occupied = teacherCases.some(function (item) {
              return (
                item !== emptyCase &&
                (item.warningIds || []).includes(primaryId)
              );
            });
          if (
            occupied ||
            (emptyCase &&
              (emptyCase.records.length ||
                !(emptyCase.warningIds || []).includes(primaryId) ||
                !canTake(emptyCase)))
          ) {
            toast("当前预警的关爱个案已变化，请重新进入");
            return;
          }
          // 每个入口预警单独归案；参考预警不参与记录合并、归属或次数计算。
          c.warningIds = [primaryId];
          c.createdAt = today();
          c.caseVersions = emptyCase
            ? (emptyCase.caseVersions || []).slice()
            : [];
          addRecord(c, values);
          delete c._warningDraft;
          delete c._warningReplaceId;
          c.caseVersions.push({
            version: c.caseVersions.length + 1,
            kind: "create",
            after: snapshot(c),
            filledById: person(),
            filledByRole: role(),
            filledAt: stamp(),
          });
          if (emptyCase) {
            Object.assign(emptyCase, c);
            c = recordCase = emptyCase;
          } else teacherCases.unshift(c);
        } else addRecord(c, values);
        toast("关爱记录已保存");
      }
      currentCase = c;
      c.records.sort(compareRecords);
      renderDetail();
      renderList();
      recordCase = null;
      editingRecord = null;
      callGo(recordBackTarget);
    }
    function teacherEvidenceRow(c) {
      var count = caseEvidenceItems(c).length;
      return row(
        "关联信息",
        count
          ? '<button type="button" class="care-evidence-button" data-teacher-evidence>关联' +
              count +
              "条信息</button>"
          : "--",
      );
    }
    function bindTeacherEvidence(container, c) {
      var button = container.querySelector("[data-teacher-evidence]");
      if (button)
        button.onclick = function () {
          window.openCareEvidenceV3(c, true);
        };
    }
    function recordCards(c) {
      var list = sortedRecords(c.records);
      return list
        .slice()
        .reverse()
        .map(function (r, i) {
          return (
            '<div class="cv3-card" data-record-id="' +
            esc(r.id) +
            '"><div class="cv3-record-top"><b>第' +
            (list.length - i) +
            "次关爱</b>" +
            (r.filledById === person() && canTake(c)
              ? '<button type="button" data-record-more aria-label="关爱内容操作">...</button>'
              : "") +
            "</div>" +
            row("关爱时间", esc(r.date)) +
            row("执行人员", esc(r.people)) +
            row("关爱方式", esc(r.method)) +
            row("关爱结果", esc(r.result)) +
            row(
              "证明材料",
              (r.proofs || []).length
                ? '<span class="cv3-photos">' +
                    proofImages(r.proofs) +
                    "</span>"
                : "--",
            ) +
            row("继续跟进", esc(r.follow)) +
            row("填写人", esc(r.filledByName)) +
            row("填写时间", esc(displayTime(r.filledAt))) +
            "</div>"
          );
        })
        .join("");
    }
    function bindRecordActions(container, c, backTarget, refresh) {
      container
        .querySelectorAll("[data-record-more]")
        .forEach(function (button) {
          button.onclick = function () {
            var id = button.closest("[data-record-id]").dataset.recordId;
            var r = c.records.find(function (item) {
              return String(item.id) === id;
            });
            if (!r || r.filledById !== person() || !canTake(c)) {
              toast("暂无权限");
              return;
            }
            var revision = r.revision;
            closePicker();
            var overlay = document.createElement("div");
            overlay.id = "cv3-picker-overlay";
            overlay.className = "cv3-picker-overlay";
            overlay.innerHTML =
              '<div class="cv3-picker-sheet cv3-record-actions" role="dialog" aria-modal="true" aria-label="关爱内容操作"><button type="button" data-action="edit">编辑</button><button type="button" data-action="delete">删除</button><button type="button" data-action="cancel">取消</button></div>';
            overlay.onclick = function (event) {
              var action = event.target.dataset.action;
              if (event.target === overlay || action === "cancel") {
                overlay.remove();
                return;
              }
              if (action === "edit") {
                overlay.remove();
                openRecordForm(c, "edit", c.records.indexOf(r), backTarget);
              }
              if (action === "delete") {
                overlay.remove();
                confirmBox(
                  "删除关爱内容",
                  "确认删除该关爱内容吗？删除后不可恢复！",
                  function () {
                    if (
                      !canTake(c) ||
                      r.filledById !== person() ||
                      !c.records.includes(r) ||
                      r.revision !== revision ||
                      !teacherCases.includes(c) ||
                      (window.CARE_CURRENT_PERMISSIONS &&
                        window.CARE_CURRENT_PERMISSIONS.delete === false)
                    ) {
                      toast("记录已变化或暂无权限");
                      return;
                    }
                    archive("delete-record", c, r, null);
                    c.records.splice(c.records.indexOf(r), 1);
                    c.revision = (c.revision || 0) + 1;
                    if ((c.warningIds || []).length && !c.records.length) {
                      archive("auto-remove-warning-case", c, c, null);
                      teacherCases.splice(teacherCases.indexOf(c), 1);
                    }
                    renderList();
                    if (backTarget === "sc-detail") refresh();
                    else if (teacherCases.includes(c)) renderDetail();
                    else {
                      currentCase = null;
                      callGo("sc-care-menu");
                    }
                    toast("已删除该关爱内容");
                  },
                );
              }
            };
            mountPicker(overlay);
          };
        });
    }
    function renderDetail() {
      var c = currentCase;
      if (!c) return;
      var pad = detail.querySelector(".cv3-pad");
      detail.querySelector(".sub-hd b").textContent = "关爱个案详情";
      pad.innerHTML =
        '<div class="cv3-card"><div class="cv3-student"><span class="cv3-avatar">' +
        esc(c.name.slice(0, 1)) +
        '</span><span style="flex:1"><b>' +
        esc(c.name) +
        '</b><div class="cv3-sub">' +
        esc(c.grade + " · " + c.klass) +
        "</div></span></div>" +
        row("创建日期", esc(c.createdAt)) +
        row("关爱来源", esc(sourceText(c))) +
        teacherEvidenceRow(c) +
        row("关爱类型", esc(typeText(c))) +
        row("关爱原因", esc(c.reason)) +
        '<div class="cv3-edit-controls"><button type="button" data-case-edit>编辑个案</button></div></div><div class="cv3-title">关爱情况（共' +
        c.records.length +
        "次）</div>" +
        (c.records.length
          ? recordCards(c)
          : '<div class="cv3-card cv3-note">尚无关爱记录，请点击下方“关爱”添加首次关爱。</div>');
      bindTeacherEvidence(pad, c);
      bindRecordActions(pad, c, "sc-case-v3-detail");
      pad.querySelector("[data-case-edit]").disabled = !canTake(c);
      pad.querySelector("[data-case-edit]").onclick = function () {
        if (!canTake(c) || c.createdById !== person()) {
          toast("暂无权限");
          return;
        }
        if (c.records.length) {
          toast("已有的关爱内容，个案信息不可编辑");
          return;
        }
        openCaseForm("edit", c);
      };
      var bottom = detail.querySelector(".cv3-bottom button");
      bottom.textContent = c.records.length ? "继续关爱" : "关爱";
      bottom.disabled = !canTake(c);
      bottom.onclick = function () {
        openRecordForm(c, "add");
      };
    }
    function warningEvidenceRows(w) {
      var rows = evidenceItems("辍学预警", w.name).map(function (text, index) {
        var external = (window.CARE_WARNING_RECORDS || []).find(
          function (item) {
            return (
              (item.studentName || item.name) === w.name &&
              (item.text || item.label || item.summary || item.date) === text
            );
          },
        );
        return {
          id:
            (external && (external.warningId || external.id)) ||
            "evidence-" + (w.studentId || w.name) + "-" + index,
          text: text,
        };
      });
      (window.wlData || [])
        .filter(function (item) {
          return (
            item.year === "current" &&
            item.name === w.name &&
            item.grade === w.grade &&
            item.cls === w.cls
          );
        })
        .forEach(function (item) {
          rows.unshift({
            id: item.id,
            text: item.reason + "（" + item.time + "）",
          });
        });
      return rows;
    }
    function openWarningPicker(kind) {
      if (!warningSetup) return;
      closePicker();
      var isType = kind === "type",
        opts = isType
          ? TYPE_OPTIONS
          : warningEvidenceRows(warningSetup.warning).map(function (item) {
              return item.text;
            });
      var order = (
          isType ? warningSetup.types : warningSetup.associations
        ).slice(),
        chosen = new Set(order);
      var sheet = document.createElement("div");
      sheet.id = "cv3-picker-overlay";
      sheet.className = "cv3-picker-overlay";
      sheet.innerHTML =
        '<div class="cv3-picker-sheet"><div class="cv3-picker-title"><b>' +
        (isType ? "选择关爱类型" : "关联控辍保学") +
        '</b><button type="button" data-cancel>取消</button></div><div class="cv3-picker-options five-rows">' +
        Array.from(new Set(isType ? opts : opts.concat(order)))
          .map(function (text) {
            return (
              '<label><input type="checkbox" value="' +
              esc(text) +
              '" ' +
              (chosen.has(text) ? "checked" : "") +
              ">" +
              esc(text) +
              "</label>"
            );
          })
          .join("") +
        '</div><button type="button" class="cv3-picker-confirm">确定</button></div>';
      if (!isType) {
        var hint = document.createElement("p");
        hint.className = "cv3-picker-hint";
        hint.textContent =
          "当前预警自动关联。其他预警可作为历史参考；每个预警记录的关爱内容都单独保存";
        sheet.querySelector(".cv3-picker-title").after(hint);
      }
      sheet.onclick = function (event) {
        if (event.target === sheet) closePicker();
      };
      sheet.querySelector("[data-cancel]").onclick = closePicker;
      sheet.querySelectorAll("input").forEach(function (input) {
        if (
          !isType &&
          warningEvidenceRows(warningSetup.warning).some(function (item) {
            return (
              item.id === warningSetup.warning.id && item.text === input.value
            );
          })
        )
          input.disabled = true;
        input.onchange = function () {
          order = order.filter(function (text) {
            return text !== input.value;
          });
          if (input.checked) order.push(input.value);
        };
      });
      sheet.querySelector(".cv3-picker-confirm").onclick = function () {
        if (isType) warningSetup.types = order.slice();
        else warningSetup.associations = order.slice();
        warningScreen.querySelector(
          isType
            ? "[data-warning-type-summary]"
            : "[data-warning-association-summary]",
        ).textContent = isType
          ? order.join("、") || "请选择关爱类型"
          : order.length
            ? "已选" + order.length + "条关联信息"
            : "请选择关联信息";
        closePicker();
      };
      mountPicker(sheet);
    }
    function openWarningSetup(w, existing) {
      if (
        !canTake({
          studentId: w.studentId || w.name,
          grade: w.grade,
          klass: w.cls,
        })
      ) {
        toast("暂无权限");
        return;
      }
      closePicker();
      closeWarningHelp();
      warningSetup = {
        warning: w,
        origin: location.hash === "#sc-detail" ? "sc-detail" : "sc-list",
        types: [],
        associations: warningEvidenceRows(w)
          .filter(function (item) {
            return item.id === w.id;
          })
          .map(function (item) {
            return item.text;
          }),
        existing: existing || null,
      };
      warningScreen.querySelector(".cv3-pad").innerHTML =
        '<div class="cv3-title">学生信息</div><div class="cv3-card"><div class="cv3-student"><span class="cv3-avatar">' +
        esc(w.name.slice(0, 1)) +
        "</span><span><b>" +
        esc(w.name) +
        '</b><div class="cv3-sub">' +
        esc(w.grade + " · " + w.cls) +
        "</div></span></div></div>" +
        '<div class="cv3-title">关爱信息</div><div class="cv3-card">' +
        '<div class="cv3-field"><label>关爱来源<span class="req">*</span></label><span class="cv3-warning-source">控辍保学</span></div>' +
        '<div class="cv3-field cv3-picker-row"><label>关联控辍保学<span class="req">*</span></label><button type="button" class="cv3-picker-head" data-warning-association><span data-summary="关联控辍保学" data-warning-association-summary>请选择关联信息</span></button></div>' +
        '<div class="cv3-field cv3-picker-row"><label>关爱类型<span class="req">*</span></label><button type="button" class="cv3-picker-head" data-warning-type><span data-summary="关爱类型" data-warning-type-summary>请选择关爱类型</span></button></div>' +
        '<div class="cv3-field stack"><label>关爱原因<span class="req">*</span></label><textarea id="cv3-warning-reason" maxlength="100" placeholder="请概述需要关爱的实际情况，最多100字"></textarea></div></div>';
      warningScreen.querySelector(
        "[data-warning-association-summary]",
      ).textContent = "已选" + warningSetup.associations.length + "条关联信息";
      warningScreen.querySelector("[data-warning-type]").onclick = function () {
        openWarningPicker("type");
      };
      warningScreen.querySelector("[data-warning-association]").onclick =
        function () {
          openWarningPicker("association");
        };
      var next = warningScreen.querySelector(".cv3-bottom button");
      next.textContent = "下一步";
      next.onclick = function () {
        if (
          !canTake({
            studentId: w.studentId || w.name,
            grade: w.grade,
            klass: w.cls,
          })
        ) {
          toast("暂无权限");
          return;
        }
        var reason = el("cv3-warning-reason").value.trim();
        if (
          !warningSetup.types.length ||
          warningSetup.types.some(function (value) {
            return !TYPE_OPTIONS.includes(value);
          })
        ) {
          toast("请选择关爱类型");
          return;
        }
        if (!warningSetup.associations.length) {
          toast("请选择关联控辍保学");
          return;
        }
        if (!reason) {
          toast("请填写关爱原因");
          return;
        }
        if (Array.from(reason).length > 100) {
          toast("关爱原因最多100字");
          return;
        }
        var draft = {
          id: existing ? existing.id : "cv3-warning-" + w.id,
          name: w.name,
          grade: w.grade,
          klass: w.cls,
          studentId: w.studentId || w.name,
          school: w.school || "市实验一小",
          createdAt: today(),
          createdById: person(),
          createdByRole: role(),
          types: warningSetup.types.slice(),
          sources: ["辍学预警"],
          evidence: { 辍学预警: warningSetup.associations.slice() },
          reason: reason,
          warningIds: [w.id],
          referenceWarningIds: Array.from(
            new Set(
              warningEvidenceRows(w)
                .filter(function (item) {
                  return warningSetup.associations.includes(item.text);
                })
                .map(function (item) {
                  return item.id;
                })
                .filter(function (id) {
                  return id !== w.id;
                }),
            ),
          ),
          caseVersions: [],
          records: [],
          _warningDraft: true,
          _warningReplaceId: existing && existing.id,
        };
        openRecordForm(draft, "add", null, "sc-detail");
      };
      callGo("sc-case-v3-warning-setup");
    }
    window.CARE_CASE_V3_API = {
      cases: teacherCases,
      canTake: canTake,
      recordCards: recordCards,
      bindRecordActions: bindRecordActions,
      findForWarning: function (w) {
        return (
          teacherCases.find(function (c) {
            return (
              w.id &&
              (c.warningIds || []).includes(w.id) &&
              c.createdAt >= SCHOOL_YEAR.start &&
              c.createdAt <= SCHOOL_YEAR.end
            );
          }) || null
        );
      },
      openFromWarning: function (w) {
        var c = this.findForWarning(w);
        if (c) {
          if (!c.records.length) {
            openWarningSetup(w, c);
            return;
          }
          openRecordForm(c, "add", null, "sc-detail");
          return;
        }
        /* 不同预警独立个案；其他预警仅作参考。 */
        openWarningSetup(w);
      },
    };
    window.cmOpen = function () {
      openCaseForm("new");
    };
    // 原型专用账号示例，不是生产权限配置入口；切换不会修改业务记录。
    var demo = document.createElement("label");
    demo.className = "care-demo-switch";
    demo.innerHTML =
      '权限示例 <select aria-label="切换老师权限示例"><option value="wang">王老师（有权限）</option><option value="li">李老师（有权限）</option><option value="readonly">赵老师（无关爱权限）</option></select>';
    document.body.appendChild(demo);
    demo.querySelector("select").onchange = function () {
      var key = this.value,
        allowed = key !== "readonly";
      window.CARE_CURRENT_USER_ID =
        key === "wang"
          ? "teacher-wang-demo"
          : key === "li"
            ? "teacher-li-demo"
            : "teacher-zhao-readonly-demo";
      window.CARE_CURRENT_USER_NAME =
        key === "wang" ? "王老师" : key === "li" ? "李老师" : "赵老师";
      window.CARE_CURRENT_ROLE = key === "wang" ? "班主任" : "任课教师";
      window.CARE_CURRENT_PERMISSIONS = {
        care: allowed,
        edit: allowed,
        delete: allowed,
        detail: true,
      };
      closePicker();
      var confirm = el("cv3-confirm");
      if (confirm) confirm.remove();
      recordCase = editingRecord = warningSetup = null;
      renderList();
      callGo(
        location.hash === "#sc-list" ||
          location.hash === "#sc-detail" ||
          location.hash === "#sc-case-v3-warning-setup"
          ? "sc-list"
          : "sc-care-menu",
      );
    };
    renderList();
    if (location.hash === "#sc-care-add") openCaseForm("new");
  }
  function initWeb() {
    var school = !!window.schoolCareV3Data,
      records = school ? window.schoolCareV3Data : window.careRegV3Data;
    if (!records) return;
    records.forEach(function (r) {
      if (r.caseEvidence != null || !r.dataSource) return;
      if (r.sourceKey === "warning")
        r.caseEvidence = { 辍学预警: DEMO_WARNING_EVIDENCE.slice() };
      else if (r.sourceKey === "psych")
        r.caseEvidence = { 心理测评: DEMO_PSYCH_EVIDENCE.slice() };
    });
    if (school) {
      // 学校端只查看，旧录入入口统一拒绝。
      window.schoolCareV2OpenAdd = function () {
        toast("暂无权限");
      };
      window.schoolCareEdit = function () {
        toast("暂无权限");
      };
    }
    var viewName = school ? "schoolCareView" : "cityCareView",
      modalId = school ? "school-care-modal-v1" : "city-care-modal-v1",
      bodyClass = school ? "scm-modal-body" : "ecm-modal-body";
    var oldView = window[viewName];
    function group(r) {
      if (!r) return [];
      var k = r.caseId || r.id || r.name;
      return records
        .filter(function (x) {
          return (
            (x.caseId || x.id || x.name) === k && !x.deletedAt && !x.superseded
          );
        })
        .map(normalizeRecord)
        .sort(compareRecords);
    }
    function meta(first) {
      var source =
        first.sourceKey === "warning" ||
        first.source === "预警" ||
        first.source === "预警信息"
          ? "辍学预警"
          : first.sourceKey === "psych" || first.source === "心理测评"
            ? "心理测评"
            : "班主任发现";
      var type = first.type;
      return {
        types: first.caseTypes || [type],
        sources: first.caseSources || [source],
        reason:
          first.caseReason ||
          (source === "辍学预警"
            ? "该生近期连续缺勤，需要了解原因并持续开展关爱。"
            : source === "心理测评"
              ? "测评提示该生需要重点关注，应及时沟通并提供支持。"
              : "该生学习遇到困难，需要持续关注和帮助。"),
      };
    }
    function evidenceHtml(first) {
      var count = caseEvidenceItems(first).length;
      return count
        ? '<button type="button" class="care-evidence-button" data-care-evidence>关联' +
            count +
            "条信息</button>"
        : "--";
    }
    function row(k, v) {
      return (
        '<div class="' +
        (school ? "scm-v2-row" : "crv3-row") +
        '"><div class="label">' +
        esc(k) +
        '</div><div class="value">' +
        (v || "--") +
        "</div></div>"
      );
    }
    function proof(item) {
      var details =
          school && window.schoolCareV2State && window.schoolCareV2State.data,
        detail = Array.isArray(details) ? details[records.indexOf(item)] : null;
      if (detail && (detail.name !== item.name || detail.date !== item.date))
        detail = details.find(function (x) {
          return x.name === item.name && x.date === item.date;
        });
      var arr =
          item.proofs && item.proofs.length
            ? item.proofs
            : (detail && detail.proofs) || [],
        p = arr.slice(0, 9);
      return p.length
        ? '<div class="' +
            (school ? "scm-v2-proof-grid" : "crv3-proof-grid") +
            '">' +
            proofImages(p) +
            "</div>"
        : "--";
    }
    function decorate(index) {
      var item = records[index],
        modal = el(modalId);
      if (!item || !modal) return;
      var list = group(item),
        first = list[0],
        m = meta(first),
        body = modal.querySelector("." + bodyClass);
      if (!body) return;
      var cardClass = school ? "scm-v2-card" : "crv3-modal-card",
        headClass = school ? "scm-v2-detail-title" : "crv3-detail-title",
        timeline = list
          .slice()
          .reverse()
          .map(function (r, i) {
            return (
              '<div class="' +
              cardClass +
              " " +
              (school ? "school-care-timeline" : "care-reg-timeline") +
              '"><div style="display:flex;justify-content:space-between;gap:8px;border-bottom:1px solid #e9edf4;padding-bottom:9px;margin-bottom:9px"><b>第' +
              (list.length - i) +
              "次关爱</b>" +
              (school ? "" : "<span>" + esc(r.date) + "</span>") +
              "</div>" +
              row("关爱时间", esc(r.date)) +
              row("执行人员", esc(r.people)) +
              row("关爱方式", esc(r.method || "--")) +
              row("关爱结果", esc(r.result)) +
              row("证明材料", proof(r)) +
              row("继续跟进", r.follow) +
              row("填写人", esc(r.filledByName)) +
              row("填写时间", esc(displayTime(r.filledAt))) +
              "</div>"
            );
          })
          .join("");
      body.innerHTML =
        '<div class="' +
        headClass +
        '">个案信息</div><div class="' +
        cardClass +
        '">' +
        row("学生姓名", esc(first.name)) +
        row("学校", esc(first.school)) +
        row("年级", esc(first.grade)) +
        row("班级", esc(first.className)) +
        row("创建日期", esc(first.caseCreatedAt || first.date)) +
        row("关爱来源", esc(m.sources.join("、"))) +
        row("关联信息", evidenceHtml(first)) +
        row("关爱类型", esc(m.types.join("、"))) +
        row("关爱原因", esc(m.reason)) +
        '</div><div class="' +
        headClass +
        '">关爱情况（共' +
        list.length +
        "次）</div>" +
        timeline;
      var evidenceButton = body.querySelector("[data-care-evidence]");
      if (evidenceButton)
        evidenceButton.onclick = function () {
          window.openCareEvidenceV3(first);
        };
      var title = modal.querySelector("h3");
      if (title) title.textContent = "关爱个案详情";
    }
    if (typeof oldView === "function")
      window[viewName] = function (index) {
        var result = oldView.apply(this, arguments);
        decorate(Number(index));
        return result;
      };
  }
})();
