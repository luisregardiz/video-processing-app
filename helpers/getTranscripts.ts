import axios from "axios";

export const getTranscripts = async (token: string, conversationId: string) => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SYMBL_URL}/conversations/${conversationId}/messages`,
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
