/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Phone,
  Globe,
  Download,
  Mail,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Home,
  User,
  FileText,
  Zap,
  Layers,
  Server,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import enData from './data/en.json';
import frData from './data/fr.json';

type Content = typeof enData;

export default function App() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const content: Content = lang === 'en' ? enData : frData;

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'fr' : 'en');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveSection(id);
    }
  };

  // Simple scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'resume', 'skills', 'projects', 'certifications', 'services', 'contact'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="atmosphere" />

      {/* Sidebar Navigation - Desktop */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col justify-between border-r border-border-glass bg-bg-dark/50 p-8 backdrop-blur-xl md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/apple-touch-icon.png"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover shadow-[0_0_15px_rgba(231,74,59,0.3)]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback if image not found
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextSibling) (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
              }}
            />
            <div className="hidden h-10 w-10 rounded-xl bg-accent items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(231,74,59,0.3)]">
              W
            </div>
            <span className="font-display text-xl font-bold tracking-tight">Ghazel</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'hero', icon: Home, label: content.sidebar.nav.home },
              { id: 'about', icon: User, label: content.sidebar.nav.about },
              { id: 'resume', icon: FileText, label: content.sidebar.nav.resume },
              { id: 'skills', icon: Zap, label: content.sidebar.nav.skills },
              { id: 'projects', icon: Layers, label: content.sidebar.nav.projects },
              { id: 'certifications', icon: Award, label: content.sidebar.nav.certifications },
              { id: 'services', icon: Server, label: content.sidebar.nav.services },
              { id: 'contact', icon: Mail, label: content.sidebar.nav.contact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link-modern w-full ${activeSection === item.id ? 'active' : ''}`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <button
            onClick={toggleLanguage}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-glass py-3 text-xs font-bold uppercase tracking-widest text-text-dim transition-all hover:bg-white/5 hover:text-white"
          >
            <Globe size={14} /> {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/WaelGhazel" target="_blank" className="text-text-dim hover:text-accent transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/wael-ghazel/" target="_blank" className="text-text-dim hover:text-accent transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://wa.me/+330751258994" target="_blank" className="text-text-dim hover:text-accent transition-colors">
              <Phone size={20} />
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border-glass bg-bg-dark/80 px-6 py-4 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2">
          <img src="/apple-touch-icon.png" alt="Logo" className="h-8 w-8 rounded-full object-cover" referrerPolicy="no-referrer" />
          <span className="font-display font-bold">Ghazel</span>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg-dark p-8 pt-24 md:hidden"
          >
            <nav className="space-y-4">
              {Object.entries(content.sidebar.nav).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="block text-3xl font-bold text-text-dim hover:text-white"
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="mt-auto flex items-center justify-between border-t border-border-glass pt-8">
              <button onClick={toggleLanguage} className="font-bold text-accent">{lang === 'en' ? 'FRANÇAIS' : 'ENGLISH'}</button>
              <div className="flex gap-6">
                <Github size={24} className="text-text-dim" />
                <Linkedin size={24} className="text-text-dim" />
                <Phone size={24} className="text-text-dim" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72">
        {/* Hero Section */}
        <section id="hero" className="relative flex min-h-screen flex-col justify-center px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-bg.jpg"
              alt="Hero Background"
              className="h-full w-full object-cover object-right md:object-center opacity-40"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/hero/1920/1080";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="badge mb-6 inline-block">Available for Collaboration</span>
            <h1 className="text-6xl font-black leading-[0.9] md:text-8xl lg:text-[10vw]">
              {content.hero.name.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
                {content.hero.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <div className="mt-12 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="font-display text-2xl font-medium text-text-dim md:text-3xl">
                  {content.hero.titles[0]} & {content.hero.titles[1]}
                </p>
                <p className="mt-6 text-lg text-text-dim leading-relaxed">
                  {content.hero.statement}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollTo('contact')} className="btn-primary flex items-center gap-2">
                  {lang === 'en' ? 'Start a Project' : 'Démarrer un Projet'} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="px-8 py-24 md:px-20">
          <h2 className="section-heading">{content.about.title}</h2>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="relative group w-fit">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="relative rounded-2xl w-full max-w-[320px] shadow-2xl object-cover aspect-square"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 h-fit">
              {[
                { label: 'Birthday', value: content.about.details.birthday },
                { label: 'Degree', value: content.about.details.degree },
                { label: 'Age', value: content.about.details.age },
                { label: 'Experience', value: (content.about.details as any).experience },
              ].map((item, idx) => (
                <div key={idx} className="glass-card flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim">{item.label}</span>
                  <p className="mt-2 text-lg font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <h3 className="text-3xl font-bold leading-tight md:text-4xl mt-6">
            {content.about.subtitle}
          </h3>
          <p className="text-xl leading-relaxed text-text-dim">
            {content.about.description}
          </p>
          <div className="grid grid-cols-1 gap-8 pt-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Status</span>
              <p className="mt-2 text-lg font-medium">{content.about.details.status}</p>
            </div>
          </div>

        </section>

        {/* Resume Section */}
        <section id="resume" className="px-8 py-24 md:px-20 bg-surface/30">
          <h2 className="section-heading">{content.resume.title}</h2>
          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-bold mb-12 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent" />
                {content.resume.experience.title}
              </h3>
              <div className="space-y-12">
                {content.resume.experience.items.map((item, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-border-glass">
                    <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-accent" />
                    <span className="text-xs font-bold uppercase tracking-widest text-text-dim">{item.date}</span>
                    <h4 className="text-xl font-bold mt-2">{item.title}</h4>
                    <p className="text-accent font-medium mt-1">{item.company}</p>
                    <ul className="mt-4 space-y-2 text-sm text-text-dim leading-relaxed">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3">
                          <ChevronRight size={14} className="mt-1 shrink-0 text-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-12 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent" />
                {content.resume.education.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {content.resume.education.items.map((item, idx) => (
                  <div key={idx} className="glass-card">
                    <span className="text-xs font-bold uppercase tracking-widest text-text-dim">{item.date}</span>
                    <h4 className="text-xl font-bold mt-2">{item.degree}</h4>
                    <p className="text-accent font-medium mt-1">{item.institution}</p>
                    <p className="text-sm text-text-dim mt-4 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/CV/WaelGhazelEnglish.pdf"
                download
                className="flex w-full items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-6 transition-all hover:bg-accent hover:border-accent group"
              >
                <span className="font-bold uppercase tracking-widest text-sm">{content.resume.download.en}</span>
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="/CV/WaelGhazelFrançais.pdf"
                download
                className="flex w-full items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-6 transition-all hover:bg-accent hover:border-accent group"
              >
                <span className="font-bold uppercase tracking-widest text-sm">{content.resume.download.fr}</span>
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="px-8 py-24 md:px-20">
          <h2 className="section-heading">{content.skills.title}</h2>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-8">
              <h3 className="text-2xl font-bold">{content.skills.technicalTitle}</h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {content.skills.technical.map((skill, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-text-dim">{skill.name}</span>
                      <span className="text-accent">{skill.value}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-accent shadow-[0_0_10px_rgba(231,74,59,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-bold mb-8">{content.skills.knowledgeTitle}</h3>
              <div className="flex flex-wrap gap-3">
                {content.skills.knowledge.map((k, i) => (
                  <span key={i} className="rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-sm font-medium transition-all hover:bg-accent hover:border-accent hover:text-white cursor-default">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="px-8 py-24 md:px-20 bg-surface/30">
          <h2 className="section-heading">{content.projects.title}</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {content.projects.items.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="glass-card group relative overflow-hidden p-0"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-3xl font-bold mb-3">{project.title}</h4>
                  <p className="text-text-dim leading-relaxed mb-6">
                    {project.description}
                  </p>
                  {project.link ? (
                    <a href={project.link} target="_blank" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-accent transition-colors">
                      Explore Project <ArrowRight size={16} />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-dim/50 cursor-not-allowed">
                      Private Project
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="px-8 py-24 md:px-20">
          <h2 className="section-heading">{(content as any).certifications.title}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(content as any).certifications.items.map((cert: any, idx: number) => (
              <div key={idx} className="glass-card group flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-tight mb-1">{cert.title}</h4>
                  <p className="text-sm text-accent font-medium">{cert.issuer}</p>
                  {cert.details && <p className="text-xs text-text-dim mt-1 italic">{cert.details}</p>}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-text-dim">{cert.date}</p>
                    {cert.link && (
                      <a href={cert.link} target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-1">
                        Verify <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-8 py-24 md:px-20">
          <h2 className="section-heading">{content.services.title}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.services.items.map((service, idx) => (
              <div key={idx} className="glass-card group">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                  <Zap size={24} />
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-text-dim leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-8 py-24 md:px-20 bg-accent text-white rounded-t-[3rem]">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-12">
              {content.contact.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-4">Email</span>
                  <a href={`mailto:${content.about.details.email}`} className="text-xl font-bold hover:underline">
                    {content.about.details.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-4">Phone</span>
                  <p className="text-xl font-bold">{content.about.details.phone}</p>
                </div>
              </div>
              <div className="flex flex-col justify-end gap-6">
                <div className="flex gap-6">
                  <a href="https://github.com/WaelGhazel" target="_blank" className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition-all">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/wael-ghazel/" target="_blank" className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition-all">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://wa.me/+330751258994" target="_blank" className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition-all">
                    <Phone size={24} />
                  </a>
                </div>
                <p className="text-white/60 text-sm font-medium">
                  © {new Date().getFullYear()} Mohammed Wael Ghazel. <br />
                  All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
