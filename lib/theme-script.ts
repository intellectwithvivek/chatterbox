/**
 * Pre-paint theme script.
 *
 * VivekUI exports `createThemeScript()`, but it lives in the same
 * `'use client'` module as `ThemeProvider`, so a server component cannot call
 * it. The snippet below is the same contract, written out here so the root
 * layout can inline it in `<head>` and the first paint is already correct.
 *
 * It must stay in step with the provider: same storage key, same attribute,
 * same default. Both are public API (`DEFAULT_STORAGE_KEY`,
 * `DEFAULT_THEME_ATTRIBUTE`), so they only change on a major version.
 */

const STORAGE_KEY = 'vk-theme'
const ATTRIBUTE = 'data-theme'
const DEFAULT_THEME = 'dark'

export const themeScript = `!function(){try{var s=localStorage.getItem("${STORAGE_KEY}"),t=s==="light"||s==="dark"||s==="system"?s:"${DEFAULT_THEME}",r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t,e=document.documentElement;e.setAttribute("${ATTRIBUTE}",r);e.style.colorScheme=r}catch(_){}}()`
