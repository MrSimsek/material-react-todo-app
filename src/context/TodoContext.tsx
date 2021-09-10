import * as React from "react";
import { STORAGE_KEYS } from "../constants/storageConstants";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface ITodo {
  id: string;
  category: string;
  title: string;
  description: string;
  status: boolean;
}

type ContextType = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  saveTodo: (todo: ITodo) => void;
  updateTodo: (todoId: string) => void;
  removeTodo: (todoId: string) => void;
};

type TodoContextProviderProps = {
  children: React.ReactNode;
};

const TodoContext = React.createContext<ContextType>({
  todos: [],
  setTodos: () => null,
  saveTodo: () => null,
  updateTodo: () => null,
  removeTodo: () => null,
});

const useTodo = () => React.useContext(TodoContext);

const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todos, setTodos] = useLocalStorage<ITodo[]>(STORAGE_KEYS.TODOS, [
    {
      id: "todo-1",
      category: "cat-1",
      title: "Todo Item 1",
      description: "this is my first description",
      status: false,
    },
    {
      id: "todo-2",
      category: "cat-1",
      title: "Todo Item 2",
      description: "this is my second description",
      status: true,
    },
  ]);

  const saveTodo = (todo: ITodo) => {
    const newTodo: ITodo = {
      id: Math.random().toString(),
      category: todo.category,
      title: todo.title,
      description: todo.description,
      status: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
        setTodos([...todos]);
      }
    });
  };

  const removeTodo = (todoId: string) => {
    setTodos([...todos.filter((todo) => todo.id !== todoId)]);
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, saveTodo, updateTodo, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContextProvider, useTodo };
