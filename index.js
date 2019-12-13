const { GraphQLServer } = require('graphql-yoga')
const axios = require('axios')

const typeDefs = `
type Query {
  description: String
}
`

const resolvers = {
	Query: {
		// description: () => `This is the API for a simple blogging application`
		description: async () =>  {
			const res = await axios.get('http://localhost:3200/')
			console.log(res);
			return res.data
		}
	}
}

const server = new GraphQLServer({
	typeDefs,
	resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000`))
