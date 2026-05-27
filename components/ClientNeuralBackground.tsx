// components/ClientNeuralBackground.tsx

'use client';

import dynamic from 'next/dynamic';

const NeuralBackground = dynamic(
  () => import('@/components/Environment/NeuralBackground'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 to-black" />
    ),
  }
);

export default function ClientNeuralBackground() {
  return <NeuralBackground />;
}
