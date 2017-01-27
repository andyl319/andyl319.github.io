let xmove = 51;
let ymove = 61;
//left
let canvasL = 0;
//right
let canvasR = 663;
//top
let canvasT = 0;
//bottom
let canvasB = 488;
//increase speed
let speedMultiplier = 0;

//car class
let Car = function(x, y, color){
  this.startx = x;
  this.starty = y;
  this.x = x;
  this.y = y;
  this.color = color;
  switch(color){
    case 'orange':
      this.sprite = './images/orange-car.png';
      this.speed = 120;
      break;
    case 'blue':
      this.sprite = './images/blue-car.png';
      this.speed = 100;
      break;
    case 'yellow':
      this.sprite = './images/yellow-car.png';
      this.speed = 140;
      break;
    case 'green':
      this.sprite = './images/green-car.png';
      this.speed = 80;
      break;
    default:
      this.sprite = './images/blue-car.png';
  }
};

let allCars = [];

let car1 = new Car(914, 70, 'orange');
let car2 = new Car(1450, 70, 'orange');
let car3 = new Car(-175, 131, 'blue');
let car4 = new Car(-575, 131, 'blue');
let car5 = new Car(1214, 192, 'yellow');
let car6 = new Car(1750, 192, 'yellow');
let car7 = new Car(0, 314, 'green');
let car8 = new Car(-350, 314, 'green');
let car9 = new Car(914, 375, 'yellow');
let carA = new Car(1450, 375, 'yellow');
let carB = new Car(0, 436, 'blue');
let carC = new Car(-375, 436, 'blue');

allCars.push(car1);
allCars.push(car2);
allCars.push(car3);
allCars.push(car4);
allCars.push(car5);
allCars.push(car6);
allCars.push(car7);
allCars.push(car8);
allCars.push(car9);
allCars.push(carA);
allCars.push(carB);
allCars.push(carC);


Car.prototype.render = function() {
  ctx.drawImage(Objects.get(this.sprite), this.x, this.y);
};

Car.prototype.update = function(deltaTime){
  if(this.color === 'blue' || this.color === 'green'){
    this.x += (this.speed + speedMultiplier) * deltaTime;
    if(this.x > canvasR){
      this.x = -100;
    }
  } else {
    this.x -= (this.speed + speedMultiplier) * deltaTime;
    if(this.x < 0){
      this.x = Math.floor(Math.random() * 50 + 1250);
    }
  }

  Car.prototype.reset = function(){
    this.x = this.startx;
    this.y = this.starty;
    ctx.drawImage(Objects.get(this.sprite), this.x, this.y);
  }
};

//frogger class
var Frogger = function(x, y){
  this.x = x;
  this.y = y;
  this.end = false;
  this.died = false;
  this.sprite = './images/rsz_frogger.png';
};
let frogger = new Frogger(357, 488);

let score = 0;
let lives = 3;
let newLife = true;

Frogger.prototype.render = function(){
  ctx.drawImage(Objects.get(this.sprite), this.x, this.y);
};

Frogger.prototype.handleInput = function(e, key){
  e.preventDefault();
  switch(key){
    case 'left':
      if(this.x > canvasL){
        this.x -= xmove;
      }
      break;
    case 'right':
      if(this.x < canvasR){
        this.x += xmove;
      }
      break;
    case 'up':
      if(this.y > canvasT){
        this.y -= ymove;
      } else {
        frogger.resetOnWin();
      }
      break;
    case 'down':
      if(this.y < canvasB){
        this.y += ymove;
      }
      break;
    default:
      return;
  }
};

Frogger.prototype.checkForHit = function(){
  for(let e = 0, numCars = allCars.length; e < numCars; e++){
    if(frogger.x <= (allCars[e].x + 101) && allCars[e].x <= (frogger.x + 50) && frogger.y <= (allCars[e].y + 50) && allCars[e].y <= (frogger.y + 50)) {
      frogger.death();
    }
  }
};

Frogger.prototype.death = function (){
  this.died = true;
  this.x = 357;
  this.y = 488;
  lives--;
  document.getElementById('lives').innerHTML = `Lives: ${lives}`;
  if(lives === 0){
    frogger.end = true;
  }
};

Frogger.prototype.reset = function(){
  this.x = 357;
  this.y = 488;
  lives = 3;
  score = 0;
  speedMultiplier = 0;
  frogger.end = false;
  document.getElementById('lives').innerHTML = `Lives: ${lives}`;
  document.getElementById('score').innerHTML = `Score: ${score}`;
};

Frogger.prototype.resetOnWin = function(){
  this.x = 357;
  this.y = 488;
  score++;
  speedMultiplier += 20;
  if(score % 5 === 0){
    lives++;
    document.getElementById('lives').innerHTML = `Lives: ${lives}`;

  }
  document.getElementById('score').innerHTML = `Score: ${score}`;
};

document.addEventListener('keydown', function(e){
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  frogger.handleInput(e, allowedKeys[e.keyCode]);
});
