import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from './schema'
import { PrismaClient } from '@prisma/client'

// Create a PostgreSQL connection pool with better error handling
const createPool = () => {
  try {
    const connectionString = process.env.DATABASE_URL

    if (!connectionString) {
      console.error("DATABASE_URL environment variable is not set")
      throw new Error("Database connection string is missing")
    }

    return new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
    })
  } catch (error) {
    console.error("Failed to create database pool:", error)
    throw error
  }
}

const pool = createPool()

pool.on("error", (err) => {
  console.error("Unexpected database error:", err)
})

// Initialize PrismaClient
const prisma = new PrismaClient()

export const db = prisma

// Helper function to execute SQL queries directly with better error handling
export async function executeQuery(text: string, params: any[] = []) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Function to test the database connection
export async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()")
    return { success: true, timestamp: result.rows[0].now }
  } catch (error) {
    console.error("Database connection test failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
