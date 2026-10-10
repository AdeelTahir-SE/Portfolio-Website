'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-8 border-t border-[#333]" style={{ fontFamily: 'var(--font-main)' }}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          
          {/* COLUMN 1: Logo & Socials */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex group">
              <div className="bg-[#c9f31d] text-[#1a1a1a] p-2 rounded flex items-center justify-center transition-transform group-hover:rotate-12">
                <Code2 size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-xl tracking-tight">ADEEL TAHIR</span>
                <span className="text-gray-400 text-[10px] font-semibold tracking-widest mt-1" style={{ fontFamily: 'var(--font-mono)' }}>NEXT.JS DEVELOPER</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              Building fast, modern and scalable web applications with a focus on user experience and clean code.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/adeeltahir" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#c9f31d] hover:text-[#1a1a1a] transition-all">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/adeeltahir" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#c9f31d] hover:text-[#1a1a1a] transition-all">
                <Linkedin size={18} />
              </a>
           
              {/* <a href="https://upwork.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#c9f31d] transition-all overflow-hidden">
                <Image src={upwork} alt="Upwork" width={24} height={24} className="object-contain" />
              </a>
              <a href="https://fiverr.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#c9f31d] transition-all overflow-hidden">
                <Image src={fiverr} alt="Fiverr" width={24} height={24} className="object-contain" />
              </a> */}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest text-sm" style={{ fontFamily: 'var(--font-mono)' }}>QUICK LINKS</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/AboutMe" className="text-gray-400 hover:text-[#c9f31d] transition-colors">About Me</Link></li>
              <li><Link href="/Skills" className="text-gray-400 hover:text-[#c9f31d] transition-colors">Skills</Link></li>
              <li><Link href="/Services" className="text-gray-400 hover:text-[#c9f31d] transition-colors">Services</Link></li>
              <li><Link href="/Projects" className="text-gray-400 hover:text-[#c9f31d] transition-colors">Projects</Link></li>
              <li><Link href="/ContactMe" className="text-gray-400 hover:text-[#c9f31d] transition-colors">Contact</Link></li>
            </ul>
          </div>


          {/* COLUMN 4: OTHER */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest text-sm" style={{ fontFamily: 'var(--font-mono)' }}>OTHER</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/Experience" className="text-gray-400 hover:text-[#c9f31d] transition-colors">Experience</Link></li>

            </ul>
          </div>

          {/* COLUMN 5: LET'S CONNECT */}
          <div className="lg:col-span-4 border-t border-[#333] pt-10 mt-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
             <div className="mb-4 md:mb-0">
               <h4 className="text-white font-bold mb-2 tracking-widest text-sm" style={{ fontFamily: 'var(--font-mono)' }}>LET&apos;S CONNECT</h4>
               <p className="text-gray-400 text-sm">Feel free to reach out for collaborations or just a friendly hello.</p>
             </div>
             <a href="mailto:adeeltahir6a@gmail.com" className="inline-block bg-[#c9f31d] text-[#1a1a1a] font-bold py-3 px-8 rounded-sm hover:bg-[#b0d619] transition-colors uppercase text-sm tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
               Email Me
             </a>
          </div>
          
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Adeel Tahir. All Rights Reserved.</p>
          <p>Adeel Tahir & All Respective Users</p>
        </div>
      </div>
    </footer>
  );
}
