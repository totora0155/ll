getDatas = ->
  new Promise (resolve, reject) ->
    if chrome.storage?
      chrome.storage.local.get 'aliases', (ret) ->
        resolve ret
    else
      resolve
        aliases: "alias1,http://***\nalias2,http://***"

setDatas = (datas) ->
  if chrome.storage?
    chrome.storage.local.set datas
  else
    console.log datas

getDatas()
.then (ret) ->
  app = new Vue
    el: '#ctrl'
    data:
      aliases: ret.aliases
    methods:
      save: ->
        setDatas {aliases: @aliases}
