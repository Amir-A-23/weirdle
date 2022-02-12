const axios = require('axios').default;
const express = require('express');

require('dotenv').config();

const RANDOM_WORD_API_KEY = process.env.RANDOM_WORD_API_KEY;
const app = express();
const PORT = 8000;

app.get('/word', (req, res) => {
	const options = {
		method: 'GET',
		url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
		params: { count: '5', wordLength: '5' },
		headers: {
			'x-rapidapi-host': 'random-words5.p.rapidapi.com',
			'x-rapidapi-key': RANDOM_WORD_API_KEY,
		},
	};

	axios
		.request(options)
		.then((response) => {
			console.log(response.data);
			res.json(response.data[0]);
		})
		.catch(function (error) {
			console.error(error);
		});
});
app.listen(PORT, () => console.log('Server running on port ' + PORT));
