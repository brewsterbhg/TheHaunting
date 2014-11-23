/// <reference path="Util/Constants.ts" />
/// <reference path="Util/AssetManager.ts" />
/// <reference path="Objects/World.ts" />
/// <reference path="Objects/Room.ts" />
/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: Game.ts
Created: 11/19/14
Last Updated: 11/22/14
Description: The class that runs the main
logic for the game
*******************************************/
//Class level variables
var stage;
var roomContainer;

var keysPressed = {};
var gameState;

function preload() {
    initGame();
}

function initGame() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    var world;
}

function changeState(state) {
    gameState = state;
    switch (state) {
    }
}
//# sourceMappingURL=Game.js.map
