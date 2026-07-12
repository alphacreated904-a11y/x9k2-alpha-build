import DOMPurify from "dompurify";

/**
 * Cleans HTML pasted from Word / Google Docs / websites before it's saved
 * as a product description.
 *
 * Why this is needed:
 * Pasted HTML usually carries inline `style="font-size:...; font-family:..."`
 * attributes on every tag. Inline styles win over our Tailwind "prose"
 * classes, so headings/paragraphs all render the same flat size no matter
 * what tag they actually are. Stripping the inline styles (and other paste
 * junk like class names, ids, and empty spans) lets the site's own
 * typography (prose-h2, prose-p, etc. in ProductDetail.tsx) take over, so
 * the content renders cleanly and consistently.
 */
export function sanitizeDescriptionHtml(dirtyHtml: string): string {
  const clean = DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4",
      "p", "br", "hr",
      "strong", "b", "em", "i", "u",
      "ul", "ol", "li",
      "a",
      "table", "thead", "tbody", "tr", "th", "td",
      "blockquote", "code", "pre", "span", "div",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"], // no style / class / id kept
  });

  // DOMPurify already drops disallowed attributes, but some browsers'
  // paste output wraps everything in redundant <span>/<div> with no
  // attributes left — collapse those so they don't add empty lines.
  const container = document.createElement("div");
  container.innerHTML = clean;

  const unwrapEmptyWrapper = (el: Element) => {
    if (
      (el.tagName === "SPAN" || el.tagName === "DIV") &&
      el.attributes.length === 0
    ) {
      const parent = el.parentNode;
      if (!parent) return;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
    }
  };

  container.querySelectorAll("span, div").forEach(unwrapEmptyWrapper);

  return container.innerHTML.trim();
}
