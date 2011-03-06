var HabraLinguist = function() {

  var self = {};
  var form = null;

  self.isHabraPage = function() {
    return document.domain == "habrahabr.ru";
  };

  self.isTopicPageAndUserIsLogged = function() {
    return jQuery("#comment_form").length > 0;
  };

  var getPageData = function() {

    var topicElem = jQuery("div.hentry h2.entry-title.single-entry-title span.topic");
    var authorElem = jQuery("div.vcard.author.full a.fn.nickname.url span");

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

    if (window.getSelection) {
      selection = window.getSelection();

      if (jQuery.browser.mozzila) { // firefox 3.x selection bugfix
        var range = selection.getRangeAt(0);
        selection.removeAllRanges();
        range.deleteContents();
      }
    }
    else if (document.getSelection) {
      selection = document.getSelection();
    }
    else if (document.selection) {
      selection = document.selection.createRange().text;
    }

    return selection;
  };

  self.bindHotKeys = function() {

    jQuery(document).keydown(function(e) {

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
