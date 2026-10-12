/* 第一期两方案六端共享字典：标签、顺序严格按用户2026-10-10确认，不推断诊断或资格。 */
(function () {
  "use strict";
  function entries(prefix, labels) {
    return Object.freeze(
      labels.map(function (label, index) {
        return Object.freeze({
          id: prefix + String(index + 1).padStart(2, "0"),
          label: label,
        });
      }),
    );
  }
  var types = entries("CARE_TYPE_", [
      "家庭经济困难学生",
      "农村留守儿童",
      "进城务工随迁子女",
      "单亲 / 监护缺失学生",
      "随班就读残疾学生",
      "心理行为偏差 / 情绪困扰学生",
      "心理危机学生",
      "慢性疾病需特殊照料学生",
      "学业困难学生",
      "升学考试焦虑学生",
      "遭遇校园欺凌霸凌学生",
      "家庭突发变故学生",
    ]),
    methods = entries("CARE_METHOD_", [
      "学业帮扶与个性化辅导",
      "心理健康屋减压",
      "个体心理咨询与团体辅导",
      "心理危机干预与转介就医",
      "国家学生资助（两免一补 / 营养改善 / 助学金）",
      "特殊困难学生临时救助",
      "寄宿与日常起居照料",
      "上下学与假期安全管护",
      "常态化家访与家校沟通",
      "家长教育与监护能力指导",
      "校园欺凌防治帮扶",
      "公共安全与专题安全教育",
      "帮扶责任人 / 爱心结对制度",
      "专业社工与多部门协同关爱",
      "精神疾病诊疗与复学支持",
    ]);
  window.CARE_DICTIONARY_V1 = Object.freeze({
    version: "2026-10-10",
    types: types,
    methods: methods,
    typeLabels: Object.freeze(
      types.map(function (item) {
        return item.label;
      }),
    ),
    methodLabels: Object.freeze(
      methods.map(function (item) {
        return item.label;
      }),
    ),
  });
})();
