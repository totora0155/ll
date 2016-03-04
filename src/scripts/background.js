// var aliases;
//
// aliases = [];
//
// chrome.omnibox.onInputStarted.addListener(function() {
//   return chrome.storage.sync.get('aliases', function(res) {
//     return aliases = res.aliases;
//   });
// });
//
// chrome.omnibox.onInputChanged.addListener(function(txt, suggest) {
//   var suggestions;
//   suggestions = _.chain(aliases).filter(function(obj) {
//     var re;
//     re = new RegExp(txt);
//     return re.test(obj.$alias);
//   }).sortBy(function(obj) {
//     return obj.$count;
//   }).reverse().map(function(obj) {
//     return {
//       content: obj.$alias,
//       description: obj.$title
//     };
//   }).value();
//   return suggest(suggestions);
// });
//
// chrome.omnibox.onInputEntered.addListener(function(txt) {
//   var idx;
//   idx = _.findIndex(aliases, {
//     $alias: txt
//   });
//   aliases[idx].$count++;
//   chrome.tabs.update({
//     url: aliases[idx].$url
//   });
//   return chrome.storage.sync.set({
//     aliases: aliases
//   }, function() {});
// });
