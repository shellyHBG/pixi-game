import * as Vector from 'victor';
import { Sprite } from './../pixi/application.js';
import { ResourceManager } from './../foundation/resourceManager.js';
import * as Utils from './../foundation/utils.js';
import { Fish } from './fish.js';
import { TextSprite, TextStyle } from './../foundation/text.js';
import { Player } from './player.js';

function Aquarium(pixi_app, fishMaxCount) {

    let _isInit = false;
    let _pixi_app = pixi_app;
    let _width = pixi_app.renderer.screen.width;
    let _height = pixi_app.renderer.screen.height;
    let _boundaryOffset = 150;

    let _player = undefined;
    let _playerInitVel = 2;

    let _fishMaxCount = fishMaxCount;
    let _fishMap = {};
    let _fishInitXArray = [_boundaryOffset * -1, _width + _boundaryOffset];
    let _fishOriPositiveArray = [1, 2, 3];
    let _fishOriNegativeArray = [-1, -2, -3];
    let _fishInitVelRange = [1, 4];
    let _fishFreezeMaxTime = 3;

    let _fishCountText;

    init();

    function init() {

        let bg = new PIXI.Sprite(ResourceManager.GetTexture("BG.jpg"));
        _pixi_app.stage.addChild(bg);

        // player
        let p_sprite = new Sprite(ResourceManager.GetTexture("7.png", "fish_items"));
        pixi_app.stage.addChild(p_sprite);

        _player = new Player("wulala", p_sprite, new Vector(_width/2, _height/2), new Vector(0, 0), _playerInitVel);

        // fish
        for(let i=0; i<_fishMaxCount; i+=1) {

            let f_sprite = new Sprite(ResourceManager.GetTexture(((i%5)+2) + ".png", "fish_items"));
            pixi_app.stage.addChild(f_sprite);

            let fish = generateFish("fish_" + i, f_sprite);
            _fishMap["fish_" + i] = fish;
        }

        // UI: text
        _fishCountText = new TextSprite("Remaining fish: " + _fishMaxCount, new TextStyle({
            fontFamily: "Arial",
            fontSize: 30,
            fill: "white",
            stroke: '#0033ff',
            strokeThickness: 3,
            // dropShadow: true,
            // dropShadowColor: "#000000",
            // dropShadowBlur: 4,
            // dropShadowAngle: Math.PI / 6,
            // dropShadowDistance: 6,
          }));
        _pixi_app.stage.addChild(_fishCountText.Text);
        //_fishCountText.Text.style = {fill: "black"};
        _fishCountText.Text.style.wordWrap = true;
        _fishCountText.Text.style.wordWrapWidth = 256;
        _fishCountText.Text.style.align = "Left";  // align doesn't affect single line text.
        //_fishCountText.Text.style.breakWords = true;

        _isInit = true;
    }

    function generateFish(name, sprite) {

        let pos = new Vector(Utils.GetOneInArray(_fishInitXArray), Utils.GetRandomInt(_boundaryOffset, _height - _boundaryOffset));
        let ori = pos.x > 0 ? new Vector(Utils.GetOneInArray(_fishOriNegativeArray), 0) : new Vector(Utils.GetOneInArray(_fishOriPositiveArray), 0);
        let fish = new Fish(name, sprite,
                            pos, ori, Utils.GetRandomInt(_fishInitVelRange[0], _fishInitVelRange[1]));
        fish.Init();

        return fish;
    }

    function redirectFishOutOfAquarium(fish) {
        if (Utils.IsNumInRange(fish.Transform().pos.x, _boundaryOffset * -1, _width + _boundaryOffset) && 
            Utils.IsNumInRange(fish.Transform().pos.y, _boundaryOffset * -1, _height + _boundaryOffset)) {
            return;
        }

        //console.log(fish.name + " is out of aquarium.");
        fish.SwitchPosition(new Vector(fish.Transform().pos.x > 0 ? _fishInitXArray[1] : _fishInitXArray[0], Utils.GetRandomInt(_boundaryOffset, _height - _boundaryOffset)));
        fish.Redirect(new Vector(fish.Transform().ori.x*-1, fish.Transform().ori.y*-1), Utils.GetRandomInt(_fishInitVelRange[0], _fishInitVelRange[1]));
        fish.Freeze(Utils.GetRandomInt(0, _fishFreezeMaxTime));
    }

    return {
        // Start: function() {
        //     console.log("Aquarium Start!");
        //     init();
        // },
        Update: function(delta) {
            if (!_isInit) {
                return;
            }

            if (_player) {
                _player.Update(delta);
            }

            for(let i=0; i<_fishMaxCount; i+=1) {
                _fishMap["fish_" + i].Update(delta);
                redirectFishOutOfAquarium(_fishMap["fish_" + i]);
            }
        }
    }
}

export {
    Aquarium
}