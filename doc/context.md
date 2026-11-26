# Aether — Project Blueprint & Development Context

## 1. Product goals and design baseline

**Aether Final Build Guide v1.5** governs agreed scope, architecture and acceptance. The AI Development Context and User Guide explain that baseline. Consult the SRS for requirements traceability and flag any disagreement against v1.5.

This draft uses the fuller v1.5 guide dated 20 November 2026 as its working reference. See [handoff.md](handoff.md) for the open task to confirm the shared copy.

Aether is a local-first Windows assistant. A user can find a local file by what it contains, ask Aether to perform a supported task with it, check what actually happened and save an eligible successful workflow for reuse. The Week 8 example is to find a CSV by its contents, convert it to XLSX, open it in Calc and independently verify the workbook.

## 2. Technical stack and architecture

Final Build v1.5 describes a bounded local planner, a capability registry, a validating runtime, and independent outcome checks. Windows UI Automation and managed Chromium provide different ways to inspect applications. OCR supplies readable text where needed. The reference Windows setup, local model choice and library versions need evidence from development tests.

Follow a request through intent, proposed plan, validation, adapter, verification and run history. Check permissions and target identity before effects, re-observe unexpected dialogs or changed focus, and record partial results when a later step fails.

## 3. Repository layout

The last verified Git inventory listed README.md. The prepared documentation bundle contains doc/. See [handoff.md](handoff.md) for the current state of the local setup. The build guide suggests a future code/ tree for UI, runtime, adapters, retrieval, planners, storage and tests. Check actual Git paths before giving edits or commands.

## 4. Codebase registry and module responsibilities

| Area | Why it exists | Responsibility |
|---|---|---|
| Retrieval | People remember what was in a file more often than its exact name. | Search approved folders and return candidates with matched text, page or image region. Surface ambiguity and skipped sources. |
| Planning | A fresh request can combine supported operations in a new order. | Turn the request into a proposed plan using registered operations and typed inputs. Ask when a decision cannot be made from available evidence. |
| Runtime | The team needs one place to enforce permissions and check the outcome. | Validate operation, input, target and permission. Dispatch a supported adapter, record what happened and verify the result. |
| Adapters | Files, Windows apps and browser pages expose different ways to act. | Execute one declared operation against the intended target. Report effects, unavailable capabilities and evidence for verification. |
| Storage | Search and repeatable workflows need persistent local records. | Persist search records, versioned routines and run evidence under the v1.5 privacy and retention rules. |
| User interface | The user needs to see what Aether found, changed or needs help with. | Show search evidence, choices, approvals, progress, partial results and routine controls. |

These are responsibilities to map to actual code paths as they land. The last verified Git inventory listed only README.md. Earlier CLI demonstrations are prototype evidence outside this checked repo state.

As modules land, add the actual path, purpose, inputs, outputs, dependencies, main entry point, and evidence for supported behavior. Link to the relevant decision or mission and record compatibility constraints a future edit needs to preserve.

## 5. Development and build instructions

For the current docs phase, run Git commands from the repository root in the stated shell. Once the app skeleton lands, add the verified Windows setup, run and test commands here. Record required app versions and the Windows environment used for each integration check.

## 6. Engineering practices

- Explain the user outcome first. For each operation, state preconditions, permitted effects, success evidence and a failure test.
- Use representative synthetic fixtures. Verify saved output contents and application state independently.
- Check current Git evidence when reopening a session. Preserve compatibility and privacy commitments from the v1.5 baseline.

## 7. Current status and roadmap

The first Windows milestone and the documentation setup are tracked in [missions.md](missions.md). Record the exact resume point in [handoff.md](handoff.md). Update this blueprint when a module boundary or engineering practice changes.

See [missions.md](missions.md) for development status, [decisions.md](decisions.md) for rationale and [journal.md](journal.md) for commit evidence.
