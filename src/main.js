import { Application } from './pixi/application.js';
import { ResourceManager } from './foundation/resourceManager.js';
import { Game } from './game/game.js';
import * as EventSystem from './foundation/eventEmitter.js';

(function startup() {

  //Create a Pixi Application
  let app = new Application({
    width: 1024,
    height: 576,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);

  // Game run listener
  EventSystem.Once(EventSystem.EventType.Game_Run, loadComplete, this);

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

})();

