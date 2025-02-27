"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
        alert("خطا در دریافت تنظیمات");
      }
    }

    fetchSettings();
  }, []);

  if (!settings) return <div>Loading...</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = {
      siteName: formData.get("siteName"),
      siteUrl: formData.get("siteUrl"),
      description: formData.get("description"),
      defaultTitle: formData.get("defaultTitle"),
      defaultDescription: formData.get("defaultDescription"),
      robotsTxt: formData.get("robotsTxt"),
      facebook: formData.get("facebook"),
      twitter: formData.get("twitter"),
      instagram: formData.get("instagram"),
      postsPath: formData.get("postsPath"),
      categoriesPath: formData.get("categoriesPath"),
      timezone: formData.get("timezone"),
      dateFormat: formData.get("dateFormat"),
    };

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("خطا در بروزرسانی تنظیمات");

      router.refresh();
      alert("تنظیمات با موفقیت بروزرسانی شد");
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
            <h2 className="text-xl font-bold text-gray-900 mb-6">تنظیمات عمومی</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                  نام سایت
                </label>
                <input
                  type="text"
                  name="siteName"
                  id="siteName"
                  required
                  defaultValue={settings.siteName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700">
                  آدرس سایت
                </label>
                <input
                  type="url"
                  name="siteUrl"
                  id="siteUrl"
                  required
                  defaultValue={settings.siteUrl}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">تنظیمات SEO</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="defaultTitle" className="block text-sm font-medium text-gray-700">
                  عنوان پیش‌فرض
                </label>
                <input
                  type="text"
                  name="defaultTitle"
                  id="defaultTitle"
                  defaultValue={settings.defaultTitle}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="defaultDescription" className="block text-sm font-medium text-gray-700">
                  توضیحات پیش‌فرض
                </label>
                <textarea
                  name="defaultDescription"
                  id="defaultDescription"
                  rows={3}
                  defaultValue={settings.defaultDescription}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="robotsTxt" className="block text-sm font-medium text-gray-700">
                  محتوای robots.txt
                </label>
                <textarea
                  name="robotsTxt"
                  id="robotsTxt"
                  rows={5}
                  defaultValue={settings.robotsTxt}
                  className="mt-1 block w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? "در حال ذخیره..." : "ذخیره تنظیمات"}
          </button>
        </div>
      </form>
    </div>
  );
}