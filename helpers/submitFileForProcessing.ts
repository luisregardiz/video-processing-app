import axios from "axios";

export const submitFileForProcessing = async (token: string, file: File) => {
    try {
        const { data } = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_SYMBL_URL}/process/video`,
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
