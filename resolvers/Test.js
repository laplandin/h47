const axios = require('axios');

exports.query =  async () =>  {
	return 'string';
	const res = await axios.get('http://localhost:3200/');
	console.log(res);
	return res.data
};

exports.mutations = async () => true;
