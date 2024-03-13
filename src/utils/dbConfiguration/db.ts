    
    //-------------------------------------------------Imports-----------------------------------------------//
    
import { Client } from 'pg';
import { ConnInterface } from '../customInterfaces/dictionary';  
const dotenv = require('dotenv');
dotenv.config();

class DBConfiguration{
  private client!:any;
  
  constructor(){
    this.client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    });
}
  
  /**
   * dbCredentials
   */
  public dbCredentials(): Client {
    const credentials = this.client;
    return credentials;
  }
  /**
   * connectToDatabase
   */
  public async connectToDatabase() {
    try {
      await this.client.connect();
      console.log('Connected to PostgreSQL database');
    } catch (error) {
      console.error('Error connecting to PostgreSQL database:', error);
    }
  }

  /**
   * async disconnectFromDatabase
   */
  public async disconnectFromDatabase() {
    try {
      await this.client.end();
      console.log('Disconnected from PostgreSQL database');
    } catch (error) {
      console.error('Error disconnecting from PostgreSQL database:', error);
    }
  }

}

export default new DBConfiguration()