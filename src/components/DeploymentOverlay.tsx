import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DeploymentOverlay() {
  const [visible, setVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      const theme = e.detail;
      setVisible(true);
      setLogs([
        `[SYSTEM] Initializing ${theme.toUpperCase()} transition...`,
        `[SYSTEM] Reconfiguring CSS variables and orbit parameters...`,
        `[SYSTEM] Updating infrastructure typography...`,
        `[SUCCESS] Environment synced.`
      ]);

      setTimeout(() => {
        setVisible(false);
        setLogs([]);
      }, 1500);
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-md w-full p-8 font-mono text-xs space-y-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary uppercase tracking-[0.2em]">Deployment in progress</span>
            </div>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className={log.includes("SUCCESS") ? "text-primary" : "text-muted-foreground"}
              >
                {log}
              </motion.div>
            ))}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-px w-full bg-primary/30 mt-8 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
