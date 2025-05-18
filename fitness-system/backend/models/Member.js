const pool = require('../config/db');
const mongoose = require('mongoose');

class Member {

    static async findByEmail(email) {
      const [rows] = await pool.query(
        'SELECT * FROM members WHERE email = ?', 
        [email]
      );
      return rows[0];
    }

    static async findAll() {
    const [members] = await pool.query(`
      SELECT id, name, email, role, created_at 
      FROM members 
      ORDER BY created_at DESC
    `);
    return members;
  }

    static async update(id, { name, email, role }) {
    await pool.query(
      `UPDATE members 
      SET name = ?, email = ?, role = ? 
      WHERE id = ?`,
      [name, email, role, id]
    );
    return { id, name, email, role };
  }
  
    static async findById(id) {
      const [rows] = await pool.query(
        'SELECT * FROM members WHERE id = ?',
        [id]
      );
      return rows[0];
    }
  
    static async create({ name, email, password, role = 'member' }) {
      const [result] = await pool.query(
        `INSERT INTO members (name, email, password_hash, role) 
         VALUES (?, ?, ?, ?)`,
        [name, email, password, role]
      );
      return result.insertId;
    }
  }

module.exports = Member;