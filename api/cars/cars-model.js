const db = require('../../data/db-config')


const getAll = () => {
  return db('cars')
}

const getById =  async (id) => {
 const result = await db('cars').where('id', id).first()
 return result
}

const create = async (car) => {
  const [id] = await db('cars').insert(car)
  return getById(id)
}

function getByVin(vin){
  return db('cars')
  .where('vin', vin)
  .first()
}

module.exports = {
  
  getAll,
  getById,
  create,
  getByVin
}