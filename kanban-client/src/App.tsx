import React from 'react';
import {Board} from './components/Board';

const initialColumns = {
  column1: { id: 'column1', cards: [] },
  column2: { id: 'column2', cards: [] },
};

function App() {
  return (
    <div>
      <h1>Mi Aplicación Kanban</h1>
      <Board initialColumns={initialColumns} />
    </div>
  );
}

export default App;