/* 当前原型使用的本地图标；不依赖远程 CDN 或运行时样式编译。 */
(function () {
  "use strict";
  var paths = {
    "graduation-cap":
      '<path d="m2 9 10-5 10 5-10 5-10-5Z"/><path d="M6 11v6c4 3 8 3 12 0v-6M22 9v7"/>',
    "shield-check":
      '<path d="M12 3 3 7v6c0 4 5 7 9 9 4-2 9-5 9-9V7l-9-4Z"/><path d="m8 12 3 3 5-6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "chevron-left": '<path d="m15 6-6 6 6 6"/>',
    "chevron-right": '<path d="m9 6 6 6-6 6"/>',
    search: '<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="m6 6 12 12M6 18 18 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    "file-text": '<path d="M14 2H5v20h14V7l-5-5ZM14 2v5h5M8 12h8M8 16h8"/>',
    "clipboard-check":
      '<path d="M9 4H5v18h14V4h-4M9 2h6v4H9V2Zm-1 12 3 3 5-6"/>',
    "clipboard-plus":
      '<path d="M9 4H5v18h14V4h-4M9 2h6v4H9V2ZM12 10v8M8 14h8"/>',
    "alert-circle": '<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 3v1"/>',
    pencil: '<path d="m15 3 6 6L8 22H2v-6L15 3Zm-3 3 6 6"/>',
    image:
      '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m3 18 5-5 4 4 4-6 5 7"/>',
    "layout-dashboard":
      '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="11" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="18" width="7" height="3" rx="1"/>',
  };
  function createIcons() {
    document
      .querySelectorAll("[data-lucide]:not(svg)")
      .forEach(function (node) {
        var content = paths[node.getAttribute("data-lucide")];
        if (!content) return;
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        Array.from(node.attributes).forEach(function (attr) {
          svg.setAttribute(attr.name, attr.value);
        });
        if (!svg.hasAttribute("width")) svg.setAttribute("width", "24");
        if (!svg.hasAttribute("height")) svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("aria-hidden", "true");
        svg.innerHTML = content;
        node.replaceWith(svg);
      });
  }
  window.lucide = { createIcons: createIcons };
})();
