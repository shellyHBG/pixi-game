import { Application } from './pixi/application.js';
import { ResourceManager } from './foundation/resourceManager.js';
import { Game } from './game/game.js';

(function startup() {

  //Create a Pixi Application
  let app = new Application({
    width: 512,
    height: 512,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);

  // load resource: atlas
  ResourceManager.Init(loadComplete);

  function loadComplete() {
    Game.Run();
  }

})();

