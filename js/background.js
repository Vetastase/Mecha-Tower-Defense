

// class always has to be capitalised
class Background {
    constructor(){
    this.x = 0;
    this.y = 0;
    this.width = myCanvas.width;
    this.height = myCanvas.height;
    this.img = "../images/Asphalt-Road-Frosted-Day-22x16-1.jpg"
}

drawBackground(){
    const backgroundImg = new Image();
    backgroundImg.src = this.img;
    ctx.drawImage(backgroundImg, this.x, this.y,this.width, this.height);
}
}