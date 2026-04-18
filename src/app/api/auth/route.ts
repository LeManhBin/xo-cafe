import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check hardcoded credentials
    if (username === 'lemanhbin195' && password === 'khoinghiep2026') {
      const response = NextResponse.json({ success: true });
      
      // Thiết lập Cookie phiên đăng nhập
      response.cookies.set({
        name: 'auth_session',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // Lưu đăng nhập 7 ngày
      });
      
      return response;
    }

    return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không chính xác!' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Đã có lỗi xảy ra, vui lòng thử lại.' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  
  // Xóa cookie khi đăng xuất
  response.cookies.set({
    name: 'auth_session',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  
  return response;
}
