/* 学校端第一版个案台账：单一列表入口，学校只读详情及授权删除。 */
(function () {
  "use strict";
  var records = [
    {
      name: "张小明",
      school: "凤翔区第一实验小学",
      grade: "七年级（2025级）",
      className: "2班",
      sourceKey: "warning",
      source: "预警信息",
      dataSource: "连续缺勤｜2026-09-05 18:05",
      warningReason: "连续缺勤3个工作日",
      date: "2026-09-23",
      people: "王老师、李老师、陈老师",
      type: "返校适应",
      method: "面谈",
      status: "need",
      next: "2026-09-30",
      id: "school-demo-follow-1",
      caseId: "school-care-seed-0",
      superseded: false,
      parentId: "school-care-seed-0",
      demo: true,
      createdById: "teacher-seed-demo-0",
      createdByRole: "老师",
      createdPermissionSnapshot: {
        menu: true,
        detail: true,
        edit: true,
        delete: true,
        continue: true,
        source: "职务管理演示快照",
      },
      caseEvidence: {
        辍学预警: [
          "连续缺勤2个工作日（09-28~09-29）",
          "10个工作日内缺勤4个工作日（09-14、09-17、09-22、09-25）",
          "连续缺勤2个工作日（09-21~09-22）",
          "10个工作日内缺勤3个工作日（09-09、09-15、09-18）",
          "连续缺勤3个工作日（09-15~09-17）",
          "10个工作日内缺勤2个工作日（09-03、09-10）",
          "连续缺勤2个工作日（09-09~09-10）",
          "10个工作日内缺勤2个工作日（09-01、09-08）",
        ],
      },
      warningId: "warning-1",
      caseCreatedAt: "2026-09-23",
      careReason: "该生存在缺勤预警，需要持续了解原因并开展关爱。",
      warning: {
        type: "连续缺勤",
        reason: "连续缺勤3个工作日",
        time: "2026-09-05 18:05",
      },
      result: "已与家长沟通返校安排，约定持续关注学生返校情况。",
      proofs: [],
    },
    {
      name: "张小明",
      school: "凤翔区第一实验小学",
      grade: "七年级（2025级）",
      className: "2班",
      sourceKey: "warning",
      source: "预警信息",
      dataSource: "连续缺勤｜2026-05-05 18:05",
      warningReason: "连续缺勤3个工作日",
      date: "2026-09-18",
      people: "王老师、李老师、陈老师",
      type: "家庭关怀",
      method: "家访",
      status: "need",
      next: "2026-09-25",
      id: "school-care-seed-0",
      caseId: "school-care-seed-0",
      superseded: true,
      createdById: "teacher-seed-demo-1",
      createdByRole: "老师",
      createdPermissionSnapshot: {
        menu: true,
        detail: true,
        edit: true,
        delete: true,
        continue: true,
        source: "职务管理演示快照",
      },
      caseEvidence: {
        辍学预警: [
          "连续缺勤2个工作日（09-28~09-29）",
          "10个工作日内缺勤4个工作日（09-14、09-17、09-22、09-25）",
          "连续缺勤2个工作日（09-21~09-22）",
          "10个工作日内缺勤3个工作日（09-09、09-15、09-18）",
          "连续缺勤3个工作日（09-15~09-17）",
          "10个工作日内缺勤2个工作日（09-03、09-10）",
          "连续缺勤2个工作日（09-09~09-10）",
          "10个工作日内缺勤2个工作日（09-01、09-08）",
        ],
      },
      proofs: [],
      warningId: "warning-1",
    },
    {
      name: "李小红",
      school: "凤翔区第一实验小学",
      grade: "七年级（2025级）",
      className: "1班",
      sourceKey: "psych",
      source: "心理测评",
      dataSource: "需要关注｜2026-09-15",
      date: "2026-09-17",
      people: "李老师",
      type: "情绪支持",
      method: "面谈",
      status: "need",
      next: "2026-09-24",
      id: "school-care-seed-1",
      caseId: "school-care-seed-1",
      createdById: "teacher-seed-demo-2",
      createdByRole: "老师",
      createdPermissionSnapshot: {
        menu: true,
        detail: true,
        edit: true,
        delete: true,
        continue: true,
        source: "职务管理演示快照",
      },
      superseded: false,
      caseEvidence: {
        心理测评: [
          "（本学期）重点关注（09-29测评）",
          "（本学期）一般关注（09-25测评）",
          "（本学期）紧急关注（09-22测评）",
          "（本学期）无需关注（09-18测评）",
          "（本学期）重点关注（09-15测评）",
          "（本学期）一般关注（09-12测评）",
          "（本学期）无需关注（09-09测评）",
        ],
      },
      proofs: [
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23dceafa%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%201%3C%2Ftext%3E%3C%2Fsvg%3E",
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23e4f2e8%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%202%3C%2Ftext%3E%3C%2Fsvg%3E",
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23fce8d8%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%203%3C%2Ftext%3E%3C%2Fsvg%3E",
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23e7e1f8%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%204%3C%2Ftext%3E%3C%2Fsvg%3E",
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23ddf2f1%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%205%3C%2Ftext%3E%3C%2Fsvg%3E",
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23f8e4ea%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%206%3C%2Ftext%3E%3C%2Fsvg%3E",
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23e9eef8%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%207%3C%2Ftext%3E%3C%2Fsvg%3E",
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23f2ebd9%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%208%3C%2Ftext%3E%3C%2Fsvg%3E",
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22360%22%20height%3D%22360%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2222%22%20fill%3D%22%23ddecf5%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%22138%22%20r%3D%2254%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Cpath%20d%3D%22M78%20282c25-54%20179-54%20204%200%22%20fill%3D%22%23fff%22%20opacity%3D%22.86%22%2F%3E%3Ctext%20x%3D%22180%22%20y%3D%22330%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20fill%3D%22%2358718b%22%3E%E7%A4%BA%E4%BE%8B%E6%9D%90%E6%96%99%209%3C%2Ftext%3E%3C%2Fsvg%3E",
      ],
    },
    {
      name: "陈小强",
      school: "凤翔区第一实验小学",
      grade: "八年级（2024级）",
      className: "3班",
      sourceKey: "daily",
      source: "日常上传",
      dataSource: "",
      date: "2026-09-16",
      people: "王老师",
      type: "学业帮扶",
      method: "学习辅导",
      status: "done",
      next: "",
      id: "school-care-seed-2",
      caseId: "school-care-seed-2",
      createdById: "teacher-seed-demo-3",
      createdByRole: "老师",
      createdPermissionSnapshot: {
        menu: true,
        detail: true,
        edit: true,
        delete: true,
        continue: true,
        source: "职务管理演示快照",
      },
      superseded: false,
      proofs: [],
    },
    {
      name: "王小华",
      grade: "八年级（2024级）",
      className: "3班",
      school: "凤翔区第一实验小学",
      sourceKey: "warning",
      source: "控辍预警",
      warningId: "warning-3",
      caseId: "care-seed-5",
      caseCreatedAt: "2026-09-19",
      careReason: "该生出现缺勤，需要了解实际困难并持续跟进。",
      warning: {
        type: "连续请假",
        reason: "连续请假3个工作日",
        time: "2026-09-03 14:20",
      },
      date: "2026-09-19",
      people: "班主任",
      type: "学业困难",
      method: "谈心谈话",
      result: "已了解缺勤原因并建立持续联系。",
      status: "done",
      next: "",
      proofs: [],
      id: "care-seed-5",
      createdById: "teacher-seed-demo-5",
      createdByRole: "老师",
      createdPermissionSnapshot: {
        menu: true,
        detail: true,
        edit: true,
        delete: true,
        continue: true,
        source: "职务管理演示快照",
      },
      superseded: false,
    },
  ];
  var SOURCES = [
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
  function short(value) {
    var text = String(value || "--");
    return Array.from(text).length > 10
      ? Array.from(text).slice(0, 10).join("") + "..."
      : text;
  }
  function source(record) {
    return (
      record.caseSources || [
        record.sourceKey === "warning"
          ? "辍学预警"
          : record.sourceKey === "psych"
            ? "心理测评"
            : "班主任发现",
      ]
    );
  }
  function type(record) {
    return (
      record.caseTypes || [record.name === "李小红" ? "同伴关系" : "学业困难"]
    );
  }
  function reason(record) {
    return (
      record.caseReason || record.careReason || "该学生需要持续关注和帮助。"
    );
  }
  function notify(message) {
    if (window.showToast) window.showToast(message);
    else window.alert(message);
  }
  function boot() {
    if (!document.getElementById("scale-wrapper")) return;
    window.schoolCareV3Data = records;
    var section = document.getElementById("section-care-menu-v1");
    if (!section) {
      section = document.createElement("section");
      section.id = "section-care-menu-v1";
      section.className = "p-6 hidden";
      document.getElementById("scale-wrapper").appendChild(section);
    }
    var mask = document.getElementById("school-care-mask-v1");
    if (!mask) {
      mask = document.createElement("div");
      mask.id = "school-care-mask-v1";
      mask.className = "scm-mask";
      mask.innerHTML =
        '<div id="school-care-modal-v1" class="scm-modal"></div>';
      document.body.appendChild(mask);
    }
    window.schoolCareClose = function () {
      mask.classList.remove("on");
    };
    mask.onclick = function (event) {
      if (event.target === mask) window.schoolCareClose();
    };
    function cases() {
      var map = new Map();
      records
        .filter(function (r) {
          return !r.deletedAt && !r.superseded;
        })
        .forEach(function (r) {
          var key = r.caseId || r.id;
          if (!map.has(key)) map.set(key, []);
          map.get(key).push(r);
        });
      return Array.from(map.values()).map(function (rows) {
        rows.sort(function (a, b) {
          return String(a.date).localeCompare(String(b.date));
        });
        var first = rows[0],
          last = rows[rows.length - 1];
        return {
          first: first,
          last: last,
          rows: rows,
          created: first.caseCreatedAt || first.date,
          status:
            last.status === "need" || last.follow === "需要"
              ? "关爱中"
              : "已完结",
        };
      });
    }
    function value(id) {
      var input = document.getElementById(id);
      return (input && input.value) || "";
    }
    function option(value) {
      return '<option value="' + esc(value) + '">' + esc(value) + "</option>";
    }
    function build() {
      if (section.querySelector(".scm-v3-table")) return;
      var grades = Array.from(
          new Set(
            records.map(function (r) {
              return r.grade;
            }),
          ),
        ),
        classes = Array.from(
          new Set(
            records.map(function (r) {
              return r.className;
            }),
          ),
        );
      section.innerHTML =
        '<div class="scm-v3-wrap"><div class="scm-v3-panel"><div class="scm-v3-toolbar">' +
        '<label>学年</label><select id="sv3-year"><option value="all">全部学年</option><option value="2026">2026学年</option></select>' +
        '<label>年级</label><select id="sv3-grade"><option value="all">全部年级</option>' +
        grades.map(option).join("") +
        "</select>" +
        '<label>班级</label><select id="sv3-class"><option value="all">全部班级</option>' +
        classes.map(option).join("") +
        "</select>" +
        '<label>学生姓名</label><input id="sv3-q" placeholder="请输入学生姓名">' +
        '<label>关爱来源</label><select id="sv3-source"><option value="all">全部</option>' +
        SOURCES.map(option).join("") +
        "</select>" +
        '<label>创建日期</label><div class="scm-v3-range"><input id="sv3-start" type="date" value="2026-09-01"><span>—</span><input id="sv3-end" type="date" value="2026-09-30"></div>' +
        '<span class="scm-v3-spacer"></span><button class="scm-v3-query" onclick="schoolV3Render()">查询</button><button class="scm-v3-reset" onclick="schoolV3Reset()">重置</button></div>' +
        '<div class="school-case-count"></div><div class="scm-v3-table-wrap"><table class="scm-v3-table"><thead><tr>' +
        [
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
        ]
          .map(function (label) {
            return "<th>" + label + "</th>";
          })
          .join("") +
        '</tr></thead><tbody id="sv3-body"></tbody></table></div></div></div>';
    }
    window.schoolV3Render = function () {
      build();
      var start = value("sv3-start"),
        end = value("sv3-end"),
        year = value("sv3-year"),
        grade = value("sv3-grade"),
        klass = value("sv3-class"),
        name = value("sv3-q"),
        selectedSource = value("sv3-source");
      if (start && end && start > end) {
        notify("请选择有效日期范围");
        return;
      }
      var all = cases(),
        list = all.filter(function (c) {
          var r = c.first;
          return (
            (!start || c.created >= start) &&
            (!end || c.created <= end) &&
            (year === "all" ||
              Number(c.created.slice(0, 4)) -
                (Number(c.created.slice(5, 7)) < 9 ? 1 : 0) ===
                Number(year)) &&
            (grade === "all" || r.grade === grade) &&
            (klass === "all" || r.className === klass) &&
            (!name || r.name.includes(name)) &&
            (selectedSource === "all" || source(r).includes(selectedSource))
          );
        });
      document.getElementById("sv3-body").innerHTML =
        list
          .map(function (c) {
            var r = c.first,
              index = records.indexOf(r),
              count = window.careCaseEvidenceItemsV3
                ? window.careCaseEvidenceItemsV3(r).length
                : 0;
            var content = [
              esc(r.name),
              esc(r.grade),
              esc(r.className),
              esc(c.created),
              esc(source(r).join("、")),
              count
                ? '<button type="button" class="care-evidence-button" data-school-evidence="' +
                  index +
                  '">关联' +
                  count +
                  "条信息</button>"
                : "--",
              esc(type(r).join("、")),
              '<span title="' +
                esc(reason(r)) +
                '">' +
                esc(short(reason(r))) +
                "</span>",
              c.rows.length + "次",
              esc(c.last.date),
              '<span title="' +
                esc(c.last.result) +
                '">' +
                esc(short(c.last.result)) +
                "</span>",
              c.status,
              '<button type="button" class="scm-v3-link" data-school-view="' +
                index +
                '">个案详情</button><button type="button" class="scm-v3-link school-care-delete" data-school-delete="' +
                index +
                '">删除个案</button>',
            ];
            return (
              '<tr data-case-v3-type="1" data-case-v3-sources="' +
              esc(source(r).join("|")) +
              '" data-case-v3-state="' +
              c.status +
              '" data-case-v3-old-hidden="0">' +
              content
                .map(function (cell) {
                  return "<td>" + cell + "</td>";
                })
                .join("") +
              "</tr>"
            );
          })
          .join("") ||
        '<tr><td class="scm-v3-empty" colspan="13">暂无符合条件的关爱个案</td></tr>';
      section.querySelector(".school-case-count").textContent =
        "本学年共 " +
        all.filter(function (c) {
          return c.created >= "2026-09-01" && c.created <= "2027-08-31";
        }).length +
        " 个关爱个案";
      section.querySelectorAll("[data-school-view]").forEach(function (button) {
        button.onclick = function () {
          window.schoolCareView(Number(button.dataset.schoolView));
        };
      });
      section
        .querySelectorAll("[data-school-evidence]")
        .forEach(function (button) {
          button.onclick = function () {
            window.openCareEvidenceV3(
              records[Number(button.dataset.schoolEvidence)],
            );
          };
        });
      section
        .querySelectorAll("[data-school-delete]")
        .forEach(function (button) {
          button.onclick = function () {
            window.schoolCareDeleteCase(Number(button.dataset.schoolDelete));
          };
        });
    };
    window.schoolV3Reset = function () {
      ["sv3-year", "sv3-grade", "sv3-class", "sv3-source"].forEach(
        function (id) {
          document.getElementById(id).value = "all";
        },
      );
      document.getElementById("sv3-q").value = "";
      document.getElementById("sv3-start").value = "2026-09-01";
      document.getElementById("sv3-end").value = "2026-09-30";
      window.schoolV3Render();
    };
    window.schoolCareView = function (index) {
      if (
        window.CARE_CURRENT_PERMISSIONS &&
        window.CARE_CURRENT_PERMISSIONS.detail === false
      ) {
        notify("暂无权限");
        return;
      }
      if (!records[index] || records[index].deletedAt) {
        notify("数据已更新，请重新打开详情");
        return;
      }
      document.getElementById("school-care-modal-v1").innerHTML =
        '<div class="scm-modal-head"><h3>关爱个案详情</h3><button type="button" onclick="schoolCareClose()">×</button></div><div class="scm-modal-body"></div><div class="scm-modal-foot"><button type="button" class="scm-btn" onclick="schoolCareClose()">关闭</button></div>';
      mask.classList.add("on");
    };
    window.schoolCareDeleteCase = function (index) {
      if (
        window.CARE_CURRENT_PERMISSIONS &&
        window.CARE_CURRENT_PERMISSIONS.delete === false
      ) {
        notify("暂无权限");
        return;
      }
      var target = records[index],
        c = cases().find(function (c) {
          return c.rows.includes(target);
        });
      if (!c) return;
      var period = window.CARE_ACADEMIC_YEAR_RANGE || {
        start: "2026-09-01",
        end: "2027-08-31",
      };
      if (c.created < period.start || c.created > period.end) {
        notify("仅可删除本学年关爱个案");
        return;
      }
      var dialog = document.createElement("div");
      dialog.className = "school-care-delete-mask";
      dialog.id = "school-care-case-delete-mask";
      dialog.innerHTML =
        '<div class="school-care-delete-dialog" role="dialog" aria-modal="true" aria-label="删除个案"><h3>删除个案</h3><p>确认删除该学生的个案吗？删除后不可恢复！</p><div><button type="button" data-action="cancel">取消</button><button type="button" data-action="confirm">确定</button></div></div>';
      dialog.onclick = function (event) {
        if (
          event.target === dialog ||
          event.target.dataset.action === "cancel"
        ) {
          dialog.remove();
          return;
        }
        if (event.target.dataset.action !== "confirm") return;
        c.rows.forEach(function (r) {
          r.deletedAt = new Date().toISOString();
          r.deletedById = window.CARE_CURRENT_USER_ID || "school-admin-demo";
          (
            window.schoolCareDeletedRecords ||
            (window.schoolCareDeletedRecords = [])
          ).push(r);
          var i = records.indexOf(r);
          if (i >= 0) records.splice(i, 1);
        });
        dialog.remove();
        window.schoolCareClose();
        window.schoolV3Render();
        if (window.refreshWarningCareLinks) window.refreshWarningCareLinks();
        notify("已删除关爱个案");
      };
      document.body.appendChild(dialog);
    };
    window.schoolCareOpen = function () {
      document.querySelectorAll('[id^="section-"]').forEach(function (s) {
        s.classList.add("hidden");
      });
      section.classList.remove("hidden");
      window.schoolV3Render();
    };
    var menu = document.createElement("div");
    menu.id = "school-float-menu";
    menu.className = "school-float-menu";
    menu.innerHTML =
      '<button type="button" class="school-menu-btn" aria-label="功能菜单" title="功能菜单" aria-expanded="false" onclick="schoolMenuToggle(event)"></button><div class="school-menu-panel"><div class="school-menu-title">控辍保学</div>' +
      [
        ["visit-ledger", "控辍劝返台账"],
        ["warning-list", "控辍预警"],
        ["config", "预警配置"],
        ["care", "关爱管理"],
        ["dashboard", "数据看板"],
      ]
        .map(function (item) {
          return (
            '<button class="school-menu-item" data-key="' +
            item[0] +
            '" onclick="schoolMenuGo(\'' +
            item[0] +
            '\')"><span class="school-menu-dot"></span>' +
            item[1] +
            "</button>"
          );
        })
        .join("") +
      "</div>";
    document.getElementById("scale-wrapper").appendChild(menu);
    window.schoolMenuToggle = function (event) {
      event.stopPropagation();
      var panel = menu.querySelector(".school-menu-panel");
      panel.classList.toggle("on");
      menu
        .querySelector(".school-menu-btn")
        .setAttribute("aria-expanded", String(panel.classList.contains("on")));
    };
    window.schoolMenuGo = function (key) {
      menu.querySelector(".school-menu-panel").classList.remove("on");
      menu
        .querySelector(".school-menu-btn")
        .setAttribute("aria-expanded", "false");
      if (key === "care") window.schoolCareOpen();
      else {
        section.classList.add("hidden");
        window.switchPage(key);
      }
      menu.querySelectorAll("[data-key]").forEach(function (button) {
        button.classList.toggle("active", button.dataset.key === key);
      });
    };
    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target)) {
        menu.querySelector(".school-menu-panel").classList.remove("on");
        menu
          .querySelector(".school-menu-btn")
          .setAttribute("aria-expanded", "false");
      }
    });
    build();
    window.schoolV3Render();
  }
  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
