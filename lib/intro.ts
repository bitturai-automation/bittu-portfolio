/** Remembers (per browser tab, in memory) whether the opening intro has already had its chance to play,
 *  so it only plays on the first page load and not every time someone clicks back to Home. */
/* The opening splash is switched off (not rendered in app/page.tsx), so this starts as true: the hero and nav animate in straight away instead of waiting for it. */
export const intro = { played: true };
