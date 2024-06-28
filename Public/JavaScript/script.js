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

  searchInput.forEach(function (li, index) {
    if (li.innerHTML != '..') {
      const songURL = './Public/Songs/' + li.innerHTML;
      arr.push(songURL);
    }
  });

  return arr;
}



// Function to handle fetching songs and populating the song list
async function cart() {
  const songs = await getSong();
  const b = document.getElementById('song_item');
  console.log(b);

  songs.forEach(function (song) {
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


  // let song_item = document.querySelectorAll('.info')




  // if (audio.pause) {
  //   song_item.forEach(function (elem) {
  //     elem.addEventListener('click', function () {
  //       console.log(elem.childNodes[1])
  //       console.log(elem.childNodes[2])
  //       console.log(elem.childNodes[3])
  //       elem.childNodes[5].innerHTML = `
  //       <p>Play Now </p>
  //      <ion-icon name="pause-circle-outline"></ion-icon>
  //     `
  //     })



  //   })

  //   // HandleSongInfo()




  // } else {



  //   song_item.forEach(function (elem) {
  //     elem.addEventListener('click', function () {
  //       console.log(elem.childNodes[1])
  //       console.log(elem.childNodes[2])
  //       console.log(elem.childNodes[3])
  //       elem.childNodes[5].innerHTML = `
  //       <p>Play Now </p>
  //       <ion-icon name="play-circle-outline"></ion-icon>
  //     `
  //     })



  //   })
  //   // HandleSongInfo()
  //   play()

  // }








  HandleSongInfo()

}



let HandleSongInfo = () => {

  const songInfo = document.querySelectorAll('.info');

  songInfo.forEach(function(song) {

    

    song.addEventListener('click', async function () {
      // alert()

      // console.log(song.innerHTML)



      const src = await song.childNodes[3].childNodes[1].innerHTML;
      audio.src = `/Public/Songs/${src}`;
      // console.log("stc", src)
      // console.log("dfsg", audio.src = `/Public/Songs/${src}`)
      play()
    
    });
  });



}




// Function to handle playing of audio
function play() {
  if (audio.play) {
    playBtn.style.display = 'none';

    pauseBtn.style.display = 'block';


    console.log("src ", audio.src)

    // if song Element Src in Blank the set Song
    if (!audio.src) {
      // console.log('gana nhi hain') 
      audio.src = "/Public/Songs/TU HAI KAHAN.m4a";
    }



    audioTracker()

    volumeEl.addEventListener('input', function () {
      console.log('Current volume:', this.value);






      //  audioTracker()

      if (this.value != audio.currentTime) {
        audio.currentTime = `${this.value}`;
      }







      // console.log("  g", audio.currentTime)


      // console.log(audio.currentTime)

      // console.log(audio.currentSrc)



    });







    console.log(audio);
    audio.play();
  }
}




// handle AudioTracker
let audioTracker = () => {
  // console.log(volumeEl.getAttribute('value'))

  // console.log(volumeEl.value)

  const x = setInterval(() => {
    volumeEl.value = audio.currentTime;
    volumeEl.max = audio.duration;
    // console.log(audio.currentTime)
    // console.log( audio.duration)



    if (audio.currentTime === audio.duration) {
      this.value = 0;

    }



  }, 1000);

  console.log(x)
}





//  0.2 => 20% volume
//  0.3 => 30% volume
//  0.4 => 40% volume
//  0.5 => 50% volume
//  0.6 => 60% volume



audio.volume = 0.7;


// Event listener for play button
playBtn.addEventListener('click', play);

// Event listener for pause button
pauseBtn.addEventListener('click', function () {
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
// const playMusic = async function (src) {
//   audio.setAttribute('src', '/Public/Songs/' + src);
//   return audio;
// }

// Main function to start the process
async function main() {


  audio.addEventListener('canplaythrough', async function (b) {
    console.log(b);
    const duration = audio.duration;
    console.log(audio.currentTime);
    console.log(audio.duration);
  });
}









let HandleToggle = () => {
  let Open_menu = document.getElementById('menu');
  let Close_menu = document.getElementById('close_menu')

  Open_menu.addEventListener('click', function () {



    document.getElementById('left').style.display = "flex";
    document.getElementById('right').style.width = "73%";
    document.getElementById('left').style.position = "absolute";
    document.getElementById('left').style.left = "0px"
    Open_menu.style.display = "none";
    Close_menu.style.display = "block"

  })


  console.log(Close_menu)

  Close_menu.addEventListener('click', function () {
    Open_menu.style.display = "block";
    Close_menu.style.display = "none"

    document.getElementById('left').style.display = "none";
    document.getElementById('right').style.width = "100%";
    document.getElementById('left').style.position = "absolute";
    document.getElementById('left').style.left = "0px"

    console.log("menu", menu)
    console.log(flag)

  })







}












main();
cart();
HandleToggle()
