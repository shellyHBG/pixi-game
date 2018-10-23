// @flow

/*
 * Description: Event System
 *  See [EventEmitter3](https://github.com/primus/eventemitter3).
 *
 * Author: Kayac
 */

//  =========== Dependencies ===========
import EventEmitter from 'eventemitter3';

//  =========== Storage ===========
//  Event System
const system: EventEmitter = Object.freeze( new EventEmitter() );

//  =========== Functions ===========

/**
 *  Get Event System
 * @return {EventEmitter}
 */
function getSystem() : EventEmitter {
  return system;
}

//  =========== Export ===========
export {
  getSystem,
};
