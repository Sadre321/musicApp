const musicList = [
    {musicName:'Dolu Kadehi Ters Tut - Madem',file:'DoluKadehiTersTut Madem.mp3',img:'doluKadeh.jpg'},
    {musicName:'Edis - Dudak',file:'EdisDudak.mp3',img:'edis.jpg'},
    {musicName:'Edis - Ariyorum',file:'EdisArıyorum.mp3',img:'edis.jpg'},
    {musicName:'Gokhan Turkmen - Tas',file:'GökhanTürkmenTaş.mp3',img:'gokhanTurkmen.jfif'},
]

let musicId = 0;
let currentMusic = musicList[musicId];
var audio;

let MusicDetails = document.querySelector('.music-details');
let image = document.getElementById('singerImg');
let timeValue = document.querySelector('.timeValue');
let musicLenght = document.querySelector('.musicLenght');

const playerBtn = document.querySelector('.fa-play');
let range = document.getElementById('range');

function showMusic(){
    MusicDetails.innerHTML = currentMusic.musicName;
    image.src = 'img/' + currentMusic.img;
    audio = new Audio('audio/' + currentMusic.file);

    audio.addEventListener('loadedmetadata',()=>{
        musicLenght.innerHTML = calculateTime(audio.duration);
        range.max = Math.floor(audio.duration);
    });

    audio.addEventListener('timeupdate',()=>{
        range.value = Math.floor(audio.currentTime);
        timeValue.textContent = calculateTime(range.value);
    })
}

function calculateTime(toplamSaniye){
    const dk = Math.floor(toplamSaniye/60);
    const sn = Math.floor(toplamSaniye%60);
    const guncellenenSaniye = sn<10 ?`0${sn}`:`${sn}`;
    const sonuc = `${dk}:${guncellenenSaniye}`;
    return sonuc;
}

document.querySelector('.fa-forward-step').addEventListener('click',()=>{
    audio.pause();
    playerBtn.classList.add('fa-play');
    playerBtn.classList.remove('fa-pause');
    if(musicId >= musicList.length - 1){
        musicId = 0;
        currentMusic = musicList[musicId];
    }else{
        musicId += 1;
        currentMusic = musicList[musicId];
    }
    
    showMusic();

});

document.querySelector('.fa-backward-step').addEventListener('click',()=>{
    audio.pause();
    playerBtn.classList.add('fa-play');
    playerBtn.classList.remove('fa-pause');
    if(musicId == 0){
        musicId = musicList.length - 1;
        currentMusic = musicList[musicId];
    }else{
        musicId--;
        currentMusic = musicList[musicId];
    }
    showMusic();

});

playerBtn.addEventListener('click',()=>{
    if(playerBtn.classList.contains('fa-play')){
        audio.play();
        playerBtn.classList.remove('fa-play');
        playerBtn.classList.add('fa-pause');
    }else{
        audio.pause();
        playerBtn.classList.add('fa-play');
        playerBtn.classList.remove('fa-pause');
    }
});

showMusic();