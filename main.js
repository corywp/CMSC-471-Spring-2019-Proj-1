// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(algo, skill) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm
    if (algo === 1) {
        var move = randomMove();
    } else if (algo === 2) {
        var move = calcBestMoveOne(game.turn());
    } else if (algo === 3) {
        var move = calcBestMoveNoAB(skill, game, game.turn())[1];
    } else if (algo === 4) {
        var move = calcBestMove(skill, game, game.turn())[1];
    } else {
        var move = eval_3(skill, game, game.turn())[1];
    }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(algoW, algoB, skillW, skillB) {
  if (game.game_over() === true) {

    if(game.in_draw()){
        console.log("Draw")
    }

    else {
        console.log("Black");
    }

    return;
  }

  makeMove(algoW, skillW);

  if(game.game_over() === true){

      if (game.in_draw()) {
          console.log("Draw");
    }

    else{
      console.log("White");
    }

      return;
  }
  makeMove(algoB, skillB);
        
  window.setTimeout(function() {
    playGame(algoW, algoB, skillW, skillB);
  }, 250);
  if (game.game_over() === true) { return; }
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  //console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};

var loopTheLoop = function(numGames){
    for(var i = 0; i < numGames; i++) {
    loopGames(1);
    }
}


//loop multiple bots with different games against eachother
//randome genreation of depth and algorithms
var loopGames = function(numGames){

  for (var i =0; i < numGames; i++) {

    game.reset();
    board.clear();
    board.start();

    var bMethod = Math.floor(Math.random() * 2) + 1;
    var wMethod = Math.floor(Math.random() * 2) + 1;
    var bDepth = Math.floor(Math.random() * 2) + 1;
    var wDepth = Math.floor(Math.random() * 2) + 1;

    playGame(wMethod, bMethod, wDepth, bDepth);

  }

}
