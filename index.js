const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');

console.log(resolvers)

const server = new GraphQLServer({
	typeDefs: './schema.graphql',
	resolvers
});

server.start(() => console.log(`The server is running on http://localhost:4000`));
