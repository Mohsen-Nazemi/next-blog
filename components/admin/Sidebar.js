"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'داشبورد', href: '/admin' },
  { name: 'مقالات', href: '/admin/posts' },
  { name: 'دسته‌بندی‌ها', href: '/admin/categories' },
  { name: 'کاربران', href: '/admin/users' },
  { name: 'تنظیمات', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white shadow-sm">
      <nav className="mt-5 px-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`
              group flex items-center px-2 py-2 text-base font-medium rounded-md
              ${pathname === item.href
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}