(function() {
  if (HabraLinguist.isLoggedUser() && HabraLinguist.isTopic()) {
    chrome.extension.sendRequest({type: "init"}, function(response) {
      if (response.ok) {
        HabraLinguist.bindHotKeys();
      }
    });
  }
})();