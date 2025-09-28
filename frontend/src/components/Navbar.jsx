import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();
  
  // Logic to determine if the sidebar is visually present on large screens.
  // Note: The Layout component determines when the sidebar is actually rendered.
  const isSidebarVisibleOnDesktop = !isChatPage && !location.pathname?.startsWith("/profile");

  return (
    // CRUCIAL FIX: Use lg:left-60 to only apply the offset on large screens.
    // On small screens, 'left-0' (which is the default) will apply, making it full width.
    <nav 
      className={`bg-base-200 border-b border-base-300 fixed top-0 z-30 h-16 flex items-center right-0 left-0 
        ${isSidebarVisibleOnDesktop ? 'lg:left-60' : 'lg:left-0'}` // Use LG breakpoint for the offset
      }
    >
      {/* The inner div should now correctly contain the content within the available navbar width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full"> 
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                {/* Ensure the image container is responsive */}
                <div className="w-20 h-10 mb-2"><img src="/nworkgrad.png" alt="Logo" /></div> 
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

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