import type { NextPage } from "next";
import Head from "next/head";

import Login from "../components/login";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>VPA - Login</title>
                <meta name="description" content="Video Processing App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Login />
        </>
    );
};

export default Home;
