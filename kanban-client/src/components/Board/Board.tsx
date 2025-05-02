import React from 'react';
import Column from '../Column/Column';

const Board = ({ columns }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {columns.map(column => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Board;