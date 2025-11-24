import axios from "axios";
import {Response, Request} from "express"
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

// export const generateContent = async (req: Request, res: Response) => {
//     try {
//         // Simulate AI content generation
//         const {text,maxTokens} = req.body;

//         // chect if text is null send 400
//         if(!text){
//             return res.status(400).json({message: "Text is required"});
//         }

//         axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent ",{
//             contents : [
//                 {
//                     parts: [text]
//                 }
//             ],
//             generateConfig: {
//                 maxOutputTokens: maxTokens || 150,
//                 temperature: 0.2,
//             },{
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-goog-api-key": GEMINI_API_KEY
//             }
//          })
        
//     }
//     catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }



export const generateContent = async (req: Request, res: Response) => {
    try {
        const { text, maxTokens } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY,
            {
                contents: [
                    {
                        parts: [{ text }]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: maxTokens || 150,
                    temperature: 0.2
                }
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            output: response.data
        });

    } catch (error: any) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.response?.data });
    }
};
