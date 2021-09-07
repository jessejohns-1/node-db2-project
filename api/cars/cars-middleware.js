const Car = require('./cars-model');
const db = require('../../data/db-config')
const vinValidation = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try{
    const car = await Car.getById(req.params.id)
    if(!car) {
      next ({status:404,  message: `car with id ${req.params.id} is not found`})
    }else {
      req.car = car
      next()
    }
  }catch (err) {
    next(err)
  }
}


const checkCarPayload = (req, res, next) => {
  const error = {status: 400}
  const {vin,make,model,mileage} = req.body
  if(vin  === undefined){
    error.message = 'vin is missing'
  }else if(make === undefined){
    error.message = 'make is missing'
  } else if (model === undefined) {
    error.message = 'model is missing'
  } else if (mileage === undefined) {
    error.message = 'mileage is missing'
  }
  if (error.message){ next(error) }
  else{
      next();
  }
}


const checkVinNumberValid = async (req, res, next) => {
  if (vinValidation.validate(req.body.vin)) { next() }
  else { next({status: 400, message: `vin ${req.body.vin} is invalid`}) }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const vinExist = await db('cars')
    .where('vin', req.body.vin).first()
    if(vinExist){
      next({status: 400, message: `vin ${req.body.vin} already exists`})
    }else{next()}
  }catch (err){
    next(err)
  }
}

module.exports = {
  checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique
}