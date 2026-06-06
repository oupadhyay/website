// rehype-mermaid-pre.mjs — Lightweight rehype plugin that rewrites fenced
// ```mermaid code blocks into <pre class="mermaid"> elements for client-side
// rendering. Pairs with `markdown.syntaxHighlight.excludeLangs: ['mermaid']`
// so Shiki leaves these blocks as plain <pre><code class="language-mermaid">.
//
// Unlike rehype-mermaid, this does NOT pull in mermaid-isomorphic/Playwright,
// so the build needs no headless browser.
export default function rehypeMermaidPre() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        const code =
          child.type === 'element' &&
          child.tagName === 'pre' &&
          child.children?.length === 1 &&
          child.children[0].type === 'element' &&
          child.children[0].tagName === 'code'
            ? child.children[0]
            : null;

        const className = code?.properties?.className;
        const isMermaid = Array.isArray(className) && className.includes('language-mermaid');

        if (code && isMermaid) {
          const value = code.children.map((c) => (c.type === 'text' ? c.value : '')).join('');
          return {
            type: 'element',
            tagName: 'pre',
            properties: { className: ['mermaid'] },
            children: [{ type: 'text', value }],
          };
        }

        walk(child);
        return child;
      });
    };
    walk(tree);
    return tree;
  };
}
