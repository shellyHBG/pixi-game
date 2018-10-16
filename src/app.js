// @flow

/*
 *  Description: Entry
 *  Author: Kayac
 */

//  ============== Dependencies =========================

import loader from './system/load';
import imgToriel from './assets/toriel.png';
import {getApplication, initApplication} from './system/application';
import getWorld from './system/world';
import {Body, Box, Plane} from 'p2';
import {Container, Graphics} from 'pixi.js';

//  ============== Execution =========================

initApplication();

loader.add('toriel', imgToriel);

loader.load(function(loader, resources) {
  const world = getWorld();
  // Add a box
  const boxShape = new Box({width: 2, height: 1});
  const boxBody = new Body({
    mass: 1,
    position: [0, 2],
    angularVelocity: 1,
  });
  boxBody.addShape(boxShape);
  world.addBody(boxBody);

  // Add a plane
  const planeShape = new Plane();
  const planeBody = new Body({position: [0, -1]});
  planeBody.addShape(planeShape);
  world.addBody(planeBody);

  let zoom = 100;

  const container = new Container();
  container.position.x = getApplication().renderer.width/2; // center at origin
  container.position.y = getApplication().renderer.height/2;
  container.scale.x = zoom; // zoom in
  container.scale.y = -zoom; // Note: we flip the y axis to make "up" the physics "up"
  const graphics = new Graphics();
  graphics.beginFill(0xff0000);
  graphics.drawRect(-boxShape.width/2, -boxShape.height/2, boxShape.width, boxShape.height);
  container.addChild(graphics);

  getApplication().stage.addChild(container);

  animate();

  // Animation loop
  function animate(t) {
    t = t || 0;
    requestAnimationFrame(animate);
    // Move physics bodies forward in time
    world.step(1/60);
    // Transfer positions of the physics objects to Pixi.js
    graphics.position.x = boxBody.position[0];
    graphics.position.y = boxBody.position[1];
    graphics.rotation = boxBody.angle;
    // Render scene
  }
});


