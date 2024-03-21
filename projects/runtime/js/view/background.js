var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
      var tree;
      var buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            
            //color of background
            var backgroundFill = draw.rect(canvasWidth,groundY,'darkblue');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            
            //creates 100 random stars that stay on the canvas
            for(var stars = 0; stars <= 100; stars++) {
                var circle = draw.circle(2, "white", "LightGray", 2);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);
            }
            
            //creates moon
            var moon = draw.bitmap("img/moon.png");
            moon.x = canvasWidth -150;
            moon.y = groundY - 600;
            moon.scaleX = 0.9;
            moon.scaleY = 0.9;
            background.addChild(moon);

            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            //creates buildings with random sizes
            for (var i = 0; i < 5; i++) {
                var buildingHeight = 300 * Math.random();
                var building = draw.rect(75, buildingHeight, "LightGray", "Black", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");
            tree.x = canvasWidth -200;
            tree.y = groundY -220;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            //allows tree to move
            tree.x = tree.x - 10;

            //makes tree come back on screen once gong off the screen
            if (tree.x < -300) {
            tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            //makes the buildings slowly moves toward Halle to give the parallax illusion
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x = building.x -= 1;
                //if function brings buildings back on screen
                if(building.x < -100) {
                    building.x = canvasWidth + 100;
                }
                // code to do something with each element
            }


        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
