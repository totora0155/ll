import LLDispatcher from 'dispatchers/ll';
import actionType from 'constants/action-type';

class LLAction {
  static addAlias(alias, targetIdx) {
    LLDispatcher.dispatch({
      actionType: actionType.ADD_ALIAS,
      alias,
      targetIdx,
    });
  }
}

export default LLAction;
