# Aether — Change Journal

Append entries in order and identify each commit by hash. At checkpoint, capture the actual test evidence. Once the commit exists, use its hash and diff to fill in the issue, solution, files and verified fields. Use a FIND/REPLACE against the pending block when a teammate is applying the edit.

## Entry format

Copy the format below for an actual commit. The date, subject and hash come from Git.

```markdown
## YYYY-MM-DD — <actual commit subject>
- **Issue:** (fill in)
- **Solution:** (fill in)
- **Files:** (fill in)
- **Verified:** (fill in)
- **Commit:** <actual hash>
```

For a bug fix, add **Root cause** when it is known. In **Verified**, identify the command or manual steps, expected behavior, observed result and any pending checks. Partial evidence can be useful. A created workbook and the correct workbook displayed in Calc are distinct observations.

The planned post-commit hook should append one stub per new hash and preserve earlier entries. Until tooling is installed and tested, create missing stubs from actual Git output during checkpoint. Consider archiving older entries around 500 lines. Keep their dates, hashes and order.

## Recorded commits

## 2026-11-26 — Add Aether development workflow documentation

- **Issue:** Aether needed a shared way to track decisions, active work, handoffs, and verification.
- **Solution:** Added seven development Markdown files using the LazyCow workflow as a reference and Final Build v1.5 as the Aether design authority.
- **Files:** `doc/context.md`, `doc/decisions.md`, `doc/handoff.md`, `doc/journal.md`, `doc/missions.md`, `doc/onboarding.md`, `doc/voice.md`.
- **Verified:** All seven files were present in the staged diff, the wording fixes were reviewed, and `git diff --cached --check` produced no output. `git status --short --branch` showed a clean `docs/setup` branch after the commit.
- **Commit:** `b548e14`

## 2026-11-26 — Record initial Aether docs checkpoint and add journal hook

- **Issue:** Aether needed automatic journal slots after commits and a checkpoint for the initial documentation.
- **Solution:** Recorded the initial docs checkpoint and added a post-commit hook that appends a journal slot with the commit date, subject, and hash.
- **Files:** `.githooks/post-commit`, `doc/handoff.md`, `doc/journal.md`, `doc/missions.md`.
- **Verified:** The staged whitespace check passed. After committing on Windows, the journal contained one new slot for `cff490f` with all four fill-in fields.
- **Commit:** `cff490f`

## 2026-11-26 — Document Aether team Git workflow

- **Issue:** (fill in)
- **Solution:** (fill in)
- **Files:** (fill in)
- **Verified:** (fill in)
- **Commit:** `439a58a`

## 2026-11-27 — Add Aether Command UI prototype

- **Issue:** (fill in)
- **Solution:** (fill in)
- **Files:** (fill in)
- **Verified:** (fill in)
- **Commit:** `32b2867`
