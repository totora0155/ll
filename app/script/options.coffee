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
        # aliases: do ->
        #   result = ''
        #
        #   for alias, url of ret.options.aliases
        #     result += "#{alias},#{url}\n"
        #
        #   result
        # shows: ret.options.shows

    methods:
      save: ->
        setDatas {aliases: @aliases}
            # aliases: do (a = @options.aliases)->
            #   lines = a.split(/\n/)
            #   ret = {}
            #
            #   for line in lines
            #     [alias, url] = line.match(/(.+)?,?(.+)?/)
            #
            #     ret[alias, url]
