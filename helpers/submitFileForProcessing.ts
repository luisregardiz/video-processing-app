import axios from "axios";

export const submitFileForProcessing = async (token: string, file: File) => {
    try {
        const { data } = await axios({
            method: "post",
            url: "https://api.symbl.ai/v1/process/video",
            data: file,
            headers: {
                "x-api-key": token,
                "Content-Type": "video/mp4",
            },
        });

        return data;
    } catch (error) {
        console.log(error);
    }
};
