# Reddish Portfolio — Reference Flow Edition

A responsive Next.js portfolio inspired by the compact visual language of `nafim.dev`, while keeping the implementation and project structure original.

## Homepage flow

1. Navbar — includes **Hobby**, which opens a separate `/hobby` page and is not a homepage section
2. Hero — left profile information + right animated portrait only
3. Dedicated slogan section — **Work until it works.** only (shown once)
4. Paper / Project / Repository summary
5. Education — SSC → HSC → BSc
6. Skills & Toolkit
7. Recent Projects
8. Problem Solving — LeetCode-ready stats
9. GitHub Works — live public repositories
10. Research & Publications
11. Contact
12. Footer

## Customize your data

Edit:

```text
src/content/site-data.ts
```

Replace the profile placeholder:

```text
public/profile-placeholder.svg
```

Add your resume as:

```text
public/resume.pdf
```

## Live integrations

### GitHub

Set `githubUsername` in `src/content/site-data.ts`. The app uses a server Route Handler at `src/app/api/github/route.ts` to load the latest public repositories. `GITHUB_TOKEN` is optional for public data and can be used to improve rate limits.

### LeetCode

Set `leetcodeUsername` in `src/content/site-data.ts`. `src/app/api/leetcode/route.ts` currently uses the community `alfa-leetcode-api` provider. The UI falls back to demo data if the provider is unavailable.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.
