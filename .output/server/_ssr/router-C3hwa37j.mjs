import { r as __toESM } from "../_runtime.mjs";
import { c as performance_default, n as useReducedMotion, s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as Moon, t as Sun } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C3hwa37j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-BP9hg9SS.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var ThemeContext = (0, import_react.createContext)(null);
function getPreferredTheme() {
	if (typeof window === "undefined") return "dark";
	const savedTheme = window.localStorage.getItem("bss-theme");
	if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
	return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const [themeReady, setThemeReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setTheme(getPreferredTheme());
		setThemeReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!themeReady) return;
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.documentElement.dataset.theme = theme;
		document.documentElement.style.colorScheme = theme;
	}, [theme, themeReady]);
	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		const applyTheme = () => {
			window.localStorage.setItem("bss-theme", nextTheme);
			document.documentElement.classList.toggle("dark", nextTheme === "dark");
			document.documentElement.dataset.theme = nextTheme;
			document.documentElement.style.colorScheme = nextTheme;
			setTheme(nextTheme);
		};
		if ("startViewTransition" in document) document.startViewTransition(applyTheme);
		else {
			document.documentElement.classList.add("theme-transitioning");
			applyTheme();
			window.setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 380);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			toggleTheme
		},
		children
	});
}
function ThemeToggle() {
	const context = (0, import_react.useContext)(ThemeContext);
	const reduceMotion = useReducedMotion();
	if (!context) return null;
	const { theme, toggleTheme } = context;
	const isLight = theme === "light";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-label": `Switch to ${isLight ? "dark" : "light"} theme`,
		"aria-pressed": isLight,
		title: `Switch to ${isLight ? "dark" : "light"} theme`,
		onClick: toggleTheme,
		className: "theme-toggle relative grid h-10 w-[4.5rem] place-items-center overflow-hidden rounded-full border border-border bg-secondary/80 p-1 shadow-sm transition-shadow hover:shadow-[var(--shadow-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
				className: "absolute left-2.5 h-4 w-4 text-primary",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
				className: "absolute right-2.5 h-4 w-4 text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "relative z-10 grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-electric)] text-primary-foreground shadow-[var(--shadow-glow)]",
				animate: {
					x: isLight ? -16 : 16,
					rotate: isLight ? 0 : 180
				},
				transition: reduceMotion ? { duration: 0 } : {
					type: "spring",
					stiffness: 420,
					damping: 24
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					initial: false,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						initial: reduceMotion ? false : {
							opacity: 0,
							scale: .45,
							rotate: -45
						},
						animate: {
							opacity: 1,
							scale: 1,
							rotate: 0
						},
						exit: reduceMotion ? void 0 : {
							opacity: 0,
							scale: .45,
							rotate: 45
						},
						transition: { duration: .16 },
						children: isLight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
							className: "h-4 w-4",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					}, theme)
				})
			})
		]
	});
}
function InitialLoader() {
	const [visible, setVisible] = (0, import_react.useState)(true);
	const reduceMotion = useReducedMotion();
	(0, import_react.useEffect)(() => {
		const startedAt = performance_default.now();
		const dismiss = () => {
			const remaining = Math.max(0, 1050 - (performance_default.now() - startedAt));
			window.setTimeout(() => {
				setVisible(false);
			}, reduceMotion ? 0 : remaining);
		};
		if (document.readyState === "complete") dismiss();
		else window.addEventListener("load", dismiss, { once: true });
		const safetyTimeout = window.setTimeout(dismiss, 4e3);
		return () => {
			window.removeEventListener("load", dismiss);
			window.clearTimeout(safetyTimeout);
		};
	}, [reduceMotion]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "initial-loader fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[image:var(--loader-background)] text-[color:var(--loader-foreground)]",
		initial: false,
		exit: reduceMotion ? { opacity: 0 } : {
			opacity: 0,
			scale: 1.025,
			filter: "blur(5px)"
		},
		transition: {
			duration: reduceMotion ? .15 : .58,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		"aria-label": "Preparing Bharat Strategic Solution",
		role: "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-lines absolute inset-0 opacity-35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-orbit loader-orbit-one" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-orbit loader-orbit-two" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col items-center px-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: reduceMotion ? false : {
							opacity: 0,
							scale: .72,
							rotate: -18
						},
						animate: {
							opacity: 1,
							scale: 1,
							rotate: 0
						},
						transition: {
							duration: .7,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "loader-mark grid h-20 w-20 place-items-center rounded-[1.6rem] bg-[image:var(--gradient-electric)] font-display text-2xl font-bold text-primary-foreground shadow-[var(--shadow-glow)]",
						children: "BS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: reduceMotion ? false : {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .22,
							duration: .55,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-semibold tracking-tight sm:text-2xl",
							children: "Bharat Strategic"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary",
							children: "Solution"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "loader-signal mt-8 h-px w-40 overflow-hidden bg-border",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: "Engineering reliable uptime"
					})
				]
			})
		]
	}) : null });
}
function RouteTransitionLoader() {
	const isPending = useRouterState({ select: (state) => state.status === "pending" });
	const reduceMotion = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "pointer-events-none fixed inset-x-0 top-0 z-[90]",
		initial: {
			opacity: 0,
			y: -8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -8
		},
		transition: { duration: reduceMotion ? .1 : .2 },
		role: "status",
		"aria-label": "Loading page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "route-loader-line h-[3px] overflow-hidden bg-primary/15",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-fit items-center gap-2 rounded-b-xl border border-t-0 border-primary/20 bg-background/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary shadow-lg backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-4 w-4 place-items-center rounded bg-[image:var(--gradient-electric)] text-[7px] text-primary-foreground",
				children: "BS"
			}), "Connecting"]
		})]
	}) : null });
}
function SiteExperience({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [
		children,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteTransitionLoader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitialLoader, {})
	] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(() => { try { const saved = localStorage.getItem('bss-theme'); const theme = saved === 'light' || saved === 'dark' ? saved : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); document.documentElement.dataset.theme = theme; document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.style.colorScheme = theme; } catch (_) {} })();` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteExperience, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter = () => import("./routes-B38z0pez.mjs");
var title = "Bharat Strategic Solution | Reliable IT Infrastructure";
var description = "IT hardware supply, networking, servers, AMC and enterprise infrastructure support across India — engineered for uptime and growth.";
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { ThemeToggle as n, router_exports as t };
