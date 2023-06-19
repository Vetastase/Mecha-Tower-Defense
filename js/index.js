//document.getElementById('game-board').style.display = 'none';
const myCanvas = document.getElementById("mecha-canvas");
const ctx = myCanvas.getContext("2d");

let myGame;
let myTower;
let isGameOver;
let buttonEL = document.querySelector("#play-again");
let frames = 0;
let bulletsArray = [];
let realScore = 0
let score = document.getElementById("score")

class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = myCanvas.width;
    this.height = myCanvas.height;
    this.img = "./images/gamemap.png";
  }

  drawBackground() {
    const backgroundImg = new Image();
    backgroundImg.src = this.img;
    ctx.drawImage(backgroundImg, this.x, this.y, this.width, this.height);
  }
}

const newbackground = new Background();

class Mecha {
  constructor(x, y) {
    this.width = 100;
    this.height = 100;
    // insert properties/keys after known properties/keys to show up in the constructor
    this.x = x;
    this.y = y;
    this.img = "./images/GMS SAGARMATHA SP-2.png";
  }

  drawmecha() {
    const mechaImg = new Image();
    mechaImg.src = this.img;
    ctx.drawImage(mechaImg, this.x, this.y, this.width, this.height);
    //                  image           position X     position Y           value of width          value of height
  }

 moveRight() {
  if (this.x + this.width < myCanvas.width){
    this.x += 15;
  }
   
  }
// starts from canvas zero top left corner
  moveLeft() {
  if (this.x > 0){
    this.x -= 15;
  }
 
}
// start from canvas zero top left corner
moveUp() {
  if (this.y > 150){
  this.y -= 15;
  }
}
moveDown() {
  if (this.y + this.height < myCanvas.height - 190){
  this.y += 15;
  }
}
}

const mecha1 = new Mecha(0, 334); //create a new char usiong the class constructor
/* const mecha2 = new Mecha(0, 230); */
/* const mechaArray = [mecha1, mecha2]; */

document.addEventListener("keydown", (e) => {
  if(e.key === "ArrowLeft") {
    mecha1.moveLeft()
  } else if (e.key === "ArrowRight"){
    mecha1.moveRight()
  } else if (e.key === "ArrowUp"){
    mecha1.moveUp()
  } else if (e.key === "ArrowDown"){
    mecha1.moveDown()
  } 
})

class Tower {
  constructor(x, y) {
    this.width = 100;
    this.height = 100;
    this.x = x;
    this.y = y;
    this.img =
      "./images/BloodMoonTower_cover_free_version-removebg-preview.png";
  }

  drawtower() {
    const towerImg = new Image();
    towerImg.src = this.img;
    ctx.drawImage(towerImg, this.x, this.y, this.width, this.height);
  }
}

const tower1 = new Tower(44, 79);
const tower2 = new Tower(176, 79);
const tower3 = new Tower(300, 79);
const tower4 = new Tower(430, 79);
const tower5 = new Tower(560, 79);
const tower6 = new Tower(688, 79);
const tower7 = new Tower(815, 79);
const tower8 = new Tower(940, 79);
const tower9 = new Tower(1070, 79);
const towerArray = [tower1, tower2, tower3 , tower4 , tower5 , tower6 , tower7,tower8, tower9];

class Bullets {
  constructor(x, y) {
    this.width = 20;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.img = "./images/weapon_0063_Package-----------------.png";
  }

  draw() {
    const bulletImg = new Image();
    bulletImg.src = this.img;
    ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);
  }

  moveDown(numb) {
    this.y += numb;
  }
}

function bulletSpeed() {
if (realScore < 800) {
  
  bulletsArray.forEach((bullet) => {
bullet.moveDown(5)

  })
} else if ( realScore >= 800 && realScore < 10000){
  bulletsArray.forEach((bullet) => {
    bullet.moveDown(6.2)
    
      })
}

}


function moveBullets() {
  frames++;
if(realScore < 800) {
  if (frames % 100 === 0) {
    towerArray.forEach((tower) => {
      bulletsArray.push(new Bullets(tower.x + 40, tower.y + 50));
    });
    //console.log(bulletsArray)
  }
     bulletsArray.forEach((bullet, indexBullets) => {
    bullet.draw();
     
      })   
} else if ( realScore >= 800 && realScore < 10000){
  if (frames % 90 === 0) {
    towerArray.forEach((tower) => {
      bulletsArray.push(new Bullets(tower.x + 40, tower.y + 50));
    });
    //console.log(bulletsArray)
  }
     bulletsArray.forEach((bullet, indexBullets) => {
    bullet.draw();
     
      })   
}
  
  };

  if (bulletsArray.length === 40) {
    console.log("fliiip?")
    bulletsArray.shift();

  }


  function checkCollision () {

    bulletsArray.forEach((bullet) => {
      if( (mecha1.x < bullet.x + bullet.width) && (mecha1.x + mecha1.width - 32 > bullet.x) && (mecha1.y + mecha1.height > bullet.y) && (mecha1.y < bullet.y + bullet.height)  ) {
        console.log("crash!")
      gameOver()
      }
    })


  }

  function scoreFunction () {
    realScore++
    score.innerHTML = realScore
  }

  function gameOver (){

    isGameOver = true
    document.getElementById("game-over").style.display = "block";
  }

  function win () {
    if(mecha1.x + mecha1.width > myCanvas.width  ){
      isGameOver = true
      document.getElementById("win").style.display = "block"
    }


  }


 function update() {} 

function startGame() {
  // document.getElementById('game-board').style.display = 'block';
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  newbackground.drawBackground();

  mecha1.drawmecha();

  towerArray.forEach((tower) => {
   tower.drawtower()
  })

  moveBullets();
  checkCollision()
  scoreFunction()
  bulletSpeed()
  win()


  let gameon =  requestAnimationFrame(startGame);

  if(!isGameOver) {
    gameon
  } else {
    cancelAnimationFrame(gameon)
  }
  /*updateTimer = setInterval(myCanvas.update, 1000 / 60)
  animateTimer = setInterval(mecha1.animate, 1000 / 10)*/
}

document.getElementById("start-button").onclick = () => {
  startGame();
};

buttonEL.addEventListener("click", () => {
  moveBullets()
  checkCollision()
  scoreFunction()
  bulletSpeed()
  win()
})

Tower()
Mecha()



/*document.getElementById("restart").addEventListener("click", () => {
  myCanvas.restart();
  myCanvas.isGameOver = false;
  
});

document.getElementById("restart-game-over").addEventListener("click", () => {
    myCanvas.restart();
    myCanvas.isGameOver = false;
    document.getElementById("game-over").style.display = "none";
  });/*

/* 
image.onload = () => {
  
  animate()
}
image.src = './images/Asphalt-Road-Frosted-Day-22x16-1.jpg';
 */
