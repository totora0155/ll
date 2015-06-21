aliases = []

chrome.omnibox.onInputStarted.addListener ->
  chrome.storage.sync.get 'aliases', (res) -> aliases = res.aliases

chrome.omnibox.onInputChanged.addListener (txt, suggest) ->
  suggestions = _.chain aliases
  .filter (obj) ->
    re = new RegExp txt
    re.test obj.$alias
  .map (obj) ->
    content: obj.$alias
    description: obj.$title
  .value()
  suggest suggestions

chrome.omnibox.onInputEntered.addListener (txt) ->
  url = _.result _.findWhere(aliases, {$alias: txt}), '$url'
  chrome.tabs.update {url}
