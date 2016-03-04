import React from 'react';

class Form extends React.Component {
  submit(e) {
    console.log(e);
  }

  render() {
    return (
      <form className="form__box" onSubmit={::this.submit}>
        <div className="form__group">
          <label className="form__label" htmlFor="url">URL</label>
          <input className="form__input-text" id="url"
            type="text" ref="url" />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="alias">Alias</label>
          <div className="form__input-group">
            <input className="form__input-group-item form__input-text"
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
