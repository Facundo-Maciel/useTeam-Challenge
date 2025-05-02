export const initialBoardState = {
    boardId: 'demo-board',
    columns: [],
  };
  
  export default function boardReducer(state, action) {
    switch (action.type) {
      case 'SET_BOARD':
        return { ...state, columns: action.payload.columns };
      case 'CARD_MOVED': {
        const { cardId, fromColumn, toColumn, position } = action.payload;
        const newCols = state.columns.map(col => ({ ...col }));
        // remove card from source
        const sourceCol = newCols.find(c => c.id === fromColumn);
        const [moved] = sourceCol.cards.splice(
          sourceCol.cards.findIndex(c => c.id === cardId),
          1
        );
        // insert into destination
        const destCol = newCols.find(c => c.id === toColumn);
        destCol.cards.splice(position, 0, moved);
        return { ...state, columns: newCols };
      }
      default:
        return state;
    }
  }