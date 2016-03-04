import React from 'react';
import LLStore from 'stores/ll';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      aliases: [],
    };
  }

  componentDidMount() {
    LLStore.aliases.then(aliases => this.setState({aliases}));

    LLStore.addAddAliasListener(() => {
      LLStore.aliases.then((aliases) => {
        this.setState({aliases});
      });
    });
  }

  toggle() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const lis = this.state.aliases.map((alias) => {
      return (
        <li key={alias.alias}>
          <span>{alias.alias}</span>
          <small>{alias.url}</small>
        </li>
      );
    });

    const list = (() => {
      if (!this.state.visible) {
        return false;
      }

      return <ul>{lis}</ul>;
    })();

    return (
      <div className="list__box">
        <a className="list__btn list__btn--open" role="button"
          onClick={::this.toggle}>Show Aliases</a>
        {list}
      </div>
    );
  }
}

export default List;
