"use client";

import { useEffect, useState } from "react";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { siteData } from "@/content/site-data";

type LeetCodeData = {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number | null;
  fallback?: boolean;
};

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

type GitHubData = {
  repos: Repo[];
  publicRepos: number;
  followers: number;
  fallback?: boolean;
};

const demoLeetCode: LeetCodeData = {
  username: "your-leetcode-username",
  totalSolved: 168,
  easySolved: 78,
  mediumSolved: 72,
  hardSolved: 18,
  ranking: null,
  fallback: true
};

export function ProblemSolvingStats() {
  const [data, setData] = useState<LeetCodeData>(demoLeetCode);

  useEffect(() => {
    if (siteData.leetcodeUsername.startsWith("your-")) return;
    fetch(`/api/leetcode?username=${encodeURIComponent(siteData.leetcodeUsername)}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch(() => setData(demoLeetCode));
  }, []);

  const maxValue = Math.max(data.easySolved, data.mediumSolved, data.hardSolved, 1);
  const levels = [
    ["Easy", data.easySolved],
    ["Medium", data.mediumSolved],
    ["Hard", data.hardSolved]
  ] as const;

  return (
    <div className="leetcode-grid">
      <div className="leetcode-total">
        <span className="leetcode-label">LeetCode</span>
        <strong>{data.totalSolved}</strong>
        <p>Problems solved</p>
        <a href={`https://leetcode.com/u/${data.username}/`} target="_blank" rel="noreferrer">View profile <ExternalLink size={12} /></a>
      </div>
      <div className="leetcode-breakdown">
        {levels.map(([label, value]) => (
          <div className="leetcode-row" key={label}>
            <div><span>{label}</span><strong>{value}</strong></div>
            <div className="leetcode-track"><span style={{ width: `${(value / maxValue) * 100}%` }} /></div>
          </div>
        ))}
        {data.ranking ? <p className="data-note">Global ranking: {data.ranking.toLocaleString()}</p> : null}
        {data.fallback ? <p className="data-note">Demo values — add your LeetCode username in <code>site-data.ts</code>.</p> : null}
      </div>
    </div>
  );
}

const demoRepos: Repo[] = [
  { name: "ai-resume-analyzer", html_url: "#", description: "Semantic ATS and resume analysis toolkit.", language: "Python", stargazers_count: 8, forks_count: 2, updated_at: new Date().toISOString() },
  { name: "portfolio", html_url: "#", description: "Personal research and engineering portfolio.", language: "TypeScript", stargazers_count: 5, forks_count: 1, updated_at: new Date().toISOString() },
  { name: "embedded-door-lock", html_url: "#", description: "Password protected hardware access controller.", language: "C++", stargazers_count: 3, forks_count: 0, updated_at: new Date().toISOString() },
  { name: "market-platform", html_url: "#", description: "Public market information and seller workflow application.", language: "TypeScript", stargazers_count: 2, forks_count: 0, updated_at: new Date().toISOString() },
  { name: "ml-experiments", html_url: "#", description: "Small machine-learning experiments and notebooks.", language: "Python", stargazers_count: 2, forks_count: 1, updated_at: new Date().toISOString() },
  { name: "engineering-notes", html_url: "#", description: "Notes, utilities and course-related engineering work.", language: "Jupyter Notebook", stargazers_count: 1, forks_count: 0, updated_at: new Date().toISOString() }
];

export function GitHubWorks() {
  const [data, setData] = useState<GitHubData>({ repos: demoRepos, publicRepos: 24, followers: 12, fallback: true });

  useEffect(() => {
    if (siteData.githubUsername.startsWith("your-")) return;
    fetch(`/api/github?username=${encodeURIComponent(siteData.githubUsername)}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch(() => null);
  }, []);

  return (
    <>
      <div className="repos-header">
        <span className="repos-count">{data.publicRepos} public repositories · {data.followers} followers</span>
        <a href={siteData.socials.github} target="_blank" rel="noreferrer" className="repos-viewall">View all on GitHub <ExternalLink size={12} /></a>
      </div>
      <div className="repos-grid">
        {data.repos.slice(0, 6).map((repo) => (
          <article className="repo-card" key={repo.name}>
            <a className="repo-name" href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
            <p className="repo-desc">{repo.description || "Public repository"}</p>
            <div className="repo-meta">
              <span className="repo-lang"><i className="lang-dot" />{repo.language || "Code"}</span>
              <span className="repo-stat"><Star size={12} /> {repo.stargazers_count}</span>
              <span className="repo-stat"><GitFork size={12} /> {repo.forks_count}</span>
            </div>
          </article>
        ))}
      </div>
      {data.fallback ? <p className="data-note repos-note">Demo repositories — add your GitHub username to load live public repos.</p> : null}
    </>
  );
}
