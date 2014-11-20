/// <reference path="../Util/Constants.ts" />

/*******************************************
Authors: Keith Brewster & Jacqueline Richard
Class: World.ts
Created: 11/19/14
Last Updated: 11/19/14
Description: The class defining the physics
for the game
*******************************************/
module Objects {

    //Create a new physics world
    var world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);

    //Create a fixture definition for the surfaces
    var groundDef = new Box2D.Dynamics.b2FixtureDef;
    groundDef.density = 1.0;
    groundDef.friction = 0.5;
    groundDef.restitution = 0.2;

    //Create a body definition for the surfaces
    var bodyDef = new Box2D.Dynamics.b2BodyDef;
    bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
    bodyDef.position.x = Constants.STAGE_WIDTH / 2 / Constants.SCALE;

    //Define the floor and add it to the world
    groundDef.shape = Box2D.Collision.Shapes.b2PolygonShape.AsBox((600 / Constants.SCALE) / 2, (600 / Constants.SCALE) / 2);
    world.CreateBody(bodyDef).CreateFixture(groundDef);

    //Set the debug draw
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var debugDraw = new Box2D.Dynamics.b2DebugDraw();
    debugDraw.SetSprite(canvas.getContext("2d"));
    debugDraw.SetDrawScale(Constants.SCALE);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

}