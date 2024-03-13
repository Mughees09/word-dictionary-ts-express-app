import express from 'express'
import dictionaryRoutes from '../routes/dictionary';
import db from '../utils/dbConfiguration/db';
   
class App {
    public app;

    constructor(){
        this.app = express();
        this.app.use(express.json({}))
        this.app.use("/dictionary", dictionaryRoutes) // mount route group
    }

    public async dbConnection(){
        await db.connectToDatabase();
    }

    public listen(){
        this.dbConnection();
        this.app.listen(3000, () => {
            console.log("App is running on port 3000");
        })
    }
}

new App().listen()