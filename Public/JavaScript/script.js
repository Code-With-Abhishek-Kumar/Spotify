// Create audio element
const audio = new Audio();

// Get DOM elements
const songContainer = document.getElementById('Song_container');
const pauseBtn = document.getElementById('pause');
const volumeEl = document.getElementById('volume');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Function to fetch songs asynchronously
async function getSong() {
  const response = await fetch('http://127.0.0.1:5500/Public/Songs/');
  const text = await response.text();
  const div = document.createElement('div');
  div.innerHTML = text;

  const searchInput = div.querySelectorAll('.name');
  const arr = [];

  searchInput.forEach(function(li, index) {
    if (li.innerHTML != '..') {
      const songURL = './Public/Songs/' + li.innerHTML;
      arr.push(songURL);
    }
  });

  return arr;
}

// Function to handle playing of audio
function play() {
  if (audio.play) {
    playBtn.style.display = 'none';
    
    pauseBtn.style.display = 'block';
    volumeEl.addEventListener('input', function() {
      console.log('Current volume:', this.value);
    


      if (this.value != audio.currentTime) {
        audio.currentTime = `${this.value}`;
      }

     console.log( "  g" , audio.currentTime)
     


      console.log(audio.currentTime)
      
      console.log(audio.currentSrc)

      const x = setInterval(() => {
        this.value = audio.currentTime;
        // console.log(audio.currentTime , this.value);


        // if (audio.currentTime === 0) {
        //   this.value = 0;
        // }

        if (audio.currentTime === audio.duration) {
          this.value = 0;
          
        }
  
  
        
      }, 1000);

      

  
    });


  


  

    console.log(audio);
    audio.play();
  }
}

// Function to handle fetching songs and populating the song list
async function cart() {
  const songs = await getSong();
  const b = document.getElementById('song_item');
  console.log(b);

  songs.forEach(function(song) {
    b.innerHTML +=
      `
   <div class="info">
      <div class="song_icon"><ion-icon name="musical-notes-outline"></ion-icon></div>
      <div class="song_detail flex flex-col ">
         <p>${song.replace('./Public/Songs/', '')}</p>
      </div>
      <div class="play_Now flex ">
         <p>Play Now </p>
         <ion-icon name="play-circle-outline"></ion-icon>
      </div>
   </div>`;
  });

  const songInfo = document.querySelectorAll('.info');

  songInfo.forEach(function(song) {
    song.addEventListener('click', async function() {
      const src = await song.childNodes[3].childNodes[1].innerHTML;
      const audio = await playMusic(src);
      volumeEl.setAttribute('value', `0`);
      console.log(volumeEl.getAttribute('value'))

      console.log(volumeEl.value)
      
      const x = setInterval(() => {
        volumeEl.value = audio.currentTime;
        volumeEl.max = audio.duration;
        console.log(audio.currentTime)
      

        if (audio.currentTime === audio.duration) {
          this.value = 0;
          
        }
  
  
        
      }, 1000);

  
      // volumeEl.setAttribute('value', `0`);
      // if (condition) {
        
      // }

      console.log(audio.play);
      await play(audio);
      await pause(audio);
    });
  });
}

// Event listener for play button
playBtn.addEventListener('click', function() {
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
  audio.play();
});

// Event listener for pause button
pauseBtn.addEventListener('click', function() {
  playBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
  audio.pause();
});

// Function to play the next song
let index = 0;
async function next() {
  index++;
  console.log(index);
  return index;
}

// Function to set audio source and return audio element
const playMusic = async function(src) {
  audio.setAttribute('src', '/Public/Songs/' + src);
  return audio;
}

// Main function to start the process
async function main() {
  const arr = await getSong();
  let index = 2;
  const songs = await getSong();

  audio.addEventListener('canplaythrough', async function(b) {
    console.log(b);
    const duration = audio.duration;
    console.log(audio.currentTime);
    console.log(audio.duration);
  });
}

// Call main and cart functions
main();
cart();
