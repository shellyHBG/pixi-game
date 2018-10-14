// @flow
import './application.css';
import {Application} from 'pixi.js';

/**
 * Create PIXI Application object
 *    and set up default setting.
 *
 * @return {PIXI.Application}
 */
export default function createApp() {
  const app = new Application();
  app.view.classList.add('app');
  app.renderer.autoResize = true;
  return app.view;
}
