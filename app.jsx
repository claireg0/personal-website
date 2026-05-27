/* global React, ReactDOM */
// ClaireOS — Root app with window manager + boot

const { useState, useEffect, useRef, useCallback } = React;
const { MenuBar, DesktopIcons, Dock, Win, Icon } = window.ClaireOS_UI;
const W = window.ClaireOS_WINS;
const TweaksPanel  = window.TweaksPanel;
const useTweaks    = window.useTweaks;
const TweakSection = window.TweakSection;
const TweakSelect  = window.TweakSelect;
const TweakToggle  = window.TweakToggle;
const TweakButton  = window.TweakButton;
const TweakRadio   = window.TweakRadio;

// Tweakable defaults
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "lavender",
  "wallpaperStyle": "soft-gradient",
  "showSticky": true,
  "fontDisplay": "instrument-serif"
}/*EDITMODE-END*/;

const APP_REGISTRY = {
  about:      { id: "about",      label: "About Me",     glyph: "user",      title: "About — Claire" },
  experience: { id: "experience", label: "Experience",   glyph: "briefcase", title: "Experience" },
  education:  { id: "education",  label: "Education",    glyph: "grad",      title: "Education" },
  linkedin:   { id: "linkedin",   label: "Connect",      glyph: "link",      title: "Connect" },
  contact:    { id: "contact",    label: "Mail",         glyph: "mail",      title: "Compose — Mail" },
  terminal:   { id: "terminal",   label: "Terminal",     glyph: "terminal",  title: "claire@claireOS — bash" },
  trash:      { id: "trash",      label: "Trash",        glyph: "trash",     title: "Trash" },
};

// Initial open positions
const INITIAL_LAYOUT = {
  about:      { x: null, y: null, w: 720, h: 620 }, // centered later
  experience: { x: 80,   y: 80,   w: 700, h: 600 },
  education:  { x: 140,  y: 120,  w: 640, h: 580 },
  linkedin:   { x: 200,  y: 140,  w: 460, h: 560 },
  contact:    { x: 160,  y: 130,  w: 580, h: 460 },
  terminal:   { x: 100,  y: 100,  w: 640, h: 420 },
  trash:      { x: 220,  y: 160,  w: 480, h: 420 },
};

function App() {
  // Tweaks
  const [t, setTweak] = useTweaks ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute("data-theme", t.theme || "lavender");
  }, [t.theme]);

  // Boot
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setBooted(true), 2400);
    return () => clearTimeout(id);
  }, []);

  // Window manager
  const [wins, setWins] = useState({});
  const [order, setOrder] = useState([]); // ids in z-order, last is top
  const zRef = useRef(100);

  const focusWin = useCallback((id) => {
    setWins((prev) => {
      if (!prev[id]) return prev;
      zRef.current += 1;
      return { ...prev, [id]: { ...prev[id], z: zRef.current, minimized: false } };
    });
    setOrder((o) => [...o.filter(x => x !== id), id]);
  }, []);

  const openApp = useCallback((id) => {
    const reg = APP_REGISTRY[id];
    if (!reg) return;
    setWins((prev) => {
      if (prev[id]) {
        // already open — focus / unminimize
        zRef.current += 1;
        return { ...prev, [id]: { ...prev[id], minimized: false, z: zRef.current, closing: false } };
      }
      zRef.current += 1;
      const layout = INITIAL_LAYOUT[id];
      const vw = window.innerWidth, vh = window.innerHeight;
      let x = layout.x, y = layout.y;
      // For 'about', center it
      if (x === null || y === null) {
        x = Math.max(20, Math.round((vw - layout.w) / 2));
        y = Math.max(50, Math.round((vh - layout.h) / 2 - 30));
      } else {
        // Add slight stagger based on existing windows
        const openCount = Object.keys(prev).length;
        x = x + openCount * 24;
        y = y + openCount * 18;
      }
      return {
        ...prev,
        [id]: {
          id,
          title: reg.title,
          x, y,
          w: layout.w, h: layout.h,
          z: zRef.current,
          minimized: false,
          maximized: false,
        }
      };
    });
    setOrder((o) => [...o.filter(x => x !== id), id]);
  }, []);

  const closeWin = useCallback((id) => {
    // mark closing for animation
    setWins((prev) => prev[id] ? ({ ...prev, [id]: { ...prev[id], closing: true } }) : prev);
    setTimeout(() => {
      setWins((prev) => { const { [id]: _, ...rest } = prev; return rest; });
      setOrder((o) => o.filter(x => x !== id));
    }, 180);
  }, []);

  const minWin = useCallback((id) => {
    setWins((prev) => prev[id] ? ({ ...prev, [id]: { ...prev[id], minimizing: true } }) : prev);
    setTimeout(() => {
      setWins((prev) => prev[id] ? ({ ...prev, [id]: { ...prev[id], minimized: true, minimizing: false } }) : prev);
    }, 300);
  }, []);

  const maxWin = useCallback((id) => {
    setWins((prev) => prev[id] ? ({ ...prev, [id]: { ...prev[id], maximized: !prev[id].maximized } }) : prev);
  }, []);

  const moveWin = useCallback((id, x, y) => {
    setWins((prev) => prev[id] ? ({ ...prev, [id]: { ...prev[id], x, y } }) : prev);
  }, []);

  const resizeWin = useCallback((id, w, h) => {
    setWins((prev) => prev[id] ? ({ ...prev, [id]: { ...prev[id], w, h } }) : prev);
  }, []);

  // Open About automatically after boot
  useEffect(() => {
    if (booted) {
      const id = setTimeout(() => openApp("about"), 300);
      return () => clearTimeout(id);
    }
  }, [booted, openApp]);

  // Build desktop icons
  const desktopIconItems = [
    { id: "about",      label: "About Me",   glyph: "user" },
    { id: "experience", label: "Experience", glyph: "briefcase" },
    { id: "education",  label: "Education",  glyph: "grad" },
    { id: "terminal",   label: "Terminal",   glyph: "terminal" },
    { id: "trash",      label: "Trash",      glyph: "trash" },
  ];

  // Dock items
  const dockItems = [
    { id: "about",      label: "About",      glyph: "user" },
    { id: "experience", label: "Experience", glyph: "briefcase" },
    { id: "education",  label: "Education",  glyph: "grad" },
    { id: "linkedin",   label: "Connect",    glyph: "link" },
    { id: "contact",    label: "Mail",       glyph: "mail" },
    { divider: true },
    { id: "terminal",   label: "Terminal",   glyph: "terminal" },
    { id: "trash",      label: "Trash",      glyph: "trash" },
  ];

  const openIds = new Set(Object.keys(wins));
  const activeId = order[order.length - 1];
  const activeApp = activeId && APP_REGISTRY[activeId] ? APP_REGISTRY[activeId].label : "Finder";

  // Sticky note drag
  const [stickyPos, setStickyPos] = useState({ x: 36, y: 78 });
  const [sticky2Pos, setSticky2Pos] = useState({ x: 36, y: 310 });
  const dragSticky = (which) => (e) => {
    const cur = which === 1 ? stickyPos : sticky2Pos;
    const setter = which === 1 ? setStickyPos : setSticky2Pos;
    const sx = e.clientX, sy = e.clientY;
    const ox = cur.x, oy = cur.y;
    const onMove = (ev) => setter({ x: ox + (ev.clientX - sx), y: oy + (ev.clientY - sy) });
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <>
      {!booted && (
        <div className="boot">
          <div className="boot-logo">c</div>
          <div className="boot-name">claireOS</div>
          <div className="boot-bar"></div>
          <div className="boot-hint">version 1.0 · portfolio edition</div>
        </div>
      )}

      <MenuBar activeApp={activeApp} />

      <div className="desktop">
        {t.showSticky && (
          <>
            <div
              className="sticky-note"
              style={{ left: stickyPos.x, top: stickyPos.y }}
              onMouseDown={dragSticky(1)}
            >
              <h4>quick facts</h4>
              <p>
                loves cats<br/>
                based in canada<br/>
                bachelors of software engineering @ waterloo<br/>
                open for work
              </p>
            </div>
            <div
              className="sticky-note note-2"
              style={{ left: sticky2Pos.x, top: sticky2Pos.y }}
              onMouseDown={dragSticky(2)}
            >
              <h4>welcome</h4>
              <p>
                this is my portfolio, dressed up as a tiny operating system. double-click the icons (top-right) or tap the dock to explore.
              </p>
            </div>
          </>
        )}
        <DesktopIcons items={desktopIconItems} onOpen={openApp} />
      </div>

      {/* Windows */}
      {Object.values(wins).map((win) => {
        if (win.minimized && !win.minimizing) return null;
        const reg = APP_REGISTRY[win.id];
        let content = null;
        switch (win.id) {
          case "about":      content = <W.AboutWin />; break;
          case "experience": content = <W.ExperienceWin />; break;
          case "education":  content = <W.EducationWin />; break;
          case "linkedin":   content = <W.LinkedInWin onOpenApp={openApp} />; break;
          case "contact":    content = <W.ContactWin />; break;
          case "terminal":   content = <W.TerminalWin />; break;
          case "trash":      content = <W.TrashWin />; break;
          default: content = null;
        }
        return (
          <Win
            key={win.id}
            win={win}
            onClose={closeWin}
            onMin={minWin}
            onMax={maxWin}
            onFocus={focusWin}
            onMove={moveWin}
            onResize={resizeWin}
          >
            {content}
          </Win>
        );
      })}

      <Dock items={dockItems} onClick={openApp} openIds={openIds} />

      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Theme">
            <TweakSelect
              label="Palette"
              value={t.theme}
              onChange={(v) => setTweak("theme", v)}
              options={[
                { value: "lavender", label: "Lavender (default)" },
                { value: "mint",     label: "Mint" },
                { value: "sky",      label: "Sky" },
                { value: "dusk",     label: "Dusk" },
              ]}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              {[
                { id: "lavender", c: "#8a7bd8" },
                { id: "mint",     c: "#4fa987" },
                { id: "sky",      c: "#5f8fc7" },
                { id: "dusk",     c: "#a073c2" },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setTweak("theme", p.id)}
                  title={p.id}
                  style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: p.c,
                    border: t.theme === p.id ? "2px solid #2a2a3e" : "2px solid rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </TweakSection>
          <TweakSection title="Desktop">
            <TweakToggle
              label="Show sticky notes"
              value={t.showSticky}
              onChange={(v) => setTweak("showSticky", v)}
            />
            <TweakButton
              label="Cascade all windows"
              onClick={() => {
                ["experience","education","linkedin","terminal"].forEach((id, i) => {
                  setTimeout(() => openApp(id), i * 220);
                });
              }}
            />
            <TweakButton
              label="Close all windows"
              secondary
              onClick={() => {
                Object.keys(wins).forEach(id => closeWin(id));
              }}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
