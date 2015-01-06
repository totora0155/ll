RegExp.quote = (str) ->
  str.replace /([.?*+^$[\]\\(){}|-])/g, "\\$1"

aliases =
  str: null
  obj: null

objectize = (str) ->
  re = /(.*),(.*)/
  ret = {}

  lines = str.split "\n"
  for line in lines when line isnt '' and re.test line
    [key, val] = line.match(re)[1..]
    ret[key] = val unless key is '' or val is ''

  ret

chrome.omnibox.onInputStarted.addListener ->
  chrome.storage.local.get 'aliases', (ret) ->
    aliases.str = ret.aliases
    aliases.obj = objectize(aliases.str)

chrome.omnibox.onInputChanged.addListener (txt, suggest) ->
  reTxt = new RegExp RegExp.quote(txt)
  suggestions = []

  for alias, url of aliases.obj
    if reTxt.test alias
      suggestions.push
        content: alias,
        description: "#{alias} / #{url}"

  suggest suggestions

chrome.omnibox.onInputEntered.addListener (txt) ->
  contains = txt.match /^\+(.*)/
  if contains?
    query = {currentWindow: true, active: true}
    url = null

    chrome.tabs.query query, (tabs) ->
      intervalId = setInterval ->
        if aliases.str?
          clearInterval intervalId
          aliases.str += "\n#{contains[1]},#{tabs[0].url}"
          chrome.storage.local.set {aliases: aliases.str}, ->
      , 100
  else
    chrome.tabs.update url: aliases.obj[txt]

chrome.browserAction.onClicked.addListener ->
  chrome.tabs.update url: chrome.runtime.getURL 'options.html'
