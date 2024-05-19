'use client';

import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import MoonIcon from '@/components/MoonIcon';
import SunIcon from '@/components/SunIcon';

export default function Navbar() {
  const [toggleTheme, setToggleTheme] = useState(true);
  // const cookieStore = cookies()
  const { data } = useSession();
  const imageUrl = data?.user?.image;

  useEffect(() => {
    if (getCookie('theme') === 'cmyk') setCookie('theme', 'sunset');
    else setCookie('theme', 'cmyk');
    const localTheme: string = getCookie('theme') ?? 'cmyk';
    document.querySelector('html')?.setAttribute('data-theme', localTheme);
  }, [toggleTheme]);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {/* <li>
              <Link href="">Homepage</Link>
            </li> */}
            <li>
              <Link href="">About Us</Link>
            </li>
            <li>
              <Link href="https://github.com/pvcodes/pi_wallet" target='_blank'>Contribute</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link className="text-2sessionxl font-medium" href="/">
          PiWallet
        </Link>
      </div>
      <div className="navbar-end">
        {!data ? (
          <button
            className="btn btn-ghost btn-xs sm:btn-sm md:btn-md"
            onClick={(e) => {
              e.preventDefault();
              return signIn();
            }}
          >
            Sign In
          </button>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image alt="user profile" src={imageUrl ?? '/logo.png'} width={100} height={100} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <li className="font-bold">
                  Hello,
                  {data?.user?.name?.split(' ')[0] || 'user'}
                </li>
                {/* <a className="justify-between">
							Profile
							<span className="badge">New</span>
						</a> */}
              </li>
              {/* <li>
                <a>Settings</a>
              </li> */}
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    return signOut({ callbackUrl: '/' });
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        <label className="btn btn-ghost btn-circle swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
            onChange={() => {
              setToggleTheme((toggleTheme) => !toggleTheme);
            }}
          />
          <SunIcon />
          <MoonIcon />
        </label>
      </div>
    </div>
  );
}
