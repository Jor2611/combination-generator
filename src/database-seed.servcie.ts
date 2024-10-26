import { Injectable, OnModuleInit } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    const connection = await createConnection({
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // Check if the items table is empty
    const [rows] = await connection.query('SELECT COUNT(*) AS count FROM items');
    const itemCount = rows[0].count;

    if (itemCount === 0) {
      // Create items for all capital letters A-Z with numbers 1-10
      const items = [];
      for (let i = 0; i < 26; i++) { // A-Z
        const type = String.fromCharCode(65 + i); // 65 is ASCII for 'A'
        for (let j = 1; j <= 10; j++) { // Numbers 1-10
          items.push({ item_code: `${type}${j}`, type: type, item_num: j });
        }
      }

      // Insert items into the items table
      for (const item of items) {
        await connection.query('INSERT INTO items (item_code, type, item_num) VALUES (?, ?, ?)', [item.item_code, item.type, item.item_num]);
      }

      console.log('Data seeded successfully.');
    } else {
      console.log('Items already exist. Skipping seeding.');
    }

    await connection.end();
  }
}
