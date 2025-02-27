import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst();
    if (!settings) {
      // ایجاد تنظیمات پیش‌فرض اگر وجود نداشت
      const defaultSettings = await prisma.settings.create({
        data: {
          siteName: "وبلاگ من",
          siteUrl: "http://localhost:3000",
          description: "توضیحات وبلاگ",
          postsPath: "posts",
          categoriesPath: "categories",
          timezone: "Asia/Tehran",
          dateFormat: "DD MMMM YYYY"
        }
      });
      return NextResponse.json(defaultSettings);
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const settings = await prisma.settings.findFirst();

    if (!settings) {
      const newSettings = await prisma.settings.create({
        data
      });
      return NextResponse.json(newSettings);
    }

    const updatedSettings = await prisma.settings.update({
      where: { id: settings.id },
      data
    });
    
    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}