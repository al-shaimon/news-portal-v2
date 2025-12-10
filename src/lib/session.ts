'use client';

export type TokenBundle = {
  accessToken: string | null;
  refreshToken?: string | null;
};

const STORAGE_KEY = 'newsportal:session';

export function persistTokens(tokens: TokenBundle) {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify(tokens);
  localStorage.setItem(STORAGE_KEY, payload);
}

export function getInitialTokens(): TokenBundle | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TokenBundle;
  } catch (error) {
    console.warn('Unable to parse stored session', error);
    return null;
  }
}

export function removeTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
