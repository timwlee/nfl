export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  rows.forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    if (cols.length < 2) return;

    const name = cols[0].textContent.trim();
    const hex = cols[1].textContent.trim();

    // Build swatch card
    row.innerHTML = '';
    row.classList.add('swatch-card');

    const swatchEl = document.createElement('div');
    swatchEl.classList.add('swatch-color');
    swatchEl.style.background = hex;

    const infoEl = document.createElement('div');
    infoEl.classList.add('swatch-info');

    const nameEl = document.createElement('span');
    nameEl.classList.add('swatch-name');
    nameEl.textContent = name;

    const hexEl = document.createElement('small');
    hexEl.classList.add('swatch-hex');
    hexEl.textContent = hex;

    infoEl.append(nameEl, hexEl);
    row.append(swatchEl, infoEl);
  });
}
