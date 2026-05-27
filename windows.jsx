/* global React */
// ClaireOS — Window content components

const { useState, useEffect, useRef } = React;
const { Icon } = window.ClaireOS_UI;

// ========== About Me ==========
function AboutWin() {
  return (
    <div className="win-pad-lg">
      <div className="about-hero">
        <div className="avatar">cg</div>
        <div>
          <div className="section-eyebrow">hello, world</div>
          <h1 className="display">I'm <em>Claire Guo</em>.</h1>
          <p className="body">Software engineer with experienced in applied AI and full-stack.</p>
          <div className="about-meta">
            <span className="chip">claire.jl.guo@gmail.com</span>
            <span className="chip muted">Waterloo, ON</span>
            <span className="chip muted">she / her</span>
          </div>
        </div>
      </div>

      <h2 className="sec">At a glance</h2>
      <div className="about-grid">
        <div className="about-card">
          <div className="k">Currently</div>
          <div className="v">Undergrad Research Assistant</div>
        </div>
        <div className="about-card">
          <div className="k">Most recently</div>
          <div className="v">SWE Intern, Endex (NYC)</div>
        </div>
        <div className="about-card">
          <div className="k">Studying</div>
          <div className="v">Software Engineering</div>
        </div>
        <div className="about-card">
          <div className="k">Into</div>
          <div className="v">agents, full-stack, and crochet</div>
        </div>
      </div>

      <h2 className="sec" style={{ marginTop: 24 }}>Tech I reach for</h2>
      <div className="skill-group">
        <h3>Languages</h3>
        <div className="skill-pills">
          {["Python","TypeScript","C++","Java","Scala","Ruby","Swift","SQL","C","JavaScript","VHDL"].map(s => (
            <span className="pill" key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div className="skill-group">
        <h3>Frameworks & libraries</h3>
        <div className="skill-pills">
          {["Flask","Ruby on Rails","React","TailwindCSS","NumPy","OpenCV","MediaPipe"].map(s => (
            <span className="pill" key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div className="skill-group">
        <h3>Data & distributed systems</h3>
        <div className="skill-pills">
          {["PostgreSQL","Redis","Snowflake","Kafka","Dagster"].map(s => (
            <span className="pill" key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div className="skill-group">
        <h3>Cloud & infra</h3>
        <div className="skill-pills">
          {["AWS","Docker","Kubernetes","ArgoCD","Nginx","Cloudflare","DataDog","PostHog"].map(s => (
            <span className="pill" key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== Experience ==========
const EXPERIENCE = [
  {
    id: "endex",
    role: "Software Engineering Intern",
    company: "Endex",
    loc: "New York, NY",
    date: "Jan – May 2026",
    bullets: [
      <>Designed a <span className="tl-metric">Redis-backed</span> authentication cache decoupling token validation from backend instances — <span className="tl-metric">−50% validation latency</span> across Nginx-balanced servers.</>,
      <>Orchestrated terabyte-scale Snowflake schema migration with Dagster workflows and Prisma.</>,
      <>Resolved session-stickiness bugs in WebSocket infrastructure by fixing backend affinity in reconnection logic.</>,
      <>Architected an agent system for a PowerPoint plugin — sandboxed execution, volume-backed file systems, real-time WS with fallback, verification, and context compaction.</>,
      <>Benchmarked and refined LLM token-estimation algorithms — <span className="tl-metric">+39% accuracy</span>.</>,
      <>Redesigned prompting, fallback, and streaming logic for LLM agent workflows — indefinite session hangs from <span className="tl-metric">13% → 0.5%</span>.</>,
    ],
  },
  {
    id: "shopify",
    role: "Software Engineering Intern",
    company: "Shopify",
    loc: "Toronto, ON",
    date: "May – Aug 2025",
    bullets: [
      <>Built a new order-volume threshold algorithm in Ruby & SQL for delivery-time predictions — precision <span className="tl-metric">67% → 80.9%</span>, recall <span className="tl-metric">21.8% → 49%</span>.</>,
      <>Consolidated two high-traffic logistics services into one module — p99 latency <span className="tl-metric">8.84ms → 2.62ms</span>.</>,
      <>Partnered with the VP of Engineering & Growth to unify historical text and audio (support calls, notes) via OpenAI transcription + Anthropic Claude — delivering shared context across multiple AI-powered Shopify agents.</>,
    ],
  },
  {
    id: "research",
    role: "Undergraduate Research Assistant",
    company: "University of Waterloo · Prof. Sihang Liu",
    loc: "Waterloo, ON",
    date: "May 2026 – Present",
    bullets: [
      <>Researching security risks in KV-cache transfer between language models — how cached attention states can exchange context without slow autoregressive decoding.</>,
      <>Investigating malicious KV-cache injection attacks and defenses for preserving model integrity when external activation states are reused across models.</>,
      <>Exploring privacy exploits in activation-level communication protocols for LLM systems.</>,
    ],
  },
];

const PROJECTS = [
  {
    id: "drone",
    role: "Multi-Agent Drone Flock Simulation",
    company: "Python · Gymnasium · PPO · PyVista",
    loc: "Personal",
    date: "2025",
    bullets: [
      <>Custom Gymnasium 3D physics simulator: fixed-timestep integration, OBB collision detection, raycast-based neighbor perception for multi-drone envs.</>,
      <>Trained multi-agent PPO policies for obstacle avoidance with Plotly/PyVista offline visualization for run analysis.</>,
    ],
  },
  {
    id: "lemonaid",
    role: "LemonAid",
    company: "Python · Flask · React · Tailwind · OpenAI API",
    loc: "Hackathon",
    date: "2024",
    bullets: [
      <>Designed scalable Flask backend + React/Tailwind UI for an expiration-date prediction app.</>,
      <>Integrated RESTful APIs with OpenAI's image recognition to achieve high-accuracy expiration date inference.</>,
    ],
  },
  {
    id: "watergun",
    role: "Automated Water Gun Shooter",
    company: "Python · OpenCV · MediaPipe · Raspberry Pi",
    loc: "Personal",
    date: "2024",
    bullets: [
      <>Engineered a real-time target-tracking system on Raspberry Pi 5 — OpenCV + MediaPipe for <span className="tl-metric">sub-100ms</span> motion detection.</>,
      <>Drove a servo-and-pump assembly with closed-loop positional control.</>,
    ],
  },
];

function ExperienceWin() {
  const [tab, setTab] = useState("work");
  const items = tab === "work" ? EXPERIENCE : PROJECTS;
  return (
    <div className="win-pad-lg">
      <div className="section-eyebrow">resume.app</div>
      <h1 className="display" style={{ fontSize: 32, marginBottom: 18 }}>
        Where I've <em>built things</em>.
      </h1>

      <div className="exp-tabs">
        <div className={"exp-tab" + (tab === "work" ? " active" : "")} onClick={() => setTab("work")}>Work</div>
        <div className={"exp-tab" + (tab === "projects" ? " active" : "")} onClick={() => setTab("projects")}>Projects</div>
      </div>

      <div className="timeline">
        {items.map((it) => (
          <div className="tl-item" key={it.id}>
            <div className="tl-head">
              <h3 className="tl-role">{it.role}</h3>
              <span className="tl-date">{it.date}</span>
            </div>
            <div className="tl-co">{it.company}<span className="loc">{it.loc}</span></div>
            <ul className="tl-bullets">
              {it.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== Education ==========
function EducationWin() {
  return (
    <div className="win-pad-lg">
      <div className="section-eyebrow">education.app</div>
      <h1 className="display" style={{ fontSize: 30, marginBottom: 18 }}>
        Currently <em>studying</em>.
      </h1>

      <div className="edu-card">
        <div className="crest">uw</div>
        <h3 className="edu-school">University of Waterloo</h3>
        <p className="edu-degree">Bachelor of Software Engineering · Specialization in Artificial Intelligence</p>
      </div>

      <h2 className="sec">Selected coursework</h2>
      <div className="skill-pills">
        {[
          "Data Structures and Data Management",
          "Linear Algebra",
          "Calculus 1 + 2",
          "Compilers",
          "Optimization",
          "Statistics",
          "Combinatorics",
          "Sequential Programs",
        ].map(s => <span className="pill" key={s}>{s}</span>)}
      </div>

      <h2 className="sec" style={{ marginTop: 22 }}>Research interests</h2>
      <ul className="tl-bullets" style={{ paddingLeft: 0 }}>
        <li>LLM systems — KV cache, activation transfer, inference efficiency</li>
        <li>Security & privacy of cached attention states</li>
      </ul>
    </div>
  );
}

// ========== LinkedIn Card ==========
function LinkedInWin({ onOpenApp }) {
  return (
    <div className="win-pad-lg">
      <div className="li-card">
        <div className="li-avatar">cg</div>
        <h2 className="li-name">Claire Guo</h2>
        <p className="li-tag">Software Engineering Student @ University of Waterloo · Applied AI &amp; LLMs</p>
        <div className="li-actions">
          <a className="btn primary" href="https://www.linkedin.com/in/claire-jl-guo/" target="_blank" rel="noreferrer">View on LinkedIn ↗</a>
          <button className="btn" onClick={() => onOpenApp && onOpenApp("contact")}>Message</button>
        </div>
      </div>

      <h2 className="sec" style={{ marginTop: 22 }}>Find me elsewhere</h2>
      <div className="link-row">
        <a className="link-item" href="https://github.com/claireg0" target="_blank" rel="noreferrer">
          <span className="ic"><Icon name="github" size={16}/></span>
          <span className="lbl">GitHub</span>
          <span className="val">@claireg0</span>
          <span className="arr">↗</span>
        </a>
        <a className="link-item" href="https://www.linkedin.com/in/claire-jl-guo/" target="_blank" rel="noreferrer">
          <span className="ic">in</span>
          <span className="lbl">LinkedIn</span>
          <span className="val">claire-jl-guo</span>
          <span className="arr">↗</span>
        </a>
        <a className="link-item" href="mailto:claire.jl.guo@gmail.com">
          <span className="ic"><Icon name="mail" size={14}/></span>
          <span className="lbl">Personal email</span>
          <span className="val">claire.jl.guo@gmail.com</span>
          <span className="arr">↗</span>
        </a>
        <a className="link-item" href="mailto:claire.guo@uwaterloo.ca">
          <span className="ic"><Icon name="mail" size={14}/></span>
          <span className="lbl">School email</span>
          <span className="val">claire.guo@uwaterloo.ca</span>
          <span className="arr">↗</span>
        </a>
      </div>
    </div>
  );
}

// ========== Contact (Mail compose) ==========
function ContactWin() {
  const [to] = useState("claire.jl.guo@gmail.com");
  const [from, setFrom] = useState("");
  const [email, setEmail] = useState("");
  const [subj, setSubj] = useState("Hello Claire");
  const [body, setBody] = useState("Hey Claire,\n\nI saw your portfolio and ");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const send = () => {
    if (status === "sending") return;
    setStatus("sending");
    emailjs.send("service_6zvxm9p", "template_pweocw3", {
      name: from || "Anonymous",
      email: email,
      message: body,
    }).then(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2500);
    }).catch(() => {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    });
  };
  return (
    <div className="mail">
      <div className="mail-toolbar">
        <button className="btn primary" onClick={send} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : status === "sent" ? "✓ Sent!" : status === "error" ? "Failed — retry?" : "Send"}
        </button>
        <button className="btn" onClick={() => { setFrom(""); setEmail(""); setBody(""); setSubj("Hello Claire"); }}>Reset</button>
      </div>
      <div className="mail-fields">
        <div className="mail-field">
          <span className="lab">To</span>
          <input value={to} readOnly />
        </div>
        <div className="mail-field">
          <span className="lab">From</span>
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="your name" />
        </div>
        <div className="mail-field">
          <span className="lab">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" type="email" />
        </div>
        <div className="mail-field">
          <span className="lab">Subject</span>
          <input value={subj} onChange={(e) => setSubj(e.target.value)} />
        </div>
      </div>
      <div className="mail-body" style={{ display: "flex" }}>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
    </div>
  );
}

// ========== Terminal ==========
const TERM_PROMPT = "claire@claireOS";
const TERM_HELP = [
  { cmd: "whoami",        desc: "who's behind the keyboard" },
  { cmd: "cat bio.txt",   desc: "a slightly longer bio" },
  { cmd: "ls skills/",    desc: "list things i build with" },
  { cmd: "uptime",        desc: "years coding" },
  { cmd: "neofetch",      desc: "the obligatory" },
  { cmd: "contact",       desc: "ways to reach me" },
  { cmd: "fortune",       desc: "a wisdom (questionable)" },
  { cmd: "sudo hire-me",  desc: "(see what happens)" },
  { cmd: "clear",         desc: "clear screen" },
  { cmd: "help",          desc: "this menu" },
];

const FORTUNES = [
  "the best abstraction is the one you didn't have to write",
  "p99 latency is the truth, p50 is a story",
  "every cache is a correctness bug waiting to happen",
  "the right amount of state is one less than you have",
  "if it works on your laptop, ship the laptop",
];

function runCmd(input) {
  const raw = input.trim();
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const out = (lines) => lines;
  switch (lower) {
    case "help":
      return out([
        <span className="out">available commands:</span>,
        ...TERM_HELP.map(c => (
          <span><span className="acc">{c.cmd.padEnd(16, " ")}</span><span className="out">{c.desc}</span></span>
        )),
      ]);
    case "whoami":
      return out([
        <span className="ok">claire guo</span>,
        <span className="out">software engineering @ university of waterloo</span>,
        <span className="out">applied ai / llm systems / infra</span>,
      ]);
    case "cat bio.txt":
      return out([
        <span className="out">i build systems that talk to language models without falling over.</span>,
        <span className="out">most recently: agent infra at endex (nyc), logistics ai at shopify (toronto),</span>,
        <span className="out">and kv-cache security research at waterloo.</span>,
        <span className="out">i like fast feedback loops, careful prompts, and writing the small</span>,
        <span className="out">helper script before the big refactor.</span>,
      ]);
    case "ls skills/":
      return out([
        <span><span className="acc">languages/</span>      <span className="out">python ts c++ java scala ruby swift sql c js vhdl</span></span>,
        <span><span className="acc">frameworks/</span>     <span className="out">flask rails react tailwind numpy opencv mediapipe</span></span>,
        <span><span className="acc">data/</span>           <span className="out">postgres redis snowflake kafka dagster</span></span>,
        <span><span className="acc">cloud/</span>          <span className="out">aws docker k8s argocd nginx cloudflare datadog posthog</span></span>,
      ]);
    case "uptime":
      return out([
        <span className="out">up <span className="acc">~6 years</span>, load average: caffeine, curiosity, ctrl-z</span>,
      ]);
    case "neofetch":
      return out([
        <span><span className="acc">     ▲▲▲     </span>  <span className="ok">claire@claireOS</span></span>,
        <span><span className="acc">    ▲   ▲    </span>  <span className="out">-----------------</span></span>,
        <span><span className="acc">   ▲     ▲   </span>  <span className="acc">os:</span>      <span className="out">claireOS 1.0 (lavender)</span></span>,
        <span><span className="acc">  ▲ ▲▲▲▲▲ ▲  </span>  <span className="acc">shell:</span>   <span className="out">portfolio.sh</span></span>,
        <span><span className="acc">  ▲       ▲  </span>  <span className="acc">school:</span>  <span className="out">u waterloo · BSE-AI</span></span>,
        <span><span className="acc">  ▲▲▲   ▲▲▲  </span>  <span className="acc">role:</span>    <span className="out">software engineer</span></span>,
        <span><span className="out"> </span>             <span className="acc">based:</span>   <span className="out">canada 🍁 (placeholder ok)</span></span>,
      ]);
    case "contact":
      return out([
        <span><span className="acc">email:</span>    <span className="link-c">claire.jl.guo@gmail.com</span></span>,
        <span><span className="acc">linkedin:</span> <span className="link-c">linkedin.com/in/claire-jl-guo</span></span>,
        <span><span className="acc">github:</span>   <span className="link-c">github.com/claireg0</span></span>,
      ]);
    case "fortune": {
      const f = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      return out([<span className="out">"{f}"</span>]);
    }
    case "sudo hire-me":
      return out([
        <span className="err">[sudo] password for claire:</span>,
        <span className="out">authentication accepted ✓</span>,
        <span className="ok">looking for swe roles starting may 2027.</span>,
        <span className="out">drop a line — claire.jl.guo@gmail.com</span>,
      ]);
    case "clear":
      return "CLEAR";
    case "exit": case "quit":
      return out([<span className="out">nice try — close the window instead :)</span>]);
    default:
      return out([
        <span className="err">command not found: {raw}</span>,
        <span className="out">try <span className="acc">help</span> for the menu.</span>,
      ]);
  }
}

function TerminalWin() {
  const [history, setHistory] = useState([
    { kind: "out", node: <span className="out">claireOS 1.0 · portfolio shell · type <span className="acc">help</span> to begin</span> },
    { kind: "out", node: <span className="out">last login: today, on tty/portfolio</span> },
    { kind: "out", node: " " },
  ]);
  const [input, setInput] = useState("");
  const [past, setPast] = useState([]);
  const [pastIdx, setPastIdx] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const submit = (cmd) => {
    const newLines = [
      { kind: "in", node: (
        <span><span className="prompt">{TERM_PROMPT}</span><span className="out">:~$ </span><span className="cmd">{cmd}</span></span>
      )},
    ];
    const result = runCmd(cmd);
    if (result === "CLEAR") {
      setHistory([]);
      setPast(p => [cmd, ...p]);
      setInput("");
      setPastIdx(-1);
      return;
    }
    if (Array.isArray(result)) {
      result.forEach((node, i) => newLines.push({ kind: "out", node }));
    }
    newLines.push({ kind: "out", node: " " });
    setHistory(h => [...h, ...newLines]);
    if (cmd.trim()) setPast(p => [cmd, ...p]);
    setInput("");
    setPastIdx(-1);
  };

  const onKey = (e) => {
    if (e.key === "Enter") submit(input);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (past.length === 0) return;
      const ni = Math.min(pastIdx + 1, past.length - 1);
      setPastIdx(ni); setInput(past[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(pastIdx - 1, -1);
      setPastIdx(ni); setInput(ni < 0 ? "" : past[ni]);
    }
  };

  return (
    <div className="terminal" ref={scrollRef} onClick={() => inputRef.current && inputRef.current.focus()}>
      {history.map((h, i) => <div className="terminal-line" key={i}>{h.node}</div>)}
      <div className="terminal-line">
        <span className="prompt">{TERM_PROMPT}</span><span className="out">:~$ </span>
        <span className="cmd">{input}</span>
        <span className="caret"></span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
          style={{
            position: "absolute", opacity: 0, pointerEvents: "none",
            width: 0, height: 0, padding: 0, border: 0,
          }}
        />
      </div>
    </div>
  );
}

// ========== Trash (easter egg) ==========
function TrashWin() {
  return (
    <div className="trash-wrap">
      <div className="trash-head">
        <div className="trash-head-row">
          <div>
            <h2>Trash</h2>
            <p>3 items · too cute to delete</p>
          </div>
          <button className="btn" onClick={(e) => alert("are you sure? (how dare you)")}>Empty trash…</button>
        </div>
      </div>
      <div className="trash-grid">
        <div className="trash-file">
          <img className="cat-img" src="cats/bambi.JPG" alt="Bambi" />
          <div className="name">bambi.JPG</div>
          <div className="meta">best cat</div>
        </div>
        <div className="trash-file">
          <img className="cat-img" src="cats/dumbo.JPG" alt="Dumbo" />
          <div className="name">dumbo.JPG</div>
          <div className="meta">also best cat</div>
        </div>
        <div className="trash-file">
          <img className="cat-img" src="cats/max.jpeg" alt="Max" />
          <div className="name">max.jpeg</div>
          <div className="meta">also also best cat</div>
        </div>
      </div>
    </div>
  );
}

window.ClaireOS_WINS = {
  AboutWin, ExperienceWin, EducationWin,
  LinkedInWin, ContactWin, TerminalWin, TrashWin,
};
