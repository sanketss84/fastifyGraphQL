const boom = require('boom') //error helper
const Car = require('../models/Car') // Get Data Models

//The biggest change to the controllers is how we get the parameters:
//We are using the ternary operator to accommodate requests from both the REST API and the GraphQL API, 
//as they have a slightly different implementation
// const id = req.params === undefined ? req.id : req.params.id
// const updateData = req.params === undefined ? req : req.params

// short for below code
// let id
// if (req.params === undefined) {
// 	id = req.id
// } else {
// 	id = req.params.id
// }

// Get all cars
exports.getCars = async () => {
	try {
		const cars = await Car.find()
		return cars
	} catch (err) {
		throw boom.boomify(err)
	}
}


exports.getCarsLimit = async () => {
	try {
		const limit = req.params === undefined ? req.limit : req.params.limit
		const cars = await Car.find().limit(limit)
		return cars
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single car by ID
exports.getSingleCar = async req => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const car = await Car.findById(id)
		return car
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new car
exports.addCar = async req => {
	try {
		const car = new Car(req)
		const newCar = await car.save()
		return newCar
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing car
exports.updateCar = async req => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const updateData = req.params === undefined ? req : req.params
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true })    
		return update
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a car
exports.deleteCar = async req => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const car = await Car.findByIdAndRemove(id)
		return car
	} catch (err) {
		throw boom.boomify(err)
	}
}