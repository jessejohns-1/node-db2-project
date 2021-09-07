const cars = [
   
 {
        vin: '97069581390974567',
        make: 'jeep',
        model: 'cherokee',
        mileage: 44500
    },
    {
        vin: '79948333363746509',
        make: 'dodge',
        model: 'ram',
        mileage: 320000,
        title: 'salvage',
    },
    {
        vin: '11167589457727362',
        make: 'kia',
        model: 'soul',
        mileage: 123456,
        title: 'clean',
        transmission: 'automatic'
    }
]

exports.seed = async function(knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
}