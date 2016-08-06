// start slingin' some d3 here


// via Collider source docs, may be helpful to include general specs
// in an object for simple reference by property

// GAME OPTIONS
// object for easy property references
var gameOptions = { 
  width: 750,
  height: 700,
  nEnemies: 40,
  padding: 20,
  nRadius: 20,
  timeBetweenMoves: 2000,
  pRadius: 10
};

// HELPER FUNCS
// these tackle appending px to our numbers + also running randomization 
// with our board dimensions as constraints
var numToPixel = function(number) { return number + 'px'; };

var rand = function(number) { return Math.random() * number; };

var randomX = function() { 
  return numToPixel(rand(gameOptions.width - gameOptions.nRadius * 2)); 
};
var randomY = function() { 
  return numToPixel(rand(gameOptions.height - gameOptions.nRadius * 2)); 
};

// create game Window (screen / board)
var gameWindow = d3.select('.board').style({
  width: numToPixel(gameOptions.width),
  height: numToPixel(gameOptions.height)
});

// ENEMIES
// update and enter phases for enemies
var enemies = gameWindow.selectAll('.enemy')
      .data(d3.range(gameOptions.nEnemies))
      // append each to a div element on entrance
      .enter().append('div')
      .attr('class', 'enemy')
      .style({
        top: randomY,
        left: randomX,
        width: numToPixel(gameOptions.nRadius * 2),
        height: numToPixel(gameOptions.nRadius * 2),
        opacity: 1
      });

// update enemy position
var move = function(array) {
  array.transition().duration(gameOptions.timeBetweenMoves).style({
    top: randomY,
    left: randomX,
  }).each('end', function() {
    // ( we're passing array of enemies into this function )
    move(d3.select(this));
    
  });
};

move(enemies);

// PLAYER
var player = gameWindow.selectAll('.player')
              .data([1])
              .enter() 
              .append('div')
              .attr('class', 'player')
              .style({
                top: randomY,
                left: randomX,
                width: numToPixel(gameOptions.pRadius * 2),
                height: numToPixel(gameOptions.pRadius * 2),
                opacity: 1,
                background: 'yellow'
              });



// make draggable (via jQuery UI)
$(function () {
  $('.player').draggable();
});


var enemyPosition = [];

for ( var i = 0; i < enemies.length; i ++ ) {
  for (var k in enemies[i]) {
    var eachEnemy = enemies[i][k];

    
    var posX = eachEnemy.outerHTML.split(' ')[5].slice(0, -3);
    var posY = eachEnemy.outerHTML.split(' ')[3].slice(0, -3);

    enemyPosition.push([posX, posY]);
  } 

  enemyPosition.pop();
  console.log(enemyPosition);
}

// for ( var i = 0; i < enemies.length; i ++ ) {
//   for (var k in enemies[i]) {
//     var eachEnemy = enemies[i][k];

//     var enemyPositionX = eachEnemy.outerHTML.split(' ')[5].slice(0, -3);
//     var enemyPositionY = eachEnemy.outerHTML.split(' ')[3].slice(0, -3);
//     enemyPosition[i] = enemyPositionX + ',' + enemyPositionY;
//   } 
  
// }

// mouse tracking
var playerPosition = [];

gameWindow.on('mousemove', function() {
  
  var positionX = d3.event.clientX;
  var positionY = d3.event.clientY;
  
  playerPosition[0] = positionX;
  playerPosition[1] = positionY;
  var mousePos = d3.mouse(this);

  console.log(mousePos);
});



// COLLISION DETECTION 
var checkCollision = function (enemy, collidedCallback) {

  var radiusSum = gameOptions.nRadius + gameOptions.pRadius;
  
    
  for ( var i = 0; i < enemyPosition.length; i ++ ) {
    
    var xDiff = enemyPosition[i][0] - playerPosition[0];
    var yDiff = enemyPosition[i][1] - playerPosition[1];

    var separation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2 ));

    if ( separation < radiusSum ) {
      collisionCount++;
      currScore = 0;
      console.log('We have collision!');
    }
  
 /*   console.log(xDiff);*/
  }
/*
  console.log(xDiff, yDiff);*/
};

d3.timer(checkCollision);





// $('.board').bind('mouseover', function(ev) {
//   var $div = $(ev.target);
//   var $positionTest = $div.find('.positionTest');

//   var offset = $div.offset();
//   var x = ev.clientX - offset.left;
//   var y = ev.clientY - offset.top;

//   $positionTest.text('x: ' + x + ', y' + y );

// });


//store player coordinates
/*var playerLocation = d3.mouse(gameWindow);*/
// playerLocation = d3.mouse(this);
// var playerX = playerLocation[0];
// var playerY = playerLocation[1];

// console.log(playerLocation);

// var mouse = d3.select('.player');
// mouse.on('click', function() {
//   console.log(d3.mouse(mouse.node));
// });



// SCOREBOARD
var currScore = 0;
var highScore = 0;
var collisionCount = 0;

// select corresponding divs and render variables to text
var updateScoreboard = function() {
  d3.select('.scoreboard .current span').text(currScore);
  d3.select('.scoreboard .highscore span').text(highScore);
  d3.select('.scoreboard .collisions span').text(collisionCount);
};

// increment score, set highScore, update scoreboard output
var scoreCounter = function() {
  highScore = Math.max(currScore, highScore);
  currScore++;
  updateScoreboard();
};
// speed of score increment
d3.timer(scoreCounter);

