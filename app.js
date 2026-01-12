(() => {
  const $ = (id) => document.getElementById(id);

  const state = {
    mode: "flex",
    cw: "90%",
    ch: "70%",
    pad: "14px",
    gap: "12px",
    // flex
    jc: "center",
    ai: "center",
    dir: "row",
    // grid
    place: "center",
    // text
    ta: "center",
    // position
    preset: "center",
    // child
    contentType: "text",
    bw: "180px",
    bh: "70px",
    radius: 12
  };

  const modes = [
    { key: "flex", label: "Flex" },
    { key: "grid", label: "Grid" },
    { key: "text", label: "Text" },
    { key: "position", label: "Position" },
  ];

  function buildModeChips() {
    const wrap = $("modeChips");
    wrap.innerHTML = "";
    modes.forEach(m => {
      const b = document.createElement("div");
      b.className = "chip" + (state.mode === m.key ? " active" : "");
      b.textContent = m.label;
      b.onclick = () => { state.mode = m.key; syncUI(); render(); };
      wrap.appendChild(b);
    });
  }

  function updateGapVisibility() {
    const showGap = (state.mode === "flex" || state.mode === "grid");
    const gapEl = $("gap");
    const padGapRow = $("padGapRow");

    if (!gapEl || !padGapRow) return;

    gapEl.style.display = showGap ? "" : "none";
    padGapRow.classList.toggle("single", !showGap);
  }

  function alignmentUI() {
    const host = $("alignmentBlock");
    host.innerHTML = "";

    const label = document.createElement("label");
    label.textContent = "Alignment";
    host.appendChild(label);

    const makeSelect = (id, options) => {
      const s = document.createElement("select");
      s.id = id;
      options.forEach(o => {
        const opt = document.createElement("option");
        opt.value = o.value;
        opt.textContent = o.text;
        s.appendChild(opt);
      });
      return s;
    };

    if (state.mode === "flex") {
      const row = document.createElement("div");
      row.className = "row";

      const jc = makeSelect("jcSel", [
        { value: "flex-start", text: "Left / Start" },
        { value: "center", text: "Center" },
        { value: "flex-end", text: "Right / End" },
        { value: "space-between", text: "Space Between" },
        { value: "space-around", text: "Space Around" },
        { value: "space-evenly", text: "Space Evenly" },
      ]);

      const ai = makeSelect("aiSel", [
        { value: "flex-start", text: "Top / Start" },
        { value: "center", text: "Center" },
        { value: "flex-end", text: "Bottom / End" },
        { value: "stretch", text: "Stretch" },
      ]);

      row.appendChild(jc);
      row.appendChild(ai);
      host.appendChild(row);

      const row2 = document.createElement("div");
      row2.className = "row";

      const dir = makeSelect("dirSel", [
        { value: "row", text: "Direction: Row" },
        { value: "column", text: "Direction: Column" },
      ]);

      row2.appendChild(dir);
      host.appendChild(row2);

      jc.value = state.jc;
      ai.value = state.ai;
      dir.value = state.dir;

      jc.onchange = e => { state.jc = e.target.value; render(); };
      ai.onchange = e => { state.ai = e.target.value; render(); };
      dir.onchange = e => { state.dir = e.target.value; render(); };

      $("explain").textContent = "Flex: justify-content = horizontal, align-items = vertical.";
    }

    if (state.mode === "grid") {
      const row = document.createElement("div");
      row.className = "row";

      const place = makeSelect("placeSel", [
        { value: "start", text: "Start" },
        { value: "center", text: "Center" },
        { value: "end", text: "End" },
        { value: "stretch", text: "Stretch" },
      ]);

      row.appendChild(place);
      host.appendChild(row);

      place.value = state.place;
      place.onchange = e => { state.place = e.target.value; render(); };

      $("explain").textContent = "Grid: place-items controls both directions together.";
    }

    if (state.mode === "text") {
      const row = document.createElement("div");
      row.className = "row";

      const ta = makeSelect("taSel", [
        { value: "left", text: "Left" },
        { value: "center", text: "Center" },
        { value: "right", text: "Right" },
        { value: "justify", text: "Justify" },
      ]);

      row.appendChild(ta);
      host.appendChild(row);

      ta.value = state.ta;
      ta.onchange = e => { state.ta = e.target.value; render(); };

      $("explain").textContent = "Text-align centers inline/text, not block divs.";
    }

    if (state.mode === "position") {
      const row = document.createElement("div");
      row.className = "row";

      const preset = makeSelect("presetSel", [
        { value: "center", text: "Center" },
        { value: "top-left", text: "Top Left" },
        { value: "top-right", text: "Top Right" },
        { value: "bottom-left", text: "Bottom Left" },
        { value: "bottom-right", text: "Bottom Right" },
      ]);

      row.appendChild(preset);
      host.appendChild(row);

      preset.value = state.preset;
      preset.onchange = e => { state.preset = e.target.value; render(); };

      $("explain").textContent = "Position: top/left + translate for perfect centering.";
    }
  }

  function applyChildContent() {
    const child = $("child");
    child.innerHTML = "";

    if (state.contentType === "text") {
      child.textContent = "Hello";
    } else if (state.contentType === "button") {
      const btn = document.createElement("button");
      btn.textContent = "Click me";
      btn.style.border = "none";
      btn.style.padding = "10px 12px";
      btn.style.borderRadius = "10px";
      btn.style.cursor = "pointer";
      child.appendChild(btn);
    } else {
      child.textContent = "🖼️ Image";
    }
  }

  function parentCSS() {
    const lines = [];
    lines.push(`width: ${state.cw};`);
    lines.push(`height: ${state.ch};`);
    lines.push(`padding: ${state.pad};`);

    if (state.mode === "flex") {
      lines.push(`display: flex;`);
      lines.push(`flex-direction: ${state.dir};`);
      lines.push(`justify-content: ${state.jc};`);
      lines.push(`align-items: ${state.ai};`);
      lines.push(`gap: ${state.gap};`);
    }

    if (state.mode === "grid") {
      lines.push(`display: grid;`);
      lines.push(`place-items: ${state.place};`);
      lines.push(`gap: ${state.gap};`);
    }

    if (state.mode === "text") {
      lines.push(`text-align: ${state.ta};`);
    }

    if (state.mode === "position") {
      lines.push(`position: relative;`);
    }

    return `.parent {\n  ${lines.join("\n  ")}\n}`;
  }

  function childCSS() {
    const lines = [];
    if (state.bw) lines.push(`width: ${state.bw};`);
    if (state.bh) lines.push(`height: ${state.bh};`);
    lines.push(`border-radius: ${Number(state.radius || 0)}px;`);

    if (state.mode === "position") {
      lines.push(`position: absolute;`);
      if (state.preset === "center") {
        lines.push(`top: 50%;`);
        lines.push(`left: 50%;`);
        lines.push(`transform: translate(-50%, -50%);`);
      } else if (state.preset === "top-left") {
        lines.push(`top: 0; left: 0;`);
      } else if (state.preset === "top-right") {
        lines.push(`top: 0; right: 0;`);
      } else if (state.preset === "bottom-left") {
        lines.push(`bottom: 0; left: 0;`);
      } else if (state.preset === "bottom-right") {
        lines.push(`bottom: 0; right: 0;`);
      }
    } else {
      lines.push(`position: static;`);
      lines.push(`transform: none;`);
    }

    return `.child {\n  ${lines.join("\n  ")}\n}`;
  }

  function setQueryFromState() {
    const p = new URLSearchParams();
    Object.entries(state).forEach(([k, v]) => p.set(k, String(v)));
    history.replaceState(null, "", "?" + p.toString());
  }

  function loadStateFromQuery() {
    const p = new URLSearchParams(location.search);
    for (const [k, v] of p.entries()) {
      if (k in state) state[k] = (k === "radius" ? Number(v) : v);
    }
  }

  function render() {
    buildModeChips();
    alignmentUI();
    applyChildContent();

    // hydrate inputs
    $("cw").value = state.cw;
    $("ch").value = state.ch;
    $("pad").value = state.pad;
    $("gap").value = state.gap;

    $("contentType").value = state.contentType;
    $("bw").value = state.bw;
    $("bh").value = state.bh;
    $("radius").value = state.radius;

    // hide/show gap depending on mode
    updateGapVisibility();

    const parent = $("parent");
    const child = $("child");

    // parent base
    parent.style.width = state.cw;
    parent.style.height = state.ch;
    parent.style.padding = state.pad;

    // reset mode styles
    parent.style.display = "";
    parent.style.justifyContent = "";
    parent.style.alignItems = "";
    parent.style.flexDirection = "";
    parent.style.gap = "";
    parent.style.placeItems = "";
    parent.style.textAlign = "";
    parent.style.position = "";

    if (state.mode === "flex") {
      parent.style.display = "flex";
      parent.style.flexDirection = state.dir;
      parent.style.justifyContent = state.jc;
      parent.style.alignItems = state.ai;
      parent.style.gap = state.gap;
    }

    if (state.mode === "grid") {
      parent.style.display = "grid";
      parent.style.placeItems = state.place;
      parent.style.gap = state.gap;
    }

    if (state.mode === "text") {
      parent.style.display = "block";
      parent.style.textAlign = state.ta;
    }

    if (state.mode === "position") {
      parent.style.display = "block";
      parent.style.position = "relative";
    }

    // child base
    child.style.width = state.bw;
    child.style.height = state.bh;
    child.style.borderRadius = Number(state.radius || 0) + "px";

    // position handling
    child.style.top = child.style.left = child.style.right = child.style.bottom = "";
    if (state.mode === "position") {
      child.style.position = "absolute";
      child.style.transform = "";
      if (state.preset === "center") {
        child.style.top = "50%";
        child.style.left = "50%";
        child.style.transform = "translate(-50%, -50%)";
      } else if (state.preset === "top-left") {
        child.style.top = "0"; child.style.left = "0";
      } else if (state.preset === "top-right") {
        child.style.top = "0"; child.style.right = "0";
      } else if (state.preset === "bottom-left") {
        child.style.bottom = "0"; child.style.left = "0";
      } else if (state.preset === "bottom-right") {
        child.style.bottom = "0"; child.style.right = "0";
      }
    } else {
      child.style.position = "static";
      child.style.transform = "none";
    }

    $("cssOut").textContent = parentCSS() + "\n\n" + childCSS();
    setQueryFromState();
  }

  function syncUI() {
    $("cw").oninput = e => { state.cw = e.target.value; render(); };
    $("ch").oninput = e => { state.ch = e.target.value; render(); };
    $("pad").oninput = e => { state.pad = e.target.value; render(); };
    $("gap").oninput = e => { state.gap = e.target.value; render(); };

    $("contentType").onchange = e => { state.contentType = e.target.value; render(); };
    $("bw").oninput = e => { state.bw = e.target.value; render(); };
    $("bh").oninput = e => { state.bh = e.target.value; render(); };
    $("radius").oninput = e => { state.radius = Number(e.target.value || 0); render(); };

    $("copyBtn").onclick = async () => {
      try {
        await navigator.clipboard.writeText($("cssOut").textContent);
        $("copyBtn").textContent = "Copied ✅";
        setTimeout(() => $("copyBtn").textContent = "Copy CSS", 900);
      } catch {
        alert("Copy failed. Select and copy manually.");
      }
    };

    $("resetBtn").onclick = () => {
      location.href = location.pathname;
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadStateFromQuery();
    syncUI();
    render();
  });
})();
