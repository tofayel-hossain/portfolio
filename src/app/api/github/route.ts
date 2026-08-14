import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")?.trim();
  if (!username) return NextResponse.json({ error: "Missing username" }, { status: 400 });

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-app"
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6&type=owner`, { headers, next: { revalidate: 1800 } })
    ]);

    if (!userRes.ok || !repoRes.ok) {
      return NextResponse.json({ error: "GitHub request failed" }, { status: 502 });
    }

    const user = await userRes.json();
    const repos = await repoRes.json();
    return NextResponse.json({
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      repos
    });
  } catch {
    return NextResponse.json({ error: "Unable to reach GitHub" }, { status: 502 });
  }
}
