// Quick test to check environment variables
require('dotenv').config();

console.log('=== Environment Variables Debug ===');
console.log('EMAIL_ENABLED:', process.env.EMAIL_ENABLED);
console.log('SMTP_USER:', process.env.SMTP_USER ? 'SET' : 'NOT SET');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'SET (length: ' + process.env.SMTP_PASS.length + ')' : 'NOT SET');
console.log('FROM_EMAIL:', process.env.FROM_EMAIL);
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('===================================');
