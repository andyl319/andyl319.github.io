//create canvas

let Game = (function(g){
  let doc = g.document;
  let wind = g.window;
  let canvas = doc.createElement('canvas');
  let ctx = canvas.getContext('2d');
  let lastTime;
  canvas.width = 714;
  canvas.height = 610;
  doc.getElementById("game").appendChild(canvas);

  function start(){
    document.getElementById('died').innerHTML = '';
    lastTime = Date.now();
    main();
  }

  function main(){
    let thisTime = Date.now();
    let deltaTime = (thisTime - lastTime) / 1000.0;

    update(deltaTime);
    render();

    lastTime = thisTime;
    if(frogger.died === true) {
      frogger.died = false;
      doc.getElementById('died').innerHTML = 'DIED!';
      setTimeout(start, 1000);
    } else if(frogger.end === false){
      wind.requestAnimationFrame(main);
    }  else {
      doc.getElementById('game-over').innerHTML = `GAME OVER`;
    }

  }

  function update(deltaTime){
    allCars.forEach(car => {
      car.update(deltaTime);
    });

    frogger.checkForHit();
  }

  function render(){
    let imgs = [
      './images/rsz_finish-line.png',
      './images/rsz_road.png',
      './images/rsz_road.png',
      './images/rsz_road.png',
      './images/rsz_grass.png',
      './images/rsz_road.png',
      './images/rsz_road.png',
      './images/rsz_road.png',
      './images/rsz_grass.png'
    ];

    let rows = 9;
    let cols = 14;

    for(let rowIdx = 0; rowIdx < rows; rowIdx++){
      for(let colIdx = 0; colIdx < cols; colIdx++){
        ctx.drawImage(Objects.get(imgs[rowIdx]),  colIdx * 51, rowIdx * 61);
      }
    }

    renderObjects();
  }

  function renderObjects(){
    allCars.forEach(function(car){
      car.render();
    });

    frogger.render();
  }

  Objects.load([
    './images/rsz_frogger.png',
    './images/rsz_grass.png',
    './images/rsz_road.png',
    './images/blue-car.png',
    './images/green-car.png',
    './images/orange-car.png',
    './images/yellow-car.png',
    './images/rsz_finish-line.png'
  ]);

  let restart = function(){
    doc.getElementById('game-over').innerHTML = ``;
    frogger.reset();
    start();
  }
  document.getElementById('reset').addEventListener('click', restart);

  Objects.onReady(start);

  g.ctx = ctx;
})(this);
