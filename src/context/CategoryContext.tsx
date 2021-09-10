import * as React from "react";
import { uuid } from "uuidv4";
import { STORAGE_KEYS } from "../constants/storageConstants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTodo } from "./TodoContext";

export interface ICategory {
  id: string;
  title: string;
  icon: string;
}

type ContextType = {
  categories: ICategory[];
  saveCategory: (categoryTitle: string) => void;
  removeCategory: (categoryId: string) => void;
};

type CategoryContextProviderProps = {
  children: React.ReactNode;
};

const CategoryContext = React.createContext<ContextType>({
  categories: [],
  saveCategory: () => null,
  removeCategory: () => null,
});

const useCategory = () => React.useContext(CategoryContext);

const CategoryContextProvider = ({
  children,
}: CategoryContextProviderProps) => {
  const { todos, setTodos } = useTodo();

  const [categories, setCategories] = useLocalStorage<ICategory[]>(
    STORAGE_KEYS.CATEGORIES,
    [
      {
        id: "cat-1",
        title: "Category 1",
        icon: "format_list_bulleted",
      },
      {
        id: "cat-2",
        title: "Category 2",
        icon: "format_list_bulleted",
      },
    ]
  );

  const saveCategory = (category: ICategory) => {
    const newCategory: ICategory = {
      id: uuid(),
      title: category.title,
      icon: category.icon,
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (categoryId: string) => {
    setTodos([...todos.filter((todo) => todo.category !== categoryId)]);
    setCategories([
      ...categories.filter((category) => category.id !== categoryId),
    ]);
  };

  return (
    <CategoryContext.Provider
      value={{ categories, saveCategory, removeCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContextProvider, useCategory };
