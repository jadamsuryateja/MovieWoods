import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

export default Layout;
