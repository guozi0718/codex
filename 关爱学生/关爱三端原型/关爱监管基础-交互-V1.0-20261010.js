/* 监管端共享菜单、演示数据和只读弹窗容器；列表与详情仅由当前统一模块渲染。 */
(function () {
  "use strict";
  function boot() {
    function pics() {
      var c = [
        "#6ba4ff",
        "#61c9a8",
        "#f0ad5e",
        "#9b87f5",
        "#ef7f7f",
        "#5fc6d2",
        "#8fbf66",
        "#df82bd",
        "#7e9dbb",
      ];
      return c.map(function (x, i) {
        return (
          "data:image/svg+xml;charset=utf-8," +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" fill="' +
              x +
              '"/><rect x="18" y="22" width="144" height="108" rx="8" fill="white" opacity=".88"/><circle cx="90" cy="66" r="24" fill="' +
              x +
              '" opacity=".8"/><path d="M48 120c9-28 25-42 42-42s33 14 42 42" fill="' +
              x +
              '" opacity=".7"/><text x="90" y="158" text-anchor="middle" font-size="18" fill="white">关爱材料' +
              (i + 1) +
              "</text></svg>",
          )
        );
      });
    }
    var DATA = [
      {
        district: "凤翔区",
        school: "凤翔区第一实验小学",
        name: "张小明",
        grade: "七年级（2025级）",
        className: "2班",
        sourceKey: "warning",
        source: "预警信息",
        dataSource: "连续缺勤｜2026-05-05 18:05",
        warning: {
          type: "连续缺勤",
          reason: "连续缺勤3个工作日",
          time: "2026-05-05 18:05",
        },
        date: "2026-09-18",
        people: "王老师、李老师、陈老师",
        type: "家庭突发变故学生",
        method: "常态化家访与家校沟通",
        follow: "需要",
        result: "已与家长沟通返校安排，约定持续关注返校适应情况。",
        proofs: [],
      },
      {
        district: "凤翔区",
        school: "凤翔区第一实验小学",
        name: "李小红",
        grade: "七年级（2025级）",
        className: "1班",
        sourceKey: "psych",
        source: "心理测评",
        dataSource: "需要关注｜2026-09-15",
        psych: { result: "需要关注", time: "2026-09-15" },
        date: "2026-09-17",
        people: "李老师",
        type: "心理行为偏差 / 情绪困扰学生",
        method: "个体心理咨询与团体辅导",
        follow: "需要",
        result: "完成一次面谈，学生愿意持续参加班级支持活动。",
        proofs: pics(),
      },
      {
        district: "凤翔区",
        school: "凤翔区第二中学",
        name: "陈小强",
        grade: "八年级（2024级）",
        className: "3班",
        sourceKey: "daily",
        source: "日常上传",
        dataSource: "",
        date: "2026-09-16",
        people: "王老师",
        type: "学业困难学生",
        method: "学业帮扶与个性化辅导",
        follow: "不需要",
        result: "已完成作业辅导，学生掌握当天重点内容。",
        proofs: [],
      },
      {
        district: "凤翔区",
        school: "凤翔区实验中学",
        name: "王小华",
        grade: "九年级（2023级）",
        className: "1班",
        sourceKey: "warning",
        source: "预警信息",
        dataSource: "周期缺勤｜2026-09-12 17:20",
        warning: {
          type: "周期缺勤",
          reason: "一月内多次无故缺勤",
          time: "2026-09-12 17:20",
        },
        date: "2026-09-15",
        people: "赵老师",
        type: "学业困难学生",
        method: "常态化家访与家校沟通",
        follow: "不需要",
        result: "学生已恢复正常到校，继续由班主任日常观察。",
        proofs: [],
      },
      {
        district: "渭滨区",
        school: "渭滨区实验小学",
        name: "赵晓雨",
        grade: "六年级（2026届）",
        className: "2班",
        sourceKey: "psych",
        source: "心理测评",
        dataSource: "建议面谈｜2026-09-11",
        psych: { result: "建议面谈", time: "2026-09-11" },
        date: "2026-09-14",
        people: "周老师",
        type: "心理行为偏差 / 情绪困扰学生",
        method: "个体心理咨询与团体辅导",
        follow: "需要",
        result: "已完成首次沟通，后续继续关注在校情绪表现。",
        proofs: [],
      },
      {
        district: "渭滨区",
        school: "渭滨区第一初级中学",
        name: "刘晨",
        grade: "八年级（2024级）",
        className: "4班",
        sourceKey: "daily",
        source: "日常上传",
        dataSource: "",
        date: "2026-09-13",
        people: "陈老师",
        type: "家庭经济困难学生",
        method: "帮扶责任人 / 爱心结对制度",
        follow: "不需要",
        result: "已落实班级帮扶安排。",
        proofs: [],
      },
      {
        district: "金台区",
        school: "金台区实验小学",
        name: "孙悦",
        grade: "五年级（2027届）",
        className: "3班",
        sourceKey: "warning",
        source: "预警信息",
        dataSource: "连续缺勤｜2026-09-10 18:10",
        warning: {
          type: "连续缺勤",
          reason: "连续缺勤3个工作日",
          time: "2026-09-10 18:10",
        },
        date: "2026-09-12",
        people: "孙老师",
        type: "家庭突发变故学生",
        method: "常态化家访与家校沟通",
        follow: "需要",
        result: "已完成入户沟通，家长承诺配合返校。",
        proofs: [],
      },
    ];
    window.careRegV3Data = DATA;

    function shell() {
      var w = document.getElementById("scale-wrapper");
      if (!w || document.getElementById("city-float-menu")) return;
      var d = document.createElement("div");
      d.id = "city-float-menu";
      d.className = "city-float-menu";
      d.innerHTML =
        '<button class="city-menu-btn" aria-expanded="false" onclick="cityMenuToggle(event)"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>功能菜单</button><div class="city-menu-panel"><div class="city-menu-title">控辍保学</div><button class="city-menu-item" data-key="visit-district" onclick="cityMenuGo(\'visit-district\')"><span class="city-menu-dot"></span>控辍劝返台账</button><button class="city-menu-item" data-key="warning-district" onclick="cityMenuGo(\'warning-district\')"><span class="city-menu-dot"></span>控辍预警</button><button class="city-menu-item" data-key="care" onclick="cityMenuGo(\'care\')"><span class="city-menu-dot"></span>关爱监管</button><div class="city-menu-sep"></div><button class="city-menu-item" data-key="dashboard" onclick="cityMenuGo(\'dashboard\')"><span class="city-menu-dot"></span>数据看板</button></div>';
      w.appendChild(d);
      menuActive("visit-district");
    }
    function menuActive(k) {
      document.querySelectorAll(".city-menu-item").forEach(function (b) {
        b.classList.toggle("active", b.dataset.key === k);
      });
    }
    window.cityMenuToggle = function (e) {
      if (e) e.stopPropagation();
      var p = document.querySelector(".city-menu-panel"),
        b = document.querySelector(".city-menu-btn");
      var on = !p.classList.contains("on");
      p.classList.toggle("on", on);
      b.setAttribute("aria-expanded", String(on));
    };
    function menuClose() {
      var p = document.querySelector(".city-menu-panel"),
        b = document.querySelector(".city-menu-btn");
      if (p) p.classList.remove("on");
      if (b) b.setAttribute("aria-expanded", "false");
    }
    window.cityMenuGo = function (k) {
      menuClose();
      if (k === "care") {
        cityCareOpen();
        return;
      }
      var c = document.getElementById("section-care-menu-v1");
      if (c) c.classList.add("hidden");
      if (typeof window.switchPage === "function") window.switchPage(k);
      menuActive(k);
    };
    document.addEventListener("click", function (e) {
      var m = document.getElementById("city-float-menu");
      if (m && !m.contains(e.target)) menuClose();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") menuClose();
    });

    window.cityCareClose = function () {
      document.getElementById("city-care-mask-v1").classList.remove("on");
    };
    window.cityCareView = function (index) {
      if (!window.careRegV3Data[index]) return;
      var modal = document.getElementById("city-care-modal-v1");
      modal.innerHTML =
        '<div class="ecm-modal-head"><h3>关爱个案详情</h3><button type="button" class="ecm-close" onclick="cityCareClose()">×</button></div><div class="ecm-modal-body"></div><div class="ecm-foot"><button type="button" class="ecm-btn" onclick="cityCareClose()">关闭</button></div>';
      document.getElementById("city-care-mask-v1").classList.add("on");
    };
    shell();
  }
  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
