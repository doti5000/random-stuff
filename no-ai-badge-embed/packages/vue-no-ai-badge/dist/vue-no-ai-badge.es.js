import { onMounted as o, onUnmounted as n, openBlock as s, createElementBlock as d } from "vue";
const r = { style: { display: "none" } }, l = "https://random-stuff-swart-three.vercel.app/no-ai-badge-embed/embed-badge.js", c = {
  __name: "NoAiBadge",
  props: {
    position: { type: String, default: "bottom-right" },
    width: { type: [Number, String], default: 120 },
    margin: { type: [Number, String], default: 20 },
    hideOnMobile: { type: Boolean, default: !1 },
    opacity: { type: Number, default: 1 },
    animation: { type: String, default: "scale" },
    analyticsEndpoint: { type: String, default: void 0 },
    physics: { type: Boolean, default: !1 },
    printProtect: { type: Boolean, default: !0 },
    devtoolsProtect: { type: Boolean, default: !0 },
    watermark: { type: Boolean, default: !0 },
    shield: { type: Boolean, default: !0 },
    observer: { type: Boolean, default: !0 },
    rightClick: { type: Boolean, default: !0 }
  },
  setup(i) {
    const t = i;
    return o(() => {
      if (document.getElementById("no-ai-badge-script"))
        return;
      const e = document.createElement("script");
      e.src = l, e.id = "no-ai-badge-script", e.async = !0, t.position && (e.dataset.position = t.position), t.width && (e.dataset.width = t.width), t.margin && (e.dataset.margin = t.margin), t.hideOnMobile && (e.dataset.hideOnMobile = "true"), t.opacity !== 1 && (e.dataset.opacity = t.opacity), t.animation === "none" && (e.dataset.animation = "none"), t.analyticsEndpoint && (e.dataset.analyticsEndpoint = t.analyticsEndpoint), t.physics && (e.dataset.physics = "true"), t.printProtect === !1 && (e.dataset.printProtect = "false"), t.devtoolsProtect === !1 && (e.dataset.devtoolsProtect = "false"), t.watermark === !1 && (e.dataset.watermark = "false"), t.shield === !1 && (e.dataset.shield = "false"), t.observer === !1 && (e.dataset.observer = "false"), t.rightClick === !1 && (e.dataset.rightClick = "false"), document.body.appendChild(e);
    }), n(() => {
      const e = document.getElementById("no-ai-badge-script");
      e && e.remove();
      const a = document.getElementById("no-ai-badge-embed-container");
      a && a.remove();
    }), (e, a) => (s(), d("div", r));
  }
};
export {
  c as NoAiBadge,
  c as default
};
