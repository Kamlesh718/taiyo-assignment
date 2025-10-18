import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * AppLayout Component
 *
 * This is the main layout for the application.
 * It defines the structure of the page, including the navigation
 * and the main content area where routed pages are rendered.
 *
 * - Renders the Navbar component on the left for desktop and
 *   bottom for mobile (handled inside Navbar itself).
 * - Uses React Router's <Outlet /> to render nested route components.
 * - Provides scrollable main content area.
 */

function AppLayout() {
  return (
    <div className="flex bg-gray-100 h-screen">
      <div className=" ">
        <Navbar />
      </div>
      <div className="flex-1 w-[100vw] md:m-4 md:px-10 overflow-auto focus:overflow-contain ">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
