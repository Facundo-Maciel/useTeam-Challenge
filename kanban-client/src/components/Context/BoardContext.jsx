import React, { createContext, useReducer, useEffect } from 'react';
import { socket, joinBoard, leaveBoard } from '../services/socket';
import boardReducer, { initialBoardState } from './boardReducer';

export const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);

  useEffect(() => {
    if (!state.boardId) return;
    joinBoard(state.boardId);

    // Request initial board data
    socket.emit('getBoard', { boardId: state.boardId });

    socket.on('BOARD_DATA', (data) => {
      dispatch({ type: 'SET_BOARD', payload: data });
    });
    socket.on('CARD_MOVED', (payload) => {
      dispatch({ type: 'CARD_MOVED', payload });
    });
    // TODO: subscribe other events (CARD_CREATED, COLUMN_CREATED, etc.)

    return () => {
      leaveBoard(state.boardId);
      socket.off('BOARD_DATA');
      socket.off('CARD_MOVED');
    };
  }, [state.boardId]);

  const moveCard = ({ cardId, fromColumn, toColumn, position }) => {
    dispatch({ type: 'CARD_MOVED', payload: { cardId, fromColumn, toColumn, position } });
    socket.emit('CARD_MOVED', { boardId: state.boardId, cardId, fromColumn, toColumn, position });
  };

  return (
    <BoardContext.Provider value={{ state, dispatch, moveCard }}>
      {children}
    </BoardContext.Provider>
  );
}