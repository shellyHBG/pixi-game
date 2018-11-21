import * as Vector from 'victor';

function Fish(name, sprite, pos, ori, vel) {

    let _name = name;
    let _sprite = sprite;
    let _orientation = ori; // vector2
    let _position = pos;    // vector2
    let _velocity = vel;

    let _freezeTime = 0;

    function orienteSprite() {
        if (_orientation.x > 0) {
            _sprite.scale.x = 1;
        }
        else if (_orientation.x < 0) {
            _sprite.scale.x = -1;
        }
    }

    return {
        Init: function() {
            console.log(_name + ", " + _sprite + ", " + _position + ", " + _orientation + ", " + _velocity);
            _sprite.position.set(_position.x, _position.y);
            orienteSprite();
        },
        Freeze: function(time) {
            _freezeTime = time;
        },
        Redirect: function(ori, vel) {
            _orientation = ori;
            _velocity = vel;
            //console.log(_sprite.scale)
            orienteSprite();
            //console.log(_name + " new orientation is " + _orientation[0] + ", " + _orientation[1] + "; new velocity is " + _velocity);
        },
        SwitchPosition: function(pos) {
            _position = pos;
            //console.log(_name + " new position is " + _position[0] + ", " + _position[1]);
        },
        Move: function(delta) {

            _position.add(new Vector(_orientation.x * _velocity * delta, _orientation.y * _velocity * delta));
            _sprite.position.set(_position.x, _position.y);
            //console.log(_name + " new position is " + _position[0] + ", " + _position[1]);
        },
        Transform: function() {
            return {
                name: _name,
                pos: _position,
                ori: _orientation,
                vel: _velocity,
            }
        },
        Update: function(delta) {
            if (_freezeTime > 0) {
                _freezeTime -= delta;
                return;
            }
            this.Move(delta);
        }
    }
}

export {
    Fish
}