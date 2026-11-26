/* eslint-disable @next/next/no-img-element */
/**
 * BitttuDesigner logo (brand board): B icon + "BitttuDesigner" wordmark, optional tagline lockup
 * ("Design | UI/UX | Vibe Code | Create").
 * tone="light" is for navy backgrounds (navy parts turned white); tone="dark" is for white backgrounds.
 * With tagline, the tagline lockup is used at every screen size (the plain lockup stays in the DOM, hidden, as a fallback).
 */
export default function Logo({ tone = "light", tagline = false, className = "" }: { tone?: "light" | "dark"; tagline?: boolean; className?: string }) {
  const suffix = tone === "light" ? "-light" : "";
  const plain = `/img/logo-full${suffix}.png`;
  const tagged = `/img/logo-full-tagline${suffix}.png`;
  return (
    <span className={`logo logo-${tone}${tagline ? " logo-tl" : ""} ${className}`}>
      {tagline ? (
        <>
          <img className="logo-full logo-with-tag" src={tagged} alt="BitttuDesigner: Design, UI/UX, Vibe Code, Create" width={2169} height={517} decoding="async" />
          <img className="logo-full logo-no-tag" src={plain} alt="BitttuDesigner logo" width={2169} height={517} decoding="async" />
        </>
      ) : (
        <img className="logo-full" src={plain} alt="BitttuDesigner logo" width={2169} height={517} decoding="async" />
      )}
    </span>
  );
}
