# Deployment Workflow

This repo deploys to production via Vercel, project **aspacbank-wesbite**, which
is bound to `www.aspacbank.com`. Its Production Branch is `master` — every
push to `master` triggers a new Production deployment.

> Other Vercel projects under this account (`aspacbank-3v7f`, `aspacbank`,
> `aspacbank2`) are also connected to this repo but are **not** the live
> site. Don't rely on their deploy status when checking if changes are live.

## 1. Start a new branch from the latest master

```bash
git checkout master
git pull origin master
git checkout -b feat/your-branch-name
```

## 2. Make your changes, then stage and commit

```bash
git add <files-you-changed>
git commit -m "short description of the change"
```

Repeat edit → add → commit as many times as needed while working.

## 3. Push your branch to GitHub (backup / for review)

```bash
git push -u origin feat/your-branch-name
```

`-u` is only needed on the first push of that branch — after that, just
`git push`.

## 4. Ship it to production

```bash
git checkout master
git pull origin master
git merge --no-ff feat/your-branch-name -m "Merge branch 'feat/your-branch-name'"
git push origin master
```

The push to `master` is what triggers the real Production deploy.

## 5. Clean up the branch once merged (optional)

```bash
git branch -d feat/your-branch-name
git push origin --delete feat/your-branch-name
```

## 6. Confirm it's actually live

Don't assume the push means it's live. Check the Vercel dashboard:

1. Go to the **aspacbank-wesbite** project → **Deployments**.
2. Find the deployment for your latest `master` commit.
3. Confirm it shows **Ready** and is tagged **Production** (not Preview).
4. Visit `https://www.aspacbank.com` (hard refresh / incognito) to verify.
