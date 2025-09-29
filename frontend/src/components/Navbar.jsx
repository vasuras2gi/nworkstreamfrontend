import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { 
    BellIcon, 
    LogOutIcon, 
    ShipWheelIcon, 
    MessageCircleIcon,
    MenuIcon,
    X 
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = ({ onMenuClick, isSidebarOpen }) => { 
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
                <div className="flex items-center justify-between w-full"> 
                    
                    {/* LEFT SIDE: MOBILE MENU BUTTON + LOGO - (Kept the original gap-3 here for visual separation) */}
                    <div className='flex items-center gap-3'>
                        <button 
                            className="btn btn-ghost btn-circle lg:hidden"
                            onClick={onMenuClick}
                        >
                            {isSidebarOpen ? (
                                <X className="h-6 w-6 text-base-content opacity-70" />
                            ) : (
                                <MenuIcon className="h-6 w-6 text-base-content opacity-70" />
                            )}
                        </button>
                        
                        {(isChatPage || !isSidebarVisibleOnDesktop) && (
                            <Link to="/" className="flex items-center gap-2.5">
                                <div className="w-20 h-10 mb-2 lg:hidden">
                                    <img src="/nworkgrad.png" alt="Logo" />
                                </div> 
                            </Link>
                        )}
                    </div>
                    
                    {/* RIGHT SIDE: ALL ICONS AND USER CONTROLS */}
                    {/* 💡 FIX: Set gap to zero (gap-0) to force icons together on all small screens */}
                    <div className="flex items-center gap-0"> 
                        
                        {/* NEW ICON 1: EXPLORE/FEED */}
                        <Link to={"/"} className="lg:hidden"> 
                            <button className="btn btn-ghost btn-circle">
                                <ShipWheelIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                        
                        {/* NEW ICON 2: CHAT/MESSAGES */}
                        <Link to={"/chat"} className="lg:hidden">
                            <button className="btn btn-ghost btn-circle">
                                <MessageCircleIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                        
                        {/* Existing Notifications Icon */}
                        <Link to={"/notifications"}>
                            <button className="btn btn-ghost btn-circle">
                                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                    
                        {/* Theme Selector - Hidden on mobile to save space (sm:hidden) */}
                        <div className="hidden sm:block"> 
                           <ThemeSelector />
                        </div>

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