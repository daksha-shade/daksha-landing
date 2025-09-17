#!/bin/bash

# Script to set up environment variables for Daksha

echo "🚀 Setting up Daksha environment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your actual values."
else
    echo "✅ .env file already exists."
fi

# URL encode the database password
echo ""
echo "🔐 Database URL encoding help:"
echo "If your password contains special characters like @ or #, they need to be URL-encoded:"
echo "@ should be %40"
echo "# should be %23"
echo ""
echo "Example:"
echo "Original password: Prince@4#"
echo "URL-encoded password: Prince%404%23"
echo ""
echo "Full DATABASE_URL example:"
echo 'DATABASE_URL="postgresql://postgres:Prince%404%23@db.acljdqliyrtpyhfdzdws.supabase.co:5432/postgres"'
echo ""

# Check if DATABASE_URL is properly set
if grep -q "your_" .env; then
    echo "⚠️  Please update the placeholder values in .env with your actual configuration:"
    echo "   - DATABASE_URL: Your PostgreSQL connection string"
    echo "   - QDRANT_URL: Your Qdrant cluster URL" 
    echo "   - QDRANT_API_KEY: Your Qdrant API key"
    echo "   - OPENAI_API_KEY: Your OpenAI API key"
    echo "   - StackAuth keys: Your project values"
    echo ""
    echo "📖 See DATABASE_SETUP.md for detailed setup instructions"
else
    echo "✅ Environment variables appear to be configured"
    
    echo ""
    echo "🔧 Testing database connection..."
    npm run db:test
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🏗️  Initializing database schema and vector store..."
        curl -X POST http://localhost:3000/api/init 2>/dev/null || echo "Start the dev server first with 'npm run dev'"
    fi
fi

echo ""
echo "🎉 Setup complete! To get started:"
echo "1. Update .env with your actual API keys and database URL"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit /context to create your first context file"
echo "4. Test the context search functionality"
echo "5. Use /chat to see context-enhanced conversations"

echo ""
echo "📚 For more help, see:"
echo "- DATABASE_SETUP.md for database configuration"
echo "- README.md for general setup instructions"