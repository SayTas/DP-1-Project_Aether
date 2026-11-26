# Aether — Decision Log

Append decisions in date order. Preserve old entries to keep the rationale for choices and reversals visible. When a decision changes, add a new entry with a **Supersedes** reference and mark the earlier entry's status. Update the design baseline when the team agrees to change release scope.

## Entry format

Use a dated title and record **Decision**, **Alternatives considered**, **Why**, **Consequence**, and **Status**. Include affected paths, a mission or test, and a commit when available. Capture why a rejected or failed approach was set aside so a new session can make an informed choice if conditions change.

## 2026-11-26 · Use Final Build v1.5 for scope and design

- **Decision** — Use the Final Build Guide v1.5 as the agreed authority. Use the derived guides for explanation and the SRS for traceability after checking it against the baseline.
- **Drafting rationale** — Resolve conflicts case by case using the derived guides and SRS. That could give the same question different answers.
- **Why** — The team designated the comprehensive build guide as authoritative and flagged possible SRS drift.
- **Consequence** — Log conflicts and confirm scope changes with the team. See the copy verification item in [handoff.md](handoff.md).

- **Status** — Active.

## 2026-11-26 · Keep development records in doc/

- **Decision** — Keep architecture, decisions, missions, handoff, commit history and team working guidance in seven small Markdown files beside the root README.
- **Drafting rationale** — Keep session state in chat or in one omnibus document. Both make it harder to locate a particular decision or commit.
- **Why** — A teammate can resume interrupted work and trace a verified change back to its rationale and commit.
- **Consequence** — Update the file that owns each fact. Keep the handoff brief. Review the source documents before wiring the boot generator and journal hook.
- **Status** — Active. Tooling is pending.
