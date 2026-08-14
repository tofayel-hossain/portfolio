import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")?.trim();
  if (!username) return NextResponse.json({ error: "Missing username" }, { status: 400 });

  try {
    const res = await fetch(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}/profile`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return NextResponse.json({ error: "LeetCode provider request failed" }, { status: 502 });
    const profile = await res.json();

    const solved = profile?.solvedProblem ?? profile?.totalSolved ?? profile?.totalSolvedQuestions ?? 0;
    const easy = profile?.easySolved ?? profile?.easySolvedProblem ?? profile?.easySolvedQuestions ?? 0;
    const medium = profile?.mediumSolved ?? profile?.mediumSolvedProblem ?? profile?.mediumSolvedQuestions ?? 0;
    const hard = profile?.hardSolved ?? profile?.hardSolvedProblem ?? profile?.hardSolvedQuestions ?? 0;

    return NextResponse.json({
      username,
      totalSolved: Number(solved) || 0,
      easySolved: Number(easy) || 0,
      mediumSolved: Number(medium) || 0,
      hardSolved: Number(hard) || 0,
      ranking: profile?.ranking ?? profile?.rank ?? null,
      source: "alfa-leetcode-api"
    });
  } catch {
    return NextResponse.json({ error: "Unable to reach LeetCode provider" }, { status: 502 });
  }
}
