const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body;

  const data = {
    id: uuid(),
    likes: 0,
    title,
    url,
    techs,
  };

  repositories.push(data);

  return response.json(data);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body
  const indexRepository = repositories.findIndex(repository => 
    repository.id === id);

  if(indexRepository === -1){
    return response.status(400).send();
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[indexRepository].likes
  };

  repositories[indexRepository] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(repository => 
    repository.id === id);

  if(indexRepository === -1){
    return response.status(400).send();
  };

  repositories.splice(indexRepository, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(repository => 
    repository.id === id);
  
  if(indexRepository === -1){
    return response.status(400).send();
  };
  
  repositories[indexRepository].likes += 1;
    
  return response.json(repositories[indexRepository]);
});

module.exports = app;
