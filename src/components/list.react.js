import React from 'react';
import LLAction from 'actions/ll';
import LLStore from 'stores/ll';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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

  deleteActionForAlias(e) {
    const {index, msg} = e.target.dataset;
    const handleYes = () => {
      LLAction.deleteAlias(index);
    }
    const handleNo = () => {
      console.log(1);
    }

    LLAction.confirm(msg, handleYes, handleNo);
  }

  render() {
    const lis = this.state.aliases.map((alias, idx) => {
      const msg = `Delete '${alias.alias}' ?`;

      return (
        <li className="list__alias" key={alias.alias}>
          <span className="list__alias-name">{alias.alias}</span>
          <small className="list__alias-url">{alias.url}</small>
          <a role="button" className="list__delete-btn icono-cross"
            data-index={idx} data-msg={msg}
            onClick={::this.deleteActionForAlias}></a>
        </li>
      );
    });

    const list = (() => {
      if (!this.state.visible) {
        return false;
      }

      return <ul className="list__aliases" key="list">{lis}</ul>;
    })();

    return (
      <div className="list__box">
        <CSSTransitionGroup component="div" transitionName="list"
          transitionEnterTimeout={160}
          transitionLeaveTimeout={160}
          >{list}</CSSTransitionGroup>
        <a className="list__btn list__btn--open" role="button"
          onClick={::this.toggle}>
          {this.state.visible ? 'Hide aliases' : 'Show aliases'}
        </a>
      </div>
    );
  }
}

export default List;
