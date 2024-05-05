var fishOne = [];
let noiseScale = 0.02;
let noiseStrength = 80;
let numPoints = 500;
let points = [];
let bubbles = [];
let clam1
let clam2
//let clam1 = new Clam(490, 430)
let lastTimer = 0;

function setup() {
  createCanvas(800, 600);
  mic = new p5.AudioIn();
  mic.start();
  noiseSeed(99);
  for (let i = 0; i < 5; i++) {
    fishOne.push(new Fish(random(50, 551), random(20, 450)));
  }
  for (let i = 0; i < numPoints; i++) {
    let x = map(i, 0, numPoints - 1, 0, width);
    let noiseVal = noise(i * noiseScale);
    let y = map(
      noiseVal,
      0,
      1,
      height * 0.9 - noiseStrength,
      height - noiseStrength
    ); // Adjust the y-coordinate range
    points.push(createVector(x, y));
  }
}

function draw() {
  //from gpt asking about gradient and color
  // Define colors
  //volume increases the range of the ellipse and scares away the fish
  //ellipse(mouseX, mouseY, 80, 80);
  //perlin noise for the rocks?
  //point()
  let vol = mic.getLevel()
  let clam1 = new Clam(490, 450)
  let clam2 = new Clam(300, 480)
  let clam3 = new Clam(100, 470)
  
  let algae1 = new Algae(200, 400)
  let algae2 = new Algae(700, 400)
  let algae3 = new Algae(450, 400)
  
  let startColor = color("#0FFFFFF");
  let endColor = color("#0AA3CF");
  // Draw gradient
  for (let y = 0; y < height; y++) {
    // Calculate interpolation value based on y-coordinate
    let inter = map(y, 0, height, 0, 2);
    // Get color at this point
    let colorAtPoint = lerpColor(startColor, endColor, inter);
    // Set fill color
    fill(colorAtPoint);
    // Draw horizontal line
    noStroke();
    rect(0, y, width, 1);
  }
  //bubbles also from gpt
  // Draw bubbles
  // Update and show fish
  for (let i = 0; i < fishOne.length; i++) {
  fishOne[i].show();
  //fishOne[1].show();
  fishOne[i].move();
  if (random(1) < 0.02) {
    fishOne[i].createBubble(fishOne[i].getX(), fishOne[i].getY(), fishOne[i].getSpeed());
   }
   if(vol > 0.02){
    fishOne[i].setSpeed(random(3, 8))
   }
  if(millis() - lastTimer >= 2000){
    if(fishOne[i].vx < 0){
      fishOne[i].setSpeed(-1)
    }
    else{
       fishOne[i].setSpeed(1)
    }
    lastTimer = millis()
  }
  }
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].isOffScreen()) {
      bubbles.splice(i, 1); // Remove bubbles that are off-screen
    }
  } 
  //console.log(fishOne[i].getX())
  //noise created from asking gpt about how to make a mountain range style of noise
  // Generate points with Perlin noise

  clam1.show()
  clam2.show()
  clam3.show()
  algae1.show()
  algae2.show()
  algae3.show()
  
  // Draw the filled curve
  noStroke();
  fill("#664c28"); // Light blue color
  beginShape();
  vertex(0, height); // Bottom-left corner
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  vertex(width, height); // Bottom-right corner
  endShape(CLOSE);
}

function mousePressed(){
  fishOne.push(new Fish(mouseX, mouseY));
}

class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 15;
    this.speed = 1;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    //this.vx = -1
    //this.vy = 0
    this.shape = floor(random(0, 2));
    this.nearMouse = false;
    this.color1 = [random(0, 256), random(0, 256), random(0, 256)];
    this.color2 = [random(0, 256), random(0, 256), random(0, 256)];
    this.color3 = [random(0, 256), random(0, 256), random(0, 256)];
    this.timer = random(5000, 8000); 
  }

  //maybe add tiny bubbles for the fish too
  show() {
    if(this.timer != 0){
    this.timer-= 1
    //following mouse code from gpt asking about following mouse
    let mouseDist = dist(mouseX, mouseY, this.x, this.y);
    //push()
    if (mouseDist < 100) {
      //this.x = mouseX
      //this.y = mouseY
      let mouseXDist = mouseX;
      let mouseYDist = mouseY;
      let angle = atan2(mouseY - this.y, mouseX - this.x);
      //push()
      //translate(this.x, this.y);
      //rotate(angle)
      //if(this.vx < 0 && this.y < 0){
      this.vx = abs(sin(angle));
      this.vy = abs(cos(angle));
      this.speed = map(mouseDist, 0, 100, 0, 2);
    }  
    if (this.shape == 0) {
      this.shapeOne();
    } else if (this.shape == 1) {
      this.shapeTwo();
    } else if (this.shape == 2) {
      this.shapeThree();
    }
    }
  }

  shapeOne() {
    // Save the current transformation matrix
    push();
    if (this.vx < 0) {
      translate(800, 0);
      this.speed = -1
      scale(-1, 1);
    }
    // Translate to the fish's position
    //translate(this.x, this.y);
    noStroke();
    fill("#D3d3d3");
    ellipse(this.x, this.y, this.width, this.height);
    ellipse(this.x + 13, this.y, 20, 8);
    ellipse(this.x - 13, this.y, 20, 8);
    //back tail
    triangle(
      this.x - 13,
      this.y,
      this.x - 30,
      this.y + 8,
      this.x - 30,
      this.y - 8
    );
    //top fin
    triangle(
      this.x - 10,
      this.y - 20,
      this.x,
      this.y - 7,
      this.x - 10,
      this.y - 7
    );
    //bot fin
    triangle(
      this.x - 10,
      this.y + 15,
      this.x + 5,
      this.y + 7,
      this.x,
      this.y + 7
    );
    //add in some scales too

    fill(this.color1[0], this.color1[1], this.color1[2]);
    //scales
    ellipse(this.x + 5, this.y - 5, 5, 5);
    ellipse(this.x + 5, this.y - 2, 5, 5);
    ellipse(this.x + 5, this.y + 1, 5, 5);
    ellipse(this.x + 5, this.y + 2, 5, 5);

    fill(this.color2[0], this.color2[1], this.color2[2]);
    ellipse(this.x - 1, this.y - 5, 5, 5);
    ellipse(this.x - 1, this.y - 2, 5, 5);
    ellipse(this.x - 1, this.y + 1, 5, 5);
    ellipse(this.x - 1, this.y + 2, 5, 5);

    fill(this.color3[0], this.color3[1], this.color3[2]);
    ellipse(this.x - 7, this.y - 5, 5, 5);
    ellipse(this.x - 7, this.y - 2, 5, 5);
    ellipse(this.x - 7, this.y + 1, 5, 5);
    ellipse(this.x - 7, this.y + 2, 5, 5);
    //the eye
    fill(0);
    ellipse(this.x + 20, this.y, 2, 2);
    //tail lines
    stroke(0);
    strokeWeight(0.5);
    line(this.x - 20, this.y - 0.5, this.x - 30, this.y - 5);
    line(this.x - 20, this.y + 0.5, this.x - 30, this.y + 0.5);
    line(this.x - 20, this.y + 1, this.x - 30, this.y + 5);
    pop();
  }

  shapeTwo() {
    push();
    if (this.vx < 0) {
      translate(800, 0);
      this.speed = -1
      scale(-1, 1);
    }
    //curved fins
    fill(this.color2[0], this.color2[0], this.color2[0])
    triangle(this.x - 10, this.y - 10, this.x - 10, this.y - 25, this.x + 10, this.y - 10)
    triangle(this.x - 15, this.y + 10, this.x - 15, this.y + 25, this.x + 5, this.y + 5)
    //tail 
    rect(this.x - 33, this.y - 5, 10, 10) 
    fill(this.color1[0], this.color1[1], this.color1[2])
    triangle(this.x - 40, this.y - 15, this.x - 20, this.y, this.x - 33, this.y - 5)
    triangle(this.x - 40, this.y + 15, this.x - 20, this.y, this.x - 33, this.y + 5)
    fill(0) 
     //main body
    fill(220)
    ellipse(this.x, this.y, 50, 30)
    fill(0, 255, 0)
    //eye 
    fill(0)
    ellipse(this.x + 10, this.y - 5, 5, 5)
    stroke(0)
    fill(255, 0, 0)
    //mouth
    strokeWeight(4)
    beginShape()
    vertex(this.x + 15, this.y + 5)
    vertex(this.x + 25, this.y)
    vertex(this.x +15, this.y + 5)
    vertex(this.x + 23, this.y + 8)
    endShape()
    
    //scales
    noStroke()
    fill(this.color2[0], this.color3[1], this.color2[1])
     ellipse(this.x - 15, this.y - 8, 5, 5);
    ellipse(this.x - 15, this.y - 5, 5, 5);
    ellipse(this.x - 15, this.y + 1, 5, 5);
    ellipse(this.x - 15, this.y + 5, 5, 5);
    ellipse(this.x - 15, this.y + 8, 5, 5);
    
    fill(this.color3[0], this.color3[1], this.color3[0])
     ellipse(this.x - 11, this.y - 10, 5, 5);
    ellipse(this.x - 11, this.y - 5, 5, 5);
    ellipse(this.x - 11, this.y + 1, 5, 5);
    ellipse(this.x - 11, this.y + 7, 5, 5);
    ellipse(this.x - 11, this.y + 9, 5, 5);
    
    fill(this.color2[0], this.color2[1], this.color2[1])
    ellipse(this.x - 3, this.y - 10, 5, 5);
    ellipse(this.x - 3, this.y - 5, 5, 5);
    ellipse(this.x - 3, this.y + 1, 5, 5);
    ellipse(this.x - 3, this.y + 7, 5, 5);
    ellipse(this.x - 3, this.y + 9, 5, 5);
    
    fill(this.color2[1], this.color2[0], this.color2[1])
    ellipse(this.x - 7, this.y - 10, 5, 5);
    ellipse(this.x - 7, this.y - 5, 5, 5);
    ellipse(this.x - 7, this.y, 5, 5);
    ellipse(this.x - 7, this.y + 5, 5, 5);
    ellipse(this.x - 7, this.y + 9, 5, 5);
    pop()
  }

  move() {
    // Move fish
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;

    if (this.x < -20) {
      this.x = 830;
    }
    if (this.x > 830) {
      this.x = -20;
    }  
    if (this.y < 0) {
      this.y = 460;
    }
    if (this.y > 510) {
      this.y = 0;
    } 
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  setFlag() {
    this.bounce = !this.bounce;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getSpeed() {
    return this.speed;
  }

  createBubble() {
    let bubble = new Bubble(this.x, this.y, random(1, 3));
    bubbles.push(bubble);
  }
}


let xoff = 5
let amplitude = 5

class Algae {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  show() {
    noStroke()
    fill('#5c4f25')
    ellipse(this.x, this.y, 15, 15)
    stroke('#5c4f25')
    beginShape()
    vertex(this.x, this.y)
    bezierVertex(this.x, this.y, this.x + 10, this.y + 20, this.x, this.y + 110)
    endShape()
    strokeWeight(5)
    beginShape()
    vertex(this.x, this.y)
    bezierVertex(this.x, this.y, this.x + 20, this.y - 10, this.x + 60, this.y - 12)
    endShape()
    beginShape()
    vertex(this.x, this.y)
    bezierVertex(this.x, this.y, this.x + 20, this.y - 40, this.x + 60, this.y - 42)
    endShape()
    beginShape()
    vertex(this.x, this.y)
    bezierVertex(this.x, this.y, this.x + 20, this.y, this.x + 60, this.y + 22)
    endShape()
    
    //point(this.x + 40, this.y - 15)
    //point(this.x + 20, this.y - 15)
   // point(this.x + 60, this.y + 20)
    noStroke()
  }
  
}

class Clam {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  show() {
    noStroke()
    fill("#fff5ee")
    ellipse(this.x, this.y, 40, 25)
    triangle(this.x, this.y, this.x + 10, this.y + 20, this.x - 10, this.y + 20)
    strokeWeight(2)
    stroke(0)
    line(this.x, this.y + 10, this.x, this.y - 12)
    line(this.x + 10, this.y + 9, this.x + 10, this.y - 12)
    line(this.x - 10, this.y + 9, this.x - 10, this.y - 12)
  }
}

class Bubble {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.radius = floor(random(5, 9));
    this.speed = random(1, 3);
  }

  update() {
    this.y -= this.speed;
  }

  display() {
    noStroke();
    fill(200, 200, 255, 150); // Semi-transparent blue
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  isOffScreen() {
    return this.y < 0 || this.y > 480;
  }
}

