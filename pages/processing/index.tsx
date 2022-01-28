import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import VideoApp from "../../components/video-app";
import { useAuth } from "../../store/user";

interface ProcessingAppProps {}

const ProcessingApp: NextPage<ProcessingAppProps> = () => {
    const token = useAuth((state) => state.token);
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, [router, token]);
    return (
        <>
            <Head>
                <title>VPA - Processing App</title>
                <meta name="description" content="Video Processing App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container mx-auto px-5 my-10">
                <VideoApp />
            </main>
        </>
    );
};

export default ProcessingApp;
