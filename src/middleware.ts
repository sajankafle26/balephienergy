import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // requests per window
const LOGIN_RATE_LIMIT_MAX = 20; // login attempts per window

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(key: string, max: number): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count++;
  return true;
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimit.entries()) {
    if (now > entry.resetTime) rateLimit.delete(key);
  }
}, 5 * 60 * 1000);

function isStateChanging(method: string): boolean {
  return ["POST", "PUT", "DELETE", "PATCH"].includes(method);
}

function checkCsrf(request: NextRequest): boolean {
  if (!isStateChanging(request.method)) return true;

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const referer = request.headers.get("referer");

  if (origin) {
    try {
      const originUrl = new URL(origin);
      if (host && originUrl.host !== host) return false;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (host && refererUrl.host !== host) return false;
    } catch {
      return false;
    }
  }

  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);

  // CSRF protection for state-changing API routes (skip auth routes)
  if (pathname.startsWith("/api/") && !pathname.includes("/api/auth/") && isStateChanging(request.method)) {
    if (!checkCsrf(request)) {
      return NextResponse.json(
        { error: "CSRF validation failed" },
        { status: 403 }
      );
    }
  }

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const isLogin = pathname.includes("/api/auth/");
    const max = isLogin ? LOGIN_RATE_LIMIT_MAX : RATE_LIMIT_MAX;
    const key = `${ip}:${isLogin ? "login" : "api"}`;

    if (!checkRateLimit(key, max)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // Rate limiting for contact form
  if (pathname === "/api/contact" && request.method === "POST") {
    const key = `contact:${ip}`;
    if (!checkRateLimit(key, 10)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https: http:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
