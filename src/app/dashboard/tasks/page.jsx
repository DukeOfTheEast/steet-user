"use client";

import React, { useRef } from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useState } from "react";

export default function Tasks() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const addTodo = () => {
    const newTodo = inputRef.current.value.trim();
    if (newTodo !== "") {
      // setTodos(todos.push(newTodo));
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      inputRef.current.value = "";
    }
    console.log(newTodo);
  };

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <input
          type="text"
          className="bg-gray-400"
          // value={newTodo}
          ref={inputRef}
        />
        <button onClick={addTodo}>Add</button>
        <div>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
