﻿/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: AssetManager.ts
Created: 11/22/14
Last Updated: 11/26/14
Description: This class loads and manages
the game assets
*******************************************/

module Util {
    export class AssetManager {

        static loader;
        static spriteSheet;

        //Set up the manifest to load
        static manifest = [{ id: "temp_room", src: "Assets/Images/room_temp.jpg" },
            { id: "temp_hero", src: "Assets/Images/hero_temp.jpg" }];

        //On initial game load
        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.manifest);
        }
    }
}