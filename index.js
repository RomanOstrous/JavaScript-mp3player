const audio = document.getElementById("audio");
const trackTitle = document.querySelector(".track-title");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const volumeIcons = document.querySelectorAll(".volume img");
const playlistEl = document.getElementById("playlist");

const tracks = [
  { 
    name: "Ghost - mary on a cross", 
    src: "tracks/ghost-mary-on-a-cross-mp3.mp3" 
  },
  {
    name: "Harry Styles - As It Was",
    src: "tracks/Harry Styles - As It Was.mp3",
  },
  {
    name: "My way - Calvin Harris",
    src: "tracks/My way - Calvin Harris.mp3",
  },
    { name: "coffee for your head", 
    src: "tracks/powfu-death-bed-coffee-for-your-head.mp3" 
  },
  { name: "Queen-Dont Stop Me Now", 
    src: "tracks/Queen_Dont_Stop_Me_Now_saundtrek_z_reklami_Baltika_7_ta_mp3top100.mp3" 
  },
];


let currentTrackIndex = 0;

function setPlayList() {
  playlistEl.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.addEventListener("click", () => {
      loadTrack(index);
      playTrack();
    });
    if (index === currentTrackIndex) {
      li.classList.add("active");
    }
    playlistEl.append(li);
  });
}

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  audio.load();
  currentTrackIndex = index;
  setPlayList();
  trackTitle.textContent = track.name;
}

function playTrack() {
  audio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

function pauseTrack() {
  audio.pause();
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

function stopTrack() {
  audio.pause();
  audio.currentTime = 0;
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function updateProgressBar() {
  const { currentTime, duration } = audio;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function seekTrack() {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
}

function updateVolume(volume) {
  audio.volume = volume;
  volumeIcons.forEach((icon, index) => {
    if (volume < 0.01) {
      icon.style.display = index === 0 ? "inline" : "none";
    } else if (volume > 0.01 && volume <= 0.5) {
      icon.style.display = index === 1 ? "inline" : "none";
    } else {
      icon.style.display = index === 2 ? "inline" : "none";
    }
  });
}

audio.addEventListener("ended", nextTrack);
audio.addEventListener("timeupdate", updateProgressBar);
playBtn.addEventListener("click", playTrack);
pauseBtn.addEventListener("click", pauseTrack);
stopBtn.addEventListener("click", stopTrack);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);
progressBar.addEventListener("input", seekTrack);
volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value;
  updateVolume(volume);
});

loadTrack(currentTrackIndex);
setPlayList();
updateVolume(volumeSlider.value);
