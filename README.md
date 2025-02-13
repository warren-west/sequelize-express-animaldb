# Adding Authentication to a Sequelize Express JS App

Today we added authentication to our application we've been working on this week.

We added authentication with PassportJS, using a local strategy.

The tutorials we followed to implement the authentication were:
1. JSS module [2.3 - Authentication and PassportJS](https://lms.noroff.no/mod/book/view.php?id=118265&chapterid=22741)
    - Starter code [here](https://github.com/noroff-bed1/DAB_M3_L4_S)
2. DAB module [3.4 - Implementing Authentication](https://lms.noroff.no/mod/book/view.php?id=118269&chapterid=22928)
    - Starter code [here](https://github.com/noroff-bed1/JSS_M2_L3_S)

The lesson record for this code demo can be found [here](https://noroff.zoom.us/rec/share/YQ6FhNIHG78Mnc9kHjTcd8zhyYNAF9bfOZia2lLjhck6vc086TqdrGgnsz6xvZCv.izE6uHYSlQ3IwWHC?pwd=7czcK-2R4w79862o_9HZUMFLFvHK2jgQ)

## Installation

To install dependencies run:

```bash
npm install
```

## Usage
To start the application run:
```bash
npm start
```

## Seeding initial data

If you want to seed the database with initial data, you can uncomment the following code inside `./db/seedDatabase.js`:
```javascript
// await insertData()
```
Beware of it adding duplicate data if you're using `nodemon`, because every time you save, and the server restarts, the data will be added again.

## Environment variables
Make sure you have a `.env` file with values for the following items:
```
PORT
DATABASE_NAME
DATABASE_USERNAME
DATABASE_PASSWORD
DIALECT
DIALECTMODEL
```

## Technologies used
- dotenv
- ejs
- express
- express-session
- mysql2
- passport
- passport-local
- sequelize

## Contributing

@warren-west | Noroff Fagskole AS

## License

[MIT](https://choosealicense.com/licenses/mit/)