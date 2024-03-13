//-----------------------------Imports----------------------------//

import { DWord, IWord, UWord } from "../utils/customInterfaces/dictionary";

const Joi = require('joi');

//----------------------Insertion Validator-----------------------//
  
exports.validateInsertion = async (body:Partial<IWord>) => {
    const schema = Joi.object({
        id: Joi.number().optional(),
        word: Joi.string().min(3).max(30).required(),
        meaningInEnglish: Joi.string().min(3).max(60).optional(),
        meaningInUrdu: Joi.string().min(3).max(60).optional(),
        similarWords: Joi.array().optional(),
        summaryOfWord: Joi.string().min(3).max(60).optional(),
        authorOfWord: Joi.string().min(3).max(60).optional(),
      });
    
    try {
        await schema.validateAsync(body);
        return true
    } catch (error:any) {
        console.error(error.message);
        return false;
    }
};




//----------------------Get Data Validator-----------------------//

exports.validateGetData = async (body:number) => {
    const schema = Joi.object({
        id: Joi.number().optional(),
      });
    
    try {
        await schema.validateAsync(body);
        return true
    } catch (error:any) {
        console.error(error.message);
        return false;
    }
};



//----------------------Update Data Validator-----------------------//

exports.validateUpdateData = async (body:UWord) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        wordToInsert: Joi.string().min(3).max(30).required(),
      });

    try {
        await schema.validateAsync(body);
        return true
    } catch (error:any) {
        console.error(error.message);
        return false;
    }
};

//----------------------Delete Data Validator-----------------------//

exports.validateDeleteData = async (body:Partial<DWord>) => {
    const schema = Joi.object({
        id: Joi.number().optional(),
        condition: Joi.string().min(3).max(50).optional(),
      });

    try {
        await schema.validateAsync(body);
        return true
    } catch (error:any) {
        console.error(error.message);
        return false;
    }
};

//----------------------Search Data Validator-----------------------//

exports.validateSearchData = async (input: string | number | boolean) => {
    const schema = Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.boolean()
    );

    try {
        await schema.validateAsync(input);
        return true;
    } catch (error:any) {
        console.error(error.message);
        return false;
    }
};