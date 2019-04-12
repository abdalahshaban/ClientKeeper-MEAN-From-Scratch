const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

const mongojs = require('mongojs');
const db = mongojs('clientKeeper', [ 'clients' ]);

//set Statics folder

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());

app.get('/', (req, res) => {
	res.send('please use /api/clients');
});

//get Clents -Get
app.get('/api/clients', (req, res) => {
	db.clients.find().sort({
		first_name: 1
	}, (err, clients) => {
		if (err) {
			res.send(err);
		} else {
			res.json(clients);
		}
	});
});

//add Client
app.post('/api/clients', (req, res) => {
	console.log('first post');

	db.clients.insert(req.body, (err, client) => {
		if (err) {
			res.send(err);
		} else {
			console.log('in insert');

			res.json(client);
		}
	});
});

// update client
app.put('/api/clients/:id', (req, res) => {
	const id = req.params.id;
	db.clients.findAndModify(
		{
			query: {
				_id: mongojs.ObjectId(id)
			},
			update: {
				$set: {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					phone: req.body.phone
				}
			},
			new: true
		},
		(err, client) => {
			res.json(client);
		}
	);
});

//delete

app.delete('/api/clients/:id', (req, res) => {
	const id = req.params.id;
	db.clients.remove(
		{
			_id: mongojs.ObjectId(id)
		},
		(err, client) => {
			if (err) {
				res.send(err);
			} else {
				res.json(client);
			}
		}
	);
});

app.listen(port, () => {
	console.log('server started on port' + port);
});
