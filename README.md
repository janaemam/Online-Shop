# Online-Shop

This is a simple online shopping site. You can register as a seller, a user or a shipping company. There is one admin by default.
Customers can make orders from different sellers and choose a specific shipping company as long as it covers their region. 
Sellers can add new products, refill if sold out and see previous customer purchases. 
Shipping Companies see orders that need to be delivered and marks them as delivered or in progress. 

React.Js is used for front end. We used Jakarta EE and Java beans for backend, and MySQL for the database. 

To Run:
Database:
1. Create a new database scheme using MySql Workbench. You can call it what you want but you have to change it in the persistence.xml file. 
2. Import the tables from the database folder. 
3. Change the root and password in the persistence.xml file. 

Frontend:
1. Run npm install in the terminal.
2. Run npm start.
3. Make sure the api name is the same as the one generated by the backend. 

Backend:
1. Download Jboss/Wildfly server.
2. Run using the server.

You can make sure that the backend is working using postman.

A side note, this project was done by a team of 2. I was responsible for the backend only and I had no input when it came to the frontend. 