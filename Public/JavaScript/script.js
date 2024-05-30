let audio =  new Audio();
let Song_container = document.getElementById('Song_container')
let PausedBtn = document.getElementById('pause')
let volumeEl = document.getElementById('volume')
let playBtn = document.getElementById('play')
let NextBtn = document.getElementById('next')

async function getSong() {
  let a = await fetch('http://127.0.0.1:5500/Public/Songs/')
  let response = await a.text()
  let div = document.createElement('div')
  div.innerHTML = response

  // Get an element by its ID
  let searchInput = await div.querySelectorAll('.name')

  let arr = []
  //    console.log(arr) // Export Array Function After Pushing item inside array
  searchInput.forEach(function (li, index) {
    if (li.innerHTML != '..') {
      //    console.log(index)
      // arr.push("./Public/Songs/" + li.innerHTML)
      let songURL = './Public/Songs/' + li.innerHTML
      arr.push(songURL)

      return index
    }
  })

  /** 
    
   Returning the song URLs from the getSong() function allows you to handle them in any Function
   function or any other part of your code. 

     
     */
   

  return arr
}


function play() {
  if (audio.play) {
    playBtn.style.display = 'none'
    PausedBtn.style.display = 'block'
    const x = setInterval(() => {
      console.log(audio.currentTime) // Log current time
      volumeEl.setAttribute('value', `${audio.currentTime}`)
      volumeEl.setAttribute('max', `${audio.duration}`)
      if (audio.currentTime === audio.duration) {
        volumeEl.setAttribute('value', `0`)
      }
      console.log(audio.duration) // Log duration
      // volumeEl.getAttribute('value').innerHTML = ; // Update volumeEl with current time
    }, 1000)
    console.log(audio)
    audio.play()

  }
}

async function cart() {
  let songs = await getSong()
  let b = document.getElementById('song_item')
  console.log(b)
  for (songs of songs) {
    b.innerHTML =
      b.innerHTML +
      `
   <div class="info">
  <div class="song_icon"><ion-icon name="musical-notes-outline"></ion-icon></div>
  <div class="song_detail flex flex-col ">
   <p>${songs.replace('./Public/Songs/', '')}
</p>

  </div>

  <div class="play_Now flex ">
    <p>Play Now </p>
    <ion-icon name="play-circle-outline"></ion-icon>
  </div>
</div> `
  }

  let songInfo = document.querySelectorAll('.info')

  songInfo.forEach(function (song) {
    // console.log()
    song.addEventListener('click', async function () {
      let src = await song.childNodes[3].childNodes[1].innerHTML
      let audio = await playMusic(src);

      console.log(audio.play)
      // audio.play()
      await play(audio)
      await pause(audio)


      //  let play = await  play(audio)
      // console.log(b)
    })
  })
}

playBtn.addEventListener('click',function(){

  playBtn.style.display = 'none'
  PausedBtn.style.display = 'block'
  audio.play()

})

PausedBtn.addEventListener('click',function(){

 audio.src = "/Public/Songs/Heropanti Raat Bhar   (1).m4a"
  playBtn.style.display = 'block'
  PausedBtn.style.display = 'none'
  audio.pause()

})


var index = 0

async function next() {
  // audio = new Audio(arr[1]);
  index++
  console.log(index)
  return index
}



let playMusic = async function (src) {
 audio.setAttribute('src', '/Public/Songs/' + src);
  return audio;
}

async function main() {
  let arr = await getSong()
  let index = 2
  let songs = await getSong()


 





  // let main = document.querySelector('main')
  audio.addEventListener('canplaythrough', async function (b) {
    console.log(b)
    let duration = audio.duration;


    console.log(audio.currentTime)
    console.log(audio.duration);
  })


}

main()
cart()