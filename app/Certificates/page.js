import React from 'react';
import { getCertificates } from '@/lib/dataUtils';
import CertificatesClient from '@/components/CertificatesClient';

export const metadata = {
  title: 'Certificates - Adeel Tahir',
  description: 'Professional certifications and achievements in AI, Full Stack Development, and Software Engineering.',
};

export const dynamic = 'force-dynamic';

export default function Certificates() {
  const certificates = getCertificates();

  return (
    <div
      className="min-h-screen bg-white text-black pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="section-title text-5xl font-extrabold uppercase">
            Certifications
          </h1>
          <p className="mt-4 text-xl text-gray-600" style={{ fontFamily: 'var(--font-mono)' }}>
            Professional achievements, credentials, and ongoing learning.
          </p>
        </div>

        <CertificatesClient initialCertificates={certificates} />
      </div>
    </div>
  );
}
