import { site } from "@/lib/data";

/** Floating WhatsApp button, fixed bottom-right on every page. Mounted once in app/layout.tsx. */
export default function WhatsAppButton() {
  const msg = encodeURIComponent("Hi Bittu, I saw your portfolio and would like to talk about a project.");
  const href = `${site.person.whatsapp}?text=${msg}`;
  return (
    <a className="wa-fab" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with Bittu on WhatsApp">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M16.04 3C9.4 3 4 8.38 4 15.01c0 2.12.55 4.19 1.6 6.01L4 29l8.17-1.57a12.04 12.04 0 0 0 3.87.63h.01C22.68 28.06 28 22.68 28 16.05 28 9.4 22.68 3 16.04 3Zm0 22.03h-.01c-1.2 0-2.38-.32-3.4-.93l-.24-.15-4.85.93.97-4.72-.16-.25a9.97 9.97 0 0 1-1.53-5.3c0-5.5 4.5-9.97 10.03-9.97 5.52 0 10 4.47 10 9.98 0 5.5-4.48 10.41-10.01 10.41Zm5.5-7.5c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.13 4.53.72.31 1.28.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z"/>
      </svg>
      <span className="wa-tip" aria-hidden="true">Chat on WhatsApp</span>
    </a>
  );
}
