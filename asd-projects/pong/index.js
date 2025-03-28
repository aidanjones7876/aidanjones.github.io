$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var scoreLeftElement = $("#scoreLeft");
  var scoreRightElement = $("#scoreRight");
  var name = $("#title");
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const PADDLE_WIDTH = $("#paddleLeft").width();
  const PADDLE_HEIGHT = $("#paddleLeft").height();
  const BALL_WIDTH = $("#ball").width();
  const BALL_HEIGHT = $("#ball").height();
  var scoreLeft = 0;
  var scoreRight = 0;
  // Game Item Objects
  const KEY = {
    "W": 87,
    "S": 83,
    "UP": 38,
    "DOWN": 40,
  };

  function GameItem(id, speedX, speedY) {
    var obj = {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      w: $(id).width(),
      h: $(id).height()
    };
    return obj;
  }

  var paddleLeft = GameItem("#paddleLeft", 0, 0);
  var paddleRight = GameItem("#paddleRight", 0, 0);
  var ball = GameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() > 0.5 ? -3 : 1));

  // One-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  $(document).on('click', '#restartButton', restartGame);
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(paddleLeft);
    updateGameItem(paddleLeft);
    drawGameItem(paddleRight);
    updateGameItem(paddleRight);
    drawGameItem(ball);
    updateGameItem(ball);
    horizontalWallCollide(ball);
    verticalWallCollide(ball);
    paddleWall(paddleLeft);
    paddleWall(paddleRight);
    doCollide(ball, paddleLeft);
    doCollide(ball, paddleRight);
    points(ball, paddleLeft, paddleRight);
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      paddleLeft.speedY = -8;
    }
    if (event.which === KEY.S) {
      paddleLeft.speedY = 8;
    }
    if (event.which === KEY.UP) {
      paddleRight.speedY = -8;
    }
    if (event.which === KEY.DOWN) {
      paddleRight.speedY = 8;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.W || event.which === KEY.S) {
      paddleLeft.speedY = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      paddleRight.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // Movement helpers
  function drawGameItem(obj) {
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function updateGameItem(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }

  function paddleWall(obj) {
    if (obj.y > BOARD_HEIGHT - PADDLE_HEIGHT) {
      obj.speedY = 0;
      obj.y = BOARD_HEIGHT - PADDLE_HEIGHT;
    } else if (obj.y < 0) {
      obj.speedY = 0;
      obj.y = 0;
    }
  }

  // Handles what happens when the ball hits the walls
  function horizontalWallCollide(obj) {
    if (obj.x > BOARD_WIDTH - BALL_WIDTH) {
      // Right paddle scores
      scoreLeft++;
      scoreLeftElement.text("Score: " + scoreLeft);
      resetBall(ball);
    } else if (obj.x < 0) {
      // Left paddle scores
      scoreRight++;
      scoreRightElement.text("Score: " + scoreRight);
      resetBall(ball);
    }
  }

  function verticalWallCollide(obj) {
    if (obj.y > BOARD_HEIGHT - BALL_HEIGHT) {
      obj.speedY = -obj.speedY;
    } else if (obj.y < 0) {
      obj.speedY = -obj.speedY;
    }
  }

  // Handles what happens when the ball hits the paddles
  function doCollide(ball, paddle) {
    // Determines if objects collide
    if (ball.x < paddle.x + PADDLE_WIDTH && ball.x + BALL_WIDTH > paddle.x && ball.y < paddle.y + PADDLE_HEIGHT && ball.y + BALL_HEIGHT > paddle.y) {
      ball.speedX = -ball.speedX * 1.2;
    }
  }

  function points(ball, paddleLeft, paddleRight) {
    if (ball.x < 0) {
      // Right paddle scores
      scoreRight++;
      scoreRightElement.text("Score: " + scoreRight);
      resetBall(ball);
      if (scoreRight === 7) {
        endGame("Right Player");
      }
    } else if (ball.x > BOARD_WIDTH - BALL_WIDTH) {
      // Left paddle scores
      scoreLeft++;
      scoreLeftElement.text("Score: " + scoreLeft);
      resetBall(ball);
      if (scoreLeft === 7) {
        endGame("Left Player");
      }
    }
  }
  $("#endGameScreen").hide();

  function resetBall(ball) {
    ball.x = (BOARD_WIDTH - BALL_WIDTH) / 2;
    ball.y = (BOARD_HEIGHT - BALL_HEIGHT) / 2;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() > 0.5 ? -3 : 1);
  }

  // Handle what happens when someone wins
  function endGame(winner) {
    clearInterval(interval); // Stop the game loop
    $("#endGameScreen").show();
    $("#endGameMessage").text(winner + " wins!");
  }

  //restart game
  function restartGame() {
    scoreLeft = 0;
    scoreRight = 0;
    scoreLeftElement.text("Score: " + scoreLeft);
    scoreRightElement.text("Score: " + scoreRight);
    resetBall(ball);
    interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
    $("#endGameScreen").hide();
  }
 
}