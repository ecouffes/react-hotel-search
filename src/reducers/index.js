/**
 * reducer
 * 以前のstateと、actionを取り、更新されたstateを返す純粋関数
 *
 * store.dispatch(action)
 * actionをdispatchして、reducer内でstateを更新する。
 * （reducerの第2引数へactionが渡される）
 *
 * @param state {Object}
 * @param action {Object}
 * @return Object {Object}
 */
export default (state = { place: 'hoge' }, action) => {
  // console.log('action', action);

  switch(action.type) {
    case 'CHANGE_PLACE':
      // pure function にするため、実引数のstateには副作用を与えない。
      // Object.assignで、actionがもたらす新stateを作成・返す
      return Object.assign({}, state, { place: action.place });
    default:
      return state;
  }
};

