require('dotenv').config()

// Require the fastify framework and instantiate it
const fastify = require('fastify')({
	logger: true
})

// Require external modules
const mongoose = require('mongoose')

console.log(process.env.DATABASE_URL)

// Connect to DB

// mongoose
// 	.connect('mongodb://localhost:27017/fastifyGraphQL', { useNewUrlParser: true }) //mongo db connection string goes here
// 	.then(() => console.log('MongoDB connected...'))
// 	.catch(err => console.log(err))

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

//Read More https://github.com/Automattic/mongoose/issues/8156
//Read More https://stackoverflow.com/questions/57895175/server-discovery-and-monitoring-engine-is-deprecated

mongoose
.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, })
.then(() => console.log('MongoDB Connected!'))
.catch(err => { err => console.log(err) })

module.exports = fastify

