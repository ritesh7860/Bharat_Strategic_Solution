import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const savedTheme = window.localStorage.getItem("bss-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    setTheme(getPreferredTheme());
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme, themeReady]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      window.localStorage.setItem("bss-theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    };

    // The browser-native view transition provides a subtle page-wide reveal where supported.
    if ("startViewTransition" in document) {
      (document as Document & { startViewTransition: (callback: () => void) => void })
        .startViewTransition(applyTheme);
    } else {
      document.documentElement.classList.add("theme-transitioning");
      applyTheme();
      window.setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 380);
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function ThemeToggle() {
  const context = useContext(ThemeContext);
  const reduceMotion = useReducedMotion();
  if (!context) return null;

  const { theme, toggleTheme } = context;
  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      aria-pressed={isLight}
      title={`Switch to ${isLight ? "dark" : "light"} theme`}
      onClick={toggleTheme}
      className="theme-toggle relative grid h-10 w-[4.5rem] place-items-center overflow-hidden rounded-full border border-border bg-secondary/80 p-1 shadow-sm transition-shadow hover:shadow-[var(--shadow-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Sun className="absolute left-2.5 h-4 w-4 text-primary" aria-hidden />
      <Moon className="absolute right-2.5 h-4 w-4 text-muted-foreground" aria-hidden />
      <motion.span
        className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-electric)] text-primary-foreground shadow-[var(--shadow-glow)]"
        animate={{ x: isLight ? -16 : 16, rotate: isLight ? 0 : 180 }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 24 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.45, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.45, rotate: 45 }}
            transition={{ duration: 0.16 }}
          >
            {isLight ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}

export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const startedAt = performance.now();
    const dismiss = () => {
      const remaining = Math.max(0, 1050 - (performance.now() - startedAt));
      window.setTimeout(() => {
        setVisible(false);
      }, reduceMotion ? 0 : remaining);
    };

    if (document.readyState === "complete") dismiss();
    else window.addEventListener("load", dismiss, { once: true });
    const safetyTimeout = window.setTimeout(dismiss, 4000);
    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(safetyTimeout);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="initial-loader fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[image:var(--loader-background)] text-[color:var(--loader-foreground)]"
          initial={false}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.025, filter: "blur(5px)" }}
          transition={{ duration: reduceMotion ? 0.15 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Preparing Bharat Strategic Solution"
          role="status"
        >
          <div className="grid-lines absolute inset-0 opacity-35" />
          <div className="loader-orbit loader-orbit-one" />
          <div className="loader-orbit loader-orbit-two" />
          <div className="relative flex flex-col items-center px-5 text-center">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.72, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="loader-mark grid h-20 w-20 place-items-center rounded-[1.6rem] bg-[image:var(--gradient-electric)] font-display text-2xl font-bold text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              BS
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">Bharat Strategic</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">Solution</p>
            </motion.div>
            <div className="loader-signal mt-8 h-px w-40 overflow-hidden bg-border" aria-hidden>
              <span />
            </div>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Engineering reliable uptime
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function RouteTransitionLoader() {
  const isPending = useRouterState({ select: (state) => state.status === "pending" });
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isPending ? (
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-0 z-[90]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
          role="status"
          aria-label="Loading page"
        >
          <div className="route-loader-line h-[3px] overflow-hidden bg-primary/15"><span /></div>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-b-xl border border-t-0 border-primary/20 bg-background/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary shadow-lg backdrop-blur-md">
            <span className="grid h-4 w-4 place-items-center rounded bg-[image:var(--gradient-electric)] text-[7px] text-primary-foreground">BS</span>
            Connecting
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SiteExperience({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <RouteTransitionLoader />
      <InitialLoader />
    </ThemeProvider>
  );
}
