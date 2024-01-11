import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContex = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  CompletedToggleToods: (id: string) => void;
  DeleteTodos: (id: string) => void;
};

export const todosContext = createContext<TodosContex | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodso] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos) as Todo[];
    } catch (error) {
      return [];
    }
  });

  const handleAddTodo = (task: string) => {
    setTodso((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      console.log(prev);
      return newTodos;
    });
  };

  const CompletedToggleToods = (id: string) => {
    setTodso((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const DeleteTodos = (id: string) => {
    setTodso((prev) => {
      const DeleteTodo = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(DeleteTodo));
      return DeleteTodo;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddTodo, CompletedToggleToods, DeleteTodos }}
    >
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("Todos not found !");
  }
  return todosConsumer;
};

/* import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContex = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
};

export const todosContext = createContext<TodosContex | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      console.log(prev);
      return newTodos;
    });
  };

  return (
    <todosContext.Provider value={{ todos, handleAddTodo }}>
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("useTodos used outside of Provider");
  }
  return todosConsumer;
};
 */
