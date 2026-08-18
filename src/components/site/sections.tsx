import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";

import { CountUp, Reveal, SectionHeading, easeOut } from "./primitives";
import { useIsMobile } from "@/hooks/use-mobile";
import heroImg from "@/assets/hero-datacenter.jpg";
import networkImg from "@/assets/networking.jpg";
import amcImg from "@/assets/amc-engineer.jpg";
import workplaceImg from "@/assets/workplace.jpg";

/* ---------------------------------- data --------------------------------- */

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { title: "IT Hardware Supply", desc: "Laptops, desktops, servers and peripherals from trusted OEMs." },
  { title: "Computer & Laptop Solutions", desc: "Business-grade systems configured for productivity and security." },
  { title: "Server Solutions", desc: "Tower and rack servers with installation and configuration support." },
  { title: "Networking Solutions", desc: "Structured cabling, switches, Wi-Fi and network design." },
  { title: "Hardware Installation", desc: "On-site deployment, racking, imaging and hand-over." },
  { title: "IT Infrastructure Setup", desc: "End-to-end infrastructure planning and implementation." },
  { title: "AMC Services", desc: "Annual maintenance contracts for predictable uptime and cost control." },
  { title: "Hardware Repair & Support", desc: "Break-fix, spare parts and multi-brand technical support." },
  { title: "CCTV & Security", desc: "Surveillance design, installation and ongoing monitoring support." },
  { title: "Data Center Solutions", desc: "Rack, power, cooling and infrastructure for critical environments." },
  { title: "System Integration", desc: "Seamless integration of hardware, network and software layers." },
  { title: "Enterprise IT Support", desc: "Dedicated support models for growing and mid-size enterprises." },
];

const SOLUTIONS = [
  { title: "Enterprise IT Infrastructure", desc: "Complete design and deployment of scalable infrastructure foundations." },
  { title: "Networking & Connectivity", desc: "High-availability LAN/WAN, wireless and secure access solutions." },
  { title: "Server & Storage", desc: "Compute and storage platforms sized for performance and growth." },
  { title: "Workplace IT Solutions", desc: "Endpoints, collaboration hardware and managed workplace services." },
  { title: "Security & Surveillance", desc: "CCTV, access control and infrastructure security layers." },
  { title: "IT Hardware Procurement", desc: "Transparent sourcing of quality hardware at competitive value." },
  { title: "Preventive Maintenance", desc: "Scheduled health checks that reduce unexpected downtime." },
  { title: "Managed IT Support", desc: "Ongoing support models so your team can focus on the business." },
];

const PRODUCTS = [
  "Laptops", "Desktops", "Servers", "Networking", "Printers",
  "Storage", "UPS Systems", "CCTV", "Accessories", "Peripherals",
];

const INDUSTRIES = [
  "Healthcare", "Education", "Manufacturing", "Retail",
  "Banking & Finance", "Government", "Corporate Offices", "Hospitality",
];

const PROCESS = [
  { num: "01", title: "Understand", desc: "We assess your current setup, goals and constraints." },
  { num: "02", title: "Recommend", desc: "Clear proposals with the right hardware and approach." },
  { num: "03", title: "Deploy", desc: "Professional installation, configuration and handover." },
  { num: "04", title: "Support", desc: "Ongoing AMC, helpdesk and proactive maintenance." },
];

const PARTNERS = ["Dell", "HP", "Lenovo", "Cisco", "Microsoft", "Intel", "APC", "Hikvision", "TP-Link"];

const TESTIMONIALS = [
  { quote: "Prompt response and reliable hardware support. Our systems have been more stable since we engaged the team.", name: "Operations Manager", role: "Manufacturing Client" },
  { quote: "Professional installation of networking and servers. Clear communication throughout the project.", name: "IT Head", role: "Education Institution" },
  { quote: "Good value AMC and quick on-site support when we needed it most. Recommended for mid-size offices.", name: "Admin Lead", role: "Corporate Office" },
];

const FAQS = [
  { q: "What services does Bharat Strategic Solution provide?", a: "We provide IT hardware supply, networking, server solutions, installation, AMC, repair support, CCTV, system integration and enterprise infrastructure services." },
  { q: "Do you offer Annual Maintenance Contracts (AMC)?", a: "Yes. We offer flexible AMC plans covering preventive maintenance, break-fix support, spare parts and both on-site and remote assistance." },
  { q: "Which brands do you work with?", a: "We work with major OEMs including Dell, HP, Lenovo, Cisco, Intel, APC, Hikvision, TP-Link and others based on customer requirements." },
  { q: "Do you provide pan-India support?", a: "Yes, we support customers across India through a combination of on-site engineers and remote support capabilities." },
  { q: "How quickly can you respond to a support request?", a: "Response times depend on the SLA selected. We prioritise critical issues and aim for rapid remote triage followed by on-site action when required." },
];

/* --------------------------------- chrome -------------------------------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[image:var(--gradient-electric)]"
    />
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["oklch(0.15 0.045 255 / 0)", "oklch(0.15 0.045 255 / 0.85)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-electric)] font-display text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
            BS
          </span>
          <span className="hidden sm:block leading-tight">
            <span className="block font-display text-base font-semibold">Bharat Strategic</span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-primary">Solution</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-[image:var(--gradient-electric)] px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[var(--shadow-glow)] sm:inline-flex"
          >
            Get a Quote
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg bg-secondary lg:hidden"
          >
            <span className="space-y-1">
              <span className="block h-0.5 w-5 bg-foreground" />
              <span className="block h-0.5 w-5 bg-foreground" />
              <span className="block h-0.5 w-5 bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden border-t border-border bg-navy-deep/95 lg:hidden"
      >
        <div className="space-y-1 px-5 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}

/* ---------------------------------- hero --------------------------------- */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.28]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Enterprise data center aisle with illuminated server racks"
        width={1920}
        height={1088}
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.15_0.045_255/0.92),oklch(0.15_0.045_255/0.72)_45%,oklch(0.15_0.045_255))]" />
      <div className="grid-lines absolute inset-0 opacity-40" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-7xl px-5 py-32 lg:px-8">
        <div className="max-w-3xl">
          <Reveal variant="blur">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Trusted IT Infrastructure Partner
            </span>
          </Reveal>

          <h1
            data-split
            className="mt-7 text-4xl font-bold leading-[1.05] opacity-0 sm:text-6xl lg:text-7xl"
          >
            <span className="block">Powering Businesses with</span>
            <span className="block text-gradient">Reliable IT Infrastructure</span>
          </h1>

          <Reveal delay={0.5}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              End-to-end hardware supply, networking, AMC, server solutions and enterprise IT
              support — engineered for uptime and growth.
            </p>
          </Reveal>

          <Reveal delay={0.62}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                data-magnetic
                className="rounded-full bg-[image:var(--gradient-electric)] px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[var(--shadow-glow)]"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                data-magnetic
                className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </motion.div>
{/* 
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        Scroll
      </motion.div> */}
    </section>
  );
}

/* ---------------------------------- about -------------------------------- */

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const stats = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Projects Supported" },
    { value: 200, suffix: "+", label: "Customers Served" },
  ];

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Who We Are"
            title={<>Technology infrastructure that keeps your business <span className="text-gradient">moving</span>.</>}
            subtitle="Bharat Strategic Solution is a modern IT hardware and infrastructure partner delivering precision-engineered solutions — from single workstation setups to full enterprise data center deployments."
          />
          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-gradient">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                </div>
              ))}
              <div>
                <div className="font-display text-3xl font-bold text-gradient">24/7</div>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Technical Support</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <motion.img
              src={workplaceImg}
              alt="Modern corporate workspace with business desktops and laptops"
              loading="lazy"
              width={1400}
              height={1000}
              style={{ y: imgY }}
              className="h-[26rem] w-full scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(200deg,transparent,oklch(0.15_0.045_255/0.75))]" />
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
              {["Servers", "Networking", "24/7 Support"].map((t) => (
                <span key={t} className="rounded-full border border-primary/30 bg-navy-deep/70 px-3 py-1 text-xs text-primary backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- services -------------------------------- */

export function Services() {
  return (
    <section id="services" className="relative border-y border-border bg-navy-deep py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What We Deliver"
          title="Our Services"
          subtitle="From hardware supply to full infrastructure management — every scale, one trusted partner."
          align="center"
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 60, rotateX: 25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.09, ease: easeOut }}
              whileHover={{ y: -8 }}
              style={{ transformPerspective: 1000 }}
              className="surface-card group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <span className="font-display text-xs font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="mt-5 h-px w-0 bg-[image:var(--gradient-electric)] transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- solutions: pinned horizontal scroll ------------------ */

function SolutionCard({ s, i }: { s: { title: string; desc: string }; i: number }) {
  return (
    <div className="surface-card relative flex h-64 w-[78vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl p-7 sm:w-[22rem]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
      <span className="font-display text-5xl font-bold text-primary/20">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-xl font-semibold">{s.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
      </div>
    </div>
  );
}

export function Solutions() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], ["2%", "-72%"]);

  const heading = (
    <SectionHeading
      eyebrow="Solutions"
      title="Solutions built around your business"
      subtitle={isMobile ? "Swipe through the solutions." : "Keep scrolling — the cards move with you."}
    />
  );

  if (isMobile) {
    return (
      <section id="solutions" className="relative overflow-hidden py-24">
        <div className="mx-auto w-full max-w-7xl px-5">{heading}</div>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="solutions" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">{heading}</div>
        <motion.div style={{ x }} className="mt-12 flex gap-6 px-5 will-change-transform lg:px-8">
          {SOLUTIONS.map((s, i) => (
            <SolutionCard key={s.title} s={s} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ why choose us ----------------------------- */

export function WhyUs() {
  const points = [
    { title: "Multi-OEM Expertise", desc: "Dell, HP, Lenovo, Cisco, Intel and more — one team across vendors." },
    { title: "Fast Response", desc: "On-site and remote support designed for minimal downtime." },
    { title: "Flexible SLAs", desc: "Standard to enterprise agreements tailored to your risk profile." },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <motion.div
          ref={ref}
          className="relative overflow-hidden rounded-3xl border border-border"
        >
          <motion.img
            style={{ y, scale }}
            src={networkImg}
            alt="Network switch patch panel with illuminated ports"
            loading="lazy"
            width={1400}
            height={1000}
            className="h-[22rem] w-full object-cover md:h-[26rem]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,var(--navy-deep))] opacity-90" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
            className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-border bg-navy/70 p-4 backdrop-blur-md"
          >
            <span className="font-display text-3xl font-bold text-gradient">
              <CountUp to={99} suffix="%" />
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Uptime maintained across managed infrastructure and AMC contracts.
            </p>
          </motion.div>
          <motion.div
            aria-hidden
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-5 top-5 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-md"
          >
            24×7 Support
          </motion.div>
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The difference is measurable"
            subtitle="Precision, reliability and transparency define every engagement — from first consultation to long-term support partnership."
          />
          <div className="mt-10 space-y-4">
            {points.map((p, i) => (
              <Reveal key={p.title} variant="right" delay={i * 0.12}>
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="surface-card group rounded-2xl p-5"
                >
                  <h3 className="font-semibold transition-colors group-hover:text-primary">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* -------------------------------- products -------------------------------- */

export function Products() {
  const row = [...PRODUCTS, ...PRODUCTS];
  return (
    <section id="products" className="border-y border-border bg-navy-deep py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Products"
          title="Hardware & devices"
          subtitle="Quality IT products for every business need."
          align="center"
        />
      </div>
      <div className="mt-14 space-y-5 overflow-hidden">
        {[0, 1].map((r) => (
          <div key={r} data-skew
            className="flex w-max animate-marquee gap-5" style={r === 1 ? { animationDirection: "reverse" } : undefined}>
            {row.map((p, i) => (
              <div
                key={`${r}-${p}-${i}`}
                className="surface-card flex h-24 w-56 items-center justify-center rounded-2xl text-sm font-medium tracking-wide"
              >
                <span className="text-gradient font-display text-lg">{p}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- industries ------------------------------- */

export function Industries() {
  return (
    <section id="industries" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Industries" title="Industries we serve" align="center" />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {INDUSTRIES.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: easeOut }}
              whileHover={{ scale: 1.04 }}
              className="surface-card group relative grid h-36 place-items-center overflow-hidden rounded-2xl"
            >
              <span className="absolute inset-0 bg-[image:var(--gradient-electric)] opacity-0 transition-opacity duration-500 group-hover:opacity-15" />
              <span className="relative text-sm font-semibold">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- AMC split banner ---------------------------- */

export function Amc() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img
        src={amcImg}
        alt="Engineer servicing a rack server on site"
        loading="lazy"
        width={1400}
        height={1000}
        style={{ y }}
        data-wipe
        className="absolute inset-0 h-[130%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.15_0.045_255/0.96),oklch(0.15_0.045_255/0.7))]" />
      <div className="relative mx-auto max-w-7xl px-5 py-28 md:py-36 lg:px-8">
        <div className="max-w-xl">
          <SectionHeading
            eyebrow="AMC & Support"
            title="Keep your IT infrastructure running"
            subtitle="Preventive maintenance, hardware troubleshooting, network support, on-site & remote assistance, and timely hardware replacement."
          />
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Preventive Maintenance", "Hardware Troubleshooting", "Network Support", "On-site & Remote"].map((t) => (
                <span key={t} className="rounded-full border border-primary/25 bg-navy-deep/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              data-magnetic
              className="mt-8 inline-flex rounded-full bg-[image:var(--gradient-electric)] px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              Get IT Support
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- process -------------------------------- */

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="border-y border-border bg-navy-deep py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading eyebrow="How We Work" title="Our process" align="center" />
        <div ref={ref} className="relative mt-16 pl-10">
          <div className="absolute left-3 top-0 h-full w-px bg-border" />
          <motion.div style={{ height }} className="absolute left-3 top-0 w-px bg-[image:var(--gradient-electric)]" />
          <div className="space-y-12">
            {PROCESS.map((p, i) => (
              <Reveal key={p.num} variant="left" delay={i * 0.05}>
                <div className="relative">
                  <span className="absolute -left-[1.87rem] top-1.5 h-3 w-3 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
                  <span className="font-display text-sm font-bold text-primary">{p.num}</span>
                  <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- partners -------------------------------- */

export function Partners() {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Ecosystem" title="Technology partners & trusted by" align="center" />
      </div>
      <div className="mt-12 overflow-hidden">
        <div data-skew
          className="flex w-max animate-marquee items-center gap-14 px-8">
          {row.map((p, i) => (
            <span key={`${p}-${i}`} className="font-display text-2xl font-semibold text-muted-foreground/60">
              {p}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        Brand names shown for ecosystem reference only — not official partnership claims.
      </p>
    </section>
  );
}

/* ------------------------------ testimonials ------------------------------ */

export function Testimonials() {
  return (
    <section className="border-y border-border bg-navy-deep py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What clients say" align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} variant="rotate" delay={i * 0.12}>
              <figure className="surface-card h-full rounded-3xl p-7">
                <span className="font-display text-4xl text-primary/40">&ldquo;</span>
                <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" />
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <div className="surface-card overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold"
                >
                  {f.q}
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-primary">
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- contact -------------------------------- */

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-28 md:py-36">
      <div className="grid-lines absolute inset-0 opacity-30" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title={<>Let&rsquo;s build <span className="text-gradient">what&rsquo;s next.</span></>}
            subtitle="Hardware, networking, AMC or full infrastructure — tell us what you need."
          />
          <Reveal delay={0.2}>
            <ul className="mt-10 space-y-3 text-sm text-muted-foreground">
              <li>support@bharatstrategic.example</li>
              <li>+91 XXXXX XXXXX</li>
              <li>Pan-India support</li>
            </ul>
          </Reveal>
        </div>

        <Reveal variant="scale">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="surface-card space-y-4 rounded-3xl p-7"
          >
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "company", label: "Company", type: "text" },
            ].map((f) => (
              <div key={f.name}>
                <label htmlFor={f.name} className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  required={f.name !== "company"}
                  className="w-full rounded-xl border border-border bg-navy-deep/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                Requirement
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-xl border border-border bg-navy-deep/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[image:var(--gradient-electric)] px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              Request a Quote
            </button>
            {sent ? (
              <p className="text-center text-xs text-primary">Thank you! We&rsquo;ll respond within 24 hours.</p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy-deep py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-3 lg:px-8">
        <div>
          <span className="font-display text-lg font-semibold">Bharat Strategic Solution</span>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Powering reliable IT infrastructure for businesses across India.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {["Hardware Supply", "Networking", "AMC & Support", "Server Solutions"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#about" className="hover:text-foreground">About</a></li>
            <li><a href="#products" className="hover:text-foreground">Products</a></li>
            <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-muted-foreground">
        © 2026 Bharat Strategic Solution. All rights reserved.
      </p>
    </footer>
  );
}
