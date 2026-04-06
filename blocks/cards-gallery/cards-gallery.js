import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Moves all data-aue-* instrumentation attributes from one element to another.
 * Required so Universal Editor keeps track of components after DOM restructuring.
 * @param {Element} from - source element
 * @param {Element} to - target element
 */
function moveInstrumentation(from, to) {
  [...from.attributes].forEach((attr) => {
    if (attr.name.startsWith('data-aue-') || attr.name.startsWith('data-richtext-')) {
      to.setAttribute(attr.name, attr.value);
      from.removeAttribute(attr.name);
    }
  });
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    // Move UE instrumentation from the row div to the new li
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-gallery-card-image';
      else div.className = 'cards-gallery-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
