# Node DB2 Project Starter Code

## Introduction

In this challenge, you will write an API that can be used to manage _Cars_ stored in a Relational Database../

## Instructions

### Task 1: Project Setup

Your instructor should have communicated which method to use for this project during the Guided Project and in your cohort's Slack channel. If you are still unsure, reach out to Lambda Staff.

### Task 2: Minimum Viable Product

Build a RESTful API for an "cars" resource. The client for this API is a car dealer.

#### Cars Schema

The critical information for each car is the vin, make, model, and mileage. They also track transmission type (manual, automatic...) and status of the title (clean, salvage...), but this information is not always immediately known. Write the "up" and "down" functions inside the `data/migrations/01-make_cars_table.js` migration file to satisfy the following schema:

| field        | data type        | metadata                                            |
| ------------ | ---------------- | --------------------------------------------------- |
| id           | unsigned integer | primary key, auto-increments, generated by database |
| vin          | string           | required, unique                                    |
| make         | string           | required                                            |
| model        | string           | required                                            |
| mileage      | numeric          | required                                            |
| title        | string           | optional                                            |
| transmission | string           | optional                                            |

#### Write Model Functions

- Write the following db access functions inside `api/cars/cars-model.js` using Knex:

  - `getAll` resolves to an array of car records (or an empty array)
  - `getById` resolves to a car record by the given id
  - `create` resolves to the newly created car record

#### Write Middleware

- Write the following middlewares inside `api/cars/cars-middleware.js`:

  - `checkCarId` returns a status 404 with a `{ message: "car with id <car id> is not found" }` if the id in `req.params` does not exist in the database.

  - `checkCarPayload` returns a status 400 with a `{ message: "<field name> is missing" }` if any required field is missing.

  - `checkVinNumberValid` returns a status 400 with a `{ message: "vin <vin number> is invalid" }` if the vin number is [invalid](https://www.npmjs.com/package/vin-validator).

  - `checkVinNumberUnique` returns a status 400 with a `{ message: "vin <vin number> already exists" }` if the vin number already exists in the database.

### Write a Cars API

- Write CR (of CRUD) for the `cars` resource, using the middleware and model functions described above wherever appropriate inside `api/cars/cars-router.js` :

  - `[GET] /api/cars` returns an array of cars sorted by id (or an empty array if there aren't any).
  - `[GET] /api/cars/:id` returns a car by the given id.
  - `[POST] /api/cars` returns the created car.

- Manually test your endpoints with a REST client like `Insomnia` or `Postman` to check they are working as expected.
- Test your endpoints automatically by running `npm test`.

#### Notes

- Test your work manually using Postman or HTTPie. Run automatic tests by executing `npm test`.
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install additional libraries or add additional scripts. **Do not update existing libs**.
- In your solution, it is essential that you follow best practices and produce clean and professional results.

### Task 3: Stretch Problems

- Add seed data to the database using `knex seeds`
- Add `[PUT]` and `[DELETE]` operations to your API.
- Write a schema file for a `sales` table. This table should track information on the sale of each car. You may wish to research `foreign keys` in order to link each sale to the entry in `cars` which sold.
