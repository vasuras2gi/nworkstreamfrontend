import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { 
    BellIcon, 
    LogOutIcon, 
    ShipWheelIcon, 
    MessageCircleIcon,
    MenuIcon,
    X, 
    HomeIcon,
    UsersIcon,
    Plus,
    PlusCircle
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
                    
                    {/* LEFT SIDE: MOBILE MENU BUTTON + LOGO */}
                    <div className='flex items-center gap-3'>
                        <button 
                            // 💡 ADDED btn-sm: Reduce padding on mobile menu button
                            className="btn btn-ghost btn-circle btn-sm lg:hidden"
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
                    <div className="flex items-center gap-0"> 
                        
                        {/* NEW ICON 1: EXPLORE/FEED */}
                        <Link to={"/"} className="lg:hidden"> 
                            <button className="btn btn-ghost btn-circle **btn-sm**">
                                <HomeIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                        
                        {/* NEW ICON 2: CHAT/MESSAGES */}
                        <Link to={"/friends"} className="lg:hidden">
                            <button className="btn btn-ghost btn-circle **btn-sm**">
                                <UsersIcon className="h-6 w-6 text-base-content opacity-70"  />
                            </button>
                        </Link>

                        <Link to={"/upload"} className="lg:hidden">
                            <button className="btn btn-ghost btn-circle **btn-sm**">
                                <Plus className="h-6 w-6 text-base-content opacity-70"  />
                            </button>
                        </Link>
                        
                        {/* Existing Notifications Icon */}
                        <Link to={"/notifications"}>
                            <button className="btn btn-ghost btn-circle **btn-sm**">
                                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                    
                        {/* Theme Selector - Hidden on mobile to save space (sm:hidden) */}
                        <div className="hidden sm:block"> 
                           <ThemeSelector />
                        </div>

                        {/* createPostPage  */}
                        <div>
                            <Link to={"/create-post"}>
                            <button className="btn btn-ghost btn-circle">
                                <PlusCircle className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                            </Link>
                        </div>

                        {/* User Avatar Link - Already small enough at w-9 */}
                        <div className="avatar">
                            <Link to={`/profile/${authUser?._id}`}>
                                <div className="w-9 rounded-full">
                                    <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
                                </div>
                            </Link>
                        </div>

                        {/* Logout button */}
                        <button className="btn btn-ghost btn-circle **btn-sm**" onClick={logoutMutation}>
                            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;