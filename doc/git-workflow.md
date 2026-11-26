# Aether team Git workflow

Each teammate should attach the current copy of this file to their Aether development chat. After a break, type **/resume** as your first message. For everything else, speak normally. “I finished testing,” “Irfan pushed a PR,” and “I’m about to merge” are enough for the assistant to choose the relevant steps below.

## How the assistant should help

- Give the teammate one actionable step at a time. State the shell, the repo folder, the exact command or button, and what result to expect. Use PowerShell for Windows unless the teammate is using a different shell.
- Check the repo and GitHub directly when available. Otherwise ask for the smallest useful evidence: a command's output, the issue or PR link, or the relevant excerpt if the link is inaccessible. Do not assume separate chats share context or receive GitHub notifications.
- Use GitHub Issues as the shared record of active work. Keep one issue per task with its owner, branch, expected shared files, dependencies, and latest test result or blocker. Link the PR when it exists. Draft concise updates for the teammate to post, or post them when authorized and able. Use Git and PR state to verify whether work was pushed or merged.
- Leave publishing and merging to the teammate unless they explicitly ask you to perform the action. Avoid commands that discard local edits or rewrite shared branch history. When the repo state is unclear, inspect it before recommending a change.

## When the teammate types /resume

1. Identify the teammate and active issue from the evidence available. Ask for the task or issue if it is unclear.
2. Check the current branch and local edits with `git status --short --branch` from their Aether repo root. If remote information is needed, use `git fetch origin`, then check the latest commits on `origin/main` and the task branch. Fetch updates Git's view of GitHub and leaves working files untouched.
3. Check related issues and PRs for new work, moves to shared files, changes in how modules connect, and review requests. If a push or PR is mentioned without a clear destination, confirm its branch or ask for the link. If remote access fails, identify what remains unverified.
4. Tell them what changed, whether it affects their task, and the single next step. Resume their work where possible. Keep this check free of automatic branch switches, merges, or pushes.

## Before starting or extending a module

- Check the task issue, related work, and local Git status. For a new task, start a short-lived task branch from current `origin/main` after accounting for any local edits. For an existing task, confirm the existing branch and intended scope.
- Agree on shared paths and how modules pass data to each other. For example, conversion returns a workbook path and the Calc module accepts that path. If two tasks need the same registry file, coordinate who makes that edit and who reviews it.
- Agree on a small test for the module and, when two modules connect, a test of the connection.

## Before committing, pushing, or opening a PR

1. Check `git status --short --branch` and confirm the intended task branch. Inspect the changes and review the test results. State any missing test evidence.
2. Stage only the intended paths. Review the staged diff and run `git diff --cached --check`. Commit, then verify the hash and working tree. Push the confirmed task branch and check the result. If the push is rejected, fetch and inspect the remote changes before retrying.
3. Open or update the PR from the task branch into `main`. Include the issue link, what changed, commands or steps to test it, expected and observed results, and any effect on a teammate.
4. If the local journal hook appends a blank slot, help fill it with the actual commit hash and test evidence. Include the entry in a planned checkpoint. Avoid a loop of extra commits just to fill each new slot.

## When someone else pushes or opens a PR

- Confirm which branch received the push and whether the PR is open or merged. Check the changed paths and dependencies before telling the teammate they need to act.
- For an open PR, review **Files changed** and run the relevant tests if assigned. When local work is in progress, guide testing in a separate checkout so the current files stay in place. Verify the commit tested and record what happened.
- If the change has no bearing on the teammate's task and they have no review assignment, tell them they can keep working.

## Before merging into main

- Confirm the source branch and base `main`. Inspect the current PR diff, review feedback, test results, and any repository-required checks. Have another teammate review module changes.
- Check for shared files and changes to module inputs or outputs. If two tasks overlap, tell the affected teammate what changed and agree on the combined behavior. Run the affected tests together before merging when the PR changes how the modules connect.
- If checks fail or a conflict exists, help resolve it and rerun affected tests. Guide the teammate through the merge when ready and verify GitHub reports it as merged.

## After main changes

1. Check local status and fetch. Compare incoming paths with the teammate's committed changes and local edits, including untracked files. Fetch itself leaves local files alone. Integrating changes can modify files or surface a conflict.
2. If the task needs the update, preserve unfinished work before integrating. If both branches added or changed the same path, show both versions and agree on the combined result. If no update is needed now, explain that the teammate can continue.
3. Test the affected module and any changed connection after integration. Review the result before committing or pushing the task branch again.

## First-time setup

New teammates clone the repository once. Teammates with an existing clone can fetch and update their local `main` after checking for local changes. Attach this file to each development chat. If the repository contains the shared journal hook and the teammate wants it active, confirm the hook file and set `git config --local core.hooksPath .githooks` once from that clone.

Routine module work goes through task branches and PRs. The initial publication of this guide can go directly to `main` if the team's repository rules allow it. Review and tests reduce the chance of breakage. A clean Git merge by itself does not prove the combined modules work.
