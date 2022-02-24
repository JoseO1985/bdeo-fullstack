
## Getting started

Clone repo, navigate to root folder and run ` docker-compose up --build`

```
  git clone https://github.com/JoseO1985/bdeo-fullstack.git
  cd bdeo-fullstack
  docker-compose up --build
```

## Project Structure 
The apps are written in the following JavaScript frameworks/libraries:

| folder          | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| **frontend** | [frontend app using **Angular**](https://github.com/JoseO1985/bdeo-fullstack/tree/main/frontend)         |
| **backend** | [backend using **Expressjs**](https://github.com/JoseO1985/bdeo-fullstack/tree/main/backend) |
| **backend** | [mongo db image setup](https://github.com/JoseO1985/bdeo-fullstack/tree/main/database) |


### About the Project

This is a simple web application. It has:
A working user login page. Registration should be done with Postman and the signup endpoint.
A page containing a list of beer records with server side pagination
A beer detail page
An autocomplete filter example
Responsive design
Right sidebar for top ten beers
Also, api services are secured using JWT and every request is stored in database. 


#### About the api endpoints

POST http://localhost:3000/api/auth/signup
REQUEST
{
    "name": "partner01",
    "email": "partner01@gmail.com",
    "password": "partner01"
}

POST http://localhost:3000/api/auth/login
REQUEST
{
    "email": "partner01@gmail.com",
    "password": "partner01"
}
RESPONSE
{
    "status": "success",
    "data": {
        "user": {
            "_id": "6217a3ab06b0ac00139d7df4",
            "name": "partner01",
            "email": "partner01@gmail.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjE3YTNhYjA2YjBhYzAwMTM5ZDdkZjQiLCJpYXQiOjE2NDU3MTY2NDAsImV4cCI6MTY0NjMyMTQ0MH0.KYTekfYKIBi8EamMMign45yUg98E9D9a0-Vb0Eoaef8"
    }
}

List of beers with pagination and field projection
GET http://localhost:3000/api/beers?select=id,name,ingredients&size=7&page=0&name=BRAMLING&token=<token>

List of all beers
GET http://localhost:3000/api/beers?token=<token>

Top ten beers ordered by first brewed field
GET http://localhost:3000/api/beers/top-ten?token=<token>&order=-1

Get beer by id
GET http://localhost:3000/api/beers/620ede749d67f4b20f4d7772?token=<token>

Autocomplete beer name or ingredient
GET http://localhost:3000/api/beers/autocomplete/blon?token=<token>

Most repeated ingredients
GET http://localhost:3000/api/beers/most-repeated?token=<token>

