import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <details className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}
      <summary className="btn btn-ghost btn-circle cursor-pointer list-none flex items-center justify-center">
        <PaletteIcon className="size-5 pointer-events-none" />
      </summary>

      <div
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-56 border border-base-content/10 max-h-80 overflow-y-auto z-50"
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              type="button"
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setTheme(themeOption.name);
                // Dropdown ko smoothly close karne ke liye
                const detailsElement = e.currentTarget.closest("details");
                if (detailsElement) detailsElement.removeAttribute("open");
              }}
            >
              <PaletteIcon className="size-4 pointer-events-none" />
              <span className="text-sm font-medium pointer-events-none">{themeOption.label}</span>
              {/* THEME PREVIEW COLORS */}
              <div className="ml-auto flex gap-1 pointer-events-none">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </details>
  );
};

export default ThemeSelector;




// import { PaletteIcon } from "lucide-react";
// import { useThemeStore } from "../store/useThemeStore";
// import { THEMES } from "../constants";

// const ThemeSelector = () => {
//   const { theme, setTheme } = useThemeStore();

//   return (
//     <div className="dropdown dropdown-end">
//       {/* DROPDOWN TRIGGER */}
//       <button tabIndex={0} className="btn btn-ghost btn-circle">
//         <PaletteIcon className="size-5" />
//       </button>

//       <div
//         tabIndex={0}
//         className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
//         w-56 border border-base-content/10 max-h-80 overflow-y-auto"
//       >
//         <div className="space-y-1">
//           {THEMES.map((themeOption) => (
//             <button
//               key={themeOption.name}
//               className={`
//               w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
//               ${
//                 theme === themeOption.name
//                   ? "bg-primary/10 text-primary"
//                   : "hover:bg-base-content/5"
//               }
//             `}
//               onClick={() => setTheme(themeOption.name)}
//             >
//               <PaletteIcon className="size-4" />
//               <span className="text-sm font-medium">{themeOption.label}</span>
//               {/* THEME PREVIEW COLORS */}
//               <div className="ml-auto flex gap-1">
//                 {themeOption.colors.map((color, i) => (
//                   <span
//                     key={i}
//                     className="size-2 rounded-full"
//                     style={{ backgroundColor: color }}
//                   />
//                 ))}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ThemeSelector;
