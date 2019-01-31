import { GameLogicSize } from './config.js';
import { Application, Container } from './pixi/application.js';
import { ResourceManager } from './foundation/resourceManager.js';
import { Game } from './game/game.js';
import * as EventSystem from './foundation/eventEmitter.js';

(function startup() {

  const canvasParent = document.getElementById('pixi-game');

  let logicalWidth = GameLogicSize[0];
  let logicalHeight = GameLogicSize[1];

  let currentWidth;
  let currentHeight;

  // Create a Pixi Application
  let app = new Application({
    width: logicalWidth,
    height: logicalHeight,
    antialias: true,
    transparent: false,
    roundPixels: true,
    resolution: window.devicePixelRatio || 1
  });
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

  // Add the canvas that Pixi automatically created for you to the HTML document
  canvasParent.appendChild(app.view);
  app.renderer.view.id = 'pixi-canvas';

  // Game run listener
  EventSystem.Once(EventSystem.EventType.Game_Run, loadComplete, this);
  EventSystem.Once(EventSystem.EventType.Game_Resize, pixiResize, this);

  EventSystem.Emit(EventSystem.EventType.Game_Resize);

  // load resource
  ResourceManager.Init();

  function loadComplete() {

    //Start the game loop by adding the `gameLoop` function to
    //Pixi's `ticker` and providing it with a `delta` argument.
    app.ticker.add(delta => gameLoop(delta));

    Game.Run(app);
  }

  function gameLoop(delta) {
    EventSystem.Emit(EventSystem.EventType.Game_Loop, delta);
  }

  function pixiResize(){

    let scaleFactor = Math.min(
      canvasParent.offsetWidth / logicalWidth,
      canvasParent.offsetHeight / logicalHeight
    );

    //console.log("scale: " + scaleFactor);

    currentWidth = Math.ceil(logicalWidth * scaleFactor);
    currentHeight = Math.ceil(logicalHeight * scaleFactor);

    app.renderer.view.style.width = `${currentWidth}px`;
    app.renderer.view.style.height = `${currentHeight}px`;

    app.renderer.resize(currentWidth, currentHeight);

    app.stage.scale.set(scaleFactor);

    console.log("render: " + currentWidth + ", " + currentHeight);
  };

  window.onresize = function() {
    EventSystem.Emit(EventSystem.EventType.Game_Resize);
  };

})();

