var HabraLinguist = function(hWindow, hDocument) {

  var self = {};
  var form = null;

  self.isHabraPage = function() {
    return hDocument.domain == "habrahabr.ru";
  };

  self.isLoggedUser = function() {
    return $("div.header dl.panel-personal dt a.habrauser").length > 0;
  };

  self.isTopic = function() {
    return $("#viva-la-w3c div.blog-title h2.blog-header").length > 0;
  };

  var getPageData = function() {

    var topicElem = $("div.hentry h2.entry-title.single-entry-title span.topic");
    var authorElem = $("div.vcard.author.full a.fn.nickname.url span");

    return {
      author:     authorElem.html(),
      topic: {
        title:    topicElem.html(),
        url:      topicElem.attr('title')
      },
      selection:  getSelection().toString()
    };
  };

  var getSelection = function() {
    var selection = null;

    if (hWindow.getSelection) {
      selection = hWindow.getSelection();
    }
    else if (hDocument.getSelection) {
      selection = hDocument.getSelection();
    }
    else if (hDocument.selection) {
      selection = hDocument.selection.createRange().text;
    }

    return selection;
  };

  self.bindHotKeys = function() {

    $(hDocument).keydown(function(e) {

      if (e.ctrlKey && (e.keyCode || e.which) == 13) {
        var selection = getSelection();

        if (selection == null || selection.toString().length == 0) {
          return;
        }

        if (form == null) {
          form = HabraLinguistForm(getPageData);
        }

        if (form.isShown) {
          return;
        }

        form.show();
      }
    });
  };


  return self;
};
