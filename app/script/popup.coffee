angular.module 'll', []
.factory 'CurrentUrl', ($q) ->
  {
    get: ->
      $q (resolve, reject) ->
        chrome.tabs.query
          active: true
          lastFocusedWindow: true
        , (tabs) -> resolve tabs[0].url
  }
.factory 'Alias', ($q, CurrentUrl) ->
  {
    get: (url) ->
      alias =
        url: url
        alias: ''
        category: ''
      $q (resolve) ->
        chrome.storage.sync.get 'aliases', (res) ->
          # aliases = res.aliases
          idx = _.findIndex res.aliases, {url}
          if idx > -1 then resolve res.aliases[idx]
          else resolve alias
    # save: (alias) ->
    #   alias = {url, alias, category}
    #   if targetIdx > -1
    #     aliases[targetIdx] = alias
    #   else
    #     aliases.push alias
    #   chrome.storage.sync.set {aliases}, ->
    #
  }

.controller 'LlController', (CurrentUrl, Alias) ->
  ll = @
  ll.$ = {}
  CurrentUrl.get()
  .then Alias.get
  .then (alias) -> ll.$ = alias

.directive 'save', ->
  restrict: 'E'
  replace: true
  controller: ->
    @on ->
      currentUrl.get()
      .then Alias.get
      # .then Alias.save
  controllerAs: 'save'
  template: '<button ng-click="save.on">Save</button>'
