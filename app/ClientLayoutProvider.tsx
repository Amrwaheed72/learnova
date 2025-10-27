'use client';
import dynamic from 'next/dynamic';
const Providers = dynamic(() => import('./Providers'), { ssr: false });
const ClientLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default ClientLayoutProvider;
