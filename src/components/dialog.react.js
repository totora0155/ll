import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import LLStore from 'stores/ll';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'confirm',
      msg: `Delete 'coco' ?`,
      visible: true,
    };
  }

  componentDidMount() {
    LLStore.addShowDialogListener((msg, handleYes, handleNo) => {
      this.setState({msg, handleYes, handleNo});
    });
  }

  handleYes() {
  }

  handleNo() {
  }

  render() {
    const choices = (
      <div className="dialog__btns">
        <a role="button" className="dialog__btn dialog__no-btn"
          onClick={this.state.handleNo}>No</a>
        <a role="button" className="dialog__btn dialog__yes-btn"
          onClick={this.state.handleYes}>Yes</a>
      </div>
    );

    return (
      <div className="dialog__box">
        <span className="dialog__msg">{this.state.msg}</span>
        {this.state.type === 'confirm' && choices}
      </div>
    );
  }
}

export default Dialog;
