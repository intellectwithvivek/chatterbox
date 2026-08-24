'use client'

import { useSyncExternalStore } from 'react'

/**
 * Two things this template needs from the browser that the server cannot
 * know. Both are read through `useSyncExternalStore` rather than
 * `useState` + `useEffect`: it takes an explicit server snapshot, so the
 * hydration render matches the server HTML by construction, and it costs one
 * re-render instead of a state update cascading out of an effect.
 */

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches

/** Server-renders as `false`, then tracks the media query live. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
}

/** Never fires: "has this hydrated" changes exactly once, and not from a store. */
const subscribeNever = () => () => {}

/**
 * `false` for the server render and the hydration render, `true` afterwards.
 * Use it to swap in a value that must not differ between the two.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  )
}
