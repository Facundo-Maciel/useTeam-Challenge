import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';

const Column = ({ column }) => {
  return (
    <div style={{ background: '#f0f0f0', padding: '1rem', width: '250px', minHeight: '300px' }}>
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;