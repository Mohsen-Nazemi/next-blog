import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">دسته‌بندی‌ها</h1>
        <Link
          href="/admin/categories/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          دسته‌بندی جدید
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {category.description}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    تعداد مقالات: {category._count.posts}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    ویرایش
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}