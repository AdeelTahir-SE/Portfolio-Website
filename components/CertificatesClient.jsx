/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { Eye, ExternalLink, Download, X, Search, FileText, Image as ImageIcon } from 'lucide-react';

export default function CertificatesClient({ initialCertificates = [] }) {
  const [certificates] = useState(initialCertificates);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pdf' | 'image'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  // Keyboard navigation for modal (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };

    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  // Counts for filter tabs
  const pdfCount = certificates.filter((c) => c.type === 'pdf').length;
  const imageCount = certificates.filter((c) => c.type === 'image').length;

  // Filtered list based on tab and search
  const filteredCertificates = certificates.filter((cert) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'pdf' && cert.type === 'pdf') ||
      (activeFilter === 'image' && cert.type === 'image');

    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.filename.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* FILTER CONTROLS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase border-2 border-black transition-all ${
              activeFilter === 'all'
                ? 'bg-[#c9f31d] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            All ({certificates.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('pdf')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase border-2 border-black flex items-center gap-1.5 transition-all ${
              activeFilter === 'pdf'
                ? 'bg-[#ff5c5c] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            PDFs ({pdfCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('image')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase border-2 border-black flex items-center gap-1.5 transition-all ${
              activeFilter === 'image'
                ? 'bg-[#c9f31d] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Images / PNGs ({imageCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#c9f31d]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* CERTIFICATES GRID */}
      {filteredCertificates.length === 0 ? (
        <div className="text-center text-gray-600 font-mono py-16 border-4 border-dashed border-gray-300 bg-gray-50">
          <p className="text-lg font-bold uppercase mb-2">No certificates found</p>
          <p className="text-sm">Try adjusting your search query or filter selection.</p>
          {(activeFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 bg-[#c9f31d] border-2 border-black px-4 py-2 font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#c9f31d] transition-all"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert, i) => (
            <div
              key={cert.filename || i}
              className="card-bordered bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group flex flex-col justify-between"
            >
              {/* TOP PREVIEW AREA */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="w-full h-64 relative bg-gray-100 overflow-hidden border-2 border-black flex items-center justify-center cursor-pointer select-none"
              >
                {/* Format Tag Badge */}
                <span
                  className={`absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    cert.type === 'pdf'
                      ? 'bg-[#ff5c5c] text-white'
                      : 'bg-[#c9f31d] text-black'
                  }`}
                >
                  {cert.extension.toUpperCase()}
                </span>

                {/* Render Certificate Content: PDF or Image */}
                {cert.type === 'pdf' ? (
                  <div className="w-full h-full relative bg-white flex items-center justify-center">
                    <object
                      data={`${cert.url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                      type="application/pdf"
                      className="w-full h-full pointer-events-none border-0"
                    >
                      <iframe
                        src={`${cert.url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        title={cert.title}
                        className="w-full h-full border-0 pointer-events-none"
                        loading="lazy"
                      />
                    </object>
                  </div>
                ) : (
                  <div className="w-full h-full relative bg-white flex items-center justify-center p-2">
                    <img
                      src={cert.url}
                      alt={cert.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <span className="bg-[#c9f31d] border-2 border-black text-black px-4 py-1.5 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview {cert.type === 'pdf' ? 'PDF' : 'Image'}
                  </span>
                </div>
              </div>

              {/* BOTTOM DETAILS & ACTIONS */}
              <div className="mt-4 flex flex-col gap-3">
                <div>
                  <h3
                    className="font-bold text-base uppercase leading-snug line-clamp-2"
                    title={cert.title}
                  >
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    {cert.type === 'pdf' ? 'PDF Document' : `${cert.extension.toUpperCase()} Image`}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 bg-[#c9f31d] border border-black py-1.5 px-3 text-xs font-bold uppercase hover:bg-black hover:text-[#c9f31d] transition-colors flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-px active:shadow-none"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-black bg-white py-1.5 px-3 text-xs font-bold uppercase hover:bg-gray-100 transition-colors flex items-center justify-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-px active:shadow-none"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL PREVIEW MODAL / LIGHTBOX */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white border-4 border-black w-full max-w-5xl max-h-[92vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-black bg-[#f4f4f0]">
              <div className="flex items-center gap-3 pr-4 overflow-hidden">
                <span
                  className={`px-2 py-0.5 text-xs font-black uppercase border border-black ${
                    selectedCert.type === 'pdf'
                      ? 'bg-[#ff5c5c] text-white'
                      : 'bg-[#c9f31d] text-black'
                  }`}
                >
                  {selectedCert.extension.toUpperCase()}
                </span>
                <h3 className="font-bold uppercase text-lg truncate">
                  {selectedCert.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className="bg-white border-2 border-black p-1.5 hover:bg-black hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Viewer */}
            <div className="p-4 sm:p-6 overflow-auto flex-grow bg-gray-100 flex items-center justify-center min-h-[300px]">
              {selectedCert.type === 'pdf' ? (
                <div className="w-full h-[65vh] flex flex-col bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <iframe
                    src={`${selectedCert.url}#toolbar=1`}
                    title={selectedCert.title}
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="max-h-[65vh] flex items-center justify-center bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <img
                    src={selectedCert.url}
                    alt={selectedCert.title}
                    className="max-h-[62vh] max-w-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t-2 border-black bg-white flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-gray-500">
                File: {selectedCert.filename}
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={selectedCert.url}
                  download={selectedCert.filename}
                  className="bg-white border-2 border-black px-4 py-2 text-xs font-bold uppercase hover:bg-gray-100 transition-colors flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <a
                  href={selectedCert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#c9f31d] border-2 border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-[#c9f31d] transition-colors flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="border-2 border-black px-4 py-2 text-xs font-bold uppercase bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
