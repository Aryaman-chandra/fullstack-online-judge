import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
const CodeNexusLogo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <path
      d="M40 100L70 70M40 100L70 130M40 100H100"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M160 100L130 70M160 100L130 130M160 100H100"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="100" cy="100" r="20" fill="currentColor" />
    <path
      d="M90 170L110 30"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
)
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <CodeNexusLogo/>
            <span className="text-xl tracking-tight">Code Nexus</span>
          </div>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <NavLink className={navigationMenuTriggerStyle()} to="/problems">{"Problems"}</NavLink>
            <NavLink className={navigationMenuTriggerStyle()} to="/contests">{"Contests"}</NavLink>
            <NavLink to={"/auth/sign-in"} className="py-2 px-3 border rounded-md">
              Sign In
            </NavLink>
            <NavLink
              to={"/auth/sign-up"}
              className="bg-gradient-to-r from-primary to-rose-800 py-2 px-3 rounded-md"
            >
              Create an account
            </NavLink>
          </div>
          </div>
          </div>
          </nav>
  );

}
export default Navbar
