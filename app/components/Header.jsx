import React from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <header className="w-full px-4 md:px-8 py-3 border-b border-neutral-800 bg-[#0d0d0f] shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Saadhna Logo"
            className="w-[110px] h-auto object-contain hover:opacity-90 transition duration-200"
          />
        </Link>

        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { name: 'Features', href: '/features' },
              { name: 'Docs', href: '/documentation' },
              { name: 'Saadho', href: '/saadho' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 font-medium hover:text-teal-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-teal-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default Header