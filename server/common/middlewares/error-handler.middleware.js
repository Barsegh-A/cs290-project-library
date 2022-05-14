const NotFoundError = require('../errors/not-found.error');

module.exports = (err, req, res, next) => {

    console.log('Catching error in the global catcher.');
    console.log(err.message);

    if (err instanceof NotFoundError) {
        return res.status(404).send(err.message);
    }

    res.status(500).send('Some monkeys are deployed to look at your problem.');
    next(err);
}