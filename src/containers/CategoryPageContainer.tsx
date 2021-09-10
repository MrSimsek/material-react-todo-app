import React, { useMemo, useState } from "react";
import TodoList from "../components/TodoList";
import MainLayout from "../layouts/MainLayout";
import { useCategory } from "../context/CategoryContext";
import { useTodo } from "../context/TodoContext";

type CategoryPageContainerProps = {
  categoryId: string;
};

function CategoryPageContainer({ categoryId }: CategoryPageContainerProps) {
  const { categories } = useCategory();
  const { todos } = useTodo();

  const category = useMemo(
    () => categories.find((cat) => cat.id === categoryId),
    [categories, categoryId]
  );

  const categoryTodos = useMemo(
    () => todos.filter((todo) => todo.category === categoryId),
    [categoryId, todos]
  );

  if (!category) return null;

  return (
    <MainLayout>
      <TodoList category={category} todos={categoryTodos} />
    </MainLayout>
  );
}

export default CategoryPageContainer;
