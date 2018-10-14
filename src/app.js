// @flow

/*
 *  Description: Entry
 *  Author: Kayac
 */

//  ============== Dependencies =========================
import './application.css';
import createApp from './facade/application';

//  ============== Execution =========================
document.body.appendChild(createApp().view);


