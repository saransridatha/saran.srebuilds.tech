import { useState, useRef, useEffect, useCallback } from "react";

// Robust Virtual File System
const VFS: any = {
  "~": {
    type: "dir",
    children: ["projects", "experience", "foundations", "certifications", "vitals.sh", "README.md"],
  },
  "~/projects": {
    type: "dir",
    children: ["skysafe.md", "basecamp.md", "fluxcontrol.md", "infrapulse.md", "httptest.md"],
  },
  "~/experience": {
    type: "dir",
    children: ["2lyp_computations.md"],
  },
  "~/foundations": {
    type: "dir",
    children: ["education.md", "interests.txt"],
  },
  "~/certifications": {
    type: "dir",
    children: ["aws_saa.pdf", "azure_ai.pdf", "oci_genai.pdf"],
  },
  "~/README.md": "Saran's Portfolio v2.1.0\nThis is an interactive shell. Explore the directories to learn more about my work.\nTry 'ls -R' for a recursive view.",
  "~/vitals.sh": "UPTIME: 99.98% | LATENCY: 22ms | STATUS: OPTIMAL | OS: FEDORA_LINUX",
  "~/projects/skysafe.md": "SkySafe: Aviation Risk Intelligence\nStack: Next.js, Gemini 2.0, Three.js\nURL: https://skysafe.srebuilds.tech",
  "~/projects/basecamp.md": "Basecamp: Himalayan Terminal Dashboard\nStack: Python, Asyncio, TUI\nA full-screen terminal UI for SRE monitoring.",
  "~/foundations/education.md": "Chandigarh University\nB.E. (Hons.) Computer Science - Cloud Computing\nCGPA: 7.27/10",
  "~/experience/2lyp_computations.md": "Application Reliability Engineer Intern\nFocus: Linux, AWS, Jenkins, Podman, Monitoring.",
};

export default function TerminalPlayground() {
  const [logs, setLogs] = useState<string[]>([
    "Cloud_Console v2.1.0-stable (pts/0)",
    "Authorized access only. Logging enabled.",
    "Type 'help' for available commands.",
    ""
  ]);
  const [path, setPath] = useState("~");
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = useCallback((cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const userLine = `saran@cloud:${path}$ ${trimmed}`;
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    let response: string | string[] = "";

    setHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);

    switch (cmd) {
      case "help":
        response = "Available: ls, cd, cat, pwd, clear, whoami, trek, status, history, uname, date";
        break;
      case "clear":
        setLogs([]);
        setInputValue("");
        return;
      case "pwd":
        response = path.replace("~", "/home/saran");
        break;
      case "whoami":
        response = "saran (Application Reliability Engineer)";
        break;
      case "date":
        response = new Date().toString();
        break;
      case "uname":
        response = arg === "-a" ? "Linux cloud-node 6.11.0-fedora #1 SMP PREEMPT_DYNAMIC x86_64" : "Linux";
        break;
      case "history":
        response = history.slice().reverse().map((c, i) => `  ${i + 1}  ${c}`).join("\n");
        break;
      case "ls":
        const currentDir = VFS[path];
        if (arg === "-R") {
          response = ".:\nprojects  experience  foundations  certifications  vitals.sh  README.md\n\n./projects:\nskysafe.md  basecamp.md  fluxcontrol.md";
        } else {
          response = currentDir.children.join("  ");
        }
        break;
      case "cd":
        if (!arg || arg === "~") {
          setPath("~");
        } else if (arg === "..") {
          if (path !== "~") setPath("~");
        } else {
          const targetPath = path === "~" ? `~/${arg.replace("/", "")}` : `${path}/${arg.replace("/", "")}`;
          if (VFS[targetPath] && VFS[targetPath].type === "dir") {
            setPath(targetPath);
          } else {
            response = `-bash: cd: ${arg}: No such directory`;
          }
        }
        break;
      case "cat":
        if (!arg) {
          response = "usage: cat <file>";
        } else {
          const filePath = arg.startsWith("~") ? arg : (path === "~" ? `~/${arg}` : `${path}/${arg}`);
          if (VFS[filePath] && typeof VFS[filePath] === "string") {
            response = VFS[filePath];
          } else if (VFS[filePath] && VFS[filePath].type === "dir") {
            response = `cat: ${arg}: Is a directory`;
          } else {
            response = `cat: ${arg}: No such file`;
          }
        }
        break;
      case "./vitals.sh":
      case "vitals.sh":
        response = VFS["~/vitals.sh"];
        break;
      case "trek":
        response = "🏔️ EXPEDITION_LOG: Triund, Kedarnath, Chandratal successfully synced.";
        break;
      case "status":
        response = "NODE_01: ONLINE | CARGO: SYNCED | TRAFFIC: 42req/s";
        break;
      default:
        response = `-bash: ${cmd}: command not found`;
    }

    setLogs(prev => [...prev, userLine, ...(Array.isArray(response) ? response : [response]).filter(r => r !== "")]);
    setInputValue("");
  }, [path, history]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const currentDir = VFS[path];
      const matches = currentDir.children.filter((c: string) => c.startsWith(inputValue.split(" ").pop() || ""));
      if (matches.length === 1) {
        const parts = inputValue.split(" ");
        parts[parts.length - 1] = matches[0];
        setInputValue(parts.join(" "));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInputValue("");
      }
    }
  };

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-2xl h-[500px] flex flex-col bg-black/60"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="bg-white/5 px-5 py-3 border-b border-white/5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">SRE_Console@remote-node</span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-6 font-mono text-xs sm:text-sm overflow-y-auto space-y-1.5 scrollbar-none selection:bg-primary/30"
      >
        {logs.map((log, i) => (
          <div key={i} className={log.startsWith("saran@") ? "text-primary font-bold mt-2" : "text-secondary-foreground/90 whitespace-pre-line"}>
            {log}
          </div>
        ))}
        
        <form 
          onSubmit={(e) => { e.preventDefault(); handleCommand(inputValue); }} 
          className="flex gap-2 items-center"
        >
          <span className="text-primary shrink-0 font-bold">saran@cloud:{path}$</span>
          <input 
            ref={inputRef}
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            className="bg-transparent border-none outline-none text-foreground w-full p-0 caret-primary"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
      
      <div className="px-6 py-2 bg-primary/5 border-t border-white/5 font-mono text-[9px] text-primary/40 flex justify-between uppercase tracking-tighter">
        <span>[TAB] Autocomplete</span>
        <span>[↑↓] History</span>
        <span>[pts/0] {path}</span>
      </div>
    </div>
  );
}
