import LLDispatcher from 'dispatchers/ll';
import actionType from 'constants/action-type';

class LLAction {
  static addAlias(alias) {
    LLDispatcher.dispatch({
      actionType: actionType.ADD_ALIAS,
      alias,
    });
  }
}

export default LLAction;
