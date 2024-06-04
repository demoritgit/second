import React, { Fragment, useEffect, useState } from "react";
import UpdateTodo from "./UpdateTodo";
import './Icon.css'; // Ensure this line is present to import the CSS file

const DisplayTodos = ({ todos, fetchTodos }) => {

  // delete todo function
  const deleteTodo = async (id) => {
    if (window.confirm("Are you sure you want to delete this TODO item?")) {
      try {
        await fetch(`http://localhost:5000/todos/${id}`, {
          method: "DELETE"
        });

        fetchTodos();
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  // Function to render the icon based on todo status
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <i className="fas fa-clock icon"></i>;
      case 'in-progress':
        return <i className="fas fa-hourglass-half icon"></i>;
      case 'completed':
        return <i className="fas fa-check-square icon"></i>;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      {todos.length === 0 ? (
        <div className="text-center mt-5">
          <h2>No tasks yet? Let's get productive!</h2>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>About</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <div className="icon">
                    {renderStatusIcon(todo.status)}
                  </div>
                </td>
                <td>{todo.priority}</td>
                <td>
                  <UpdateTodo todo={todo} fetchTodos={fetchTodos} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default DisplayTodos;
