const minionsRouter = require('express').Router();

const {
	getAllFromDatabase,
	getFromDatabaseById,
	addToDatabase,
	updateInstanceInDatabase,
	deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
	const minion = getFromDatabaseById('minions', id);
	if (minion) {
		req.minion = minion;
		next();
	} else {
		res.status(404).send();
	}
});
minionsRouter.get('/', (req, res, next) => {
	res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
	const newMinion = addToDatabase('minions', req.body);
	res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
	res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
	const updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
	res.send(updatedMinionInstance);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
	const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
	if (deleted) {
		res.status(204);
	} else {
		res.status(500);
	}
	res.send();
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
	const work = getAllFromDatabase('work').filter(
		singleWork => singleWork.minionId === req.params.minionId
	);
	res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
	const newWork = addToDatabase('work', req.body);
	res.status(201).send(newWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
	const work = getFromDatabaseById('work', id);
	if (work) {
		req.work = work;
		next();
	} else {
		res.status(404).send();
	}
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
	if (req.params.minionId !== req.body.minionId) {
		res.status(400).send();
	} else {
		const updatedWork = updateInstanceInDatabase('work', req.body);
		res.send(updatedWork);
	}
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
	const deleted = deleteFromDatabasebyId('work', req.params.workId);
	if (deleted) {
		res.status(204);
	} else {
		res.status(404).send('Work with givien ID not found');
	}
	res.send();
});

module.exports = minionsRouter;
