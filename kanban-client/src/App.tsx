import React, { useReducer } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { produce } from 'immer';
import Board from './components/Board/Board';

const initialState = {
  columns: [
    {
      id: 'column-1',
      title: 'Pendiente',
      cards: [
        { id: 'card-1', content: 'Tarea A' },
        { id: 'card-2', content: 'Tarea B' },
      ],
    },
    {
      id: 'column-2',
      title: 'En Proceso',
      cards: [
        { id: 'card-3', content: 'Tarea C' },
      ],
    },
    {
      id: 'column-3',
      title: 'Completado',
      cards: [],
    },
  ],
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'MOVE_CARD': {
      const { source, destination } = action.payload;
      if (!destination) return;

      const srcCol = draft.columns.find(col => col.id === source.droppableId);
      const destCol = draft.columns.find(col => col.id === destination.droppableId);
      if (!srcCol || !destCol) return;

      const [movedCard] = srcCol.cards.splice(source.index, 1);
      destCol.cards.splice(destination.index, 0, movedCard);
      break;
    }
    default:
      break;
  }
});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;
    dispatch({ type: 'MOVE_CARD', payload: { source, destination } });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Board columns={state.columns} />
    </DragDropContext>
  );
};

export default App;