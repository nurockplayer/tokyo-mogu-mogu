/**
 * Shared conversational UI primitives (Issue #217 Phase 1).
 *
 * The guided prototype reads as a LINE / ChatGPT-style conversation: MOGU
 * (assistant) messages with embedded quick replies, and the user's selected
 * choices appended as confirmation bubbles that stay in the transcript. The
 * Food Profile and Exploration conversations both render through these
 * primitives so the chat rhythm and the 46px-scale touch affordance stay
 * consistent across the journey.
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
