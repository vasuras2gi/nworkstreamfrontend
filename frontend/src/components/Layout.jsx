import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  const marginClass = showSidebar ? 'lg:ml-80' : 'ml-0';
  return (
    // 1. We keep min-h-screen to ensure the background covers the viewport,
    //    but we allow the page to scroll.
    // 2. We add overflow-x-hidden to prevent horizontal scrollbars caused by fixed elements.
    <div className="min-h-screen overflow-x-hidden">
      
      {/* 3. The sidebar is now fixed to the left. We assume a width of w-60. */}
      {showSidebar && (
        <div className="fixed top-0 left-0 w-60 h-full z-20">
          <Sidebar />
        </div>
      )}

      {/* 4. The main content container needs a left margin to push it past the fixed sidebar.
         This is the key to avoiding overlap and horizontal overflow. */}
      <div className={`flex flex-col flex-1 ${marginClass}`}>
        <Navbar />
        <main className=" pt-16 flex-1 w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;