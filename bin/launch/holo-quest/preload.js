const process = require("process");
const path = require("path");

const electronRemoteModulePath = path.resolve(
  process.resourcesPath,
  "app.asar/node_modules/@electron/remote",
);
console.log("Path of @electron/remote module:", electronRemoteModulePath);

const remote = require(electronRemoteModulePath);
const webContents = remote.getCurrentWebContents();

// Prepare (serializable!) callback
const callback = () => {
  const activated = navigator.userActivation.isActive;
  const focused = document.hasFocus();
  console.log(
    `User gesture activation callback called.\nUser activation active: ${activated}\nElement focused: ${focused}`,
  );

  document.documentElement.requestPointerLock().then(
    () => console.log("Acquiring pointer lock succeeded."),
    (e) => console.error("Acquiring pointer lock failed:", e),
  );
};

const triggerCallback = () =>
  webContents.executeJavaScript(`(${callback.toString()})();`, true);

const checkFocus = () => {
  if (!document.hasFocus()) {
    requestAnimationFrame(checkFocus);
    return;
  }

  triggerCallback();
};

requestAnimationFrame(checkFocus);
