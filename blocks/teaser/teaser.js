import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'teaser-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'teaser-item';

    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    [...li.children].forEach((cell) => {
      if (cell.children.length === 1 && cell.querySelector('picture')) {
        cell.className = 'teaser-image';
      } else {
        cell.className = 'teaser-body';
        const link = cell.querySelector('.button-container a');
        if (link) {
          link.classList.add('teaser-cta');
        }
      }
    });

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]),
    );
  });

  block.replaceChildren(ul);
}
