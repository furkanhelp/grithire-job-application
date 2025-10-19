import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { FormRow } from "../components";
import links from "../utils/links";
import logo from "../assets/images/favicon.ico";
import { Loading } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import StaggeredMenu from "../components/StaggeredMenu";
import PillNav from "../components/PillNav";
import ThemeToggle from "../components/ThemeToggle";
import LogoutContainer from "../components/LogoutContainer";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();


// Dashboard menu items for StaggeredMenu
const dashboardMenuItems = links.map((link) => ({
  label: link.text,
  ariaLabel: `Go to ${link.text}`,
  link: `/dashboard/${link.path === "." ? "" : link.path}`.replace(/\/$/, ""),
  icon: link.icon,
}));

// Main navigation items
const mainNavItems = [
  { label: "Home", link: "/", ariaLabel: "Go to Home page" },
  { label: "About", link: "/about", ariaLabel: "Go to About page" },
  { label: "Services", link: "/services", ariaLabel: "Go to Services page" },
  { label: "Contact", link: "/contact", ariaLabel: "Go to Contact page" },
];

// Combine both for the staggered menu
const allMenuItems = [...mainNavItems, ...dashboardMenuItems];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];


const DashboardLayout = ({ queryClient }) => {
  const queryResult = useQuery(userQuery);
  const { user } = queryResult.data || {};
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [staggeredMenuItems, setStaggeredMenuItems] = useState([]);
  const menuItemsRef = useRef(dashboardMenuItems);
  
useEffect(() => {
  const updateMenuItems = () => {
    if (window.innerWidth <= 1024) {
      menuItemsRef.current = allMenuItems;
    } else {
      menuItemsRef.current = dashboardMenuItems;
    }
  
  };

  updateMenuItems();
  window.addEventListener("resize", updateMenuItems);

  return () => window.removeEventListener("resize", updateMenuItems);
}, []);

  if (queryResult.isLoading) return <Loading />;
  if (queryResult.isError || !user) return redirect("/");

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logging out...");
  };

  // Menu state handlers
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
   
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

 
 return (
   <DashboardContext.Provider
     value={{
       user,
       showSidebar,
       toggleSidebar,
       logoutUser,
     }}
   >
     {/* Always Visible Theme Toggle - Mobile & Desktop */}
     <div className="fixed top-4 right-4 z-50 lg:hidden">
       <ThemeToggle />
     </div>

     {/* Transparent Navigation Bar - Hidden on mobile */}
     <nav className="sticky top-0 z-30 bg-transparent backdrop-blur-md !p-4 hidden lg:block">
       <div className="flex items-center justify-between">
         <div className="w-1/3"></div>
         <div className="w-1/3 flex justify-center items-center">
           <PillNav
             logo={logo}
             logoAlt="Company Logo"
             items={[
               { label: "Home", href: "/" },
               { label: "About", href: "/about" },
               { label: "Services", href: "/services" },
               { label: "Contact", href: "/contact" },
             ]}
             activeHref="/"
             className="custom-nav rounded-full"
             ease="power2.easeOut"
             baseColor="transparent"
             pillColor="oklch(12.9% 0.042 264.695)"
             hoveredPillTextColor="#ffffff"
             pillTextColor="#ffffff"
             hideHamburger={true}
           />
         </div>
         <div className="w-1/3 flex justify-end items-center !space-x-4">
           <div className="hidden lg:block">
             <ThemeToggle />
           </div>
           <div className="hidden md:block">
             <LogoutContainer />
           </div>
         </div>
       </div>
     </nav>

     {/* MAIN FIX: Simplified layout structure */}
     <div className="min-h-screen flex bg-gradient-to-br transition-colors duration-300">
       {/* Staggered Menu */}
       <div
         className={`relative h-full transition-all duration-500 ease-in-out ${
           isMenuOpen ? "w-74" : "w-0"
         }`}
       >
         <div
           className={`fixed top-0 left-0 h-full z-40 transition-transform duration-500 
            ease-in-out ${
             isMenuOpen ? "translate-x-0" : "-translate-x-full"
           }`}
         >
           <StaggeredMenu
             position="left"
             items={
               window.innerWidth <= 1024 ? allMenuItems : dashboardMenuItems
             }
             socialItems={socialItems}
             displaySocials={true}
             displayItemNumbering={false}
             menuButtonColor={"#6b7280"}
             openMenuButtonColor={"#000000"}
             changeMenuColorOnOpen={true}
             colors={["#26143f", "#431185"]}
             logoUrl={logo}
             accentColor="#491396"
             user={user}
             onMenuOpen={handleMenuOpen}
             onMenuClose={handleMenuClose}
             onLogout={logoutUser}
           />
         </div>
       </div>

       {/* Main Content Area */}
       <div className="flex-1 flex flex-col min-h-screen w-full">
         <main className="flex-1 !p-4 md:p-6 lg:p-8 overflow-auto !mt-15 lg:mt-0 w-full">
           <div className="w-full">
             <div className="bg-gradient-to-r from-[#26143f] to-black dark:bg-white 
             backdrop-blur-md rounded-2xl shadow-xl border border-gray-200
              dark:border-gray-700 !p-4 md:p-6 lg:p-8 w-full">
               {isPageLoading ? (
                 <div className="flex justify-center items-center h-64">
                   <Loading />
                 </div>
               ) : (
                 <Outlet context={{ user }} />
               )}
             </div>
           </div>
         </main>
       </div>
     </div>
   </DashboardContext.Provider>
 );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
