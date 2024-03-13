    
    //-------------------------------------------------Imports-----------------------------------------------//
    
    
    import { Client } from 'pg';
    
    
    //-------------------------------------------------Insertion Interface-----------------------------------------------//
    
    export interface IWord {
        id?: number;
        word: string;
        meaningInEnglish?: string;
        meaningInUrdu?: string;
        similarWords?: string[];
        summaryOfWord?: string;
        authorOfWord?: string;
    }
    

    //-------------------------------------------------Updation Interface-----------------------------------------------//
    
    export interface UWord {
        id?: number;
        condition?: string;   
    }

    //-------------------------------------------------Deletion Interface-----------------------------------------------//
    
    export interface DWord {
        id?: number;
        condition?: string;   
    }

    //-------------------------------------------------Db Connection Interface-----------------------------------------------//
    
    export interface ConnInterface {
        client: Client;
      }




    //-------------------------------------------------External API's Response Interface-----------------------------------------------//
    

      
      interface Definition {
        definition: string;
        synonyms: string[];
        antonyms: string[];
      }
      
      interface Meaning {
        
        definitions: Definition[];
        
      }
      
      interface Synonyms {
        synonyms: string[];
      }
     
      
      export interface EResponse {
        word: string;
        meanings: Meaning[];
        synonyms: Synonyms[];
        
    }
    