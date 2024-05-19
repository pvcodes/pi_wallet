'use client';

import AddCredential from '@/components/credentials/AddCredential';
import AllCredentials from '@/components/credentials/AllCredentials';
import { Credential } from '@/lib/types/creds';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';




export default function Dashboard() {
  const { data } = useSession();
  const [creds, setCreds] = useState<Partial<Credential>[]>();
  useEffect(() => {
    const fetchUserCrentials = async () => {
      const response = await axios.get('/api/creds/')
      setCreds(response.data.data)

    }

    fetchUserCrentials()

  }, [])
  const handleDeleteCred = async (e: any, id: number) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/creds/`, {
        params: { id }

      })
      setCreds(creds => creds?.filter(cred => cred.id !== id));
    } catch (error) {
      ``
      alert('papa naraaz h')
    }
  }
  const handleAddCred = async (e: React.MouseEvent<HTMLButtonElement>, cred: Partial<Credential>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/creds/`, cred)
      const newCred = response.data.data as Credential;
      setCreds(creds => [...(creds || []), newCred]);
    } catch (error) {
      alert('something went wrong')
    }
  }
  // return <div>{JSON.stringify(session)}dashboard</div>;
  {/* <div>{JSON.stringify(data?.user)}dashboard</div>; */ }
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <AllCredentials creds={creds} handleDeleteCred={handleDeleteCred} handleAddCred={handleAddCred} />
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Made with love ♥️ by <Link href='https://pvcodes.me' className='underline'>pvcodes</Link></p>
        </aside>
      </footer>
    </div>
  )

}
