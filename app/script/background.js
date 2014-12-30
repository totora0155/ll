(function() {
  var aliases;

  aliases = null;

  chrome.omnibox.onInputStarted.addListener(function() {
    return chrome.storage.local.get('aliases', function(ret) {
      return aliases = (function(a) {
        var alias, line, lines, match, re, result, url, _i, _len;
        re = /(.*),(.*)/;
        result = {};
        lines = a.split("\n");
        for (_i = 0, _len = lines.length; _i < _len; _i++) {
          line = lines[_i];
          match = line.match(re);
          alias = match[1];
          url = match[2].trim();
          result[alias] = url;
        }
        return result;
      })(ret.aliases);
    });
  });

  chrome.omnibox.onInputChanged.addListener(function(txt, suggest) {
    var alias, reTxt, suggestions, url;
    suggestions = [];
    for (alias in aliases) {
      url = aliases[alias];
      reTxt = new RegExp(txt);
      if (reTxt.test(alias)) {
        suggestions.push({
          content: alias,
          description: "" + alias + " / " + url
        });
      }
    }
    return suggest(suggestions);
  });

  chrome.omnibox.onInputEntered.addListener(function(txt, a) {
    return chrome.tabs.update({
      url: aliases[txt]
    });
  });

  chrome.browserAction.onClicked.addListener(function() {
    return chrome.tabs.update({
      url: chrome.runtime.getURL('options.html')
    });
  });

}).call(this);

//# sourceMappingURL=background.js.map