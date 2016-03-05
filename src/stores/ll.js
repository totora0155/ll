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

  static addAddAliasListener(handle) {
    ev.on(actionType.ADD_ALIAS, handle);
  }

  static emitShowDialog(msg, handleYes, handleNo) {
    ev.emit(actionType.CONFIRM, msg, handleYes, handleNo);
  }

  static addShowDialogListener(handle) {
    ev.on(actionType.CONFIRM, handle);
  }
}

LLDispatcher.register((payload) => {
  switch (payload.actionType) {
    case actionType.ADD_ALIAS:
      {
        const {alias, targetIdx} = payload;
        storage.get()
          .then((aliases) => {
            if (~targetIdx) {
              aliases[targetIdx] = alias;
            } else {
              aliases.push(alias);
            }
            return Promise.resolve(aliases);
          })
          .then(storage.set)
          .then(() => LLStore.emitAddAlias())
      }
      break;

    case actionType.DELETE_ALIAS:
      {
        const {index} = payload;
        (async () => {
          const aliases = await storage.get();
          aliases.splice(index, 1);
          storage.set(aliases);
        })();
      }

      break;

    case actionType.CONFIRM:
      {
        const {msg, handleYes, handleNo} = payload;
        LLStore.emitShowDialog(msg, handleYes, handleNo);
      }
      break;
  }
});

export default LLStore;
