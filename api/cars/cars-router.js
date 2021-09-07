const router = require('express').Router();
const Car = require('./cars-model');

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware")

router.get('/', async (req,res,next) => {
    try{
        const cars = await Car.getAll();
        res.json(cars)
    }catch(err){
        next(err)
    }
})

router.get('/:id', checkCarId, (req,res,next) => {
    res.json(req.car)
    next();

})

router.post('/', checkCarPayload,checkVinNumberUnique,checkVinNumberValid, async (req,res,next)=>{
    try{
        const newCar = await Car.create(req.body)
        res.status(201)(newCar)
    }catch (err){
      next(err)  
    }
})
module.exports = router;