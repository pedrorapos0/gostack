const express = require("express");

const server = express(); 

server.use(express.json());

const  projects = [];

server.use((req, res, next) => {
console.count("Requisiçõs: ")
next();
});

function checkIdExist(req, res, next){
  const {id} = req.params;
  if(! projects.find((project) => project.id == id)){
    res.status(400).json({erro: `project com id ${id} não existe!`});
  }
  next();
}



server.get("/projects",(req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
    const {id, title} = req.body;

    const project = {
      id,
      title,
      tasks: []
    };
    projects.push(project);
    return res.json(projects);
});

server.post("/projects/:id/task",checkIdExist, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const project = projects.find((project) => project.id == id);
  project.tasks.push(task);
  return res.json(projects);
});

server.put("/projects/:id",checkIdExist,  (req, res) => {
  const {id}  = req. params;
  const {title}  = req.body;
  const project = projects.find((project) => project.id ==id);
   project.title = title;
  return res.json(projects)
});

server.delete("/projects/:id",checkIdExist, (req, res) => {
  const {id} = req.params;
  const index = projects.findIndex((project) => project.id == id);
  projects.splice(index,1);
  return res.send();
});

server.listen(3000);
console.log("listening port 3000!");