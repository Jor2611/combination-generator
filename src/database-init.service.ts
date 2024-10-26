import { Injectable, OnModuleInit } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  async onModuleInit() {
    await this.createTables();
  }

  private async createTables() {
    const connection = await createConnection({
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const createItemsTable = `
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_code VARCHAR(10) NOT NULL UNIQUE,
        type CHAR(1) NOT NULL,
        item_num INT NOT NULL,
        UNIQUE KEY (type, item_num)
      );
    `;

    const createCombinationsTable = `
      CREATE TABLE IF NOT EXISTS combinations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(300) NOT NULL UNIQUE,
        length INT NOT NULL,
        combination JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createCombinationItemsTable = `
      CREATE TABLE IF NOT EXISTS combination_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        combination_id INT NOT NULL,
        item_id INT NOT NULL,
        FOREIGN KEY (combination_id) REFERENCES combinations(id),
        FOREIGN KEY (item_id) REFERENCES items(id),
        UNIQUE KEY (combination_id, item_id)  -- Prevent duplicate entries
      );
    `;

    const createResponsesTable = `
      CREATE TABLE IF NOT EXISTS responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        combination_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (combination_id) REFERENCES combinations(id)
      );
    `;

    await connection.query(createItemsTable);
    await connection.query(createCombinationsTable);
    await connection.query(createCombinationItemsTable);
    await connection.query(createResponsesTable);

    await connection.end();
  }
}
