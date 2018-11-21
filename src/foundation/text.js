import { Text, TextStyle } from './../pixi/application.js';
import * as Vector from 'victor';

function TextSprite(text, textStyle) {

    let _object = new Text(text, textStyle);

    return {
        Text: _object,
        SetText: function(text) {
            _object.text = text;
        },
        SetStyle: function(style) {
            _object.style = style;
        },
        SetPosition: function(pos) {
            _object.position.set(pos.x, pos.y);
        }
    }
}

export {
    TextSprite, TextStyle
}