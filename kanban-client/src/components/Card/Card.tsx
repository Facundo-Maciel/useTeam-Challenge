import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: 'none',
            padding: '1rem',
            margin: '0 0 1rem 0',
            background: '#fff',
            ...provided.draggableProps.style,
          }}
        >
          {card.content}
        </div>
      )}
    </Draggable>
  );
};

export default Card;