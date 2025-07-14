require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// Remove MongoDB connection
// require("./db/conn");

// Import Supabase client and test connection
const supabase = require("./config/supabaseClient");

// Test Supabase connection on startup
const testSupabaseConnection = async () => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1);
        
        if (error) throw error;
        console.log('✅ Supabase connection successful');
    } catch (error) {
        console.error('❌ Supabase connection failed:', error);
    }
};

// Test connection on startup
testSupabaseConnection();

const router = require("./Routes/router");
const PORT = process.env.PORT || 4002;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", router);

// Health check route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server start at Port No: ${PORT}`);
});