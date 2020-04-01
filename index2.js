const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/carsdb2', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> console.log("Conectado correctamente a la base"))
  .catch(() => console.log("Error, no se pudo conectar correctamente"))

const carSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    lowercase: true,
    // upepercase: true,
    trim: true,
    minlength: 2,
    maxlength: 99,
    enum: ['bmw', 'audi']
  },
  model: String,
  sold: Boolean,
  price: {
    type: Number,
    required: function(){
      return this.sold
    }
  },
  year: {
    type: Number,
    min: 2000,
    max: 2030,
    get: y => Math.round(y)
  },
  extras: [String],
  date: {
    type: Date,
    default: Date.now
  } 
})

const Car = mongoose.model('car', carSchema)

createCar()
async function createCar(){
  const car = new Car({
    // company: 'BMW',
    model: 'X7',
    price: 7000,
    year: 2024,
    sold: true,
    extras: ['4x4']
  })
  try{
    const result = await car.save()
    console.log(result)
  } catch(err){
    console.log(err.message)
  }
}