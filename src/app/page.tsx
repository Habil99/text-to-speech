"use client";

import { Inter } from 'next/font/google'
import React, { useRef, useState } from "react";
import useTextToSpeech from "@/hooks/use-text-to-speech";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [text, setText] = useState('');
    const audio = useRef<HTMLAudioElement | null>(null);
    const [audioURL, setAudioURL] = useState<string>("");
    const { speak } = useTextToSpeech()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const convertTextToSpeech = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        await speak(text, (data) => {
            setAudioURL(data.audio_url);
        });
        setIsLoading(false)
    }

    return (
        <div className={`max-w-xl py-12 mx-auto ${inter.className}`}>
            <h1 className="text-2xl mb-8">
                Text to speech
                <a
                    className="ml-2 text-sm text-gray-500 hover:underline"
                    href="https://rapidapi.com/cloudlabs-dev/api/cloudlabs-text-to-speech"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    (Cloudlabs API)
                </a>
            </h1>
            <div className="mb-8">
                <audio id="audio" ref={audio} controls className="w-full mb-4" src={audioURL}>
                    Your browser does not support the <code>audio</code> element.
                </audio>
            </div>
            <form action="" onSubmit={convertTextToSpeech}>
                <div>
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your text
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isLoading}
                    ></textarea>
                </div>
                <div className="flex items-center justify-end mt-4">
                    <button
                        type="submit"
                        className={isLoading ? "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}
                        disabled={isLoading}
                    >
                        Convert to speech
                    </button>
                </div>
            </form>
        </div>
    )
}
