chrome.browserAction.onClicked.addListener(() => {
  const id = chrome.app.getDetails().id;
  const path = `chrome-extension://${id}/timeline.html`;
  window.open(path, '_blank');
});
