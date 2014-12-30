(function() {
  var getDatas, setDatas;

  getDatas = function() {
    return new Promise(function(resolve, reject) {
      if (chrome.storage != null) {
        return chrome.storage.local.get('aliases', function(ret) {
          return resolve(ret);
        });
      } else {
        return resolve({
          aliases: "alias1,http://***\nalias2,http://***"
        });
      }
    });
  };

  setDatas = function(datas) {
    if (chrome.storage != null) {
      return chrome.storage.local.set(datas);
    } else {
      return console.log(datas);
    }
  };

  getDatas().then(function(ret) {
    var app;
    return app = new Vue({
      el: '#ctrl',
      data: {
        aliases: ret.aliases
      },
      methods: {
        save: function() {
          return setDatas({
            aliases: this.aliases
          });
        }
      }
    });
  });

}).call(this);

//# sourceMappingURL=options.js.map