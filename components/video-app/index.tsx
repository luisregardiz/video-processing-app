import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { getTranscripts } from "../../helpers/getTranscripts";
import { submitFileForProcessing } from "../../helpers/submitFileForProcessing";
import { useInterval } from "../../hooks/useInterval";
import moment from "moment";

import { useAuth } from "../../store/user";

interface VideoAppProps {}

const VideoApp: FC<VideoAppProps> = () => {
    const removeToken = useAuth((state) => state.removeToken);
    const token = useAuth((state) => state.token);
    const router = useRouter();
    const [isFetching, setFetching] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const [videoSrc, setVideoSrc] = useState<string>("");
    const [conversationId, setConversationId] = useState<string>("");
    const [jobId, setJobId] = useState<string>("");
    const [status, setStatus] = useState<string>("no started");
    const [messages, setMessages] = useState<Messages[]>([]);

    const videoRef = useRef(null);
    const handleLogout = () => {
        removeToken();
        router.push("/");
    };

    const handleFile = (ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files![0];
        setFile(file);
    };

    const handleSubmitFile = () => {
        setFetching(true);
        submitFileForProcessing(token, file!).then((data: DataProcessing) => {
            setConversationId(data.conversationId);
            setJobId(data.jobId);
        });
    };

    useInterval(
        () => {
            fetch(`https://api.symbl.ai/v1/job/${jobId}`, {
                method: "GET",
                headers: {
                    "x-api-key": token,
                },
            })
                .then((rawResult) => rawResult.json())
                .then((result) => setStatus(result.status));
        },
        1000,
        status === "completed" || (status !== "not_started" && !jobId)
    );

    useEffect(() => {
        const src = URL.createObjectURL(
            new Blob([file!], { type: "video/mp4" })
        );
        setVideoSrc(src);
    }, [file]);

    useEffect(() => {
        if (status === "completed") {
            getTranscripts(token, conversationId).then((res) => {
                if (res?.status === 200) {
                    setMessages(res.data.messages);
                    setFetching(false);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <section className="flex flex-col ">
            <div className="self-end mb-5">
                <button
                    onClick={handleLogout}
                    className="btn bg-secondary hover:text-dark "
                >
                    Logout
                </button>
            </div>
            <div>
                <input
                    type="file"
                    id="video-file"
                    accept="video/*"
                    ref={videoRef}
                    onChange={(ev) => handleFile(ev)}
                    className="input-file"
                />
                <div className="bg-gray md:w-3/4 w-full  min-h-full my-5 flex items-center justify-center rounded-lg shadow-lg a">
                    <video
                        id="video-summary"
                        controls
                        src={videoSrc}
                        className="aspect-video h-full w-full rounded-lg"
                    />
                </div>
            </div>

            <div>
                <button
                    onClick={handleSubmitFile}
                    disabled={isFetching && true}
                    className="btn bg-primary text-light shadow-lg shadow-primary/30 disabled:bg-primary/50 disabled:cursor-not-allowed"
                >
                    {isFetching ? "Processing..." : "Process Video"}
                </button>
                <div className="my-10  ">
                    <h3 className="text-3xl font-bold">Processing Data</h3>
                    <div className="my-5 space-y-5 divide-y-2 p-5 w-1/2 max-h-screen overflow-y-auto">
                        {messages.map((message) => (
                            <div key={message.id} className="py-2">
                                <span className="text-sm bg-secondary px-2 py-1 rounded">
                                    {moment(message.startTime).format("LLL")}
                                </span>
                                <p className="mt-4">{message.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoApp;
