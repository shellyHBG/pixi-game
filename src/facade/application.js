// @flow

/*
 *  Description: Interface for Getting PIXI Application
 *  Author: Kayac
 */

//  ============== Dependencies =========================
import {Application} from 'pixi.js';

//  ============== Function =========================

/**
 * Create PIXI Application object
 *    and set up default setting.
 *
 * @return {PIXI.Application}
 */
function createApp() {
  const app = new Application();
  app.view.classList.add('app');
  app.renderer.autoResize = true;
  return app;
}

//  ============== Export =========================
export default createApp;
