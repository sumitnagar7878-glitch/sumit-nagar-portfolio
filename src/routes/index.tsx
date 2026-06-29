import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  ArrowRight, Mail, Github, Linkedin, Download, Code2, Database,
  BarChart3, Wrench, Sparkles, GraduationCap, Briefcase, Send,
  ArrowUp, Terminal, BrainCircuit, Rocket, BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sumit Nagar — Python Developer Portfolio" },
      { name: "description", content: "Aspiring Python developer focused on scalable, reliable software. Explore projects, skills, and experience." },
      { property: "og:title", content: "Sumit Nagar — Python Developer" },
      { property: "og:description", content: "Aspiring Python developer focused on scalable, reliable software." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const ROLES = ["Python Developer", "Problem Solver", "Continuous Learner", "Software Engineer"];

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 50 : 110;
    const t = setTimeout(() => {
      const next = del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!del && next === current) setTimeout(() => setDel(true), 1400);
      else if (del && next === "") { setDel(false); setI((v) => v + 1); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.min(1, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Portfolio() {
  const typed = useTyping(ROLES);
  const progress = useScrollProgress();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent">
        <div className="h-full bg-gradient-primary transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>

      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "glass py-3" : "py-5"}`}>
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-bold tracking-tight">
            Sumit<span className="text-primary">.</span>
          </button>
          <ul className="hidden md:flex items-center gap-1 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`px-3 py-2 rounded-md transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {n.label}
                  {active === n.id && <span className="block h-0.5 w-4 mx-auto mt-0.5 bg-gradient-primary rounded-full" />}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Hire me <ArrowRight className="w-4 h-4" />
          </button>
        </nav>
      </header>

      <section id="home" className="relative pt-32 pb-24 min-h-screen flex items-center bg-gradient-hero">
        <Particles />
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
              Available for opportunities
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Hello, I'm<br />
              <span className="text-gradient">Sumit Nagar</span>
            </h1>
            <p className="mt-5 text-xl md:text-2xl text-muted-foreground h-8">
              <span className="text-foreground font-medium">{typed}</span>
              <span className="inline-block w-[2px] h-6 align-middle ml-1 bg-primary animate-blink" />
            </p>
            <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">
              Passionate Python developer focused on building efficient, scalable, and reliable software applications.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollTo("projects")} className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-glow hover:opacity-90 transition">
                View Projects <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo("contact")} className="inline-flex items-center gap-2 glass text-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent transition">
                <Mail className="w-4 h-4" /> Contact Me
              </button>
              <a href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-3 transition">
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-muted-foreground">
              <a href="https://github.com/sumitnagar7878-glitch" target="_blank" rel="noreferrer" className="hover:text-foreground transition"><Github className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/sumit-nagar-587854372" target="_blank" rel="noreferrer" className="hover:text-foreground transition"><Linkedin className="w-5 h-5" /></a>
              <a href="mailto:sumitnagar7878@gmail.com" className="hover:text-foreground transition"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-primary blur-3xl opacity-30 scale-110" />
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-ring" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-border shadow-glow bg-card">
                <img src={profileImg} alt="Sumit Nagar" width={800} height={800} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 animate-float shadow-card">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center"><Code2 className="w-5 h-5 text-primary-foreground" /></div>
                  <div>
                    <div className="text-sm font-semibold">Python</div>
                    <div className="text-xs text-muted-foreground">Developer</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 glass rounded-2xl px-4 py-3 animate-float shadow-card" style={{ animationDelay: "1.2s" }}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-highlight" />
                  <div>
                    <div className="text-sm font-semibold">Open to work</div>
                    <div className="text-xs text-muted-foreground">Fresher · 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="about" eyebrow="About" title="A developer in the making">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              I'm a passionate Python developer with a strong interest in building efficient, scalable, and reliable software applications. I'm committed to continuously expanding my technical knowledge and enhancing my problem-solving skills through hands-on projects and continuous learning.
            </p>
            <p>
              My career goal is to become a skilled, professional Python software engineer contributing to innovative and impactful software solutions. Thank you for visiting my portfolio — explore my projects and achievements below.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {[
              { icon: Code2, label: "Python focused" },
              { icon: BrainCircuit, label: "Problem solver" },
              { icon: BookOpen, label: "Continuous learner" },
              { icon: Rocket, label: "Career-driven" },
            ].map((h) => (
              <div key={h.label} className="glass rounded-xl p-4 hover:border-primary/40 transition">
                <h.icon className="w-5 h-5 text-highlight" />
                <div className="mt-3 text-sm font-medium">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills" eyebrow="Skills" title="Tech I work with">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Code2, title: "Languages", items: ["Python"] },
            { icon: Terminal, title: "Python Libraries", items: ["NumPy", "Pandas"] },
            { icon: Database, title: "Databases", items: ["MySQL", "MongoDB"] },
            { icon: BarChart3, title: "Business Intelligence", items: ["Power BI"] },
            { icon: Wrench, title: "Tools", items: ["VS Code", "GitHub", "Claude AI"] },
            { icon: Sparkles, title: "Currently learning", items: ["Django", "FastAPI", "DSA"] },
          ].map((c) => (
            <div key={c.title} className="group glass rounded-2xl p-6 hover:border-primary/40 transition">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary grid place-items-center group-hover:scale-110 transition">
                  <c.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.items.map((i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-accent/60 border border-border text-foreground/90">{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="services" eyebrow="Services" title="What I can do for you">
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Code2, title: "Python Development", desc: "Clean, efficient Python code for scripts, automation and backend logic." },
            { icon: Terminal, title: "Automation & CLI", desc: "Command-line applications and scripts to automate repetitive tasks." },
            { icon: BrainCircuit, title: "Problem Solving", desc: "Breaking complex problems into modular, testable Python solutions." },
            { icon: Database, title: "Data Handling", desc: "Working with MySQL, MongoDB, NumPy & Pandas to wrangle data." },
          ].map((s) => (
            <div key={s.title} className="group glass rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/40 transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              <div className="mt-4 text-sm text-highlight inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="Projects" title="Things I've built">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Python Calculator",
              desc: "Command-line calculator performing addition, subtraction, multiplication and division with proper error handling.",
              features: ["Arithmetic ops", "User-friendly CLI", "Error handling", "Modular functions"],
              tech: ["Python"],
              accent: "from-primary to-highlight",
              emoji: "🧮",
            },
            {
              title: "Rock Paper Scissors",
              desc: "Interactive Rock-Paper-Scissors game where users compete against the computer using random moves and conditional logic.",
              features: ["Computer-generated moves", "Winner logic", "Replay flow", "Interactive CLI"],
              tech: ["Python"],
              accent: "from-highlight to-primary",
              emoji: "✊",
            },
          ].map((p) => (
            <article key={p.title} className="group glass rounded-2xl overflow-hidden hover:border-primary/40 transition">
              <div className={`h-44 bg-gradient-to-br ${p.accent} relative grid place-items-center`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                <span className="text-6xl drop-shadow-lg">{p.emoji}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                <ul className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-highlight" />{f}</li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-accent/60 border border-border">{t}</span>
                    ))}
                  </div>
                  <a href="https://github.com/sumitnagar7878-glitch" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground hover:text-highlight transition">
                    <Github className="w-4 h-4" /> Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="education" eyebrow="Journey" title="Education & Experience">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Education</h3>
            <ol className="relative border-l border-border space-y-6 pl-6">
              {[
                { t: "Bachelor of Technology — CSE", s: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)", y: "2024 – 2028" },
                { t: "Higher Secondary (Class 12)", s: "Biaora Public School", y: "2022" },
                { t: "Secondary (Class 10)", s: "Jyoti Convent Senior Secondary School", y: "2020" },
              ].map((e) => (
                <li key={e.t} className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-gradient-primary ring-4 ring-background" />
                  <div className="glass rounded-xl p-5">
                    <div className="text-xs text-highlight font-medium">{e.y}</div>
                    <div className="mt-1 font-semibold">{e.t}</div>
                    <div className="text-sm text-muted-foreground">{e.s}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Experience</h3>
            <div className="glass rounded-2xl p-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/60 border border-border text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-highlight" /> Fresher · Open to opportunities
              </span>
              <h4 className="mt-4 text-xl font-semibold">Aspiring Python Software Engineer</h4>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Currently seeking opportunities to apply my Python development skills, contribute to innovative software projects, and grow as a professional software engineer.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "Projects", v: "2+" },
                  { k: "Focus", v: "Python" },
                  { k: "Status", v: "Available" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-accent/40 border border-border p-3">
                    <div className="text-lg font-semibold">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's build something together">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Have an opportunity, project, or just want to say hi? Drop a message — I'll get back to you soon.
            </p>
            {[
              { icon: Mail, label: "Email", value: "sumitnagar7878@gmail.com", href: "mailto:sumitnagar7878@gmail.com" },
              { icon: Linkedin, label: "LinkedIn", value: "sumit-nagar-587854372", href: "https://www.linkedin.com/in/sumit-nagar-587854372" },
              { icon: Github, label: "GitHub", value: "sumitnagar7878-glitch", href: "https://github.com/sumitnagar7878-glitch" },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 glass rounded-xl p-4 hover:border-primary/40 transition">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary grid place-items-center">
                  <c.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </a>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent(`Portfolio contact from ${data.get("name")}`);
              const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("email")}`);
              window.location.href = `mailto:sumitnagar7878@gmail.com?subject=${subject}&body=${body}`;
            }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="email" label="Email" type="email" placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Message</label>
              <textarea name="message" required rows={5} placeholder="Tell me about your project or opportunity…"
                className="mt-1.5 w-full rounded-lg bg-background/60 border border-border px-4 py-3 text-sm outline-none focus:border-primary/60 transition resize-none" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-3 rounded-lg font-medium hover:opacity-90 transition w-full justify-center">
              Send message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </Section>

      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Sumit Nagar — Designed & developed by Sumit Nagar.</div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/sumitnagar7878-glitch" target="_blank" rel="noreferrer" className="hover:text-foreground transition"><Github className="w-4 h-4" /></a>
            <a href="https://www.linkedin.com/in/sumit-nagar-587854372" target="_blank" rel="noreferrer" className="hover:text-foreground transition"><Linkedin className="w-4 h-4" /></a>
            <a href="mailto:sumitnagar7878@gmail.com" className="hover:text-foreground transition"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 w-11 h-11 rounded-full bg-gradient-primary grid place-items-center shadow-glow transition-all ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <ArrowUp className="w-5 h-5 text-primary-foreground" />
      </button>
    </div>
  );
}

function Field({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input name={name} type={type} required placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg bg-background/60 border border-border px-4 py-3 text-sm outline-none focus:border-primary/60 transition" />
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-highlight font-medium">{eyebrow}</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Particles() {
  const dots = Array.from({ length: 20 });
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const size = 2 + (i % 4);
        const delay = (i % 7) * 0.6;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/40 animate-float"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDelay: `${delay}s` }}
          />
        );
      })}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-highlight/10 blur-3xl" />
    </div>
  );
}
