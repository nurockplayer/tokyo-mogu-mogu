/**
 * Shared conversational UI primitives (Issue #217 Phase 1).
 *
 * The persistent dietary Food Profile reads as a LINE / ChatGPT-style
 * conversation: MOGU messages use embedded quick replies and the user's
 * selections stay in the transcript. Per-trip diagnosis is intentionally a
 * separate screen flow and does not render through these chat primitives.
 *
 * Presentation classes come from the shared `fp-convo-*` vocabulary in
 * onboarding.css / FoodProfilePage.css (Figma conversation parity).
 */
import type { ReactNode } from 'react';

/** One line in the chat transcript: an assistant message or a user reply. */
export interface ChatItem {
  id: string;
  role: 'assistant' | 'user';
  children: ReactNode;
}

/**
 * LINE/ChatGPT-like reveal motion (Issue #230): a newly appended assistant turn
 * settles near the viewport bottom with a small breathing gap, so older turns
 * scroll up naturally and the next question appears to enter from below. Tall
 * turns (e.g. Taste + Theme) still open from their top, cleared below the
 * sticky prototype shell bar (~116px).
 */
export function scrollTurnIntoView(node: HTMLElement, behavior: ScrollBehavior): void {
  const rect = node.getBoundingClientRect();
  const viewport = window.innerHeight;
  const headerClearance = 72;
  if (rect.height <= viewport * 0.6) {
    const targetY = window.scrollY + rect.bottom - viewport + 16;
    window.scrollTo({ top: Math.max(targetY, 0), behavior });
  } else {
    const targetY = window.scrollY + rect.top - headerClearance;
    window.scrollTo({ top: Math.max(targetY, 0), behavior });
  }
}

/**
 * Renders the accumulated conversation history in order. Assistant messages
 * show the MOGU avatar; user messages are right-aligned confirmation bubbles.
 */
export function ChatTranscript({ items }: { items: ChatItem[] }) {
  return (
    <div className="fp-chat">
      {items.map((item) => (
        <div key={item.id} className={`fp-convo__msg fp-convo__msg--${item.role}`}>
          {item.role === 'assistant' ? (
            <span className="fp-convo__avatar" aria-hidden="true">
              🌿
            </span>
          ) : null}
          <div className="fp-convo__bubble">{item.children}</div>
        </div>
      ))}
    </div>
  );
}

/** Assistant question bubble: title (optionally with a body under it). */
export function AssistantQuestion({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <>
      <p className="fp-convo__q">{title}</p>
      {body ? <p className="fp-convo__body">{body}</p> : null}
    </>
  );
}

/** Assistant plain message: title + body (welcome / summary rhythm). */
export function AssistantMessage({ title, body }: { title: string; body?: string }) {
  return (
    <>
      <p className="fp-convo__title">{title}</p>
      {body ? <p className="fp-convo__body">{body}</p> : null}
    </>
  );
}
