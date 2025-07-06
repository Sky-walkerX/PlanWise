// app/todos/page.tsx
"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent } from 'react';
import type { Todo, Priority } from '@prisma/client'; // Import Prisma types
import TodoItem from '@/app/components/TodoItem'; // Adjust path if necessary

export default function TodosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For add form

  // State for new todo form
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<Priority>('MEDIUM');
  const [newTodoEstimatedTime, setNewTodoEstimatedTime] = useState<number | ''>('');


  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch todos when session is authenticated
  useEffect(() => {
    const fetchTodos = async () => {
      if (status === 'authenticated') {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/todos');
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data: Todo[] = await response.json();
          setTodos(data);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch todos');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTodos();
  }, [status]);

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newTodoTitle.trim()) {
      setError('Todo title cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    try {
      const todoData = {
        title: newTodoTitle,
        description: newTodoDescription || undefined,
        dueDate: newTodoDueDate ? new Date(newTodoDueDate).toISOString() : undefined,
        priority: newTodoPriority,
        estimatedTime: newTodoEstimatedTime === '' ? undefined : Number(newTodoEstimatedTime),
      };

      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add todo');
      }

      const newTodo: Todo = await response.json();
      setTodos((prevTodos) => [newTodo, ...prevTodos]); // Add new todo to top of list
      // Clear form
      setNewTodoTitle('');
      setNewTodoDescription('');
      setNewTodoDueDate('');
      setNewTodoPriority('MEDIUM');
      setNewTodoEstimatedTime('');
    } catch (err: any) {
      setError(err.message || 'Error adding todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTodo = async (id: string, updatedData: Partial<Todo>) => {
    setError(null);
    setIsSubmitting(true); // Can use a more granular loading state per todo item if needed

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.formErrors?.formErrors?.[0] || errorData.error || 'Failed to update todo');
      }

      // Update the todo in the local state
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
      );
    } catch (err: any) {
      setError(err.message || 'Error updating todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setError(null);
    setIsSubmitting(true); // Can use a more granular loading state per todo item if needed

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete todo');
      }

      // Remove the todo from the local state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err: any) {
      setError(err.message || 'Error deleting todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return <div className="text-center p-8">Loading authentication...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="text-center p-8">Redirecting to login...</div>; // Handled by useEffect
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Todos</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

      {/* Add New Todo Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Todo</h2>
        <form onSubmit={handleAddTodo} className="space-y-4">
          <div>
            <label htmlFor="newTodoTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="newTodoTitle"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="newTodoDescription" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea
              id="newTodoDescription"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="newTodoDueDate" className="block text-sm font-medium text-gray-700">Due Date (Optional)</label>
            <input
              type="date"
              id="newTodoDueDate"
              value={newTodoDueDate}
              onChange={(e) => setNewTodoDueDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="newTodoPriority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              id="newTodoPriority"
              value={newTodoPriority}
              onChange={(e) => setNewTodoPriority(e.target.value as Priority)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              disabled={isSubmitting}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="newTodoEstimatedTime" className="block text-sm font-medium text-gray-700">Estimated Time (minutes, optional)</label>
            <input
              type="number"
              id="newTodoEstimatedTime"
              value={newTodoEstimatedTime}
              onChange={(e) => setNewTodoEstimatedTime(parseInt(e.target.value) || '')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g., 25"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Todo...' : 'Add Todo'}
          </button>
        </form>
      </div>

      {/* Todo List */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Todos</h2>
      {loading ? (
        <div className="text-center text-gray-600">Loading todos...</div>
      ) : todos.length === 0 ? (
        <div className="text-center text-gray-600">No todos found. Start by adding one!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
              isLoading={isSubmitting} // Pass loading state to prevent multiple actions
            />
          ))}
        </div>
      )}
    </div>
  );
}