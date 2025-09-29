import { Link, useLocation } from "react-router-dom"; // Use 'react-router-dom' for <Link>
import useAuthUser from "../hooks/useAuthUser";
import { 
    BellIcon, 
    LogOutIcon, 
    ShipWheelIcon, 
    MessageCircleIcon // Import the new icon for Chat/Messages
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  // Logic to determine if the sidebar is visually present on large screens.
  const isSidebarVisibleOnDesktop = !isChatPage && !location.pathname?.startsWith("/profile");

  return (
    <nav
      className={`bg-base-200 border-b border-base-300 fixed top-0 z-30 h-16 flex items-center right-0 left-0 
        ${isSidebarVisibleOnDesktop ? 'lg:left-60' : 'lg:left-0'}`
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-end w-full">
          
          {/* LOGO - ONLY IN THE CHAT PAGE (Kept for continuity) */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-20 h-10 mb-2">
                    <img src="/nworkgrad.png" alt="Logo" />
                </div>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            
            {/* NEW ICON 1: EXPLORE/FEED (Hidden on large screens where a sidebar likely has it) */}
            <Link to={"/"} className="lg:hidden"> 
              <button className="btn btn-ghost btn-circle">
                <ShipWheelIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
            
            {/* NEW ICON 2: CHAT/MESSAGES (Hidden on large screens if the chat icon is in the sidebar) */}
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
          </div>

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
    </nav>
  );
};
export default Navbar;