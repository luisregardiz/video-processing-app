import axios from "axios";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../store/user";

interface LoginProps {}

type Credentials = {
    appId: string;
    appSecret: string;
};

const Login: FC<LoginProps> = () => {
    const router = useRouter();
    const [isFetching, setFetching] = useState(false);
    const setToken = useAuth((state) => state.setToken);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Credentials>();

    const onSubmit: SubmitHandler<Credentials> = (data) => {
        setFetching(true);
        loginSymbl(data)
            .then((res) => {
                if (res?.status !== 200) return;
                setToken(res.data.accessToken);

                reset();
                router.push("/processing");
            })
            .catch((err) => console.log(err))
            .finally(() => setFetching(false));
    };

    const loginSymbl = async (credentials: Credentials) => {
        try {
            const res = await axios.post(
                process.env.NEXT_PUBLIC_SYMBL_AUTH_URL!,
                {
                    type: "application",
                    appId: credentials.appId,
                    appSecret: credentials.appSecret,
                }
            );
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main>
            <section className="h-screen flex items-center justify-center">
                <div className="w-1/3">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-primary p-5 rounded-lg shadow-lg"
                    >
                        <div className="flex flex-col">
                            <label
                                htmlFor="appId"
                                className="text-light font-medium mb-2"
                            >
                                App ID
                            </label>
                            <input
                                type="text"
                                {...register("appId", { required: true })}
                                id="appId"
                                className="p-2 outline-none rounded-lg focus:ring-secondary focus:ring-2 "
                                placeholder="Enter your app ID"
                            />
                            {errors.appId && (
                                <span className="text-sm text-red-500 font-medium">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col my-4">
                            <label
                                htmlFor="appSecret"
                                className="text-light font-medium mb-2"
                            >
                                App Secret
                            </label>
                            <input
                                type="password"
                                {...register("appSecret", { required: true })}
                                id="appSecret"
                                className="p-2 outline-none rounded-lg focus:ring-secondary focus:ring-2"
                                placeholder="Enter your app secret"
                            />
                            {errors.appId && (
                                <span className="text-sm text-red-500 font-medium">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn bg-secondary hover:text-dark w-full my-3 disabled:bg-opacity-90 disabled:cursor-not-allowed"
                            disabled={isFetching && true}
                        >
                            {isFetching ? "Sign in..." : "Sign in"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Login;
