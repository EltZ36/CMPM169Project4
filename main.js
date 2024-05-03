function setup() {
    createCanvas(600, 600);
    mic = new p5.AudioIn();
    mic.start(); 
}
  
function draw() {
    background('#0AA3CF')
    //volume increases the range of the ellipse and scares away the fish
    fill(255, 10)
    //ellipse(mouseX, mouseY, 80, 80);
    strokeWeight(3)
    stroke(0, 255, 0)
    //perlin noise for the rocks? 
    //point() 
}

function mousePressed(){
    //increase the speed for a few seconds and then delay/slow it down
}

function keyPressed(){

}

function drawPoint(){

}

class fish{
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 30
        this.height = 20
        this.speed = 0
        this.vx = 0
        this.vy = 0
        this.shape = 0 
    }

    //maybe add tiny bubbles for the fish too 
    show(){
        ellipse(x, y, this.width, this.height)
        triangle(x, y, 10, 10)
        triangle(x, y, 10, 10)
        //add in some scales too 
    }

    shapeOne(){

    }

    shapeTwo(){

    }

    shapeThree(){

    }

    move(){
        this.x += this.vx;
        this.y += this.vy; 

        //bounce code from gpt and asking how to make some bacteria on a screen move around randomly
        if(this.x < 0 || this.x > width){
            this.vx *= -1
        }
        if(this.y < 0 || this.y > height){
            this.vx *= -1
        }

    }

    setX(x){
        this.x = x
    }

    setY(y){
        this.y = y
    }

    setSpeed(speed){
        this.speed = speed 
    }

    getX(){
        return this.x 
    }

    getY(){
        return this.y 
    }

    getSpeed(){
        return this.speed
    }
}