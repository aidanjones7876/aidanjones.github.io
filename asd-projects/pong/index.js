$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 120;
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
  var scoreLeft = 6;
  var scoreRight = 6;
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

  var paddleMiddleLeft = null;
  var paddleMiddleRight = null;
  // One-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  $(document).on('click', '#restartButton', restartGame);
  $("#endGameScreen").hide();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function addPaddles() {
    if (paddleMiddleLeft === null) {
      paddleMiddleLeft = GameItem("#paddleMiddleLeft", 0, 0);
      paddleMiddleRight = GameItem("#paddleMiddleRight", 0, 0);
      $("#paddleMiddleLeft").show();
      $("#paddleMiddleRight").show();
    }
  }

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
    points(ball);
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      paddleLeft.speedY = -4;
    }
    if (event.which === KEY.S) {
      paddleLeft.speedY = 4;
    }
    if (event.which === KEY.UP) {
      paddleRight.speedY = -4;
    }
    if (event.which === KEY.DOWN) {
      paddleRight.speedY = 4;
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
      // Left paddle scores
      scoreLeft++;
      scoreLeftElement.text("Score: " + scoreLeft);
      resetBall(ball);
      checkWinCondition();
    } else if (obj.x < 0) {
      // Right paddle scores
      scoreRight++;
      scoreRightElement.text("Score: " + scoreRight);
      resetBall(ball);
      checkWinCondition();
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
      ball.speedX = -ball.speedX * 1.05;
    }
  }

  function points(ball) {
    if (ball.x < 0) {
      // Right paddle scores
      scoreRight++;
      scoreRightElement.text("Score: " + scoreRight);
      resetBall(ball);
      checkWinCondition();
    } else if (ball.x > BOARD_WIDTH - BALL_WIDTH) {
      // Left paddle scores
      scoreLeft++;
      scoreLeftElement.text("Score: " + scoreLeft);
      resetBall(ball);
      checkWinCondition();
    }
  }

  function resetBall(ball) {
    ball.x = (BOARD_WIDTH - BALL_WIDTH) / 2;
    ball.y = (BOARD_HEIGHT - BALL_HEIGHT) / 2;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() > 0.5 ? -3 : 1);
  }

  // Handle what happens when someone wins
  function checkWinCondition() {
    if (scoreLeft >= 7) {
      showEndGameScreen("Player 1 Wins!");
    } else if (scoreRight >= 7) {
      showEndGameScreen("Player 2 Wins!");
    }
  }

  function showEndGameScreen(message) {
    $("#winnerText").text(message);
    $("#endGameScreen").show();
    clearInterval(interval);
  }

  function restartGame() {
    scoreLeft = 0;
    scoreRight = 0;
    scoreLeftElement.text("Score: 0");
    scoreRightElement.text("Score: 0");
    resetBall(ball);
    $("#endGameScreen").hide();
    interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  }
}