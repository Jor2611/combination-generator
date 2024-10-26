import { Inject, Injectable } from '@nestjs/common';
import { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class AppService {
  constructor(
    @Inject('MYSQL_CONNECTION')
    private readonly mysqlConnection: Connection,
  ) {}

  async generateCombination(items: number[], length: number): Promise<string[][]> {
    const combinationCode: string = items.join('=');
    
    await this.mysqlConnection.beginTransaction();
    
    try {
      /**
       * Checking existence of the combination
       */
      const [existingCombination] = await this.mysqlConnection.query<RowDataPacket[]>(
        'SELECT combination FROM combinations WHERE code = ? AND length = ?',
        [combinationCode, length]
      );

      if (existingCombination.length > 0) {
        await this.mysqlConnection.commit();
        return existingCombination[0].combination;
      }

      const convertedItems: string[] = await this.convertNumbersToCombinationItems(items);
      const generatedCombinations: string[][] = await this.generatePossibleCombinations(convertedItems, length);

      /**
       * Persisting generated combination
       */
      const [result] = await this.mysqlConnection.query<ResultSetHeader>(
        'INSERT INTO combinations (code, length, combination) VALUES (?, ?, ?)',
        [combinationCode, length, JSON.stringify(generatedCombinations)]
      );

      const combinationId = result.insertId;

      const itemIds = await Promise.all(convertedItems.map(async (item) => {
        const [rows] = await this.mysqlConnection.query<RowDataPacket[]>(
          'SELECT id FROM items WHERE item_code = ?',
          [item]
        );
        return rows.length > 0 ? rows[0].id : null;
      }));

     /**
      * Persisting combination relations with items
      */
      await Promise.all(itemIds.map(itemId =>
        this.mysqlConnection.query(
          'INSERT INTO combination_items (combination_id, item_id) VALUES (?, ?)',
          [combinationId, itemId]
        )
      ));

      /**
      * Persisting client response
      */
      await this.mysqlConnection.query(
        'INSERT INTO responses (combination_id) VALUES (?)',
        [combinationId]
      );

      await this.mysqlConnection.commit();
      return generatedCombinations;

    } catch (error) {
      await this.mysqlConnection.rollback();
      throw error;
    }
  }

  /**
   * Converting provided array into items array
   */
  private async convertNumbersToCombinationItems(items: number[]): Promise<string[]> {
    return items.reduce((acc: string[], curr: number, idx: number) => {
      const prefix: string = String.fromCharCode(64 + idx + 1);
      for(let i: number = 1; i <= curr; i++){
        acc.push(`${prefix}${i}`);  
      }
      return acc;
    }, [])
  }

  /**
   * Leverages a combination tree datastructure to generate all possible combinations
   */
  private async generatePossibleCombinations(items: string[], length: number): Promise<string[][]> {
    const prefixMap: { [key: string]: boolean } = {};
    const results: string[][] = [];
  
    function backtrack(path: string[], start: number): void {
      if (path.length === length) {
        results.push([...path]);
        return;
      }
      for (let i = start; i < items.length; i++) {
        const prefix: string = items[i][0];
        if (prefixMap[prefix]) continue;
  
        prefixMap[prefix] = true;
        path.push(items[i]);
        backtrack(path, i + 1);
        path.pop();
        delete prefixMap[prefix];
      }
    }
  
    backtrack([], 0);
    return results;
  }
  
}
