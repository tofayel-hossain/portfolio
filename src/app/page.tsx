import Image from "next/image";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import Reveal from "@/components/reveal";
import { GitHubWorks, ProblemSolvingStats } from "@/components/live-stats";
import { siteData } from "@/content/site-data";

function Tags({ items }: { items: string[] }) {
  return <div className="tags">{items.map((item) => <span className="tag" key={item}>{item}</span>)}</div>;
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return <><p className="section-label">{label}</p><h2 className="section-title">{title}</h2></>;
}

export default function Home() {
  return (
    <main>
      {/* Hero — left information, animated portrait only on the right */}
      <section className="hero" id="top">
        <div className="container">
          <div className="hero-inner">
            <div>
              <div className="hero-badge"><span className="badge-dot" /> Open to research & job opportunities</div>
              <h1 className="hero-name"><span>{siteData.name}</span></h1>
              <p className="hero-subtitle">{siteData.role}</p>
              <p className="hero-bio">{siteData.intro}</p>
              <div className="hero-actions">
                <a href="#projects" className="btn-primary">View Projects →</a>
                <a href={siteData.socials.github} className="btn-outline" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
                <a href={siteData.socials.linkedin} className="btn-outline" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
              </div>
            </div>

            <div className="hero-photo-stage" aria-label={`${siteData.name} portrait`}>
              <div className="hero-photo-frame">
                <Image
                  src="/profile.jpg"
                  width={620}
                  height={760}
                  priority
                  alt={`${siteData.name} profile`}
                  className="hero-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User-provided slogan — intentionally shown only once */}
      <Reveal>
        <section className="slogan-section" aria-label="Personal slogan">
          <div className="container">
            <p className="slogan-text">{siteData.slogan}</p>
          </div>
        </section>
      </Reveal>

      {/* Paper / Project / Repository info */}
      <Reveal>
        <section className="metrics-section" aria-label="Portfolio summary">
          <div className="container">
            <div className="portfolio-metrics">
              <div className="metric-item"><span className="stat-label">Papers</span><strong className="stat-value">{siteData.stats.papers}</strong><small>Research & publications</small></div>
              <div className="metric-item"><span className="stat-label">Projects</span><strong className="stat-value">{siteData.stats.projects}</strong><small>Selected engineering work</small></div>
              <div className="metric-item"><span className="stat-label">Repos</span><strong className="stat-value">{siteData.stats.repos}</strong><small>Public code repositories</small></div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="education">
          <div className="container">
            <SectionHead label="01 / Education" title="Education" />
            <div className="edu-grid">
              {siteData.education.map((edu) => (
                <article className="edu-card" key={edu.level}>
                  <div className="edu-card-head"><span className="edu-institution">{edu.institution}</span><span className="edu-period">{edu.period}</span></div>
                  <p className="edu-degree">{edu.degree}</p>
                  <div className="edu-meta"><span className="edu-location">{edu.location}</span><span className="edu-grade">{edu.grade}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="skills">
          <div className="container">
            <SectionHead label="02 / Skills" title="Skills & Toolkit" />
            <div className="skills-grid">
              {siteData.skills.map((group) => (
                <div className="skill-group" key={group.group}>
                  <h3 className="skill-group-title">{group.group}</h3>
                  <div className="skill-tags">{group.items.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="projects">
          <div className="container">
            <SectionHead label="03 / Projects" title="Projects" />
            <div className="projects-featured">
              {siteData.projects.slice(0, 2).map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-card-top"><div className="project-icon">⌘</div><span className="featured-badge">★ Featured</span></div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <Tags items={project.stack} />
                  <div className="project-links"><a className="project-link" href={project.repo}><Github size={14} /> Code</a>{project.live !== "#" && <a className="project-link project-link-live" href={project.live}>Live <ExternalLink size={13} /></a>}</div>
                </article>
              ))}
            </div>
            <div className="projects-grid">
              {siteData.projects.slice(2).map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-card-top"><div className="project-icon">◇</div></div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <Tags items={project.stack} />
                  <div className="project-links"><a className="project-link" href={project.repo}><Github size={14} /> Code</a>{project.live !== "#" && <a className="project-link project-link-live" href={project.live}>Live <ExternalLink size={13} /></a>}</div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="problem-solving">
          <div className="container">
            <SectionHead label="04 / Problem Solving" title="Problem Solving" />
            <ProblemSolvingStats />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="github">
          <div className="container">
            <SectionHead label="05 / GitHub" title="GitHub Works" />
            <GitHubWorks />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="research">
          <div className="container">
            <SectionHead label="06 / Research" title="Research & Publications" />
            <div className="research-grid">
              {siteData.research.map((item) => (
                <article className="research-card" key={item.title}>
                  <div className="research-card-head"><span className="research-role">{item.role} · {item.institution}</span><span className="research-period">{item.period}</span></div>
                  <h3 className="research-title">{item.title}</h3>
                  <p className="research-desc">{item.description}</p>
                  <Tags items={item.tags} />
                  <div className="research-links">
                    <a href={item.paperUrl}>Paper <ExternalLink size={12} /></a>
                    <a href={item.repoUrl}>Repository <Github size={12} /></a>
                  </div>
                </article>
              ))}
            </div>

            <h3 className="pubs-title">Publications</h3>
            <div className="pub-list">
              {siteData.publications.map((pub) => (
                <article className="pub-item" key={pub.title}>
                  <div className="pub-icon">📄</div>
                  <div className="pub-content">
                    <div className="pub-title-row"><p className="pub-title">{pub.title}</p><span className={`pub-status pub-status--${pub.status.toLowerCase().replace(/\s+/g, "-")}`}>{pub.status}</span></div>
                    <div className="pub-meta">
                      <span className="pub-conference">✦ {pub.conference}</span>
                      <Tags items={pub.tags} />
                      <a className="pub-link" href={pub.paper}>Paper ↗</a>
                      <a className="pub-link" href={pub.code}>Code ↗</a>
                      <span className="pub-date">{pub.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="contact" id="contact">
          <div className="container">
            <SectionHead label="07 / Contact" title="Let's Connect" />
            <div className="contact-body">
              <div className="contact-quote"><span className="quote-mark">“</span><p>If you want to discuss a project, research collaboration, internship, or an interesting engineering problem, feel free to reach out.</p></div>
              <div className="contact-actions"><a href={`mailto:${siteData.email}`} className="btn-primary"><Mail size={16} /> Email Me</a><a href={siteData.socials.linkedin} className="btn-outline" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={siteData.socials.github} className="btn-outline" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a></div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
