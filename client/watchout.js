// start slingin' some d3 here


// via Collider source docs, may be helpful to include general specs
// in an object for simple reference by property

var gameOptions = {
  'height' : '500',
  'width': '700',
  'nEnemies': 15,
  'padding': '20px',
  'timeBetweenMoves': 1000
};

// apply dimensions to our "screen" and add needed objects
var gameWindow = d3.select('.board')
                   .append('svg:svg')
                   .style('height', gameOptions.height)
                   .style('width', gameOptions.width);


var axes = {
  'x': d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  'y': d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};


var makeEnemies = function () {
  return _.range(0, gameOptions.nEnemies ).map ( function (i) {
    return {
      'id': i,
      'x': Math.random() * 100,
      'y': Math.random() * 100 
    };
  });
};


// create updater (imports new location data, moving enemies)
var gameMotor = function update(enemyData) {
  // UPDATE stage
  var enemies = gameWindow.selectAll('circle.enemy')
                // this is the key function - used to attach name prop as identifier
                .data(enemyData, function(d) { return d.id; })
                .attr('cx', function (enemy) { return axes.x(enemy.x); });

  // ENTER stage 
  enemies.enter()
         .append('svg:circle')
         .attr('class', 'enemy')
         .attr('cx', function (enemy) { return axes.x(enemy.x); })
         .attr('cy', function (enemy) { return axes.y(enemy.y); })
         .attr('r', 20)
         .attr('fill', 'blue')
         .transition().style('background-color', 'black');

  // EXIT stage
  enemies.exit()
         .remove()
;

console.log(enemies);
};


var tweenEnemies = function (endData) {
  var enemy = d3.select(this);

  var startPos = {
    'x': parseFloat(enemy.attr('cx')),
    'y': parseFloat(enemy.attr('cy'))
  };

  var endPos = {
    'x': axes.x(endData.x),
    'y': axes.y(endData.y)
  };

  return function (t) {
    var enemyNextPos = {
      'x': startPos.x + (endPos.x - startPos.x) * t,
      'y': startPos.y + (endPos.y - startPos.y) * t
    };

    enemy.attr('cx', enemyNextPos.x)
         .attr('cy', enemyNextPos.y);
  };
};

var updateCircle = function update(enemyData) {
  var circleEnemy = d3.selectAll('circle.enemy')
                      .attr('cx', enemy.attr('cx') + 10);
};

// game init
var playGame = function () {
  var gameTurn = function () {
    var newEnemyPositions = makeEnemies();
    gameMotor(newEnemyPositions);
  };

  setInterval(gameTurn, gameOptions.timeBetweenMoves);  
};

playGame();



/*

// create enemy mover function
var moveEnemies = d3.select('body').selectAll('.enemy')
                    .transition().delay(gameOptions.timeBetweenMoves);


var circles = d3.selectAll("circle")
                .attr("r", 30)
                .attr("cx", 500)
                .attr("cy", 250)
                .style("background", 'yellow');*/



/*var enemies = [{x: Math.random() * 100, y: Math.random() * 100, id: undefined}];


var asteroids = d3.select('.asteroid')
                  .append('div')

var createEnemies = function (nEnemies) {
  
  for ( var i = 0; i < nEnemies; i++ ) {
    enemies.push(i);
  }
};

createEnemies();*/
