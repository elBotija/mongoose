const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/carsdb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> console.log("Conectado correctamente a la base"))
  .catch(() => console.log("Error, no se pudo conectar correctamente"))

const carSchema = new mongoose.Schema({
  company: String,
  model: String,
  price: Number,
  year: Number,
  sold: Boolean,
  extras: [String],
  date: {type: Date, default: Date.now}
})

const Car =  mongoose.model('car', carSchema)

deleteCar("5e83d755a2d7e9140cbe8917")
async function deleteCar(id) {
  const result = await Car.deleteOne({_id: id})
  console.log(result)
}

// updateFirstCar(id='5e83da951aa4931626439b71')
async function updateFirstCar(id) {
  const result = await Car.update(
    {_id:id},
    {
      $set:{
        company: 'Seat',
        model: 'Ibizas'
      }
    }
  )
  console.log(result)
}


// updateCar(id='5e83d45cbefb9a1225c778cb')
async function updateCar(id) {
  const car = await Car.findById(id)
  if(!car) return

  car.company = 'Mercedes'
  car.model = 'Clase A'

  const result = await car.save()
  console.log(result)
}

// getPaginationCars()
async function getPaginationCars() {
  const pageNumber = 1
  const pageSize = 2
  const cars = await Car
    .find()
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)

   console.log(cars)
}

// getCountCar()
async function getCountCar() {
  const cars = await Car
    .find({company: 'Audi'})
    .count()
   console.log(cars)
}

// getFilterPriceAndOrCars()
async function getFilterPriceAndOrCars() {
  const cars = await Car
    .find()
    // .and([{company: 'BMW'},{model: 'X3'}])
    .or([{company: 'BMW'},{model: 'X3'}])
  
   console.log(cars)
}

// getFilterPriceInNinCars()
async function getFilterPriceInNinCars() {
  const cars = await Car
    .find({extras: {$in: 'laser'}})
  
   console.log(cars)
}

// getFilterPriceCars()
async function getFilterPriceCars() {
  const cars = await Car
    .find({price: {$gte: 2000, $lt: 5500}})
  
   console.log(cars)
}

// getMoreFilterCar()
async function getMoreFilterCar() {
  const cars = await Car
    .find({company: 'BMW', sold: false})
    .sort({price: 1})
    .limit(2)
    .select({company: 1, model: 1, price: 1})
  
  console.log(cars)
}


// getCompanyAndSoldFilterCars()
async function getCompanyAndSoldFilterCars(){
  const cars = await Car.find({company: 'BMW', sold: false})
  console.log(cars)
}

// getCars()
async function getCars() {
  const cars = await Car.find()
  console.log(cars)
}

// createCar()

async function createCar(){
  const car = new Car({
    company: 'BMW',
    model: 'S1',
    price: 6020,
    year: 2020,
    sold: false,
    extras: ['laser']
  })

  const result = await car.save()
  console.log(result)
}