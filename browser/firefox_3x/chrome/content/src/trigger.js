(function() {
  $.noConflict();
  var habraLinguist = HabraLinguist();
  if (habraLinguist.isLoggedUser() && habraLinguist.isTopic()) {
    habraLinguist.bindHotKeys();
  }
})();
