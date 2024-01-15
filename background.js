let extensionWindow = null,
  extensionTab = null;
var Filter = {
  generateRootUrl: function () {
    return `https://www.xiaohongshu.com/explore`;
  },
  openAppWindow: function (e) {
    extensionWindow
      ? e && chrome.windows.update(extensionWindow, { focused: !0 })
      : chrome.windows.create(
          { url: e, width: 414, height: 896, type: "popup" },
          async function (e) {
            (extensionWindow = e.id), (extensionTab = e.tabs[0].id);
            chrome.windows.onFocusChanged.addListener(function (windowId) {}, {
              id: extensionWindow,
              windowTypes: ["popup"],
            });
            chrome.windows.update(extensionWindow, {});
          }
        );
  },
};
chrome.windows.onRemoved.addListener((e) => {
  e == extensionWindow && ((extensionWindow = null), (extensionTab = null));
}),
  chrome.action.onClicked.addListener(async function (e) {
    var t = Filter.generateRootUrl();
    Filter.openAppWindow(t);
  });

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL("https://chromewebstore.google.com");
  }
});
