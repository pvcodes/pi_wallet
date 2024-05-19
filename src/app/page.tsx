import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(options);
  if (session) redirect('/dashboard');

  return (
    <div className="container mx-auto p-4">
      <p className="text-l">
        Welcome to <strong className="text-purple-600">PiWallet</strong>, the secure password manager that lets you store all your login credentials
        with encryption, making sure your personal information is always safe and secure.
      </p>
      <br />
      <p className="text-lg ">
        With <strong className="text-purple-600">PiWallet</strong>, you can forget about memorizing all your passwords and instead focus on what
        really matters. Our user-friendly app allows you to easily store all your login credentials in one place, and with our high-level
        encryption, you can rest assured that your personal information is always safe.
      </p>
      <br />

      <p className="text-lg ">
        Creating a <strong className="text-purple-600">PiWallet</strong> account is easy and fast. Simply sign up and create a strong master password
        to secure your account. Once you&apos;re in, you can add as many login credentials as you need for all your online accounts.
      </p>
    </div>
  )
}
