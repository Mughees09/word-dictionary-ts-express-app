    //-------------------------------------------------Imports-----------------------------------------------//

import { IWord, UWord } from "../utils/customInterfaces/dictionary";
import getWordDetails from "../repository/getWordDetails";
import dictionaryModal from "../repository/dictionaryModal";    
 
     //-------------------------------------------------Class-----------------------------------------------//
    
class DictionaryService {
    private input!: string;
    private wordDetails!: IWord | null;

   
  
  /**
   * fetchWordDetails
   */
  public async fetchWordDetails(word: string): Promise<IWord | null>  {
    this.input = word;
    this.wordDetails = await getWordDetails.fetchDetails(this.input); 
    return this.wordDetails;
  }

    /**
    * insertWord
    */
   public async insertWord(word: string) {
    const wordDetails: Partial<IWord> | IWord | null = await  this.fetchWordDetails(word);
    dictionaryModal.insertOne(wordDetails);
   }

   /**
    * getWord
    */
   public async getWord(id?:number): Promise<IWord | Partial<IWord> | IWord[]> {
    let wordDetails!: Partial<IWord> | IWord | Array<IWord>; 
    
    if (id) {
      wordDetails = await dictionaryModal.getOne(id);
      
       return  wordDetails
    }else {
      wordDetails = await dictionaryModal.getAll();
      
       return  wordDetails
    }
   }

   /**
    * updateWord
    */
   public async updateWord(word:string, id?: number, condition?: string) {
    let newData: Partial<IWord> | null = await getWordDetails.fetchDetails(word);
    if (id) {
         dictionaryModal.updateOne(id,newData);
    } else if (condition) {
         dictionaryModal.updateMany(newData,condition);
    }

   }

   /**
    * deleteWord
    */
   public deleteWord(id?:number, condition?:string) {
     if (id) {
         dictionaryModal.deleteOne(id);
     } else if (condition) {
         dictionaryModal.deleteMany(condition);
     } 
   }

   /**
    * searchWord
    */
   public async searchWord(condition: Partial<IWord>) {
      const result = await dictionaryModal.filterWordsUsingOr(condition);
      return result
   }

}

export default new DictionaryService()