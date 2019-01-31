import { GameLogicSize } from './../config.js';
import * as Vector from 'victor';
import { Sprite } from './../pixi/application.js';
import { ResourceManager } from './../foundation/resourceManager.js';
import * as Utils from './../foundation/utils.js';
import { Fish } from './fish.js';
import { TextSprite, TextStyle } from './../foundation/text.js';
import { Player } from './player.js';

function Aquarium(pixi_app, fishMaxCount) {

    let _isInit = false;
    let _isFinish = false;

    let _pixi_app = pixi_app;
    let _width = GameLogicSize[0];
    let _height = GameLogicSize[1];
    let _boundaryOffset = 150;

    let _player = undefined;
    let _playerInitVel = 2;
    let _playerPoint = 0;

    let _fishMaxCount = fishMaxCount;
    let _fishCurrentCount = fishMaxCount;
    let _fishMap = {};
    let _fishInitXArray = [_boundaryOffset * -1, _width + _boundaryOffset];
    let _fishOriPositiveArray = [1, 2, 3];
    let _fishOriNegativeArray = [-1, -2, -3];
    let _fishInitVelRange = [1, 4];
    let _fishFreezeMaxTime = 3;

    let _fishCountText, _fishPointText;

    console.log("aquarium: " + _width + ", " + _height);
    
    init();

    function init() {

        let bg = new PIXI.Sprite(ResourceManager.GetTexture("BG.jpg"));
        _pixi_app.stage.addChild(bg);

        // player
        let p_sprite = new Sprite(ResourceManager.GetTexture("7.png", "fish_items"));
        pixi_app.stage.addChild(p_sprite);

        _player = new Player("wulala", p_sprite, new Vector(_width/2, _height/2), new Vector(0, 0), _playerInitVel);
        console.log("player: " + _width/2 + ", " + _height/2);

        // fish
        for(let i=0; i<_fishMaxCount; i+=1) {

            let fish_level = (i%5)+2;
            let f_sprite = new Sprite(ResourceManager.GetTexture(fish_level.toString() + ".png", "fish_items"));
            pixi_app.stage.addChild(f_sprite);

            let fish = generateFish("fish_" + i, f_sprite, fish_level);
            _fishMap["fish_" + i] = fish;
        }

        // UI: text
        _fishCountText = new TextSprite("Remaining fish: " + _fishCurrentCount, new TextStyle({
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
            wordWrap: true,
            wordWrapWidth: 256,
            align: "Right"
          }));
        _pixi_app.stage.addChild(_fishCountText.Text);
        _fishCountText.Text.position.set(10, 0);
        //_fishCountText.Text.style = {fill: "black"};
        // _fishCountText.Text.style.wordWrap = true;
        // _fishCountText.Text.style.wordWrapWidth = 256;
        // _fishCountText.Text.style.align = "Left";  // align doesn't affect single line text.
        //_fishCountText.Text.style.breakWords = true;

        _fishPointText = new TextSprite("Points: " + _playerPoint, new TextStyle({
            fontFamily: "Arial",
            fontSize: 30,
            fill: "white",
            stroke: '#0033ff',
            strokeThickness: 3,
            wordWrap: true,
            wordWrapWidth: 256,
            align: "Right"
          }));
        _pixi_app.stage.addChild(_fishPointText.Text);
        _fishPointText.Text.position.set(_width-10, 0);
        _fishPointText.Text.anchor.set(1, 0)

        _isInit = true;
    }

    function generateFish(name, sprite, level) {

        let pos = new Vector(Utils.GetOneInArray(_fishInitXArray), Utils.GetRandomInt(_boundaryOffset, _height - _boundaryOffset));
        let ori = pos.x > 0 ? new Vector(Utils.GetOneInArray(_fishOriNegativeArray), 0) : new Vector(Utils.GetOneInArray(_fishOriPositiveArray), 0);
        let fish = new Fish(name, sprite, level,
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

    function collisionDetect() {
        if (!_player || _fishMap.length <= 0){
            return;
        }

        for(let i=0; i<_fishMaxCount; i+=1) {
            if (_fishMap["fish_" + i].IsDead || !_fishMap["fish_" + i].Sprite()) {
                //console.log("fish_" + i + " is dead.");
                continue;
            }

            if (Utils.HitRectangle(_fishMap["fish_" + i].Sprite(), _player.Sprite())) {
                pixi_app.stage.removeChild(_fishMap["fish_" + i].Sprite());
                _fishMap["fish_" + i].Dead();
                _player.Eat();

                addTotalPoints(_fishMap["fish_" + i]);
                _fishCurrentCount -= 1;
                updateFishCountUI();
            }
        }
    }

    function addTotalPoints(fish) {
        //console.log("You get " + fish.Point + ".");
        _playerPoint += fish.Point;
        updatePlayerPointUI();
    }

    function settleResult() {
        if (_fishCurrentCount <= 0) {
            _isFinish = true;
        }
    }


    /**
     * UI refresh
     */
    function updatePlayerPointUI() {
        if (!_fishPointText) {
            return;
        }

        _fishPointText.Text.text = "Points: " + _playerPoint;
    }

    function updateFishCountUI() {
        if (!_fishCountText) {
            return;
        }

        _fishCountText.Text.text = "Remaining fish: " + _fishCurrentCount;
    }

    return {
        // Start: function() {
        //     console.log("Aquarium Start!");
        //     init();
        // },
        Update: function(delta) {
            if (!_isInit || _isFinish) {
                return;
            }

            if (_player) {
                _player.Update(delta);
            }

            //console.log("Aquarium Update!");
            for(let i=0; i<_fishMaxCount; i+=1) {
                _fishMap["fish_" + i].Update(delta);
                redirectFishOutOfAquarium(_fishMap["fish_" + i]);
            }

            collisionDetect();

            settleResult();
        },
        Destroy: function() {
            
        }
    }
}

export {
    Aquarium
}