import axios from "axios";
import fs from "fs";
import FormData from "form-data";

import userModel from "../models/UserModel.js";

// Function to remove background
const removeBGImage = async (req, res) => {
    try {
        const { clerkId } = req;

        const user = await userModel.findOne({ clerkId });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        if (user.creditBalance === 0) {
            return res.json({
                success: false,
                message: "No credit balance",
                creditBalance: user.creditBalance,
            });
        }

        if (!req.file) {
            return res.json({
                success: false,
                message: "No image uploaded",
            });
        }

        const imagePath = req.file.path;

        // Read the image file
        const imageFile = fs.createReadStream(imagePath);

        const form = new FormData();
        form.append("image_file", imageFile);

        const { data } = await axios.post(
            "https://clipdrop-api.co/remove-background/v1",
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    "x-api-key": process.env.CLIPDROP_API,
                },
                responseType: "arraybuffer",
            }
        );

        // Convert the returned image to Base64
        const base64Image = Buffer.from(data).toString("base64");

        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        // Deduct one credit

        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})
       

        return res.json({
            success: true,
            message: "Background removed successfully",
            resultImage,
            creditBalance: user.creditBalance-1,
        });
    } catch (error) {
        console.error(error);

        return res.json({
            success: false,
            message: error.message,
        });
    }
};

export { removeBGImage };
