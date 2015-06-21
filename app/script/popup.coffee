ll = null
angular.module 'll', []
.factory 'currentUrl', ($q) ->
  {
    get: ->
      $q (resolve, reject) ->
        chrome.tabs.query
          active: true
          lastFocusedWindow: true
        , (tabs) -> resolve tabs[0].url
  }
.factory 'alias', ($q) ->
  aliases = null
  idx = -1
  {
    get: ($url, $alias = '', $category = '') ->
      alias = {$url, $alias, $category}
      $q (resolve) ->
        chrome.storage.sync.get 'aliases', (res) ->
          aliases = if res.aliases? then res.aliases else []
          idx = _.findIndex aliases, {$url}
          if idx > -1
            if alias.$alias is '' then resolve aliases[idx]
            else resolve alias
          else resolve alias
    save: (alias) ->
      if idx > -1
        aliases[idx] = alias
        chrome.storage.sync.set {aliases}, ->
      else
        aliases[aliases.length] = alias
        chrome.storage.sync.set {aliases}, ->
  }

.controller 'LlController', (currentUrl, alias) ->
  ll = @
  currentUrl.get()
  .then alias.get
  .then (alias) ->
    {$alias, $category} = alias
    ll.$alias = $alias
    ll.$category = $category
  ll

.directive 'save', (currentUrl, alias) ->
  restrict: 'E'
  replace: true
  scope: {}
  bindToController:
    ali: '@'
    cate: '@'
  controller: ->
    save = @
    @on = ->
      currentUrl.get()
      .then (url) ->
        save.ali = '' unless save.ali?
        save.cate = '' unless save.cate?
        alias.get url, save.ali, save.cate
      .then alias.save
    save
  controllerAs: 'save'
  template: '<button ng-click="save.on()">Save</button>'
