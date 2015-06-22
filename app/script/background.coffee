aliases = []

chrome.omnibox.onInputStarted.addListener ->
  chrome.storage.sync.get 'aliases', (res) -> aliases = res.aliases

chrome.omnibox.onInputChanged.addListener (txt, suggest) ->
  suggestions = _.chain aliases
    .filter (obj) ->
      re = new RegExp txt
      re.test obj.$alias
    .sortBy (obj) -> obj.$count
    .reverse()
    .map (obj) ->
      content: obj.$alias
      description: obj.$title
    .value()
  suggest suggestions

chrome.omnibox.onInputEntered.addListener (txt) ->
  idx = _.findIndex aliases, {$alias: txt}
  aliases[idx].$count++
  chrome.tabs.update {url: aliases[idx].$url}
  chrome.storage.sync.set {aliases}, ->
