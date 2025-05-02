import { useEffect, useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { io } from 'socket.io-client';
import styles from './Board.module.css';

const socket = io('http://localhost:3001/kanban');

type Card = {
  id: string;
  title: string;
};

type Column = {
  id: string;
  cards: Card[];
};

export function Board({ initialColumns }) {
  const [columns, setColumns] = useState(initialColumns);
  const columnsRef = useRef(columns);

  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  useEffect(() => {
    const handleCardMoved = (data) => {
      const { sourceColumnId, destinationColumnId, cardId } = data;
      const newColumns = { ...columnsRef.current };

      const sourceColumn = newColumns[sourceColumnId];
      const destinationColumn = newColumns[destinationColumnId];

      const cardIndex = sourceColumn.cards.findIndex((card) => card.id === cardId);
      if (cardIndex === -1) return;

      const [movedCard] = sourceColumn.cards.splice(cardIndex, 1);
      destinationColumn.cards.push(movedCard);

      setColumns(newColumns);
    };

    socket.on('cardMoved', handleCardMoved);

    return () => {
      socket.off('cardMoved', handleCardMoved);
    };
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    socket.emit('moveCard', {
      sourceColumnId: source.droppableId,
      destinationColumnId: destination.droppableId,
      cardId: draggableId,
    });
  };

  return (
    <div className={styles.board}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(columns as Record<string, Column>).map((col) => (
          <Droppable key={col.id} droppableId={col.id}>
            {(provided) => (
              <div
                className={styles.column}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {col.cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        className={styles.card}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {card.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}