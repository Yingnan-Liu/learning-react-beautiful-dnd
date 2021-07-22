import React from "react";
import { useState } from "react";
import Column from "./Column";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";

const App = () => {
  const [data, setData] = useState(initialData);
  const onDragStart = (start) => {};
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    // 检查是否移动了
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const column = data.columns[source.droppableId];
    //浅拷贝一个新的数组
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1); //删除一个元素
    newTaskIds.splice(destination.index, 0, draggableId); //draggableId："task-1" 用该task替代
    //更新column
    const newColumn = { ...column, taskIds: newTaskIds };
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };
    setData(newData);
  };
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <div className="App">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default App;
