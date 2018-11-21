import { Keyboard } from './../foundation/keyboard.js';
import * as Vector from 'victor';

function Player(name, sprite, pos, ori, vel) {

    let _name = name;
    let _sprite = sprite;
    let _orientation = ori; // vector2
    let _position = pos;    // vector2

    let _moveVelocity = vel;
    let _velocity = 0;

    let _move = 0; // 0-4
    let _moveDir = [0, 0, 0, 0]  // left right up down

    let left = Keyboard("a"),
        up = Keyboard("w"),
        right = Keyboard("d"),
        down = Keyboard("s");

    InitKeyboardControl();
    _sprite.position.set(_position.x, _position.y);

    function InitKeyboardControl() {

        // left
        left.press = ()=> {
            console.log("left press");
            _move += 1;
            _moveDir[0] = 1;
        };
        left.release = ()=> {
            _move -= 1;
            _moveDir[0] = 0;
        };

        //Right
        right.press = ()=> {
            console.log("right press");
            _move += 1;
            _moveDir[1] = 1;
        };
        right.release = () => {
            _move -= 1;
            _moveDir[1] = 0;
        };

        //Up
        up.press = () => {
            console.log("up press");
            _move += 1;
            _moveDir[2] = 1;
        };
        up.release = () => {
            _move -= 1;
            _moveDir[2] = 0;
        };

        //Down
        down.press = () => {
            console.log("left down");
            _move += 1;
            _moveDir[3] = 1;
        };
        down.release = () => {
            _move -= 1;
            _moveDir[3] = 0;
        };
    }

    return {
        Move: function(delta) {
            if (_move <= 0) {
                _velocity = 0;
                return;
            }

            _velocity = _moveVelocity;
            let ox = _moveDir[0] * -1 + _moveDir[1];
            let oy = _moveDir[2] * -1 + _moveDir[3];
            _orientation = new Vector(ox, oy);

            _position.add(new Vector(_orientation.x * _velocity * delta, _orientation.y * _velocity * delta));
            _sprite.position.set(_position.x, _position.y);
        },
        Update: function(delta) {
            this.Move(delta);
        },
        Transform: function() {
            return {
                name: _name,
                pos: _position,
                ori: _orientation,
                vel: _velocity,
            }
        },
    }
}

export {
    Player
}