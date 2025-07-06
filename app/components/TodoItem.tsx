// components/TodoItem.tsx
"use client";

import React, { useState } from 'react';
import type { Todo } from '@prisma/client'; // Import Prisma Todo type for strong typing

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  isLoading: boolean; // Prop to indicate if an action is in progress
}

export default function TodoItem({ todo, onUpdate, onDelete, isLoading }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const handleToggleComplete = () => {
    onUpdate(todo.id, { isCompleted: !todo.isCompleted });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  const handleEditSave = () => {
    if (editedTitle.trim() === '') {
      alert('Title cannot be empty');
      return;
    }
    onUpdate(todo.id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  const priorityColors = {
    LOW: 'text-green-500',
    MEDIUM: 'text-yellow-500',
    HIGH: 'text-red-500',
  };

  return (
    <div className={`border p-4 mb-2 rounded-md ${todo.isCompleted ? 'bg-gray-100 line-through' : 'bg-white'}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border p-2 w-full mb-2"
            disabled={isLoading}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Description (optional)"
            disabled={isLoading}
          />
          <button onClick={handleEditSave} className="bg-blue-500 text-white px-3 py-1 rounded mr-2" disabled={isLoading}>Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 px-3 py-1 rounded" disabled={isLoading}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{todo.title}</h3>
          {todo.description && <p className="text-gray-600 text-sm">{todo.description}</p>}
          <p className={`text-sm ${priorityColors[todo.priority]}`}>Priority: {todo.priority}</p>
          {todo.dueDate && <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>}
          {todo.estimatedTime && <p className="text-sm text-gray-500">Estimated: {todo.estimatedTime} min</p>}
          {todo.isCompleted && todo.completedAt && (
            <p className="text-sm text-gray-500">Completed: {new Date(todo.completedAt).toLocaleString()}</p>
          )}

          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleToggleComplete}
              className={`px-3 py-1 rounded ${todo.isCompleted ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
              disabled={isLoading}
            >
              {todo.isCompleted ? 'Unmark Complete' : 'Mark Complete'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-500 text-white px-3 py-1 rounded"
              disabled={isLoading}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}