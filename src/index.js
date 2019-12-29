require('dotenv').config()

const fastify = require('./server.js') //server config

// GraphQL Setup
// With the below code we require the Fastify GraphQL Adapter, import the schema and register the GraphQl Adapter with Fastify.
// We register the schema and enable GraphiQL, an in-browser IDE for exploring GraphQL.

const gql = require('fastify-gql')
const schema = require('./schema') // Import GraphQL Schema

// Register Fastify GraphQL
fastify.register(gql, {
    schema,
    graphiql: true
})

// GraphQL Setup Ends Here

const routes = require('./routes') //routes
const swagger = require('./config/swagger') //swagger config
fastify.register(require('fastify-swagger'), swagger.options) //register swagger

routes.forEach((route, index) => {
	fastify.route(route)
})

// Default Route
fastify.get('/', async (request, reply) => {
    return { hello: 'from fastify graphql demo' }
})

//check if values are getting loaded from env file 
console.log(process.env.HOST)
console.log(process.env.PORT)
console.log(process.env.DATABASE_URL)

// Run the server!
const start = async () => {
    try {
            await fastify.listen(3000)
            fastify.log.info(`server listening on ${fastify.server.address().port}`)
        } catch (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    }

start()