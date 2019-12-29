// We require the main GraphQL package and use JavaScript Destructuring to get the necessary 
// GraphQL functions(GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList and GraphQLNonNull).

// We import our three controllers (carController, ownerController and serviceController).

// We declare the carType, ownerType and serviceType GraphQL Object Types, 
// which are functions that accept an object as a parameter, with a name and a fields key.

// These functions are used to define our GraphQL schema, similar to the Mongoose models defined earlier.

// The fields can return a particular type, and methods that take arguments. 
// Learn More about Object Types. https://graphql.org/graphql-js/object-types/

// Then we declare the RootQuery which is also a GraphQL Object Type and is found at the top level of every GraphQL server. 
// It represents all of the possible entry points into the GraphQL API. Learn More about root fields and resolvers.

// We then declare our Mutations, which are used to change data. Although any query could be implemented 
// to change data, operations that cause changes should be sent explicitly via a mutation. 
// Learn More about Mutations. https://graphql.org/learn/queries/#mutations

// Lastly we export the GraphQLSchema.

// Import External Dependancies
const graphql = require('graphql')

// Destructure GraphQL functions
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql

// Import Controllers
const carController = require('../controllers/carController')
const ownerController = require('../controllers/ownerController')
const serviceController = require('../controllers/serviceController')


// Now that we have our template setup we can start populating the Object Types, Root Query and Mutations.
// Note that there are Mongoose to GraphQL schema generators available, 
// but for the tutorial purposes we will manually create the schema.

// Define Object Types
// const carType = new GraphQLObjectType({
// 	name: 'Car',
// 	fields: () => ({})
// })

// Let’s dive deeper into the GraphQL functions, starting with the Scalars types in GraphQL:
// GraphQL comes with a set of default scalar types out of the box:
// Int: A signed 32‐bit integer. GraphQLInt
// Float: A signed double-precision floating-point value. GraphQLFloat
// String: A UTF‐8 character sequence. GraphQLString
// Boolean: true or false. GraphQLBoolean
// ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. 
// The ID type is serialised in the same way as a String; 
// however, defining it as an ID signifies that it is not intended to be human‐readable. GraphQLID

// The owner and service fields are where it gets interesting. 
// These fields are not defined as Scalar types like the rest — 
// instead, their type is referencing the ownerType and serviceType that we have created

// terminology - What does it mean when data is scalar? - Software Engineering Stack Exchange
// https://softwareengineering.stackexchange.com/questions/238033/what-does-it-mean-when-data-is-scalar

// The second argument that we pass into the owner and service fields are resolver functions.
// Resolver functions or methods are functions that resolves a value for a type or field in a schema
// Resolvers can be asynchronous too! They can resolve values from another REST API, database, cache, constant, etc.
// https://graphql.org/learn/execution/

// How GraphQL works internally -----
// You can think of each field in a GraphQL query as a function or method of the previous type which returns the next type. 
// In fact, this is exactly how GraphQL works. Each field on each type is backed by a function called the resolver 
// which is provided by the GraphQL server developer. 

// When a field is executed, the corresponding resolver is called to produce the next value.
// If a field produces a scalar value like a string or number, then the execution completes. 
// However if a field produces an object value then the query will contain another selection of fields which apply to that object. 
// This continues until scalar values are reached. GraphQL queries always end at scalar values.
// How GraphQL works internally -----

//To return a list or array from with GraphQL, we use the GraphQLList. 
// Here is a great in depth tutorial about using arrays in GraphQL Schema, but it is really simple: 
// whenever we need an array we will use the GraphQLList function.
// https://graphqlmastery.com/blog/graphql-list-how-to-use-arrays-in-graphql-schema

const carType = new GraphQLObjectType({
	name: 'Car',
	fields: () => ({
		_id: { type: GraphQLID },
		title: { type: GraphQLString },
		brand: { type: GraphQLString },
		price: { type: GraphQLString },
		age: { type: GraphQLInt },
		owner_id: { type: GraphQLID },
		owner: {
			type: ownerType,
			async resolve(parent, args) {
				return await ownerController.getSingleOwner({ id: parent.owner_id })
			}
		},
		services: {
			type: new GraphQLList(serviceType),
			async resolve(parent, args) {
				return await serviceController.getCarsServices({ id: parent._id })
			}
		}
	})
})

// const ownerType = new GraphQLObjectType({
// 	name: 'Owner',
// 	fields: () => ({})
// })

const ownerType = new GraphQLObjectType({
	name: 'Owner',
	fields: () => ({
		_id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
		cars: {
			type: new GraphQLList(carType),
			async resolve(parent, args) {
				return await ownerController.getOwnersCars({ id: parent._id })
			}
		}
	})
})

// const serviceType = new GraphQLObjectType({
// 	name: 'Service',
// 	fields: () => ({})
// })

const serviceType = new GraphQLObjectType({
	name: 'Service',
	fields: () => ({
		_id: { type: GraphQLID },
		car_id: { type: GraphQLID },
		name: { type: GraphQLString },
		date: { type: GraphQLString },
		car: {
			type: carType,
			async resolve(parent, args) {
				return await carController.getSingleCar({ id: parent.car_id })
			}
		}
	})
})

// Define Root Query
// const RootQuery = new GraphQLObjectType({
// 	name: 'RootQueryType',
// 	fields: {
// 		car: {},
// 		cars: {},
// 		owner: {},
// 		service: {}
// 	}
// })

// There are no new concepts in the above code, but keep in mind that the RootQuery query is the entry point to all queries on the GraphQL API. 
// So from the above we can see that we can run the following queries directly:
// - Get all the Cars
// - Get a single Car
// - Get a single Owner
// - Get a single Service
// Let’s open the GraphiQL user interface and build some queries: http://localhost:3000/graphiql.html

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		car: {
			type: carType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await carController.getSingleCar(args)
			}
		},
		cars: {
			type: new GraphQLList(carType),
			async resolve(parent, args) {
				return await carController.getCars()
			}
		},
		carsLimit: {
			type: new GraphQLList(carType),
			args: { limit: { type: GraphQLInt } },
			async resolve(parent, args) {
				return await carController.getCarsLimit(args)
			}
		},
		owner: {
			type: ownerType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await ownerController.getSingleOwner(args)
			}
		},
		service: {
			type: serviceType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await serviceController.getSingleService(args)
			}
		}
	}
})

// We declare our Object Type, specify the name and the fields.
// A mutation consists of the the type, args and the async resolve function. 
// The resolve function passes the args to the controller, which returns the result of the mutation.

// Define Mutations
// const Mutations = new GraphQLObjectType({
// 	name: 'Mutations',
// 	fields: {
// 		addCar: {
// 			type: carType,
// 			args: {},
// 			async resolve(args) {
// 				return ''
// 			}
// 		},
// 		editCar: {
// 			type: carType,
// 			args: {},
// 			async resolve(args) {
// 				return ''
// 			}
// 		},
// 		deleteCar: {
// 			type: carType,
// 			args: {},
// 			async resolve(args) {
// 				return ''
// 			}
// 		}
// 	}
// })

const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		addCar: {
			type: carType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				brand: { type: new GraphQLNonNull(GraphQLString) },
				price: { type: GraphQLString },
				age: { type: GraphQLInt },
				owner_id: { type: GraphQLID }
			},
			async resolve(parent, args) {
				const data = await carController.addCar(args)
				return data
			}
		},
		editCar: {
			type: carType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				title: { type: new GraphQLNonNull(GraphQLString) },
				brand: { type: new GraphQLNonNull(GraphQLString) },
				price: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				owner_id: { type: GraphQLID }
			},
			async resolve(parent, args) {
				const data = await carController.updateCar(args)
				return data
			}
		},
		deleteCar: {
			type: carType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args) {
				const data = await carController.deleteCar(args)
				return data
			}
		}
	}
})


// https://www.howtographql.com/graphql-js/8-filtering-pagination-and-sorting/
const FilterQuery = new GraphQLObjectType({
	name: 'FilterQuery',
	fields: {
		cars: {
			type: new GraphQLList(carType),
			async resolve(parent, args) {
				return await carController.getCars()
			}
		}
	}
})

// query paginateMoviesAndActors(
// 	$movieFirst: Int
// 	$movieSkip: Int
// 	$actorFirst: Int
// 	$actorSkip: Int
// 	$movieOrder: MovieOrderBy
//   ) {
// 	allMovies(filter: { releaseDate_gt: "2000" }, orderBy: $movieOrder, first: $movieFirst, skip: $movieSkip) {
// 	  title
// 	  actors(orderBy: name_ASC, first: $actorFirst, skip: $actorSkip) {
// 		name
// 	  }
// 	  releaseDate
// 	}
//   }

// Export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})