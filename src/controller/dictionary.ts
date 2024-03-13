import { Request,Response } from "express";

import dictionaryService from "../services/dictionary";
import { IWord, UWord } from "../utils/customInterfaces/dictionary";





class DictionaryController {
    
    public async insertWord(req: Request, res: Response){
        const {body} = req;
        const word: string = body.wordToInsert;
        dictionaryService.insertWord(word);
        res.status(200).send("OK Word Inserted!");
    }
    public async getWord(req: Request, res: Response){
        const {params} = req;
        const id: number = Number(params.id);
        const response = await dictionaryService.getWord(id);
        
        if (response) {

            return res.status(200).send(response);
        }else{
            return res.status(400).send("No Data Found!");
        }
    }
    public updateWord(req: Request, res: Response){
        const {body} = req;
        const word: string = body.wordToInsert;
        const id: number = body.id;
        const condition: string = body.condition; 
        dictionaryService.updateWord(word, id, condition);
    }
    public deleteWord(req: Request, res: Response){
        const {body} = req;
        const id: number = body.id;
        const condition: string = body.condition;
        dictionaryService.deleteWord(id,condition); 
    }
    public async searchWord(req: Request, res: Response){
        const {body} = req;
        const condition: Partial<IWord> = body.condition;
        const response = await dictionaryService.searchWord(condition);
        if (response) {

            return res.status(200).send(response);
        }else{
            return res.status(400).send("No Data Found!");
        }
    }
}

export default new DictionaryController()

