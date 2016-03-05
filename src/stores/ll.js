import EventEmitter from 'events';
import LLDispatcher from 'dispatchers/ll';
import actionType from 'constants/action-type';
import storage from 'helpers/storage';

const ev = new EventEmitter();

let _currentURL = null;

class LLStore {
  static get aliases() {
    return storage.get();
  }

  static get currentURL() {
    return new Promise((resolve) => {
      if (_currentURL) {
        return resolve(_currentURL);
      } else {
        chrome.tabs.query({
          active: true,
          currentWindow: true,
        }, (tabs) => {
          _currentURL = tabs[0].url;
          return resolve(_currentURL);
        });
      }
    });
  }

  static emitAddAlias() {
    ev.emit(actionType.ADD_ALIAS);
  }

  static addAddAliasListener(handler) {
    ev.on(actionType.ADD_ALIAS, handler)
  }
}

LLDispatcher.register((payload) => {
  switch (payload.actionType) {
    case actionType.ADD_ALIAS:
      {
        const {alias} = payload;
        storage.get()
          .then((aliases) => {
            aliases.push(alias);
            return Promise.resolve(aliases);
          })
          .then(storage.set)
          .then(() => LLStore.emitAddAlias())
      }
      break;
  }
});

export default LLStore;
