const videoPlayer = document.getElementById('video-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const volumeSlider = document.getElementById('volume-slider');

playPauseBtn.addEventListener('click', () => {
  if (videoPlayer.paused || videoPlayer.ended) {
    videoPlayer.play();
    playPauseBtn.innerHTML = 'Pause';
  } else {
    videoPlayer.pause();
    playPauseBtn.innerHTML = 'Play';
  }
});

stopBtn.addEventListener('click', () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  playPauseBtn.innerHTML = 'Play';
});

volumeSlider.addEventListener('input', () => {
  videoPlayer.volume = volumeSlider.value;
});

videoPlayer.addEventListener('error', () => {
  alert('Error: no se puede cargar el archivo de video.');
});

videoPlayer.addEventListener('waiting', () => {
  alert('Cargando el archivo de video, por favor espera...');
});

const mediaSource = new MediaSource();

mediaSource.addEventListener('sourceopen', () => {
  const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
  const videoUrl = 'https://github.com/sampi-a/video-assignment/blob/437ce1285f91b4c2313acdd373e6499f7f080e65/video.mp4';

  fetch(videoUrl)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      sourceBuffer.appendBuffer(arrayBuffer);
    })
    .catch(error => {
      console.log(error);
      alert('Error al cargar el archivo de video.');
    });
});

videoPlayer.src = URL.createObjectURL(mediaSource);
