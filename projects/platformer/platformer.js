$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    for (let i = 100; i < canvas.width; i += 100) {
      createPlatform(i, canvas.height, -1, -canvas.height);
     }
    for (let i = 100; i < canvas.height; i += 100) {
       createPlatform(canvas.width, i, -canvas.width, -1);
     }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////


    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    //route around first coin
    createPlatform(200, 850, 200, 10);
    createPlatform(400, 685, 10, 175);
    createPlatform(140, 800, 20, 10);
    createPlatform(200, 850, 10, 250);
    createPlatform(400, 200, 10, 300);
    
    //route to second coin
    createPlatform(600, 600, 250, 10);
    createPlatform(850, 100, 10, 510);
    createPlatform(750, 200, 10, 305);
    createPlatform(830, 500, 20, 10);
    createPlatform(760, 450, 20, 10);
    createPlatform(830, 400, 20, 10);
    createPlatform(760, 350, 20, 10);
    createPlatform(830, 300, 20, 10);
    createPlatform(760, 250, 20, 10);
    createPlatform(830, 200, 20, 10);
    createPlatform(100, 100, 600, 10);
    createPlatform(0, 400, 100, 10);
    createPlatform(100, 250, 10, 160);
    createPlatform(0, 300, 10, 10);
    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)
    createCollectable('grace', 230, 900);
    var dataBase = createCollectable('database', 100, 50);
    var kennedi = createCollectable('kennedi', 600, 300);
   kennedi = false;



    //box is removed once second coing (database) is collected. Spawns in third coin (kennedi).

    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)
    createCannon('top', 465, 650, 40, 50);
    createCannon('right', 300, 1200, 40, 10);
    createCannon('right', 500, 1500, 40, 10);



    
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
