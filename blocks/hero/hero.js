export default function decorate(block) {
  const hero = document.createElement('div');
  hero.className = 'hero';

  let picture;
  const content = document.createElement('div');
  content.className = 'hero-content';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const pic = cell.querySelector('picture');
      if (pic) {
        picture = pic;
      } else {
        while (cell.firstElementChild) {
          content.append(cell.firstElementChild);
        }
      }
    });
  });

  if (picture) {
    hero.append(picture);
  }
  hero.append(content);

  block.textContent = '';
  block.append(hero);
}
