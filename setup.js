const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Starting Alumni Association Platform setup...")

// Check if .env.local exists, if not create it from example
const envPath = path.join(__dirname, ".env.local")
const envExamplePath = path.join(__dirname, ".env.local.example")

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log("📄 Creating .env.local from example...")
  fs.copyFileSync(envExamplePath, envPath)
  console.log("✅ Created .env.local file. Please update it with your database credentials.")
}

// Install dependencies
console.log("📦 Installing dependencies...")
try {
  execSync("npm install --legacy-peer-deps", { stdio: "inherit" })
  console.log("✅ Dependencies installed successfully.")
} catch (error) {
  console.error("❌ Failed to install dependencies:", error.message)
  process.exit(1)
}

console.log("\n🎉 Setup completed successfully!")
console.log("\nNext steps:")
console.log("1. Update your .env.local file with your database credentials")
console.log('2. Run "npm run db:generate" to generate database migrations')
console.log('3. Run "npm run db:push" to apply migrations to your database')
console.log('4. Run "npm run dev" to start the development server')
