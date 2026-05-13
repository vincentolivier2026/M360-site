import { toHTML } from '@portabletext/to-html';

type PortableTextBlock = Parameters<typeof toHTML>[0];

/**
 * Convertit un tableau de blocs Portable Text en HTML prêt pour set:html.
 * Gère : titres (h2/h3), paragraphes, gras, italique, listes, liens, images, citations.
 */
export function portableTextToHtml(blocks: PortableTextBlock): string {
  if (!blocks) return '';

  return toHTML(blocks, {
    components: {
      types: {
        image: ({ value }) => {
          const url = value?.asset?.url;
          if (!url) return '';
          const alt = value?.alt ?? '';
          const caption = value?.caption ?? '';
          return `<figure>
            <img src="${url}" alt="${alt}" loading="lazy" decoding="async" />
            ${caption ? `<figcaption>${caption}</figcaption>` : ''}
          </figure>`;
        },
      },
      marks: {
        link: ({ children, value }) => {
          const href = value?.href ?? '#';
          const target = value?.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
          return `<a href="${href}"${target}>${children}</a>`;
        },
      },
    },
  });
}
