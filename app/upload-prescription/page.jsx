'use client'
import { useState, useRef } from 'react';
import { Loader2, ImagePlus, Send } from 'lucide-react';
import Header from '../components/Header';

export default function PrescriptionUploadPage() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const img = e.target.files[0]
        if (img) {
            setFile(img)
            setPreviewUrl(URL.createObjectURL(img))
        }
    }

    const handleSend = async () => {
        if (!file) return
        setLoading(true)

        const form = new FormData()
        form.append('image', file);
        const prompt = "Explain me about the prescription give them detail about consuming of medicine for example if they had to take it 1 on morning, 1 on noon and 1 on evening. like this also explain accuratley about prescription.";
        form.append('prompt', prompt);

        const res = await fetch('/api/config/saadhna', {
            method: 'POST',
            body: form,
        })
        console.log(form);
        const data = await res.json();
        console.log(data);
        setResponse(data.text || 'No response from AI')
        setLoading(false)
    }

    const reset = () => {
        setFile(null)
        setPreviewUrl('')
        setResponse('')
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br bg-[#0d0d0f] text-white flex items-center justify-center p-6">
                {!response ? (
                    <div className="w-full max-w-md bg-[#1e1e1e] rounded-2xl p-6 shadow-lg space-y-6">
                        <h1 className="text-xl font-semibold text-center text-gray-100">Upload Prescription</h1>

                        {previewUrl && (
                            <div className="relative">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-xl border border-gray-700"
                                />
                                <button
                                    onClick={reset}
                                    className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {!previewUrl && (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer flex flex-col items-center justify-center border border-dashed border-gray-600 rounded-xl p-8 hover:border-gray-400 transition"
                            >
                                <ImagePlus className="w-10 h-10 mb-2 text-gray-400" />
                                <p className="text-gray-400">Click to upload image</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        )}

                        <button
                            onClick={handleSend}
                            disabled={!file || loading}
                            className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl flex justify-center items-center font-semibold hover:scale-[1.02] transition disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Send className="mr-2" />} {loading ? "thinking" : "send"}
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-3xl bg-[#121212] rounded-2xl p-8 shadow-2xl space-y-6">
                        <h2 className="text-2xl font-semibold text-emerald-400">AI Response</h2>
                        <p className="whitespace-pre-wrap text-gray-100 leading-relaxed">{response}</p>
                        <button
                            onClick={reset}
                            className="mt-4 cursor-pointer bg-gray-800 text-gray-200 px-4 py-2 rounded hover:bg-gray-700 transition"
                        >
                            Upload Another
                        </button>
                    </div>
                )}
            </div>
        </>
    )
};