/// <reference path="Util/Constants.ts" />
/// <reference path="Util/AssetManager.ts" />
/// <reference path="Objects/GameObject.ts" />
/// <reference path="Objects/Player.ts" />
/// <reference path="Objects/Monster.ts" />
/// <reference path="Objects/Room.ts" />
/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Game.ts
Created: 11/19/14
Last Updated: 12/07/14
Description: The class that runs the main
logic for the game
*******************************************/
//Class level variables
var stage;
var menuContainer;
var roomContainer;
var gameContainer;
var room;
var player;
var monster;
var currentFloor;
var aButtonGreen;
var aButtonRed;
var onStairs = false;
var onObject = false;
var path;
var obj;
var playerHiding = false;

var keysPressed = {};
var gameState;
var level;

/*
* Preload the necessary assets
*/
function preload() {
    Util.AssetManager.init();
    Util.AssetManager.loader.addEventListener("complete", initGame);
}

/*
* Set up the initial settings: canvas, state
*/
function initGame() {
    //Create the stage
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver();
    createjs.Ticker.setFPS(60);

    //Set game state
    changeState(Constants.MENU_STATE);

    //Set ticker
    createjs.Ticker.addEventListener("tick", gameLoop);

    //Add listeners for key press
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    //Set title screen
    menuContainer = new createjs.Container;
    var titleScreen = new createjs.Bitmap(Util.AssetManager.loader.getResult("title"));
    menuContainer.addChild(titleScreen);

    //Add play button
    var playButton = new createjs.Bitmap(Util.AssetManager.loader.getResult("play"));
    menuContainer.addChild(playButton);
    playButton.addEventListener("mouseover", mousePointer);
    playButton.addEventListener("mouseout", mouseDefault);
    playButton.addEventListener("click", playGame);

    //Add instructions button
    var instructionsButton = new createjs.Bitmap(Util.AssetManager.loader.getResult("instructions"));
    menuContainer.addChild(instructionsButton);
    instructionsButton.addEventListener("mouseover", mousePointer);
    playButton.addEventListener("mouseout", mouseDefault);
    stage.addChild(menuContainer);
    stage.update();
}

function playGame() {
    //Set play state and initial floor
    changeState(Constants.PLAY_STATE);
    level = Constants.LEVEL_ONE;
    currentFloor = Constants.FLOOR_THREE;

    //The container that holds the game sprites
    roomContainer = new createjs.Container;
    room = new Objects.Room(roomContainer, "house");
    roomContainer.addChild(room);

    //Player object
    player = new Objects.Player(roomContainer);
    roomContainer.addChild(player);
    player.currentFloor = currentFloor; //Set initial player y-position

    //Monster object
    monster = new Objects.Monster(roomContainer);
    roomContainer.addChild(monster);
    monster.x = 500;
    monster.y = Constants.FLOOR_ONE;
    stage.addChild(roomContainer);

    //The action button that shows when you're near a usable object
    aButtonGreen = new createjs.Bitmap(Util.AssetManager.loader.getResult("aButton_g"));
    stage.addChild(aButtonGreen);

    //Set to false initially
    aButtonGreen.visible = false;
    aButtonRed = new createjs.Bitmap(Util.AssetManager.loader.getResult("aButton_r"));
    stage.addChild(aButtonRed);

    //Set to false initially
    aButtonRed.visible = false;
}

/*
* This function checks if the player is colliding with any usable objects
* Checks what floor the user is on, then checks if they're colliding with
* anything on that floor (positions don't move, and are hardcoded in the
* constants class)
*/
function checkCollisions() {
    //Wall collisions
    if (player.x <= Constants.LEFT_WALL) {
        player.x = Constants.LEFT_WALL;
    }
    if (player.x >= Constants.RIGHT_WALL) {
        player.x = Constants.RIGHT_WALL;
    }
    if (currentFloor == Constants.FLOOR_ONE) {
        //Bottom of staircase one
        if (player.x > Constants.STAIRS_ONE && player.x < Constants.STAIRS_ONE + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 1;
        } else if (player.x > Constants.CUPBOARD_FLOOR_ONE && player.x < Constants.CUPBOARD_FLOOR_ONE + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 1;
        } else if (player.x > Constants.FRIDGE_FLOOR_ONE && player.x < Constants.FRIDGE_FLOOR_ONE + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 2;
        } else {
            onStairs = false;
            onObject = false;
            path = 0;
            obj = 0;
        }
    } else if (currentFloor == Constants.FLOOR_TWO) {
        //Bottom of staircase two
        if (player.x > Constants.STAIRS_TWO && player.x < Constants.STAIRS_TWO + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 2;
        } else if (player.x > Constants.STAIRS_ONE_TOP && player.x < Constants.STAIRS_ONE_TOP + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 3;
        } else if (player.x > Constants.SHOWER_FLOOR_TWO && player.x < Constants.SHOWER_FLOOR_TWO + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 3;
        } else if (player.x > Constants.CUPBOARD_FLOOR_TWO && player.x < Constants.CUPBOARD_FLOOR_TWO + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 4;
        } else {
            onStairs = false;
            onObject = false;
            path = 0;
        }
    } else if (currentFloor == Constants.FLOOR_THREE) {
        //Bottom of ladder one
        if (player.x > Constants.LADDER_ONE && player.x < Constants.LADDER_ONE + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 4;
        } else if (player.x > Constants.LADDER_TWO && player.x < Constants.LADDER_TWO + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 5;
        } else if (player.x > Constants.STAIRS_TWO_TOP && player.x < Constants.STAIRS_TWO_TOP + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 6;
        } else if (player.x > Constants.TUB_FLOOR_THREE && player.x < Constants.TUB_FLOOR_THREE + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 5;
        } else if (player.x > Constants.BED_FLOOR_THREE && player.x < Constants.BED_FLOOR_THREE + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 6;
        } else {
            onStairs = false;
            onObject = false;
            path = 0;
            obj = 0;
        }
    } else if (currentFloor == Constants.FLOOR_FOUR) {
        //Top of ladder one
        if (player.x > Constants.LADDER_ONE && player.x < Constants.LADDER_ONE + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 7;
        } else if (player.x > Constants.LADDER_TWO && player.x < Constants.LADDER_TWO + Constants.MOVE_WIDTH) {
            onStairs = true;
            path = 8;
        } else if (player.x > Constants.BED_FLOOR_FOUR && player.x < Constants.BED_FLOOR_FOUR + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 7;
        } else if (player.x > Constants.CUPBOARD_FLOOR_FOUR && player.x < Constants.BED_FLOOR_FOUR + Constants.MOVE_WIDTH) {
            onObject = true;
            obj = 8;
        } else {
            onStairs = false;
            onObject = false;
            path = 0;
            obj = 0;
        }
    }

    //Check monster collision
    if (monster.x > player.x - 5 && monster.x < player.x + 5) {
        if (monster.y == player.y) {
        }
    }
}

/*
* This function handles management of keys pressed. The only key it will handle
* is the "A" key for usable objects. It checks whether the user is on a path, or
* in front of an object, and acts accordingly
*/
function keyDown(event) {
    keysPressed[event.keyCode] = true;

    //Make sure the user is playing
    if (gameState == Constants.PLAY_STATE) {
        //If the flag onStairs is true (the user is on a travel path)
        if (onStairs && Constants.USE in keysPressed) {
            if (path != 0) {
                switch (path) {
                    case 1:
                        //First floor to second floor
                        player.x = Constants.STAIRS_ONE_TOP;
                        currentFloor = Constants.FLOOR_TWO;
                        break;
                    case 2:
                        //Second floor to third floor
                        player.x = Constants.STAIRS_TWO_TOP;
                        currentFloor = Constants.FLOOR_THREE;
                        break;
                    case 3:
                        //Second floor to first floor
                        player.x = Constants.STAIRS_ONE;
                        currentFloor = Constants.FLOOR_ONE;
                        break;
                    case 4:
                        //Third floor to fourth floor (ladder one)
                        player.x = Constants.LADDER_ONE;
                        currentFloor = Constants.FLOOR_FOUR;
                        break;
                    case 5:
                        //Third floor to fourth floor (ladder two)
                        player.x = Constants.LADDER_TWO;
                        currentFloor = Constants.FLOOR_FOUR;
                        break;
                    case 6:
                        //Third floor to second floor
                        player.x = Constants.STAIRS_TWO;
                        currentFloor = Constants.FLOOR_TWO;
                        break;
                    case 7:
                        //Fourth four to third floor (ladder one)
                        player.x = Constants.LADDER_ONE;
                        currentFloor = Constants.FLOOR_THREE;
                        break;
                    case 8:
                        //Fourth floor to third floor (ladder two)
                        player.x = Constants.LADDER_TWO;
                        currentFloor = Constants.FLOOR_THREE;
                        break;
                }

                //Set the new player y-position
                player.currentFloor = currentFloor;
            }
        } else if (onObject && Constants.USE in keysPressed) {
            if (obj != 0) {
                if (!playerHiding) {
                    player.visible = false;

                    //Set player hiding flag
                    playerHiding = true;
                    if (clock == null) {
                        var clock = new createjs.Sprite(Util.AssetManager.clockSpriteSheet);
                        stage.addChild(clock);
                    }
                    clock.x = player.x;
                    clock.y = player.y;
                    clock.gotoAndPlay("tick");
                    if (clock.currentFrame == 9) {
                        player.visible = true;
                        playerHiding = false;
                    }
                } else if (playerHiding) {
                    player.visible = true;
                    playerHiding = false;
                }
            }
        }
    }
}

/*
* After the user has released the use button, erase it
*/
function keyUp(event) {
    delete keysPressed[event.keyCode];
}

/**
* This function takes two points, and calculates the distance
*
**/
function distance(point1, point2) {
    //Get points
    var p1;
    var p2;
    var itemX;
    var itemY;
    var result;

    p1 = new createjs.Point();
    p2 = new createjs.Point();

    p1.x = point1.x;
    p1.y = point1.y;
    p2.x = point2.x;
    p2.y = point2.y;

    itemX = p2.x - p1.x;
    itemY = p2.y - p1.y;

    itemX = itemX * itemX;
    itemY = itemY * itemY;

    //Return the distance result
    result = Math.sqrt(itemX + itemY);
    return result;
}

/*
* Change the current game state
* @param state : the new state to switch to
*/
function changeState(state) {
    gameState = state;
    switch (state) {
        case Constants.MENU_STATE:
            break;
        case Constants.PLAY_STATE:
            break;
        case Constants.END_STATE:
            break;
    }
}

/*
* Checks the flag if a player is standing next to a usable object
* Show green use button if a travel path, red for a furnishing
*/
function checkActionButtons() {
    if (onStairs) {
        //Display the green use button
        aButtonGreen.visible = true;
        aButtonGreen.x = player.x + 20;
        aButtonGreen.y = player.y - 90;
    }
    if (!onStairs) {
        //Hide the use button
        aButtonGreen.visible = false;
    }
    if (onObject) {
        //Display the red use button
        aButtonRed.visible = true;
        aButtonRed.x = player.x;
        aButtonRed.y = player.y - 90;
    }
    if (!onObject) {
        //Hide the use button
        aButtonRed.visible = false;
    }
}

/*
* The main game loop. Update all objects, and check player collisions
*/
function gameLoop() {
    if (gameState == Constants.PLAY_STATE) {
        //Updates
        if (!playerHiding) {
            player.update();
        }
        monster.update(player.x, currentFloor, playerHiding);
        stage.update();
        checkCollisions();
        checkActionButtons();
    }
    if (level != Constants.LEVEL_ONE) {
        //During level 2 and level 3
    }
}

//Changing the cursor to pointer for hoverable objects
function mousePointer(e) {
    document.body.style.cursor = 'pointer';
}

//Changing the cursor back to default on mouse out
function mouseDefault(e) {
    document.body.style.cursor = 'default';
}
//# sourceMappingURL=Game.js.map
