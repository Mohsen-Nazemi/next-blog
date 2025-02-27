"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditCategory({ params }) {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`/api/categories/${params.id}`);
        const data = await res.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
        alert("خطا در دریافت اطلاعات دسته‌بندی");
      }
    }
    
    if (params.id) {
      fetchCategory();
    }
  }, [params.id]);

  if (!category) return <div>Loading...</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch(`/api/categories/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("خطا در بروزرسانی دسته‌بندی");

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("آیا از حذف این دسته‌بندی اطمینان دارید؟")) {
      return;
    }

    try {
      const res = await fetch(`/api/categories/${params.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("خطا در حذف دسته‌بندی");

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              ویرایش دسته‌بندی
            </h3>
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800"
            >
              حذف دسته‌بندی
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                نام دسته‌بندی
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                defaultValue={category.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                required
                defaultValue={category.slug}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                توضیحات
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                defaultValue={category.description}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? "در حال ذخیره..." : "بروزرسانی"}
          </button>
        </div>
      </form>
    </div>
  );
}