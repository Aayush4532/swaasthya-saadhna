import React from 'react';
import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-lg p-8 bg-transparent backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <SignUp
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: '#14b8a6',
              },
              elements: {
                card: 'bg-transparent shadow-none w-full',
                headerTitle: 'text-white text-3xl font-semibold text-center',
                headerSubtitle: 'text-gray-400 text-center mb-6',
                formFieldInput:
                  'w-full bg-gray-900 text-white border border-gray-700 placeholder-gray-500 rounded-lg px-3 py-2 mb-4',
                formButtonPrimary:
                  'w-full bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg px-4 py-2 mt-4',
                socialButtonsBlockButton:
                  'w-full bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 mb-3',
                footerActionText: 'text-gray-400',
                footerActionLink: 'text-teal-400 hover:text-teal-300',
              },
            }}
            path="/sign-up"
            routing="path"
          />
        </div>
      </div>
    </div>
  );
}