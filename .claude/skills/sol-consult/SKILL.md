---
name: sol-consult
description: >
  Consult Sol (GPT-5.6 Sol via the Codex CLI) as an advisory reasoning resource
  when CLAUDE.md's Sol escalation policy requires it. Sol is read-only and never
  takes over implementation. Use only for the escalation cases defined in
  CLAUDE.md; do not invoke for routine work.
---

# Sol Consultation

Sol is a selective, advisory reasoning resource invoked **only** when the Sol
escalation policy in `CLAUDE.md` ("Model Routing and Sol Escalation") requires
it. This skill does not restate that policy; read the policy before invoking.

## Invocation mechanism

Sol is consulted via the local Codex CLI with the `gpt-5.6-sol` model. This is
the mechanism currently verified in this environment, not a permanently
exclusive one — if it becomes unavailable, treat that as an environment
capability gap and surface it rather than assuming it is permanent:

```bash
codex exec -s read-only -m gpt-5.6-sol "<escalation packet>"
```

- `-s read-only` is **mandatory**: Sol must never modify files, commit, or push.
- `-m gpt-5.6-sol` selects the Sol model. Do not invent another model id.
- Run from the repository root so Sol has the same working directory context.
- `--ephemeral` is optional; use it for throwaway consultations you will not
  resume. Without it the session is persisted under `~/.codex/` for tracing.
- Use `codex exec -h` to confirm the exact flags supported by the installed CLI
  before invoking; do not assume flag availability.
- `codex exec` prints hook/deprecation noise before Sol's answer; Sol's actual
  consultation reply is the final text block of the output.

If `codex` is not installed, or authentication is missing or expired, stop and
report the exact missing capability and the smallest authentication recovery
step. For ChatGPT-managed authentication, start with `codex login` (or
`codex login --device-auth` when appropriate) and confirm current options with
`codex --help`. Do not assume a fixed authentication lifetime, and do not
fabricate a Sol response.

## Advisory contract

- Sol returns reasoning, a plan, or debugging guidance only. It does not
  implement.
- Sol must not create, edit, or delete any file, and must not run git
  write commands. The mandatory `read-only` sandbox constrains repository
  writes during the consultation.
- After Sol answers, the implementing model (`deepseek-v4-flash`) resumes
  implementation and verification. Control always returns to the implementer.

## Escalation packet

Send the smallest useful context, per CLAUDE.md. Suggested shape:

```text
Context: <issue goal and relevant acceptance criteria, one or two lines>
Constraint: <repository / Spec constraints that bind the decision>
Inspected: <files or areas already inspected>
Evidence: <current understanding and what was tried>
Question: <the exact uncertainty or blocking decision>
Options: <candidate approaches, if known>
Answer: <prefer one of: architecture decision / debugging hypothesis /
implementation strategy / contract clarification / risk analysis>
```

## Dry-run record

Verified with a read-only dry-run in this environment: `codex exec
-s read-only -m gpt-5.6-sol` returned a usable response without modifying any
repository file.

## Notes

- Never call Sol automatically for routine work. The trigger is always the
  CLAUDE.md escalation policy.
- Do not duplicate or extend the escalation rules here; keep CLAUDE.md as the
  single source of truth for *when* to escalate, and this skill for *how*.
