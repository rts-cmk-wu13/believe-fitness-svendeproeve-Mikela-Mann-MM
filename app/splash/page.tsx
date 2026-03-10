

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BG_IMAGES = [
    "/splash1.jpg",
    /* "/splash2.jpg", */
];

export default function SplashPage() {
    const [visible, setVisible] = useState<boolean>(false);
    const [bg] = useState<string>(
        () => BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)]
    );

    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() =>
            setVisible(true), 700);
        return () => clearTimeout(timer);

    }, []);

    return (
        <div className="relative flex flex-col bg-cover bg-center justify-end min-h-dvh"
            style={{ backgroundImage: `url('${bg}')` }}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-neutral-500/85 to neutral-700/95" />

            {/* Content */}
            <div className="relative content-wrapper pb-16">
                <h1 className="text-6xl font-black leading-none mb-2 text-{--brand-yellow}">
                    Believe
                    <br />
                    Fitness
                </h1>

                <div className="flex items-center gap-3 mb-10">
                    <span className="block h-px w-6 bg-white" />
                    <p className="font-bold text-base text-white">Train like a pro</p>
                </div>

                {/* button */}

                <div
                    className={[
                        "transition-[opacity,transform] duration-500 ease-out",
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                    ].join(" ")}
                >

                    <button
                        type="button"
                        onClick={() => router.push("/home")}
                        className="btn-primary"
                    >
                        START TRAINING
                    </button>

                </div>
            </div>

        </div>
    );
}