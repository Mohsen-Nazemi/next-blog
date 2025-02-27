"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/admin" className="text-xl font-bold text-gray-800">
          پنل مدیریت
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {session?.user?.name}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="text-sm text-red-600 hover:text-red-800"
          >
            خروج
          </button>
        </div>
      </div>
    </header>
  );
}