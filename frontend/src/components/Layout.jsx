import { useState } from 'react'; // 1. Import useState
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

// Define a consistent sidebar width for both CSS and margin calculation
const SIDEBAR_WIDTH_CLASS = 'w-60'; // Equivalent to Tailwind's w-60 (15rem or 240px)
const SIDEBAR_MARGIN_CLASS = 'lg:ml-60'; // Changed to match w-60 (240px)

// Note: The margin offset in Navbar should also be lg:left-60

const Layout = ({ children, showSidebar = false }) => {
    // 1. Mobile State: Manages the open/close state of the sidebar on small screens
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // 2. Toggle Handler
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    // Class for the main content area margin (only applies on large screens)
    const marginClass = showSidebar ? SIDEBAR_MARGIN_CLASS : 'ml-0';

    return (
        <div className="min-h-screen overflow-x-hidden">
            
            {/* --------------------------- DESKTOP SIDEBAR --------------------------- */}
            {/* Only renders on large screens (lg:block) if showSidebar is true */}
            {showSidebar && (
                // Use lg:block and hidden to control visibility based on breakpoint
                // Use a negative z-index to place it behind the mobile overlay when the latter is active
                <div className={`fixed top-0 left-0 ${SIDEBAR_WIDTH_CLASS} h-full z-20 hidden lg:block`}>
                    <Sidebar />
                </div>
            )}

            {/* --------------------------- MOBILE SIDEBAR (Drawer) --------------------------- */}
            <div 
                className={`fixed top-0 h-full bg-base-100 z-50 transition-transform duration-300 ease-in-out 
                    ${SIDEBAR_WIDTH_CLASS} 
                    ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:hidden`} 
            >
                <Sidebar />
            </div>

            {/* Backdrop Overlay for Mobile (to close the sidebar by clicking outside) */}
            {isMobileSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" 
                    onClick={toggleMobileSidebar}
                />
            )}
            {/* ------------------------------------------------------------------------ */}

            {/* 4. Main Content Container - Pass the toggle function to Navbar */}
            <div className={`flex flex-col flex-1 ${marginClass}`}>
                <Navbar onMenuClick={toggleMobileSidebar} isSidebarOpen={isMobileSidebarOpen} /> 
                
                {/* pt-16 accounts for the h-16 Navbar */}
                <main className="pt-16 flex-1 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;