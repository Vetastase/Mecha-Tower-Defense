
//document.getElementById('game-board').style.display = 'none';
const myCanvas = document.getElementById('mecha-canvas');
const ctx = myCanvas.getContext('2d');

let myGame;
let myTower;


function startGame () {
 // document.getElementById('game-board').style.display = 'block';
   const newbackground = new Background()
  newbackground.drawBackground() 


  const newChar = new Mecha() //create a new char usiong the class constructor
newChar.drawmecha() 



}



document.getElementById('start-button').onclick = () => {
    startGame();
}



/* 
image.onload = () => {
  
  animate()
}
image.src = './images/Asphalt-Road-Frosted-Day-22x16-1.jpg';
 */
