# Aether — Active Missions

Use these checklists to track work. A mission can pause while we investigate a bug or consider an idea. Record the resume point in [handoff.md](handoff.md) and keep completion claims tied to tests or commits.

Each mission can record status, owner, blocker, verification, and commit hash when available. Keep completed milestones for reference and mark superseded work with a link to the newer decision.

## Mission — Development documentation

**Status** — In progress. **Owner** — Irfan for the reported local setup.

- [x] Clone the GitHub repository on Irfan's Windows PC.
- [x] Check Git status and inventory. The reported main branch was clean and only README.md was tracked.
- [x] Draft and revise the seven starter documents against the LazyCow originals.
- [ ] Create the docs/setup branch, place the files in doc/, and review them.
- [ ] Confirm where the team can find the shared Final Build v1.5 copy.
- [ ] Commit and push the reviewed docs branch.
- [ ] Agree on boot generation and post-commit journal stubs before adding that tooling.

**Verification** — Confirm docs/setup, seven expected doc/ paths, working-tree status and the actual commit after review.

## Mission — First Windows workflow

**Status** — Planned. **Owners** — Confirm with the team.

**Goal** — Find a CSV by its contents, convert it into a new XLSX, open it in Calc and independently verify the workbook by Week 8. Confirm implementation order and owners with the team before the first coding batch.

- [ ] Use a small synthetic CSV with a distinctive phrase and an identifier such as 00127.
- [ ] Find the intended file in an approved folder and show the matching text. Test two similar matches.
- [ ] Convert the selected CSV and open the newly saved file in Calc.
- [ ] Verify the workbook separately from whether Calc opens it. Check expected cells, numeric types and the leading-zero identifier.
- [ ] Check the missing-app and existing-output cases. Report which steps succeeded and preserve existing files.

**Verification** — Reopen the output independently, compare expected values and identifiers, and check the exact workbook shown in Calc.

## Mission — Windows desktop adapter tests

**Status** — Planned. **Source** — Windows-Use research and the v1.5 execution contract.

- [ ] With two Notepad windows open, close the intended window after it is identified. Aether should leave the other window untouched and explain the stop.
- [ ] Try a dialog that stays open and a control that cannot be identified. Check bounded retries and a clear explanation of what remains.
- [ ] Run a clean Windows setup check with a teammate. Start the app and complete a small supported task.

The desktop cases were informed by the public [Windows-Use releases](https://github.com/Jeomon/Windows-Use/releases) and [fresh-install issue](https://github.com/Jeomon/Windows-Use/issues/11). These are proposed Aether tests. Windows-Use runtime behavior was not tested by this team in this review.


## Mission — Documentation hygiene

**Status** — Recurring.

- [ ] Update the handoff and mission state at checkpoints and after verified commits.
- [ ] Resolve pending journal stubs using the commit diff and test evidence.
- [ ] Consider archiving the journal at roughly 500 lines and the decision log at roughly 200 entries. Keep older records searchable.
- [ ] Check generated boot size once the boot tooling exists. Use the thresholds in [voice.md](voice.md).
