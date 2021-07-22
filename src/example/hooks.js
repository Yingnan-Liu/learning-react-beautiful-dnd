//onDragStart
const start = {
  draggaleId: "task-1",
  type: "type",
  source: {
    droppableId: "column-1",
    index: 0,
  },
};
//onDragUpdate
const update = {
  ...start,
  destination: {
    droppableId: "column-1",
    index: 1,
  },
};
//onDragEnd
const result = {
  ...update,
  reason: "DROP",
};
