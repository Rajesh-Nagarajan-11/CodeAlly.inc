import * as cheerio from 'cheerio';
import axios from 'axios';

// Middleware to validate if username is provided
export const validateQuery = (req, res, next) => {
    if (!req.query.userName) {
        return res.status(400).send({ "error": "add your geeksForGeeks user Name in link eg /?userName=<YOUR_USER_NAME>" });
    }
    next();
}

// Endpoint to scrape stats from GeeksforGeeks
export const getStat = async (req, res, next) => {
    let url = "https://auth.geeksforgeeks.org/user/" + req.query.userName + "/practice/";
    try {
        const { data: htmlData } = await axios.get(url);
        const $ = cheerio.load(htmlData);
        let values = {};
        let problemDificultyTag = ["School", "Basic", "Easy", "Medium", "Hard"];
        let k = 0, totalProblemSolved = 0;

        let scrapedData = $('.tabs.tabs-fixed-width.linksTypeProblem');

        if (scrapedData.length == 0) return res.status(400).send({ error: "userName does not exist or has not solved any problem on GeeksforGeeks" });

        let rawData = $(scrapedData[0]).text();
        for (let i = 0; i < rawData.length; i++) {
            if (rawData[i] == '(') {
                let tempStart = i + 1;
                while (rawData[i] != ')') {
                    i++;
                }
                let tempProblems = parseInt(rawData.substring(tempStart, i));
                values[problemDificultyTag[k++]] = tempProblems;
                totalProblemSolved += tempProblems;
            }
        }

        values["userName"] = req.query.userName;
        values["totalProblemsSolved"] = totalProblemSolved;
        req.values = values;
        next();
    } catch (error) {
        return res.status(502).send({ error: error.message });
    }
}

// Endpoint to send stats back as JSON
export const sendStat = (req, res) => {
    if (req.query.raw?.toLowerCase() === "y") {
        return res.send(req.values);
    }
    res.send({
        userName: req.values.userName,
        totalProblemsSolved: req.values.totalProblemsSolved,
        details: req.values
    });
}
