
import express, { Request, Response } from 'express';
import dictionaryController from '../controller/dictionary';


class DictionaryRoutes{
    private router!: express.Router

    constructor(){
        this.router = express.Router()
    }

    public dictionaryRoutes(): express.Router{
        this.router.post('/insertWord', dictionaryController.insertWord);
        this.router.get('/getWord', dictionaryController.getWord);
        this.router.get('/searchWord', dictionaryController.searchWord);
        this.router.put('/updateWord', dictionaryController.updateWord);
        this.router.delete('/deleteWord', dictionaryController.deleteWord);
        return this.router
    }
}

export default new DictionaryRoutes().dictionaryRoutes()