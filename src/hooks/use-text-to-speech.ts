import axios from "axios"

export default function useTextToSpeech() {
    const encodedParams = new URLSearchParams();
    encodedParams.set('voice_code', 'en-US-1');
    encodedParams.set('speed', '1.00');
    encodedParams.set('pitch', '1.00');
    encodedParams.set('output_type', 'audio_url');

    return {
        speak: async (text: string, callback: (data: { audio_url: string }) => void) => {
            encodedParams.set('text', text);
            const options = {
                method: 'POST',
                url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '905094be2amsh044b55bdb24998dp139a6cjsnddea5196e39a',
                    'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
                },
                data: encodedParams,
            };

            try {
                const response = await axios.request(options as any);
                if (response.data.status === "success") {
                    callback(response.data.result);
                } else {
                    console.log(response.data)
                }
            } catch (e) {
                console.log(e)
            }
        },
    };
}