(function() {
  $.noConflict();
  var habraLinguist = HabraLinguist();
  if (habraLinguist.isTopicPageAndUserIsLogged()) {
    habraLinguist.bindHotKeys();
  }
})();
