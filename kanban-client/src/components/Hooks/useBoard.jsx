import { useContext } from 'react';
import { BoardContext } from '../Context/BoardContext';

export function useBoard() {
  const { state, moveCard } = useContext(BoardContext);
  return {
    boardId: state.boardId,
    columns: state.columns,
    moveCard,
  };
}