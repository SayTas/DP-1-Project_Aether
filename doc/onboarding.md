# Aether — AI Onboarding Instructions

## Your goal

Resume development with a clear understanding of what Aether is meant to do, what the repository currently contains, why past decisions were made, and what the teammate needs from this session.

## Step 0 — Read the session records

If a fresh SESSION_BOOT.md is available, read §0–§7. Otherwise read this file, [voice.md](voice.md), [decisions.md](decisions.md), [context.md](context.md), [missions.md](missions.md), [handoff.md](handoff.md) and [journal.md](journal.md). Check the relevant part of Final Build v1.5 and look at current Git state when repository access is available. In lite mode, load context.md separately when the task needs it. Ask who is speaking before starting if identity is unclear.

Give a five-line startup summary:

1. The tone and workflow the teammate expects.
2. The current mission.
3. Where the last session stopped.
4. The top blocker or open question, if any.
5. The first batch of files or evidence needed.

If the teammate asks you to read silently, follow that instruction and keep the summary for when they ask.

## Step 1 — Request or inspect Batch 1

Use the bootstrap order in [handoff.md](handoff.md). When you have direct repo access, inspect the files yourself. Otherwise name the exact paths to send and wait for the batch. For the current README-only starting point, the root inventory and branch status come first.

## Step 2 — Confirm the first batch

Read each relevant file. Give one line per file describing its job and flag anything that changes the next action. Ask for the next batch only if it is needed.

## Step 3 — Read the remaining batches

Follow the affected feature through its entry point, dependency, and test. For a change to CSV conversion, that could mean the converter, the operation registration that calls it, and the fixture and verifier that check the result. Ask for exact paths based on the repo inventory.

## Step 4 — Confirm the full picture

Summarize the current state in three to five bullets and give the single next action. Explain the proposed behavior in plain English with several examples and provide runnable test scenarios. Wait for the teammate's go before implementing that action.

## Step 5 — Reconcile stale handoff evidence

If a recorded branch, hash or working-tree state appears stale, compare it with Git and the recent commit subjects. A journal or handoff commit can move HEAD by itself. Check which paths changed before treating the mismatch as implementation drift. Tell the teammate what you verified. Ask which state to use before proceeding with the affected work if the intended state is still unclear or local edits could be overwritten.

## Step 6 — Reconcile a file mismatch

If a supplied file disagrees with the handoff, name the file, quote the relevant difference briefly, and verify against Git or ask the teammate which local state is current. Apply Final Build v1.5 to design and scope questions.

## Ongoing rules and commit sign-off

- Before a teammate-applied FIND/REPLACE, follow §5-PENDING and the local-edit fallback in [handoff.md](handoff.md). Clear the pending item after the teammate confirms the result.
- Log failed fixes with **Tried**, **Why it failed** and **Next attempt**. Check [decisions.md](decisions.md) before reusing a rejected approach.
- On checkpoint or sync, update the handoff and mission items and capture actual test evidence. Once Git provides the commit hash, fill the corresponding entry in [journal.md](journal.md).
- After a commit series, check the handoff's Git anchor, §1 current focus, and §5 working tree against recent Git output. Record which commits landed and which changes are still local. Keep a docs-only hash advance from creating another cycle of hash-only commits.
