/// <reference path="Util/Constants.ts" />
/// <reference path="Util/AssetManager.ts" />
/// <reference path="Objects/World.ts" />
/// <reference path="Objects/GameObject.ts" />
/// <reference path="Objects/Player.ts" />
/// <reference path="Objects/Room.ts" />
/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Game.ts
Created: 11/19/14
Last Updated: 11/23/14
Description: The class that runs the main
logic for the game
*******************************************/
//Class level variables
var stage;
var roomContainer;
var room;
var player;

var keysPressed = {};
var gameState;

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
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver();
    createjs.Ticker.setFPS(60);

    //createjs.Ticker.addEventListener("tick", gameLoop);
    roomContainer = new createjs.Container;
    room = new Objects.Room(roomContainer, "temp_room");
    roomContainer.addChild(room);
    player = new Objects.Player(roomContainer);
    roomContainer.addChild(player);
    stage.addChild(roomContainer);
    stage.update();
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
//# sourceMappingURL=Game.js.map
