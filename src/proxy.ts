import { withAuth } from "next-auth/middleware";

/**
 * Next.js Edge Middleware
 * Tüm /admin/* rotalarını NextAuth oturumu gerektirmesi için kilitler.
 * Oturum yoksa otomatik olarak /admin/login sayfasına yönlendirir.
 */
export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
