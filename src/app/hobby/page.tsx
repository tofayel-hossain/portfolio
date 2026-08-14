import { ArrowLeft, Camera, Cpu, Map, BookOpen } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/content/site-data";

const icons = [Camera, BookOpen, Cpu, Map];

export default function HobbyPage() {
  return (
    <main className="subpage">
      <div className="container hobby-page-inner">
        <Link href="/" className="back-link"><ArrowLeft size={17} /> Back home</Link>
        <div className="subpage-heading">
          <span className="eyebrow">Off the main page, on purpose</span>
          <h1>Hobby</h1>
          <p>The things I enjoy when I’m not debugging, studying or building.</p>
        </div>
        <div className="hobby-grid">
          {siteData.hobbies.map((hobby, index) => {
            const Icon = icons[index % icons.length];
            return <article className="hobby-card card" key={hobby.title}><Icon size={28} /><h2>{hobby.title}</h2><p>{hobby.detail}</p><span>0{index + 1}</span></article>;
          })}
        </div>
      </div>
    </main>
  );
}
