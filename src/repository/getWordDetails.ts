import { EResponse, IWord } from "../utils/customInterfaces/dictionary";

class WordDetails {
    private wordDetails!: IWord;
    private word!: string;

    /**
     * fetchDetails
     */
    public async fetchDetails(word:string ): Promise<IWord | null> {
        this.word = word;
        
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
    
        const data: EResponse[] = await response.json();
        const apiWord = data[0];
        const generatedId = Math.floor(Math.random() * 20) + 1;
        this.wordDetails = {
            id: generatedId,
            word: apiWord.word,
            meaningInEnglish: apiWord.meanings[0]?.definitions[0]?.definition || '',
            meaningInUrdu: '', 
            similarWords: apiWord.meanings[0]?.definitions[0]?.synonyms || [],
            summaryOfWord: '', 
            authorOfWord: '', 
        };

        return this.wordDetails
    }
    


    
}

export default new WordDetails()