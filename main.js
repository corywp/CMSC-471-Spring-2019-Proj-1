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
        console.log("Draw, White: Algorithm: eval_", algoW - 2, " Depth: ", skillW,
            "## Black: Algorithm: eval_", algoB - 2, " Depth: ", skillB);
    }

    else {
        console.log("Black, White: Algorithm: eval_", algoW - 2, " Depth: ", skillW,
            "## Black: Algorithm: eval_", algoB - 2, " Depth: ", skillB);
    }

    return;
  }

  makeMove(algoW, skillW);

  if(game.game_over() === true){

      if (game.in_draw()) {
          console.log("Draw, White: Algorithm: eval_", algoW - 2, " Depth: ", skillW,
              "## Black: Algorithm: eval_", algoB - 2, " Depth: ", skillB);
    }

    else{
          console.log("White, White: Algorithm: eval_", algoW - 2, " Depth: ", skillW,
              "## Black: Algorithm: eval_", algoB - 2, " Depth: ", skillB);
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



//loop multiple bots with different games against eachother
//randome genreation of depth and algorithms
var runGames = function () {
    game.reset();
    board.clear();
    board.start();
    var min = 3;
    var max = 6;
    var min2 = 1; 
    var max2 = 4;
    var bMethod = Math.floor(Math.random() * (+max - +min)) + +min;
    var wMethod = Math.floor(Math.random() * (+max - +min)) + +min;
    var bDepth = Math.floor(Math.random() * (+max2 - +min2)) + +min2;
    var wDepth = Math.floor(Math.random() * (+max2 - +min2)) + +min2;

    playGame(+ wMethod, + bMethod, + wDepth, + bDepth);
}
