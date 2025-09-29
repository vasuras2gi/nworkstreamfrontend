import { Link, useLocation } from "react-router-dom"; // Ensure you use 'react-router-dom'
import useAuthUser from "../hooks/useAuthUser";
import { 
    BellIcon, 
    LogOutIcon, 
    ShipWheelIcon, 
    MessageCircleIcon // Added MessageCircleIcon
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const { logoutMutation } = useLogout();

    const isSidebarVisibleOnDesktop = !isChatPage && !location.pathname?.startsWith("/profile");

    return (
        <nav 
            className={`bg-base-200 border-b border-base-300 fixed top-0 z-30 h-16 flex items-center right-0 left-0 
                ${isSidebarVisibleOnDesktop ? 'lg:left-60' : 'lg:left-0'}`
            }
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full"> 
                <div className="flex items-center justify-between w-full"> {/* Changed 'justify-end' to 'justify-between' */}
                    
                    {/* LEFT SIDE: LOGO - Visible only if the main sidebar is hidden (e.g., in chat or on mobile) */}
                    {(isChatPage || !isSidebarVisibleOnDesktop) && (
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2.5">
                                {/* Using hidden and lg:block to ensure the logo is hidden on large screens when the sidebar is there */}
                                <div className="w-20 h-10 mb-2 lg:hidden"><img src="/nworkgrad.png" alt="Logo" /></div> 
                            </Link>
                        </div>
                    )}
                    
                    {/* RIGHT SIDE: ALL ICONS AND USER CONTROLS */}
                    <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                        
                        {/* ------------------ NEW ICONS ------------------ */}
                        
                        {/* NEW ICON 1: EXPLORE/FEED (Show on small screens, hide when sidebar is visible on large screens) */}
                        {/* We use 'lg:hidden' to hide it on large screens where the sidebar is active */}
                        <Link to={"/"} className={`${isSidebarVisibleOnDesktop ? 'lg:hidden' : 'hidden'}`}> 
                            <button className="btn btn-ghost btn-circle">
                                <ShipWheelIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                        
                        {/* NEW ICON 2: CHAT/MESSAGES (Show on small screens, hide when sidebar is visible on large screens) */}
                        <Link to={"/chat"} className={`${isSidebarVisibleOnDesktop ? 'lg:hidden' : 'hidden'}`}>
                            <button className="btn btn-ghost btn-circle">
                                <MessageCircleIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                        
                        {/* ------------------ END NEW ICONS ------------------ */}

                        {/* Existing Notifications Icon */}
                        <Link to={"/notifications"}>
                            <button className="btn btn-ghost btn-circle">
                                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                    
                        <ThemeSelector />

                        {/* User Avatar Link */}
                        <div className="avatar">
                            <Link to={`/profile/${authUser?._id}`}>
                                <div className="w-9 rounded-full">
                                    <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
                                </div>
                            </Link>
                        </div>

                        {/* Logout button */}
                        <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
                            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;