import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(options);
  console.log({ session });
  if (session) redirect('/dashboard');
  return <div>{JSON.stringify(session)}home</div>;
}
