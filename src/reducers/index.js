/**
 * reducer
 * 新しいstateを作って、store反映
 *
 * @param state {Object}
 * @param action {Object}
 * @return {Object} & Object & {place: (string|controlledPropUpdaterMap.place)} {Object}
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

