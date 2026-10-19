"use client";

import Link from "next/link";
import { siteData } from "@/content/site-data";

const links = [
  ["Education", "#education"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Problem", "#problem-solving"],
  ["GitHub", "#github"],
  ["Contact", "#contact"]
];

export default function Navbar() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="Home">
          {siteData.logo.replace(/\.dev$/i, "")}
          <span>.dev</span>
        </Link>

        <ul className="nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
          <li><Link href="/hobby">Hobby</Link></li>
        </ul>

        <div className="header-right">
          <Link href="/hobby" className="btn-hobby-mobile">Hobby</Link>
          <a href={siteData.resume} className="btn-resume">Resume</a>
        </div>
      </div>
    </header>
  );
}
