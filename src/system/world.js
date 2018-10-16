// @flow

/*
 *  Description: PIXI Application
 *  Author: Kayac
 */

//  ============== Dependencies =========================
import {World} from 'p2';

//  ============== Execution =========================
const world = new World({
  gravity: [0, -10],
});

//  ============== Function =========================

/**
 * Get P2 physical world
 * @return {p2.World}
 */
function getWorld() {
  return world;
}

//  ============== Export =========================
export default getWorld;

