(function() {
  var aliases, objectize;

  RegExp.quote = function(str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };

  aliases = {
    str: null,
    obj: null
  };

  objectize = function(str) {
    var key, line, lines, re, ret, val, _i, _len, _ref;
    re = /(.*),(.*)/;
    ret = {};
    lines = str.split("\n");
    for (_i = 0, _len = lines.length; _i < _len; _i++) {
      line = lines[_i];
      _ref = line.match(re).slice(1), key = _ref[0], val = _ref[1];
      ret[key] = val;
    }
    return ret;
  };

  chrome.omnibox.onInputStarted.addListener(function() {
    return chrome.storage.local.get('aliases', function(ret) {
      aliases.str = ret.aliases;
      return aliases.obj = objectize(aliases.str);
    });
  });

  chrome.omnibox.onInputChanged.addListener(function(txt, suggest) {
    var alias, reTxt, suggestions, url, _ref;
    reTxt = new RegExp(RegExp.quote(txt));
    suggestions = [];
    _ref = aliases.obj;
    for (alias in _ref) {
      url = _ref[alias];
      if (reTxt.test(alias)) {
        suggestions.push({
          content: alias,
          description: "" + alias + " / " + url
        });
      }
    }
    return suggest(suggestions);
  });

  chrome.omnibox.onInputEntered.addListener(function(txt) {
    var contains, setQuery, url;
    contains = txt.match(/^\+(.*)/);
    if (contains != null) {
      setQuery = {
        currentWindow: true,
        active: true
      };
      url = null;
      return chrome.tabs.query(setQuery, function(tabs) {
        aliases.str += "\n" + contains[1] + "," + tabs[0].url;
        return chrome.storage.local.set({
          aliases: aliases.str
        }, function() {});
      });
    } else {
      return chrome.tabs.update({
        url: aliases.obj[txt]
      });
    }
  });

  chrome.browserAction.onClicked.addListener(function() {
    return chrome.tabs.update({
      url: chrome.runtime.getURL('options.html')
    });
  });

}).call(this);

//# sourceMappingURL=background.js.map