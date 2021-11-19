import React, { Fragment, useState,useRef } from "react";

interface Itask {
  name: string;
  done: boolean;
}
function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Itask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newTask);
    addTasks(newTask);
    setNewTask("");
    taskInput.current?.focus()
  };
  const addTasks = (name: string) => {
    const newTasks = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i:number) => {
    const newTasks = [...tasks];
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
  };

  const deleteTask = (i:number) => {
    const newTasks = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks)
  };
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2" type="submit">save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: Itask, i: number) => {
            return <div className="card card-body mt-2" key={i}>
                   <h2 style={{textDecoration:t.done?'line-through':''}} >{t.name}</h2>
                   <div>
                   <button className="btn btn-secondary" onClick={()=>toggleDoneTask(i)}>{t.done?'🗸':'✗'}</button>
                   <button className="btn btn-danger" onClick={()=>deleteTask(i)}>🗑</button>
                   </div>
            </div>
             
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
