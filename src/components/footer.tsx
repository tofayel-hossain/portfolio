import { Github, Linkedin, Mail } from "lucide-react";
import { siteData } from "@/content/site-data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">© {new Date().getFullYear()} {siteData.name}</p>
        <div className="footer-socials">
          <a href={siteData.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a href={siteData.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href={`mailto:${siteData.email}`} aria-label="Email"><Mail size={17} /></a>
        </div>
      </div>
    </footer>
  );
}
