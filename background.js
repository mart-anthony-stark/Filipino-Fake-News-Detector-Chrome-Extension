chrome.contextMenus.create({
  id: "select_txt",
  title: "Predict Fake News Probability",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == "select_txt" && clickData.selectionText) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        selection: clickData.selectionText,
      });
    });
  }
});
