// @flow

/*
 *  Description: Entry
 *  Author: Kayac
 */

//  ============== Dependencies =========================
import './app.css';
import createApp from './facade/application';
import loader from './facade/load';
import imgToriel from './assets/toriel.png';
//  ============== Execution =========================
document.body.appendChild(createApp().view);

loader.add('toriel', imgToriel);


