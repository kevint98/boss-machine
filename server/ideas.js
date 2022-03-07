const ideasRouter = require('express').Router();

const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
	getAllFromDatabase,
	getFromDatabaseById,
	addToDatabase,
	updateInstanceInDatabase,
	deleteFromDatabasebyId,
} = require('./db');

ideasRouter.param('id', (req, res, next, id) => {
	const idea = getFromDatabaseById('ideas', id);
	if (idea) {
		req.idea = idea;
		next();
	} else {
		res.status(404).send();
	}
});

ideasRouter.get('/', (req, res, next) => {
	res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
	const newIdea = addToDatabase('ideas', req.body);
	res.status(201).send(newIdea);
});

ideasRouter.get('/:id', (req, res, next) => {
	res.send(req.idea);
});

ideasRouter.put('/:id', (req, res, next) => {
	const updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
	res.send(updatedIdeaInstance);
});

ideasRouter.delete('/:id', (req, res, next) => {
	const deleted = deleteFromDatabasebyId('ideas', req.params.id);
	if (deleted) {
		res.status(204);
	} else {
		res.status(500);
	}
	res.send();
});

module.exports = ideasRouter;
