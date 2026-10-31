import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Braces, Code2, MoveUpRight, Sprout } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PillNav from './components/PillNav';
import OptionWheel from './components/OptionWheel';
import StaggeredMenu from './components/StaggeredMenu';
import AeroShards from './components/AeroShards';
import PhysicsTagPile from './components/PhysicsTagPile';
import ProfileCard from './components/ProfileCard';
import HalftoneWordmarkFooter from './components/HalftoneWordmarkFooter';
import SplitText from './components/SplitText';

const navigation = [
  { label: 'Story', href: '#story' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' }
];

const chapters = [
  { year: '2021', note: 'kept asking why', title: 'Curiosity became a practice', text: 'I began learning to code by asking how things worked, then trying to build small versions myself.', mark: '01' },
  { year: '2023—24', note: 'learned by building', title: 'The first real teams', text: 'Two internships at Logarithm Technologies took me from frontend work into full-stack development.', mark: '02' },
  { year: '2025', note: 'made the theory real', title: 'A foundation in computer science', text: 'I completed my Computer Science degree at Vidya Vikas Institute of Engineering and Technology.', mark: '03' },
  { year: 'NOW', note: 'still finding what’s next', title: 'Building in the real world', text: 'At Bounteous, I work as a Java full-stack developer on a Morgan Stanley engagement.', mark: '04' }
];

const projects = [
  {
    name: 'Bone Age Prediction', kind: 'Machine learning · Web app',
    description: 'An academic project exploring bone-age estimation from X-ray images, with a web interface connected to a Python model.',
    stack: ['React', 'Flask', 'Python', 'TensorFlow'],
    href: 'https://github.com/TechRam09/Bone-Age-Project', visual: 'bone'
  },
  {
    name: 'KrushiKare', kind: 'Full-stack · E-commerce',
    description: 'A farmer-focused marketplace concept that brings product browsing and commerce flows into one web experience.',
    stack: ['Flask', 'SQL', 'HTML', 'CSS'],
    href: 'https://github.com/TechRam09/KrushiKare', visual: 'krushi'
  },
  {
    name: 'MoodBuddy', kind: 'Product exploration · AI',
    description: 'A student-focused wellbeing assistant concept, created to make supportive reflection feel approachable.',
    stack: ['React', 'AI'],
    href: 'https://github.com/TechRam09/MoodBuddy', visual: 'mood'
  }
];

const skills = ['Java', 'Spring Boot', 'Spring', 'React', 'Tailwind CSS', 'SQL', 'Git', 'Python', 'JavaScript', 'C++', 'HTML', 'CSS', 'Flask', 'Bootstrap', 'AWS', 'Docker', 'Hibernate', 'WordPress', 'Analytical Thinking', 'Team Collaboration', 'Fast Learner', 'Time Management'];
const featuredSkills = ['Spring', 'Spring Boot', 'Java', 'React', 'Tailwind CSS', 'SQL', 'Git'];

function buildThreadPath(points) {
  if (points.length < 2) return '';
  const point = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  let path = `M ${point(points[0].x, points[0].y)}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const before = points[index - 1] || points[index];
    const start = points[index];
    const end = points[index + 1];
    const after = points[index + 2] || end;
    const controlOne = { x: start.x + (end.x - before.x) / 6, y: start.y + (end.y - before.y) / 6 };
    const controlTwo = { x: end.x - (after.x - start.x) / 6, y: end.y - (after.y - start.y) / 6 };
    path += ` C ${point(controlOne.x, controlOne.y)}, ${point(controlTwo.x, controlTwo.y)}, ${point(end.x, end.y)}`;
  }
  return path;
}

function ProjectArtwork({ visual }) {
  return (
    <div className={`project-visual project-visual-${visual}`} aria-hidden="true" data-story-node>
      <div className="visual-window">
        <span className="window-controls"><i /><i /><i /></span>
        {visual === 'bone' && <div className="bone-graphic"><div className="scan-ring" /><div className="scan-cross" /><span>IMAGE / ANALYSIS</span><div className="scan-bar" /></div>}
        {visual === 'krushi' && <div className="krushi-graphic"><Sprout className="sprout" strokeWidth={1.1} /><span className="field-line field-one" /><span className="field-line field-two" /><span className="field-line field-three" /><span className="field-label">FROM THE FIELD</span></div>}
        {visual === 'mood' && <div className="mood-graphic"><span className="mood-orbit orbit-one" /><span className="mood-orbit orbit-two" /><span className="mood-sun" /><span className="mood-label">A LITTLE SPACE TO RESET</span></div>}
      </div>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0, reduced }) {
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => window.dispatchEvent(new Event('thread-remeasure'))}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const pageRef = useRef(null);
  const [activeSection, setActiveSection] = useState('#story');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [thread, setThread] = useState({ width: 0, height: 0, path: '' });
  const [isMobileNav, setIsMobileNav] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [flipSignal, setFlipSignal] = useState(0);
  const progressRef = useRef(null);
  const arcRef = useRef(null);
  const updateThreadProgressRef = useRef(null);
  const activeProject = projects[activeProjectIndex];

  const openContactFlip = () => {
    document.querySelector('.contact-profile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => setFlipSignal(n => n + 1), 650);
  };
  // Every "get in touch" affordance is an anchor to #contact — one delegated
  // handler turns all of them into scroll+flip. The contact section's own
  // "Discuss a project" button is already there, so it only flips the card.
  useEffect(() => {
    const onClick = event => {
      const anchor = event.target.closest?.('a[href="#contact"]');
      if (!anchor) return;
      event.preventDefault();
      if (anchor.classList.contains('contact-cta')) {
        setFlipSignal(n => n + 1);
        return;
      }
      openContactFlip();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const onChange = event => setIsMobileNav(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const sections = ['#story', '#projects', '#experience']
      .map(href => document.querySelector(href))
      .filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(`#${visible.target.id}`);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;
    let frame = 0;
    const updateThreadProgress = () => {
      const el = progressRef.current;
      const arc = arcRef.current;
      if (!el || !arc || !arc.samples.length) return;
      if (prefersReducedMotion) { el.style.strokeDashoffset = '0'; return; }
      // The glow tip is where the thread crosses the viewport line — not a
      // raw scroll fraction, which lags through the snaking curves.
      const target = window.scrollY + window.innerHeight * 0.55;
      const pts = arc.samples;
      let frac = 1;
      if (target <= pts[0].y) frac = 0;
      else {
        for (let i = 1; i < pts.length; i++) {
          if (pts[i].y >= target) {
            const t = (target - pts[i - 1].y) / Math.max(1e-6, pts[i].y - pts[i - 1].y);
            frac = (pts[i - 1].len + (pts[i].len - pts[i - 1].len) * t) / arc.total;
            break;
          }
        }
      }
      el.style.strokeDashoffset = String(1 - Math.min(1, Math.max(0, frac)));
    };
    updateThreadProgressRef.current = updateThreadProgress;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Layout positions via the offset chain — unaffected by entrance
        // animation transforms, so the first paint is already correct.
        const points = [...page.querySelectorAll('[data-story-node]')]
          .filter(node => node.getClientRects().length > 0)
          .map(node => {
            let x = node.offsetLeft, y = node.offsetTop, parent = node.offsetParent;
            while (parent && parent !== page) {
              x += parent.offsetLeft;
              y += parent.offsetTop;
              parent = parent.offsetParent;
            }
            return { x: x + node.offsetWidth / 2, y: y + node.offsetHeight / 2 };
          });
        const d = buildThreadPath(points);
        setThread({ width: page.clientWidth, height: page.scrollHeight, path: d });
        const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        probe.setAttribute('d', d);
        const total = probe.getTotalLength();
        const samples = [];
        for (let i = 0; i <= 800; i++) {
          const len = (total * i) / 800;
          const pt = probe.getPointAtLength(len);
          samples.push({ x: pt.x, y: pt.y, len });
        }
        arcRef.current = { total, samples };
        // Experience dots ride the curved thread: shift each dot onto the
        // path's x at its own height (they're pinned at a fixed left otherwise).
        page.querySelectorAll('.experience-thread-point').forEach(dot => {
          let bx = dot.offsetLeft, by = dot.offsetTop, bp = dot.offsetParent;
          while (bp && bp !== page) {
            bx += bp.offsetLeft;
            by += bp.offsetTop;
            bp = bp.offsetParent;
          }
          const cx = bx + dot.offsetWidth / 2;
          // Anchor each dot to its record's date line — the timeline "starts
          // here" marker, level with the MAY 2024 — MAR 2025 style labels.
          const item = dot.closest('.experience-item');
          const date = item?.querySelector('.experience-date');
          let cy = by + dot.offsetHeight / 2;
          if (item && date) {
            const dateCenter = date.offsetTop + date.offsetHeight / 2;
            dot.style.top = `${dateCenter}px`;
            cy = by - dot.offsetTop + dateCenter;
          }
          // Bisect the path for the exact point at this dot's height — the
          // curve is too tight near the S-bend for table interpolation.
          let px = samples[0].x;
          for (let i = 1; i < samples.length; i++) {
            if (samples[i].y < cy) continue;
            let lo = samples[i - 1].len, hi = samples[i].len;
            for (let k = 0; k < 14; k++) {
              const mid = (lo + hi) / 2;
              if (probe.getPointAtLength(mid).y < cy) lo = mid; else hi = mid;
            }
            px = probe.getPointAtLength((lo + hi) / 2).x;
            break;
          }
          dot.style.transform = `translateY(-50%) translateX(${(px - cx).toFixed(2)}px)`;
        });
        updateThreadProgress();
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(page);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    // Entrance animations shift nodes after mount without resizing anything —
    // re-measure once scrolling settles so the path passes through every node.
    let scrollTimer;
    const onScrollSettled = () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(measure, 700);
    };
    let progressTicking = false;
    const onScrollProgress = () => {
      if (progressTicking) return;
      progressTicking = true;
      requestAnimationFrame(() => {
        progressTicking = false;
        updateThreadProgress();
      });
    };
    window.addEventListener('scroll', onScrollSettled, { passive: true });
    window.addEventListener('scroll', onScrollProgress, { passive: true });
    window.addEventListener('thread-remeasure', measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScrollSettled);
      window.removeEventListener('scroll', onScrollProgress);
      window.removeEventListener('thread-remeasure', measure);
      window.clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <main className="portfolio-shell" ref={pageRef}>
      {thread.path && <svg className="portfolio-thread" viewBox={`0 0 ${thread.width} ${thread.height}`} preserveAspectRatio="none" aria-hidden="true"><path className="portfolio-thread-track" d={thread.path} /><path ref={progressRef} className="portfolio-thread-progress" d={thread.path} pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: prefersReducedMotion ? 0 : 1 }} /></svg>}
      {isMobileNav && (
        <StaggeredMenu
          isFixed
          position="right"
          displayItemNumbering={false}
          items={[
            { label: 'Story', link: '#story' },
            { label: 'Projects', link: '#projects' },
            { label: 'Experience', link: '#experience' }
          ]}
          cta={{ label: 'Say hello', link: '#contact', ariaLabel: 'Say hello — go to contact' }}
          socialItems={[
            { label: 'GitHub', link: 'https://github.com/TechRam09' },
            { label: 'LinkedIn', link: 'https://www.linkedin.com/in/shreeram-ns/' }
          ]}
          colors={['#241d31', '#191620']}
          accentColor="#fa8265"
          menuButtonColor="#f0ece8"
          openMenuButtonColor="#f0ece8"
        />
      )}
      <header className="site-header">
        <a className="wordmark" href="#story" aria-label="Shreeram N S, home">Shreeram <span>N S</span></a>
        <div className="header-navigation">
          <PillNav ariaLabel="Portfolio" items={navigation} activeHref={activeSection} size="sm" surface="glass" theme="dark" itemStyle="text" hoverEffect="fill" indicator="dot" barColor="rgba(34, 25, 39, 0.48)" textColor="#E5DDE7" highlightColor="#FA8265" highlightTextColor="#1B111D" collapse={isMobileNav ? 'always' : 'never'} />
        </div>
        <a className="header-contact" href="#contact"><span>Say hello</span><ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} /></a>
      </header>

      <section className="hero" id="story" aria-labelledby="hero-title" data-thread-section>
        <div className="hero-shader" aria-hidden="true">
          <AeroShards shardColor="#ab9bf1" accentColor="#7f6fd1" markers="none" pulseOnClick={false} holdToGather={false} mouseStrength={0.4} paused={prefersReducedMotion} />
        </div>
        <div className="hero-shader-wash" aria-hidden="true" />
        <span className="hero-flow-anchor hero-flow-anchor-start" data-story-node aria-hidden="true" />
        <span className="hero-flow-anchor hero-flow-anchor-end" data-story-node aria-hidden="true" />
        <span className="hero-story-note hero-story-note-start" aria-hidden="true">started with curiosity</span>
        <div className="hero-content">
          <h1 id="hero-title">
            <span className="hero-title-line"><SplitText text="I started with" className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span>
            <span className="hero-title-line"><SplitText text="curiosity." className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span>
          </h1>
          <div className="hero-lower">
            <p className="hero-copy">In 2021, curiosity led me into code. Since then, I’ve followed it through a Computer Science degree and two internships to Java full-stack engineering at Bounteous, where I currently work with Morgan Stanley.</p>
            <div className="hero-actions">
              <a className="action-primary" href="#projects">Explore my work <ArrowDown aria-hidden="true" size={17} strokeWidth={1.8} /></a>
              <a className="action-secondary" href="#contact">Get in touch</a>
            </div>
          </div>
          <div className="hero-coordinate" aria-hidden="true"><span>SCROLL TO FOLLOW THE THREAD</span><span className="coordinate-line" /></div>
        </div>
      </section>

      <section className="journey section-wrap" aria-labelledby="journey-title" data-thread-section>
        <div className="journey-intro">
          <div className="section-heading"><h2 id="journey-title"><span className="hero-title-line"><SplitText text="A question turned" className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span><span className="hero-title-line"><SplitText text="into a direction." className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span></h2><p>The path so far, one chapter at a time.</p></div>
          <div className="journey-note"><Braces size={19} aria-hidden="true" /><span>Still curious.<br />Still building.</span></div>
        </div>
        <div className="chapter-list">
          {chapters.map((chapter, index) => (
            <Reveal key={chapter.mark} className={`chapter chapter-${index + 1}`} delay={index * 0.04} reduced={prefersReducedMotion}>
              <span className="chapter-node" data-story-node><span>{chapter.mark}</span></span>
              <div className="chapter-copy"><span className="chapter-year">{chapter.year}</span><span className="chapter-thread-note">{chapter.note}</span><h3>{chapter.title}</h3><p>{chapter.text}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="projects section-wrap" id="projects" aria-labelledby="projects-title" data-thread-section>
        <div className="projects-topline"><div className="section-heading"><h2 id="projects-title"><span className="hero-title-line"><SplitText text="Ideas made" className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span><span className="hero-title-line"><SplitText text="tangible." className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span></h2><p>A few things I’ve explored through code.</p></div><a className="text-link" href="https://github.com/TechRam09?tab=repositories" target="_blank" rel="noreferrer">All repositories <MoveUpRight size={16} aria-hidden="true" /></a></div>
        <div className="projects-explorer">
          <div className="project-picker" role="group" aria-label="Choose a project to preview">
            <div className="project-picker-wheel">
              <OptionWheel
                items={projects.map(project => project.name)}
                links={projects.map(project => project.href)}
                defaultSelected={activeProjectIndex}
                onChange={setActiveProjectIndex}
                textColor="#9f91a4"
                activeColor="#f0ece8"
                fontSize={2.4}
                spacing={1.75}
                tilt={16}
                curve={1}
                inset={18}
                loop
              />
            </div>
            <span className="project-picker-hint">Scroll, drag, or use arrow keys to pick a project.</span>
          </div>
          <div className="project-preview" aria-live="polite">
            <span className="section-story-note projects-story-note">questions, made tangible</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.article key={activeProject.name} className={`project-preview-content project-${activeProject.visual}`} initial={prefersReducedMotion ? false : { opacity: 0, y: 12, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8, filter: 'blur(3px)' }} transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}>
                <ProjectArtwork visual={activeProject.visual} />
                <div className="project-preview-info"><div className="project-meta"><span>{activeProject.kind}</span></div><h3>{activeProject.name}</h3><p>{activeProject.description}</p><div className="stack-list">{activeProject.stack.map(item => <span key={item}>{item}</span>)}</div><a className="project-repo-link" href={activeProject.href} target="_blank" rel="noreferrer">Open repository <ArrowUpRight size={16} aria-hidden="true" /></a></div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="experience section-wrap" id="experience" aria-labelledby="experience-title" data-thread-section>
        <div className="experience-heading"><div className="section-heading"><h2 id="experience-title"><span className="hero-title-line"><SplitText text="Learning by" className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span><span className="hero-title-line"><SplitText text="making it real." className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span></h2><p>From first pull requests to systems built with a team.</p></div></div>
        <div className="experience-list">
          <span className="section-story-note experience-story-note">learning with every new challenge</span>
          <Reveal className="experience-item" reduced={prefersReducedMotion}><span className="experience-thread-point" data-story-node aria-hidden="true" /><span className="experience-date">MAY 2024 — MAR 2025</span><div><h3>Full-Stack Developer Intern</h3><p>Logarithm Technologies</p></div></Reveal>
          <Reveal className="experience-item" delay={0.08} reduced={prefersReducedMotion}><span className="experience-thread-point" data-story-node aria-hidden="true" /><span className="experience-date">NOV 2023 — APR 2024</span><div><h3>Frontend Developer Intern</h3><p>Logarithm Technologies</p></div></Reveal>
          <Reveal className="experience-item experience-current" delay={0.16} reduced={prefersReducedMotion}><span className="experience-thread-point" data-story-node aria-hidden="true" /><span className="experience-date">CURRENT</span><div><h3>Java Full-Stack Developer</h3><p>Bounteous <span className="experience-client">· Morgan Stanley engagement</span></p></div></Reveal>
        </div>
      </section>

      <section className="toolkit section-wrap" aria-labelledby="toolkit-title" data-thread-section>
        <div className="toolkit-top"><div className="section-heading"><h2 id="toolkit-title"><span className="hero-title-line"><SplitText text="Tools for turning" className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span><span className="hero-title-line"><SplitText text="questions into things." className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span></h2><p>A growing set of tools I reach for across the stack.</p></div><div className="toolkit-mark" aria-hidden="true" data-story-node><Code2 size={36} strokeWidth={1.15} /></div><span className="section-story-note toolkit-story-note">still adding to the toolbox</span></div>
        <div className="skill-pile">
          <PhysicsTagPile
            tags={skills.map(label => ({ label, featured: featuredSkills.includes(label) }))}
            colors={['#241d31', '#2b2340', '#1d1a26', '#2e2640']}
            featuredColor="#fa8265"
            textColor="#f0ece8"
            borderColor="rgba(243, 238, 232, 0.16)"
            borderWidth={1}
            background="rgba(25, 22, 32, 0.55)"
            dropStyle="rain"
            font={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14 }}
          />
        </div>
        <div className="education-line"><span>EDUCATION</span><p><strong>B.E. Computer Science & Engineering</strong><br />Vidya Vikas Institute of Engineering and Technology <span>· 2025</span></p></div>
      </section>

      <footer className="contact section-wrap" id="contact" data-thread-section>
        <div className="contact-orbit" aria-hidden="true" data-story-node><span /><span /><span /></div>
        <h2><span className="hero-title-line"><SplitText text="Need a website" className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span><span className="hero-title-line"><SplitText text="or web app?" className="hero-title-split" textAlign="left" tag="span" splitType="chars" delay={24} duration={0.72} effect="rise" trigger="view" hoverEffect="lift" /></span></h2>
        <p>Tell me what you have in mind. We can talk through the design, development, scope, and next steps.</p>
        <a className="contact-cta" href="#contact">Discuss a project <ArrowUpRight size={19} aria-hidden="true" /></a>
        <div className="contact-profile">
          <ProfileCard
            avatarUrl="/portrait-cutout.png"
            name="Shreeram N S"
            title="Java Full-Stack Developer"
            handle="TechRam09"
            status="Online"
            flipSignal={flipSignal}
            contactText="Say hello"
            theme="dark"
            backdropColor="#241d31"
          />
        </div>
      </footer>

      <HalftoneWordmarkFooter
        wordmark="shreeram"
        label="Shreeram N S"
        meta="Built with curiosity · © 2026"
        columns={[
          { title: 'Pages', links: [{ label: 'Story', href: '#story' }, { label: 'Projects', href: '#projects' }, { label: 'Experience', href: '#experience' }] },
          { title: 'Elsewhere', links: [{ label: 'GitHub', href: 'https://github.com/TechRam09' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shreeram-ns/' }] },
          { title: 'Contact', links: [{ label: 'Say hello', href: '#contact' }] }
        ]}
        palette={{ background: '#191620', ink: '#f0ece8', warm: '#fa8265' }}
        height="440px"
      />
    </main>
  );
}
