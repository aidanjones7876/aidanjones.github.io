var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Basic world",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY -120},
          { type: "sawblade", x: 600, y: groundY -120},
          
          { type: "reward", x: 1100, y: groundY -75},
          { type: "marker", x: 1500, y: groundY -10},
          
        ],
      },
      {
        name: "futuristic",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "spike", x: 400, y: groundY -40},
          { type: "enemy", x: 900, y: groundY -70},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
