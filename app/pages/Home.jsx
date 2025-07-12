import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="relative max-w-screen min-h-screen overflow-auto bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-pulse-slow opacity-80" />
      <div className="relative z-10 flex flex-col items-center justify-between w-full px-8">
        {/* Header */}
        <header className="w-full max-w-7xl flex items-center justify-between py-4 mb-6 border-b border-gray-700">
          {/* Logo / Title */}
          <img
            src="/logo.png"
            alt="logo"
            className="rounded-md w-[150px] h-[75px] object-cover"
          />

          {/* Header Links + UserButton */}
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link
                href="/features"
                className="relative text-white text-lg lg:text-xl font-medium transition-colors group hover:text-teal-400"
              >
                Features
                <span className="absolute bottom-0 left-0 h-[2px] bg-teal-400 w-0 group-hover:w-full transition-[width] duration-300" />
              </Link>
              <Link
                href="/documentation"
                className="relative text-white text-lg lg:text-xl font-medium transition-colors group hover:text-teal-400"
              >
                Documentation
                <span className="absolute bottom-0 left-0 h-[2px] bg-teal-400 w-0 group-hover:w-full transition-[width] duration-300" />
              </Link>
              <Link
                href="/saadho"
                className="relative text-white text-lg lg:text-xl font-medium transition-colors group hover:text-teal-400"
              >
                Saadho
                <span className="absolute bottom-0 left-0 h-[2px] bg-teal-400 w-0 group-hover:w-full transition-[width] duration-300" />
              </Link>
            </nav>

            {/* Custom UserButton positioned to the far right */}
            <div className="ml-8">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row flex-1 w-full max-w-7xl space-y-12 lg:space-y-0 lg:space-x-12">
          {/* Left Column: Headline & Search */}
          <div className="flex flex-col justify-center flex-1 space-y-6">
            <p className="text-2xl text-gray-300">Namaste,</p>
            <h2 className="text-white text-5xl lg:text-6xl font-black leading-tight drop-shadow-xl">
              Your AI Health Companion
            </h2>

            {/* Search Input */}
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search Medicines"
                className="
                  w-full
                  bg-gray-900 bg-opacity-30
                  border border-gray-700
                  rounded-md
                  px-6 py-4
                  text-white text-lg placeholder-gray-500
                  focus:outline-none focus:border-teal-400
                  backdrop-blur-md
                  transition duration-200
                "
              />
              <button
                className="
                  absolute top-0 right-0 mt-4 mr-4
                  text-teal-400 font-semibold
                  hover:text-teal-300
                  transition-colors
                  cursor-pointer
                "
              >
                Search →
              </button>
            </div>

            <p className="text-teal-300 text-lg">
              Discover availability & pricing at local & government centers.
            </p>
          </div>

          {/* Right Column: AI Avatar & Upload */}
          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            {/* AI Avatar */}
            <div className="relative w-56 h-56 lg:w-64 lg:h-64 bg-gray-800 rounded-md overflow-hidden shadow-[0_0_34px_rgba(20,184,166,0.5)] border border-teal-500">
              <img src="/girl.png" className="object-cover h-full w-full" />
            </div>

            {/* Upload Prescription Card */}
            <Link
              href="/upload-prescription"
              className="
                w-full max-w-sm
                flex items-center space-x-4
                bg-gray-800 bg-opacity-70
                border border-gray-700 rounded-md
                p-6
                hover:border-teal-400
                transition-colors
                shadow-[0_0_22px_rgba(20,184,166,0.4)]
              "
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-400 rounded-md flex items-center justify-center text-gray-900">
                {/* Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 lg:w-8 lg:h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white text-lg lg:text-xl font-semibold">
                  Upload Prescription
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  अपना प्रिस्क्रिप्शन अपलोड करें
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Middle Grid: Core Cards */}
        <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
          {/* Medicine Availability Card */}
          <Link
            href="/medicineAvailability"
            className="
              flex flex-col p-6 lg:p-8 bg-gray-800 bg-opacity-70 border border-gray-700 rounded-md
              hover:border-teal-400 transition-colors
              shadow-[0_0_18px_rgba(20,184,166,0.3)]
            "
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-400 rounded-md flex items-center justify-center mb-4">
              {/* Medicine Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-white text-2xl lg:text-3xl font-bold mb-2">
              Medicine Availability
            </h3>
            <p className="text-gray-400 text-sm lg:text-base flex-1">
              Real-time availability at local & government pharmacies.
            </p>
            <button
              className="
              mt-6 self-start bg-teal-500 hover:bg-teal-600 text-white cursor-pointer font-semibold rounded-md px-5 py-2 lg:px-6 lg:py-3
              transition-colors shadow-[0_0_8px_rgba(20,184,166,0.5)]
            "
            >
              Explore →{" "}
              <img
                src="/flag.png"
                alt="Indian Flag"
                className="inline w-5 h-5"
              />
            </button>
          </Link>

          {/* Health Tracker Card */}
          <Link
            href="/swasthya"
            className="
              flex flex-col p-6 lg:p-8 bg-gray-800 bg-opacity-70 border border-gray-700 rounded-md
              hover:border-teal-400 transition-colors
              shadow-[0_0_18px_rgba(20,184,166,0.3)]
            "
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-400 rounded-md flex items-center justify-center mb-4">
              {/* Tracker Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-6h6v6m0 0l3-3m-3 3l-3-3"
                />
              </svg>
            </div>
            <h3 className="text-white text-2xl lg:text-3xl font-bold mb-2">
              Health Tracker
            </h3>
            <p className="text-gray-400 text-sm lg:text-base flex-1">
              Monitor BP, blood sugar & heart rate with intelligent alerts.
            </p>
            <button
              className="
              mt-6 self-start bg-teal-500 hover:bg-teal-600 cursor-pointer text-white font-semibold rounded-md px-5 py-2 lg:px-6 lg:py-3
              transition-colors shadow-[0_0_8px_rgba(20,184,166,0.5)]
            "
            >
              Go to Tracker →{" "}
              <img
                src="/flag.png"
                alt="Indian Flag"
                className="inline w-5 h-5"
              />
            </button>
          </Link>
        </section>

        {/* Saadhna AI Assistant Card (Full Width) */}
        <section className="w-full max-w-7xl mb-12">
          <Link
            href="/saadhna"
            className="
              flex flex-col p-6 lg:p-8 bg-gray-800 bg-opacity-70 border border-gray-700 rounded-md cursor-pointer
              hover:border-teal-400 transition-colors
              shadow-[0_0_22px_rgba(20,184,166,0.3)]
            "
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-400 rounded-md flex items-center justify-center mb-4">
              {/* Assistant Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.38 0-2.5 1.12-2.5 2.5S10.62 13 12 13s2.5-1.12 2.5-2.5S13.38 8 12 8zm0 9a7 7 0 00-7-7 7 7 0 0114 0 7 7 0 00-7 7z"
                />
              </svg>
            </div>
            <h3 className="text-teal-400 text-3xl lg:text-4xl font-extrabold mb-4 drop-shadow-lg">
              Saadhna AI Assistant
            </h3>
            <p className="text-gray-300 text-base lg:text-lg flex-1">
              Upload a prescription and get instant dosage, timing, dietary, and
              Ayurvedic recommendations from our AI.
            </p>
            <button
              className="
              mt-6 self-start bg-teal-500  hover:bg-teal-600 text-white cursor-pointer font-semibold rounded-md px-6 py-2 lg:px-8 lg:py-3
              transition-colors shadow-[0_0_10px_rgba(20,184,166,0.5)]
            "
            >
              Talk to Saadhna →{" "}
              <img
                src="/flag.png"
                alt="Indian Flag"
                className="inline w-5 h-5"
              />
            </button>
          </Link>
        </section>

        {/* What You’ll Love (Condensed Features Section) */}
        <section className="w-full max-w-7xl mb-12">
          <h3 className="text-white text-3xl lg:text-4xl font-extrabold mb-6 drop-shadow-lg text-center">
            What You’ll Love
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center bg-gray-800 bg-opacity-70 border border-gray-700 rounded-md p-6 drop-shadow-md">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-400 rounded-md flex items-center justify-center mb-4">
                {/* Symptom Checker Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-2.21 0-4 1.79-4 4v4h8v-4c0-2.21-1.79-4-4-4zm0-4v2m0 12v2m8-6h-2M4 12H2m16.24-4.24l-1.42 1.42M6.34 16.24l-1.42 1.42m12.9 0l1.42 1.42M7.76 7.76l1.42 1.42"
                  />
                </svg>
              </div>
              <p className="text-white text-lg font-medium text-center">
                Symptom Checker
              </p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Answer a few questions and get AI‐driven preliminary symptom
                insights.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center bg-gray-800 bg-opacity-70 border border-gray-700 rounded-md p-6 drop-shadow-md">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-400 rounded-md flex items-center justify-center mb-4">
                {/* Prescription OCR Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 3v4m6-4v4m-6 4h6m-6 4h6m-6 4h6"
                  />
                </svg>
              </div>
              <p className="text-white text-lg font-medium text-center">
                Prescription OCR
              </p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Snap or upload your prescription; our OCR extracts medicines &
                dosages automatically.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center bg-gray-800 bg-opacity-70 border border-gray-700 rounded-md p-6 drop-shadow-md">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-400 rounded-md flex items-center justify-center mb-4">
                {/* AI Health Chatbot Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h4l2 2 2-2h4a2 2 0 002-2z"
                  />
                </svg>
              </div>
              <p className="text-white text-lg font-medium text-center">
                AI Health Chatbot
              </p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Ask our AI any health question—instant guidance on symptoms,
                diet, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center bg-gray-800 bg-opacity-70 border border-gray-700 rounded-md p-6 drop-shadow-md">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-400 rounded-md flex items-center justify-center mb-4">
                {/* Price Comparison Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h4l3 9h8l3-9h4M4 6h16v4H4V6z"
                  />
                </svg>
              </div>
              <p className="text-white text-lg font-medium text-center">
                Price Comparison
              </p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Compare generic vs. branded prices—find the most affordable
                option near you.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-7xl text-center py-6 border-t border-gray-700 mt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm lg:text-base mb-4 lg:mb-0">
              © {new Date().getFullYear()} Swasthya Saadhna. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-teal-300 text-sm lg:text-base font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-teal-300 text-sm lg:text-base font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Built with ❤️ for every Indian{" "}
            <img
              src="/flag.png"
              alt="Indian Flag"
              className="inline w-4 h-4 align-text-bottom"
            />
          </p>
        </footer>
      </div>
    </div>
  );
}
