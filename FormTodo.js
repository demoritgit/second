import React, { Fragment, useState } from "react";

// Three states
const FormTodo = ({ fetchTodos }) => {
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [priority, setPriority] = useState("medium");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { description, status, priority }; // creating a request body 
            await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // JSON data 
                body: JSON.stringify(body) // JSON string 
            });

            fetchTodos(); // Call the fetchTodos function to refresh the list

            //Resetting 
            setDescription("");
            setStatus("pending");
            setPriority("medium");

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">MY TODO LIST</h1>
            <form className="mt-5" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="description">Task Description</label>
                    <input 
                        type="text" 
                        className="form-control"  
                        id="description" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                        placeholder="What do you have planned ?"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        className="form-control"
                        id="priority"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button className="btn btn-success" type="submit">
                    Submit
                </button>
            </form>
        </Fragment>
    );
};

export default FormTodo;
