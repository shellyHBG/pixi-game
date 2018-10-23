# PIXI-Game Project

Simple PIXI Application Setup For Game Developers.

## Description
---  
In this project, 
the file which first character in lowercase, 
is called *'Execution Script'*, 
and is responded for *'Display Execution Task Flow'*.  
Else if the file's first character is Uppercase,
called *'Function Library'*,
is responded for *'Provide Useful Functions or Classes'*. 

---
## Project Structure

### Core Module

The Module for low level abstraction layer.  
Such as Application, Event, Device, etc...

---
## Execution Flow

### Init Task
```
    init
        => event system init
        => resource loading
        => render process
```



---
## Built With

### System Core
* [EventEmitter3](https://github.com/primus/eventemitter3) - Event System

### Game Engine
* [PIXI.js](https://github.com/pixijs/pixi.js) - Render Engine
* [Howler.js](https://github.com/goldfire/howler.js) - Sound Engine
* [p2.js](https://github.com/schteppe/p2.js) - Physics Engine

### Build Tools
* [Webpack](https://webpack.js.org/) - Build Tools, ESM
* [Babel](https://babeljs.io/) - Compiler 
* [Flow](https://flow.org/) - Type Check
* [ESLint](https://eslint.org/) - Code Quality
