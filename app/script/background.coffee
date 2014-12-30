aliases = null

chrome.omnibox.onInputStarted.addListener ->
  chrome.storage.local.get 'aliases', (ret) ->
    aliases = do (a = ret.aliases)->
      re = /(.*),(.*)/
      result = {}

      lines = a.split "\n"
      for line in lines
        match = line.match re
        alias = match[1]
        url = match[2].trim()

        result[alias] = url

      result

chrome.omnibox.onInputChanged.addListener (txt, suggest) ->
  suggestions = []

  for alias, url of aliases
    reTxt = new RegExp txt

    if reTxt.test alias
      suggestions.push
        content: alias,
        description: "#{alias} / #{url}"

  suggest suggestions

chrome.omnibox.onInputEntered.addListener (txt, a) ->
  chrome.tabs.update url: aliases[txt]

chrome.browserAction.onClicked.addListener ->
  chrome.tabs.update url: chrome.runtime.getURL 'options.html'
