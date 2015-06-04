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
  {
    get: (url, alias = '', category = '') ->
      console.log alias, category
      alias = {url, alias, category}
      $q (resolve) ->
        chrome.storage.sync.get 'aliases', (res) ->
          idx = _.findIndex res.aliases, {url}
          if idx > -1 then resolve res.aliases[idx]
          else resolve alias
    save: (alias) ->
      console.log alias
      # if targetIdx > -1
        # aliases[targetIdx] = alias
      # else
        # aliases.push alias
      chrome.storage.sync.set {aliases: alias}, ->

  }

.controller 'LlController', (currentUrl, alias) ->
  ll = @
  ll.$ = {}
  currentUrl.get()
  .then alias.get
  .then (alias) -> ll.$ = alias

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
        console.log save.ali, save.cate
        save.ali = '' unless save.ali?
        save.cate = '' unless save.cate?
        alias.get url, save.ali, save.cate
      .then alias.save
      .then -> console.log 'done'
    save
  controllerAs: 'save'
  template: '<button ng-click="save.on()">Save</button>'
