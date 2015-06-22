ll = null
angular.module 'll', []
.factory 'currentUrl', ($q) ->
  {
    get: ->
      $q (resolve, reject) ->
        chrome.tabs.query
          active: true
          lastFocusedWindow: true
        , (tabs) ->
          resolve
            $url: tabs[0].url
            $title: tabs[0].title
            $count: 0
  }
.factory 'alias', ($q) ->
  aliases = null
  idx = -1
  {
    hasAlias: (value) ->
      _idx = _.findIndex aliases, {$alias: value}
      if _idx is -1 then true
      else false
    get: ($data, $alias = '', $category = '') ->
      {$url, $title, $count} = $data
      alias = {$url, $title, $alias, $category, $count}
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
  controllerAs: 'save'
  controller: ->
    save = @
    @on = ->
      currentUrl.get()
      .then ($data) ->
        save.cate = '' unless save.cate?
        alias.get $data, save.ali, save.cate
      .then alias.save
    save
  template: '<button ng-click="save.on()">Save</button>'

.directive 'valid', (alias) ->
  restrict: 'A'
  scope: {}
  require: 'ngModel'
  link: (scope, elm, attrs, ctrl) ->
    ctrl.$validators.unique = (modelValue, viewValue) ->
      if alias.hasAlias viewValue then true
      else false
