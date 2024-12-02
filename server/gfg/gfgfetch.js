import cheerio from 'cheerio';
import axios from 'axios';

// Middleware to validate if the username is provided
export const validateQuery = (req, res, next) => {
    const { userName } = req.query;
    if (!userName) {
        return res.status(400).json({
            error: "Please provide a GeeksforGeeks username as a query parameter, e.g., /?userName=<YOUR_USER_NAME>"
        });
    }
    next();
};

// Endpoint to scrape stats from GeeksforGeeks
export const getStat = async (req, res, next) => {
    const userName = req.query.userName;
    const url = `https://auth.geeksforgeeks.org/user/${userName}/practice/`;

    try {
        const { data: htmlData } = await axios.get(url);
        const $ = cheerio.load(htmlData);

        const stats = {};
        let totalProblemsSolved = 0;

        // Convert the jQuery collection to an array and use forEach
        const problemElements = $('.problemNavbar_head_nav__a4K6P').toArray();
        
        problemElements.forEach((element) => {
            const text = $(element).text().trim();
            // Split the text based on parentheses
            const parts = text.split('(');
            if (parts.length === 2) {
                const label = parts[0].trim();
                const count = parseInt(parts[1].replace(')', '').trim(), 10);
                stats[label] = count;
                totalProblemsSolved += count;
            }
        });

        req.values = { userName, totalProblemsSolved, details: stats };
        next();
    } catch {
        res.status(502).json({
            error: "Failed to fetch data from GeeksforGeeks. Please ensure the username is valid."
        });
    }
};

// Endpoint to send stats as JSON
export const sendStat = (req, res) => {
    const stats = req.values;
    res.json({
        userName: stats.userName,
        totalProblemsSolved: stats.totalProblemsSolved,
        details: stats.details
    });
};
