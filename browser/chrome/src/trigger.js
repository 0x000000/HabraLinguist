(function() {
  var habraLinguist = HabraLinguist(window, document);
  if (habraLinguist.isHabraPage() && habraLinguist.isLoggedUser() && habraLinguist.isTopic()) {
    chrome.extension.sendRequest({type: "init"}, function(response) {
      if (response.ok) {
        habraLinguist.bindHotKeys();
      }
    });
  }
})();