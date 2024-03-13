    //-------------------------------------------------Imports-----------------------------------------------//
    
    import { Client } from 'pg';
    import { IWord, UWord } from '../utils/customInterfaces/dictionary';
    import db from '../utils/dbConfiguration/db';
    //-------------------------------------------------Class-----------------------------------------------//
    
class DictionaryModal {
    private tableName: string;
    private connection: Client;

    constructor(tableName: string, connection: Client) {
        this.tableName = tableName;
        this.connection = connection;
    }

    async tableExists() {
        try {
            const result = await this.connection.query(
                `SELECT EXISTS (
                    SELECT 1
                    FROM information_schema.tables
                    WHERE table_name = $1
                ) AS "exists"`,
                [this.tableName]
            );
            return result.rows[0].exists;
        } catch (error) {
            console.error(`Error checking if table '${this.tableName}' exists:`, error);
            return false;
        }
    }

    async createTableIfNotExists() {
        try {
            const tableExists = await this.tableExists();
            if (!tableExists) {
                const query = `
                    CREATE TABLE ${this.tableName} (
                        id SERIAL PRIMARY KEY,
                        word VARCHAR(255) NOT NULL,
                        meaningInEnglish VARCHAR(255),
                        meaningInUrdu VARCHAR(255),
                        similarWords VARCHAR(255)[],
                        summaryOfWord TEXT,
                        authorOfWord VARCHAR(255)
                    )
                `;
                await this.connection.query(query);
            } 
        } catch (error) {
            console.error(`Error creating table '${this.tableName}':`, error);
        }
    }

    async insertOne(data: Partial<IWord> | IWord | null) {
        if (data) {
            
            const keys = Object.keys(data);
            const values = Object.values(data);
            const placeholders = keys.map((_, index) => `$${index + 1}`).join(',');
            const columns = keys.join(',');
            const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
            
            await this.connection.query(query, values);
           
        }
    }
    
    

    async insertMany(dataArray: Array<IWord>) {
        const keys = Object.keys(dataArray[0]); // Assuming all objects in dataArray have the same structure
        const placeholders = keys.map((_, index) => `($${index + 1})`).join(',');
        const columns = keys.join(',');
        const values = dataArray.map(obj => Object.values(obj)).flat(); // Flatten values from array of objects
        const query = `INSERT INTO ${this.tableName} (${columns}) VALUES ${dataArray.map(() => `(${placeholders})`).join(',')}`;
        await this.connection.query(query, values);
    }

    async getOne(id: number) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
        const result = await this.connection.query(query, [id]);
        return result.rows[0];
    }

    async getAll() {
        const query = `SELECT * FROM ${this.tableName}`;
        const result = await this.connection.query(query);
        return result.rows;
    }

    async updateOne(id:number, newData: Partial<IWord> | null) {
        if (!newData) {
            throw new Error("Invalid newData object: null");
        }
    
        const setClauses = Object.keys(newData)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(',');
        const values = Object.values(newData);
        values.push(id); // Add the id as the last parameter
        const query = `UPDATE ${this.tableName} SET ${setClauses} WHERE id = $${values.length}`;
        await this.connection.query(query, values);
    }
    
    

    async updateMany(newData: Partial<IWord> | null, condition: string) {
        if (!newData) {
            throw new Error("Invalid newData object: null");
        }
    
        const setClauses = Object.keys(newData)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(',');
        const values = Object.values(newData);
        const query = `UPDATE ${this.tableName} SET ${setClauses} WHERE ${condition}`;
        await this.connection.query(query, values);
    }

    async filterWordsUsingAnd(condition: Partial<IWord>){
        const keys = Object.keys(condition);
        const values = Object.values(condition);
        const whereClauses = Object.keys(condition)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(' AND ');
        const query = `SELECT * FROM ${this.tableName} WHERE ${whereClauses}`;
        const result = await this.connection.query(query, values);
        return result.rows[0];
    }
    
    async filterWordsUsingOr(condition: Partial<IWord>){
        const keys = Object.keys(condition);
        const values = Object.values(condition);
        const whereClauses = Object.keys(condition)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(' OR ');
        const query = `SELECT * FROM ${this.tableName} WHERE ${whereClauses}`;
        const result = await this.connection.query(query, values);
        return result.rows[0];
    }

    async deleteOne(id: number) {
        const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
        await this.connection.query(query, [id]);
    }

    async deleteMany(condition: string) {
        const query = `DELETE FROM ${this.tableName} WHERE ${condition}`;
        await this.connection.query(query);
    }
}

const dbCredentials = db.dbCredentials();

const client = dbCredentials;
const tablename = "dictionary";

export default new DictionaryModal(tablename,client);