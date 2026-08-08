import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { clearDiagnosisAnswers, loadDiagnosisAnswers, saveDiagnosisAnswers } from './session';
import { createDefaultAnswers } from '../../lib/diagnosis';

/** Minimal in-memory sessionStorage shim (vitest env is node). */
class MemorySessionStorage implements Storage {
  private store = new Map<string, string>();
  get length() {
    return this.store.size;
  }
  clear() {
    this.store.clear();
  }
  getItem(key: string) {
    return this.store.get(key) ?? null;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  setItem(key: string, value: string) {
    this.store.set(key, String(value));
  }
}

const originalSessionStorage = globalThis.sessionStorage;

beforeEach(() => {
  globalThis.sessionStorage = new MemorySessionStorage() as unknown as Storage;
});

afterAll(() => {
  globalThis.sessionStorage = originalSessionStorage;
});

describe('diagnosis session persistence (#43)', () => {
  it('round-trips saved answers through sessionStorage', () => {
    const answers = createDefaultAnswers();
    saveDiagnosisAnswers(answers);
    expect(loadDiagnosisAnswers()).toEqual(answers);
  });

  it('returns null when nothing is stored', () => {
    expect(loadDiagnosisAnswers()).toBeNull();
  });

  it('returns null for corrupted data', () => {
    sessionStorage.setItem('tmm:diagnosis:v1', '{not json');
    expect(loadDiagnosisAnswers()).toBeNull();
  });

  it('clearDiagnosisAnswers removes the persisted diagnosis (demo reset)', () => {
    saveDiagnosisAnswers(createDefaultAnswers());
    expect(loadDiagnosisAnswers()).not.toBeNull();
    clearDiagnosisAnswers();
    expect(loadDiagnosisAnswers()).toBeNull();
    expect(sessionStorage.getItem('tmm:diagnosis:v1')).toBeNull();
  });
});
