// start slingin' some d3 here


// via Collider source docs, may be helpful to include general specs
// in an object for simple reference by property

// GAME OPTIONS
// object for easy property references
var gameOptions = { 
  width: 750,
  height: 700,
  nEnemies: 50,
  padding: 20,
  nRadius: 20,
  timeBetweenMoves: 6000,
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
        background: '#fff',
        opacity: .55
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
                background: 'orange',
                opacity: 1
              });


$(function () {
  $('.player').draggable();
});



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
setInterval(scoreCounter, 50);

