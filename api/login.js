// Vercel Serverless Function for handling login with .env variables
export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { username, password } = req.body;

        // Read credentials from Vercel Environment Variables (.env)
        const validEmail = process.env.Admin_Email;
        const validPass = process.env.Admin_Pass;

        if (!validEmail || !validPass) {
            console.error("Environment variables are missing!");
            return res.status(500).json({ message: 'Server configuration error. Missing environment variables.' });
        }

        // Check if the provided credentials match the environment variables
        if (username === validEmail && password === validPass) {
            // Success
            return res.status(200).json({
                message: 'Login successful',
                token: 'vercel-secure-token-' + Date.now()
            });
        } else {
            // Failure
            return res.status(401).json({ message: 'Invalid Admin ID or Access Key' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
