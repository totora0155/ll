import React from 'react';

class List extends React.Component {
  show() {
  }

  render() {
    return (
      <div className="list__box">
        <a className="list__btn list__btn--open" role="button"
          onClick={::this.show}>Show Aliases</a>
      </div>
    );
  }
}

export default List;
