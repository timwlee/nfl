import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';

export default function decorate(block) {
  const anchor = block.querySelector('a');
  const audioUrl = anchor ? anchor.href : 'https://pnamadobe.github.io/nfl-brand-guidelines/nfl-theme-music.mp3';
  const label = anchor ? anchor.textContent.trim() : 'PLAY THEME';

  block.innerHTML = '';

  const waveDiv = document.createElement('div');
  waveDiv.id = 'waveform';

  const btn = document.createElement('button');
  btn.className = 'btn-play';
  btn.textContent = label;

  block.appendChild(waveDiv);
  block.appendChild(btn);

  const wavesurfer = WaveSurfer.create({
    container: waveDiv,
    waveColor: '#333',
    progressColor: '#0085ca',
    cursorColor: '#d50a10',
    barWidth: 3,
    height: 120,
    url: audioUrl,
  });

  btn.addEventListener('click', () => {
    wavesurfer.playPause();
    btn.textContent = wavesurfer.isPlaying() ? 'PAUSE' : label;
  });

  wavesurfer.on('finish', () => {
    btn.textContent = label;
  });
}
