import React from 'react';
import LLAction from 'actions/ll';
import LLStore from 'stores/ll'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
    };
  }

  componentDidMount() {
    (async () => {
      const url = await LLStore.currentURL;
      this.setState({url});
    })();

    LLStore.addAddAliasListener(() => {
      (async () => {
        const aliases = await LLStore.aliases;
        chrome.runtime.sendMessage({aliases}, () => {});
      })();
    });
  }

  submit(e) {
    e.preventDefault();

    (async () => {
      const url = await LLStore.currentURL;
      const alias = this.refs.alias.value;
      const lastEnter = Date.now();

      LLAction.addAlias({url, alias, lastEnter});
    })();
  }

  render() {
    return (
      <form className="form__box" onSubmit={::this.submit}>
        <div className="form__group">
          <label className="form__label" htmlFor="url">URL</label>
          <input className="form__input-text" id="url"
            type="text" ref="url" value={this.state.url} />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="alias">Alias</label>
          <div className="form__input-group">
            <input tabIndex={1} className="form__input-group-item form__input-text"
              id="alias" type="text" ref="alias" />
            <input className="form__input-group-item form__btn"
              value="Save" type="submit" />
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
