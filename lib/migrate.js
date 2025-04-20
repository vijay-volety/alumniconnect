const { drizzle } = require("drizzle-orm/node-postgres")
const { migrate } = require("drizzle-orm/node-postgres/migrator")
const { Pool } = require("pg")
const schema = require("./schema")

// For use in development or initial deployment
async function main() {
  console.log("Starting database migration...")

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set")
    process.exit(1)
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  })

  try {
    // Test connection
    console.log("Testing database connection...")
    await pool.query("SELECT NOW()")
    console.log("Database connection successful!")

    const db = drizzle(pool)

    console.log("Running migrations...")
    // This will create the tables based on your schema
    await migrate(db, { migrationsFolder: "drizzle" })

    console.log("Migrations completed successfully!")

    console.log("Database setup complete!")
  } catch (error) {
    console.error("Migration failed:", error)
    process.exit(1)
  } finally {
    await pool.end()
    console.log("Database connection closed.")
  }
}

main()
