// @flow

/*
 *  Description: PIXI Application
 *  Author: Kayac
 */

//  ============== Dependencies =========================
import './application.css';
import {Application} from 'pixi.js';

//  ============== Execution =========================
let application = undefined;


//  ============== Function =========================

/**
 *
 */
function initApplication() {
  if (!application) {
    application = new Application();
    application.view.classList.add('application');
    application.renderer.autoResize = true;
    document.body.appendChild(application.view);
  }
}

/**
 * Get PIXI Application.
 * @return {PIXI.Application}
 */
function getApplication() {
  return application;
}


//  ============== Export =========================
export {
  initApplication,
  getApplication,
};
