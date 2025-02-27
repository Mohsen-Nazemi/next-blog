import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        خوش آمدید، {session?.user?.name}
      </h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="مقالات" count={stats.posts} />
        <StatCard title="دسته‌بندی‌ها" count={stats.categories} />
        <StatCard title="کاربران" count={stats.users} />
      </div>
    </div>
  );
}

async function getStats() {
  const [posts, categories, users] = await Promise.all([
    prisma.post.count(),
    prisma.category.count(),
    prisma.user.count(),
  ]);

  return {
    posts,
    categories,
    users,
  };
}

function StatCard({ title, count }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}