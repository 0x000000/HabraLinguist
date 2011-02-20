var HabraLinguist = {

  isLoggedUser: function() {
    return $("div.header dl.panel-personal dt a.habrauser").length > 0;
  },

  isTopic: function() {
    return $("#viva-la-w3c div.blog-title h2.blog-header").length > 0;
  },

  getPageData: function() {

    var topicElem = $("div.hentry h2.entry-title.single-entry-title span.topic");
    var authorElem = $("div.vcard.author.full a.fn.nickname.url span");

    return {
      author:     authorElem.html(),
      topic: {
        title:    topicElem.html(),
        url:      topicElem.attr('title')
      },
      selection:  HabraLinguist.getSelection().toString()
    };
  },

  getSelection: function() {
    var selection = null;

    if (window.getSelection) {
      selection = window.getSelection();
    }
    else if (document.getSelection) {
      selection = document.getSelection();
    }
    else if (document.selection) {
      selection = document.selection.createRange().text;
    }

    return selection;
  },

  bindHotKeys: function() {

    $("body:not(#comment_form)").keydown(function(e) {

      if (e.ctrlKey && (e.keyCode || e.which) == 13) {
        var selection = HabraLinguist.getSelection();

        if (selection == null || selection.toString().length == 0) {
          return;
        }

        if (HabraLinguist.Form.isShown) {
          return;
        }

        HabraLinguist.Form.show();
      }
    });
  }

};
