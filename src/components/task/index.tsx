import React, { useState } from "react";

interface TaskItem {
  id: number;
  title: string;
  date: string;
  description: string;
  completed: boolean;
  expanded: boolean;
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      title: "Cross-reference with Jeanne for Case #192813",
      date: "2021-06-12",
      description: "No Description",
      completed: false,
      expanded: false,
    },
    {
      id: 2,
      title: "Contact Andrew for Online Meeting and Conference",
      date: "2021-06-03",
      description: "",
      completed: true,
      expanded: false,
    },
    {
      id: 3,
      title: "Check and Revise Homework from Andre Gonzales",
      date: "2021-06-11",
      description:
        "Homeworks needed to be checked are as follows: Client Profile Questionnaire, Passport Requirements and Images, Personal Documents.",
      completed: true,
      expanded: false,
    },
  ]);

  const [newTask, setNewTask] = useState<TaskItem>({
    id: tasks.length + 1,
    title: "",
    date: "",
    description: "",
    completed: false,
    expanded: true,
  });

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleExpand = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, expanded: !task.expanded } : task
      )
    );
  };

  const handleNewTaskChange = (field: keyof TaskItem, value: string) => {
    setNewTask((prevNewTask) => ({
      ...prevNewTask,
      [field]: value,
    }));
  };

  const addTask = () => {
    if (newTask.title.trim() === "") {
      return; // Don't add a task with an empty title
    }
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 },
    ]);
    setNewTask({
      id: tasks.length + 2,
      title: "",
      date: "",
      description: "",
      completed: false,
      expanded: true,
    });
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const calculateDaysLeft = (date: string): string => {
    const taskDate = new Date(date);
    const today = new Date();
    const differenceInTime = taskDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays > 0) {
      return `${differenceInDays} Day${differenceInDays > 1 ? "s" : ""} Left`;
    } else if (differenceInDays === 0) {
      return `Due Today`;
    } else {
      return `Overdue`;
    }
  };

  return (
    <div className="bg-white w-[734px] h-[600px] rounded-lg shadow-lg p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <select className="border border-gray-300 rounded p-2">
          <option>My Tasks</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          New Task
        </button>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className={`border-b border-gray-300 py-4 `}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span
                className={`font-semibold ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
              {!task.completed && (
                <span className="text-red-500 text-sm">
                  {calculateDaysLeft(task.date)}
                </span>
              )}
            </div>
            <div className="relative flex items-center space-x-2">
              <span className="text-gray-500">{task.date}</span>
              <button onClick={() => toggleExpand(task.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-gray-500 transform transition-transform ${
                    task.expanded ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() =>
                  setOpenMenuId((prev) => (prev === task.id ? null : task.id))
                }
              >
                <svg
                  width="14"
                  height="4"
                  viewBox="0 0 14 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63907e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35464e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35464e-07Z"
                    fill="#828282"
                  />
                </svg>
              </button>
              {openMenuId === task.id && (
                <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded shadow-lg z-10">
                  <button
                    className="text-red-500 px-4 py-2 hover:bg-red-50 w-full text-left"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {task.expanded && (
            <div className="mt-4 ml-6 space-y-2">
              <div className="flex items-center space-x-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99199 0.666626C4.39199 0.666626 0.666992 4.39996 0.666992 8.99996C0.666992 13.6 4.39199 17.3333 8.99199 17.3333C13.6003 17.3333 17.3337 13.6 17.3337 8.99996C17.3337 4.39996 13.6003 0.666626 8.99199 0.666626ZM9.00049 15.6666C5.31715 15.6666 2.33382 12.6833 2.33382 8.99996C2.33382 5.31662 5.31715 2.33329 9.00049 2.33329C12.6838 2.33329 15.6672 5.31662 15.6672 8.99996C15.6672 12.6833 12.6838 15.6666 9.00049 15.6666ZM8.16699 4.83329H9.41699V9.20829L13.167 11.4333L12.542 12.4583L8.16699 9.83329V4.83329Z"
                    fill="#2F80ED"
                  />
                </svg>

                <input
                  type="date"
                  value={task.date}
                  disabled
                  className="border border-gray-300 rounded p-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2165 0C12.0082 0 11.7915 0.0833333 11.6332 0.241667L10.1082 1.76667L13.2332 4.89167L14.7582 3.36667C15.0832 3.04167 15.0832 2.51667 14.7582 2.19167L12.8082 0.241667C12.6415 0.075 12.4332 0 12.2165 0ZM9.21667 5.01667L9.98333 5.78333L2.43333 13.3333H1.66667V12.5667L9.21667 5.01667ZM0 11.875L9.21667 2.65833L12.3417 5.78333L3.125 15H0V11.875Z"
                    fill={`${task.description === "" ? "#828282" : "#2F80ED"}`}
                  />
                </svg>
                <p className="text-gray-500">
                  {task.description === ""
                    ? "No Description"
                    : task.description}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="border-t border-gray-300 pt-2 mt-4">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => handleNewTaskChange("title", e.target.value)}
          placeholder="Type Task Title"
          className="w-full border border-gray-300 rounded p-2 mb-2"
        />
        <div className="flex items-center space-x-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 0v4M4 11h16M4 19h16"
            />
          </svg>
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => handleNewTaskChange("date", e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <input
            type="text"
            value={newTask.description}
            onChange={(e) => handleNewTaskChange("description", e.target.value)}
            placeholder="No Description"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
