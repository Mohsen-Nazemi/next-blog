"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function EditPost({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        const data = await res.json();
        setPost(data);
        setContent(data.content);
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("خطا در دریافت اطلاعات مقاله");
      }
    }
    
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (!post) return <div>Loading...</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      content,
      authorId: session?.user?.id,
      categoryId: formData.get("categoryId") || null,
      seo: {
        title: formData.get("seoTitle"),
        description: formData.get("seoDescription"),
        robots: formData.get("robots"),
      },
    };

    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("خطا در بروزرسانی مقاله");

      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              ویرایش مقاله
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                عنوان مقاله
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                defaultValue={post.title}
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
                defaultValue={post.slug}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                خلاصه مقاله
              </label>
              <textarea
                name="excerpt"
                id="excerpt"
                rows={3}
                defaultValue={post.excerpt}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                محتوای مقاله
              </label>
              <MDEditor
                value={content}
                onChange={setContent}
                preview="edit"
                height={400}
              />
            </div>
          </div>

          <div className="space-y-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              تنظیمات SEO
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700">
                  عنوان SEO
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  id="seoTitle"
                  defaultValue={post.seo?.title}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700">
                  توضیحات SEO
                </label>
                <textarea
                  name="seoDescription"
                  id="seoDescription"
                  rows={3}
                  defaultValue={post.seo?.description}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "در حال ذخیره..." : "بروزرسانی"}
          </button>
        </div>
      </form>
    </div>
  );
}