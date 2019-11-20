# spacex-odyssey
Spacex-odyssey models an API which can be used to manage digital wallets for people who wish to make space travels. Two rockets are available: falcon 1 and falcon 9.
Customers can choose to travel with falcon 1 or falcon 9. Travelling in Falcon 9 costs twice as 'falcon 1'. Travelling from a point to another in the same orbit with 'falcon 1' cost 50BTC (bitcoin currency). Travelling to a different orbit cost 250BTC with 'falcon 1'. Landing on a manmade satellite cost 200BTC regardless of rocket.
Customers can travel to abuja space station(natural satelite), moon (natural), spock(mars) and the ISS (international space station) which is a manmade satellite.

This is a coding challenge done as part of studio 14 application process.

link to github repository: https://github.com/mescoccer/spacex

## Table of Contents

* [Technologies Used](#technologies-used)
* [Testing Tools](#testing-tools)
* [Application Features](#application-features)
* [API Documentation](#api-documentation)
* [How to Run](#how-to-run)
* [How to Test](#how-to-test)
* [Author](#author)
* [License](#license) 

## Technologies Used

* [Nodejs](https://nodejs.org/en/)
* [Es6](https://es6.io/)
* [Express](https://expressjs.com)
* [Babel](https://babeljs.io)
* [Eslint](https://eslint.org) (Airbnb--style guide)


## Testing Tools

* [Mocha](https://mochajs.org) - A javascript test framework
* [Chai](https://www.chaijs.com) - Assertion library


## API Documentation

* fund(load) wallet:
  - url: POST /api/v1/funds
  - request body parameters: customer_id, amount
  - example: { customer_id: 1, amount: 3000 }
  
* make space trips: 
  - url: POST /api/v1/transportation
  - request body: customer_id, from, to, rocket
  - example: { customer_id: 1, from: 'abuja', to: 'moon', rocket: 'falcon 9' }
  
* get account balance: GET /api/v1/funds/{id}
  - path parameter: id(integer)


## How to Run

```
# Open a command line and change into your working directory

#Download latest version on Nodejs (https://nodejs.org/en/)

#Run node -v in the terminal to confirm

# Clone the repository or download the zip file and extract into your working directory
$ git clone https://github.com/mecsoccer/spacex-odyssey.git

# Still in your working in your working directory change into spacex-odyssey
$ cd spacex-odyssey

# Install dependencies
$ npm install

note: you are free to use any port

# Run the app
$ npm start

your app should now be running at http://localhost:3000/api/v1.
```


## How to Test

```
# In the root folder run the following command
$ npm run test
```


## Author
Jaachimma Onyenze


## License
MIT
