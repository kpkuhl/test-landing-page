const fs = require('fs');

// Read the environment variables
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
    console.error('SUPABASE_ANON_KEY is not set in environment variables');
    process.exit(1);
}

// Create the config file content
const configContent = `// This file is generated during build time
window.SUPABASE_CONFIG = {
    url: 'https://ctlseuuhmtqyiwmkqjwy.supabase.co',
    anonKey: '${supabaseAnonKey}'
};`;

// Write the config file
fs.writeFileSync('config.js', configContent);
console.log('Config file generated successfully'); 