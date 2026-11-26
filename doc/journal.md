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

No development commits have been entered here yet. The first docs entry will use the actual documentation commit hash.
