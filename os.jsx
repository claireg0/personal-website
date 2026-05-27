/* global React */
// ClaireOS — OS shell (menubar, desktop, dock, window manager)

const { useState, useEffect, useRef, useCallback } = React;

// ---------- ICONS as inline SVG (kept simple, geometric) ----------
function Icon({ name, size = 24 }) {
  const s = size;
  const stroke = "currentColor";
  switch (name) {
    case "user":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="9" r="3.6" stroke={stroke} strokeWidth="1.7" />
          <path d="M5 19c1.2-3.4 4-5 7-5s5.8 1.6 7 5" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="7" width="18" height="13" rx="2" stroke={stroke} strokeWidth="1.7" />
          <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" stroke={stroke} strokeWidth="1.7" />
          <path d="M3 12h18" stroke={stroke} strokeWidth="1.7" />
        </svg>
      );
    case "grad":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M2 9l10-4 10 4-10 4-10-4z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" stroke={stroke} strokeWidth="1.7" />
          <path d="M22 9v5" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "link":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke={stroke} strokeWidth="1.7" />
          <rect x="6" y="10" width="2.5" height="8" fill={stroke} />
          <circle cx="7.25" cy="7.25" r="1.3" fill={stroke} />
          <path d="M11 18v-4.5c0-1.5 1-2.5 2.3-2.5s2.2 1 2.2 2.5V18M11 18v-7M16.5 18v-4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "mail":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke={stroke} strokeWidth="1.7" />
          <path d="M4 7l8 6 8-6" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "terminal":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="2.5" y="4" width="19" height="16" rx="2" stroke={stroke} strokeWidth="1.7" />
          <path d="M6 9l3 3-3 3M11 15h6" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trash":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M9 7V4h6v3" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13" stroke={stroke} strokeWidth="1.7" />
        </svg>
      );
    case "code":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "github":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-2 1.03-2.7-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0112 6.8c.85.004 1.7.11 2.5.34 1.9-1.3 2.74-1.03 2.74-1.03.56 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.86-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z"/>
        </svg>
      );
    case "settings":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth="1.7" />
          <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default: return null;
  }
}

// ---------- MENU BAR ----------
function MenuBar({ activeApp }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = time.toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit"
  });
  return (
    <div className="menubar">
      <div className="menubar-logo"></div>
      <div className="menubar-item">{activeApp || "Finder"}</div>
      <div className="menubar-item">File</div>
      <div className="menubar-item">Edit</div>
      <div className="menubar-item">View</div>
      <div className="menubar-item">Window</div>
      <div className="menubar-item">Help</div>
      <div className="menubar-spacer"></div>
      <div className="menubar-right">
        <span className="menubar-status">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M3.5 7.5a5 5 0 017 0M1.5 5a8 8 0 0111 0M5.5 10a2.5 2.5 0 013 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          </svg>
        </span>
        <span className="menubar-status">
          <span className="battery"></span>
          <span>76%</span>
        </span>
        <span>{fmt}</span>
      </div>
    </div>
  );
}

// ---------- DESKTOP ICONS ----------
function DesktopIcons({ items, onOpen, openSet }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="desktop-icons" onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
      {items.map((it) => (
        <div
          key={it.id}
          className={"desk-icon" + (selected === it.id ? " active" : "")}
          onClick={(e) => { e.stopPropagation(); setSelected(it.id); }}
          onDoubleClick={() => onOpen(it.id)}
        >
          <div className="desk-icon-img" style={{ color: it.color || "var(--accent)" }}>
            {it.emoji ? it.emoji : <Icon name={it.glyph} size={26} />}
          </div>
          <div className="desk-icon-label">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- DOCK ----------
function Dock({ items, onClick, openIds, minimizedIds }) {
  return (
    <div className="dock-wrap">
      <div className="dock">
        {items.map((it, i) => (
          <React.Fragment key={it.id || ("div-" + i)}>
            {it.divider ? (
              <div className="dock-divider"></div>
            ) : (
              <div
                className={"dock-item" + (openIds.has(it.id) ? " is-open" : "")}
                onClick={() => onClick(it.id)}
                title={it.label}
                style={{ color: it.color || "var(--accent)" }}
              >
                {it.emoji ? it.emoji : <Icon name={it.glyph} size={28} />}
                <div className="dock-tooltip">{it.label}</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ---------- WINDOW ----------
function Win({ win, onClose, onMin, onMax, onFocus, onMove, onResize, children }) {
  const titleRef = useRef(null);
  const winRef = useRef(null);
  const winStateRef = useRef(win);
  winStateRef.current = win;

  // Drag titlebar — subscribe once; read current state from ref
  useEffect(() => {
    const tb = titleRef.current;
    if (!tb) return;
    let dragging = false;
    let sx = 0, sy = 0, ox = 0, oy = 0;
    const onDown = (e) => {
      if (e.target.classList && e.target.classList.contains("tb-btn")) return;
      const cur = winStateRef.current;
      if (cur.maximized) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      ox = cur.x; oy = cur.y;
      onFocus(cur.id);
      e.preventDefault();
    };
    const onMove2 = (e) => {
      if (!dragging) return;
      const cur = winStateRef.current;
      let newX = ox + (e.clientX - sx);
      let newY = oy + (e.clientY - sy);
      // Can't go above menu bar
      if (newY < 30) newY = 30;
      // Can't go off left/right edges
      const vw = window.innerWidth;
      if (newX < 0) newX = 0;
      if (newX + cur.w > vw) newX = vw - cur.w;
      if (newX < 0) newX = 0; // window wider than viewport — pin left
      onMove(cur.id, newX, newY);
    };
    const onUp = () => { dragging = false; };
    tb.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove2);
    window.addEventListener("mouseup", onUp);
    return () => {
      tb.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove2);
      window.removeEventListener("mouseup", onUp);
    };
  }, [onFocus, onMove]);

  // Resize SE corner
  const onResizeStart = (e) => {
    if (win.maximized) return;
    e.stopPropagation();
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY;
    const ow = win.w, oh = win.h;
    const onMove2 = (ev) => {
      onResize(win.id, Math.max(320, ow + (ev.clientX - sx)), Math.max(220, oh + (ev.clientY - sy)));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove2);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove2);
    window.addEventListener("mouseup", onUp);
  };

  const style = win.maximized
    ? { left: 0, top: 30, width: "100vw", height: "calc(100vh - 30px)", zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  const cls = "window"
    + (win.closing ? " closing" : "")
    + (win.minimizing ? " minimizing" : "")
    + (win.maximized ? " maximized" : "");

  return (
    <div
      ref={winRef}
      className={cls}
      style={style}
      onMouseDown={() => onFocus(win.id)}
    >
      <div className="titlebar" ref={titleRef} onDoubleClick={() => onMax(win.id)}>
        <div className="tb-buttons">
          <span className="tb-btn close" onClick={(e) => { e.stopPropagation(); onClose(win.id); }}>×</span>
          <span className="tb-btn min"   onClick={(e) => { e.stopPropagation(); onMin(win.id); }}>–</span>
          <span className="tb-btn max"   onClick={(e) => { e.stopPropagation(); onMax(win.id); }}>+</span>
        </div>
        <div className="tb-title">{win.title}</div>
        <div className="tb-spacer"></div>
      </div>
      <div className="win-body">
        {children}
      </div>
      {!win.maximized && <div className="resizer" onMouseDown={onResizeStart}></div>}
    </div>
  );
}

window.ClaireOS_UI = { MenuBar, DesktopIcons, Dock, Win, Icon };
