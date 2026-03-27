const { requestResetIdleTime } = require('/opt/kiosk-browser/resources/app.asar/src/js/renderer/resetIdleTime');

const events = [
  "pointerover",
  "pointerenter",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointercancel",
  "pointerout",
  "pointerleave",
];

function handleEvent(e) {
//  console.log(`resetting idle time (cause: ${e.type})`);
  requestResetIdleTime(performance.now());
}

function registerEventHandler(type) {
  console.log(`Registering idle reset for ${type} event`);
  window.addEventListener(type, handleEvent, {capture: true});
}

events.forEach(registerEventHandler);
