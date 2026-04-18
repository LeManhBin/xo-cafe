import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth_session');
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  
  // Cho phép các API công khai hoặc asset tĩnh đi qua
  if (
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Chặn truy cập API nếu chưa có auth, nhưng API auth thì đã cho qua ở trên
  if (!authCookie && !isLoginPage) {
    // Nếu cố vào trang nào đó mà chưa login, đẩy về /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu đã login rồi mà cố vào lại /login thì đẩy về trang chủ
  if (authCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Bắt tất cả request ngoại trừ static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
