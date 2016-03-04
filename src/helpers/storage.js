const storage = {
  set(_aliases) {
    return new Promise((resolve) => {
      console.log(_aliases);
      const aliases = _aliases.sort((a, b) => b.lastEnter - a.lastEnter);
      chrome.storage.sync.set({aliases}, () => {
        return resolve();
      });
    });
  },

  get() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('aliases', ({aliases}) => {
        return resolve(aliases ? aliases : []);
      });
    });
  },
}

export default storage;
