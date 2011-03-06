(function() {
  var habraLinguist = HabraLinguist();
  if (habraLinguist.isHabraPage() && habraLinguist.isTopicPageAndUserIsLogged()) {
    chrome.extension.sendRequest({type: "init"}, function(response) {
      if (response.ok) {
        habraLinguist.bindHotKeys();
      }
    });
  }
})();