(function() {

  var UrlbarIcon = {
    init: function() {
      var doc = window.document;
      var icon = doc.getElementById("habralinguist-iconbox"),
          urlBar = doc.getElementById("urlbar-icons"),
          mainWindow = doc.getElementById("main-window"),
          addressPanel = doc.createElement("box"),
          bookmarkStar = doc.getElementById("star-button");

      mainWindow.appendChild(icon);

      addressPanel.setAttribute("id", "habralinguist-addressbarpanel");
      addressPanel.appendChild(icon);

      // Browsers without 'star button' are also supported
      urlBar.insertBefore(addressPanel, bookmarkStar || null);
      icon.hidden = true;
    },

    draw: function() {
      var icon = window.document.getElementById("habralinguist-iconbox");
      var isHabraPage = (gBrowser.contentDocument.domain == "habrahabr.ru") &&
          (gBrowser.contentDocument.getElementById('comment_form') != null);

      icon.hidden = !isHabraPage;
    }
  };

  var FirefoxUtils = {
    loadResource: function(uri) {
      var ioService = Components.classes["@mozilla.org/network/io-service;1"]
          .getService(Components.interfaces.nsIIOService);

      var scriptableStream = Components
          .classes["@mozilla.org/scriptableinputstream;1"]
          .getService(Components.interfaces.nsIScriptableInputStream);

      var utf8Converter = Components.classes["@mozilla.org/intl/utf8converterservice;1"].
          getService(Components.interfaces.nsIUTF8ConverterService);

      var channel = ioService.newChannel(uri, null, null);
      var input = channel.open();
      scriptableStream.init(input);

      var resource = scriptableStream.read(input.available());
      scriptableStream.close();
      input.close();

      return utf8Converter.convertURISpecToUTF8(resource, "UTF-8");
    },

    attachCSS: function(uri, doc) {
      var css = FirefoxUtils.loadResource(uri);

      var style = doc.createElement("style");
      style.setAttribute("type", "text/css");
      style.innerHTML = css;
      doc.getElementsByTagName("head")[0].appendChild(style);
    },

    attachScript: function(uri, doc) {
      var js = FirefoxUtils.loadResource(uri);

      var script = doc.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.innerHTML = js;
      doc.getElementsByTagName("head")[0].appendChild(script);
    },

    isTopLevel: function (event) {
      var doc = event.target,
          tabs = gBrowser.browsers;

      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].contentDocument == doc) {
          return true;
        }
      }

      return false;
    }
  };

  function onPageLoaded(e) {
    var doc = e.target;
    if (doc.domain != "habrahabr.ru") {
      return;
    }

    if (!FirefoxUtils.isTopLevel(e)) {
      return;
    }

    var tabIndex = gBrowser.getBrowserIndexForDocument(doc);
    if (tabIndex < 0) {
      return;
    }

    FirefoxUtils.attachCSS('resource://habralinguist/src/form.css', doc);

    FirefoxUtils.attachScript("resource://habralinguist/lib/jquery-1.5.min.js", doc);
    FirefoxUtils.attachScript("resource://habralinguist/lib/jaml.js", doc);
    FirefoxUtils.attachScript("resource://habralinguist/lib/simplemodal.1.4.1.min.js", doc);

    FirefoxUtils.attachScript("resource://habralinguist/src/app.js", doc);
    FirefoxUtils.attachScript("resource://habralinguist/src/form.js", doc);
    FirefoxUtils.attachScript("resource://habralinguist/src/trigger.js", doc);
  }

  function onFirefoxStarted() {
    UrlbarIcon.init();

    var appcontent = document.getElementById("appcontent");
    appcontent.addEventListener("DOMContentLoaded", onPageLoaded, false);
    appcontent.addEventListener("DOMContentLoaded", UrlbarIcon.draw, false);

    var container = gBrowser.tabContainer;
    container.addEventListener("TabSelect", UrlbarIcon.draw, false);

    window.removeEventListener("load", onFirefoxStarted, false);
  }

  window.addEventListener("load", onFirefoxStarted, false);
})();
