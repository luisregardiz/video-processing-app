import axios from "axios";

export const getTranscripts = async (token: string, conversationId: string) => {
    try {
        const res = await axios.get(
            `https://api.symbl.ai/v1/conversations/${conversationId}/messages`,
            {
                headers: {
                    "x-api-key": token,
                    "Content-Type": "application/json",
                },
            }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
