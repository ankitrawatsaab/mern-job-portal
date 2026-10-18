
import React, { useState } from "react";
import {Link,NavLink,useNavigate,useLocation,} from "react-router-dom";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {LogOut,UserRound,Menu,X,BriefcaseBusiness,Building2,ChevronDown,} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isRecruiter = user?.role === "recruiter";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-purple-50 text-purple-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-purple-700"
    }`;

  const LogoutHandler = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/logout`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        closeMobileMenu();
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoggingOut(false);
    }
  };

  const navItems = isRecruiter
    ? [
        { to: "/admin/companies", label: "Companies", icon: Building2 },
        { to: "/admin/jobs", label: "Jobs", icon: BriefcaseBusiness },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/jobs", label: "Jobs" },
        { to: "/browse", label: "Browse" },
      ];

  const avatarFallback = user?.fullname
    ?.trim()
    ?.charAt(0)
    ?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center gap-0.5"
          aria-label="CareerVerse home"
        >
          <span className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-[27px]">
            Career
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-purple-700 transition-colors group-hover:text-purple-800 sm:text-[27px]">
            Verse
          </span>
          <span className="ml-1.5 mt-1 h-2 w-2 rounded-full bg-purple-600" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          <nav
            className="flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {!user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-xl border-gray-200 px-5 font-semibold transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                className="rounded-xl bg-purple-700 px-5 font-semibold text-white shadow-sm transition-all hover:bg-purple-800 hover:shadow-md"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Open account menu"
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pr-3 transition-all hover:border-purple-200 hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <Avatar className="h-9 w-9 border border-purple-100">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback className="bg-purple-100 font-semibold text-purple-700">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>

                  <span className="hidden max-w-28 truncate text-sm font-medium text-gray-700 lg:block">
                    {user?.fullname || "My Account"}
                  </span>
                  <ChevronDown size={15} className="text-gray-500" />
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={10}
                className="w-72 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl"
              >
                <div className="flex items-center gap-3 rounded-xl bg-purple-50/70 p-3">
                  <Avatar className="h-11 w-11 border border-white shadow-sm">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback className="bg-purple-100 font-semibold text-purple-700">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900">
                      {user?.fullname || "User"}
                    </p>
                    <p className="truncate text-xs capitalize text-gray-500">
                      {user?.role || "Account"}
                    </p>
                    {user?.profile?.bio && (
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {user.profile.bio}
                      </p>
                    )}
                  </div>
                </div>

                {user?.role === "student" && (
                  <Button
                    variant="ghost"
                    className="mt-2 w-full justify-start gap-3 rounded-xl px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={() => navigate("/profile")}
                  >
                    <UserRound size={17} />
                    View Profile
                  </Button>
                )}

                {isRecruiter && (
                  <>
                    <Button
                      variant="ghost"
                      className="mt-2 w-full justify-start gap-3 rounded-xl px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => navigate("/admin/companies")}
                    >
                      <Building2 size={17} />
                      Manage Companies
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 rounded-xl px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => navigate("/admin/jobs")}
                    >
                      <BriefcaseBusiness size={17} />
                      Manage Jobs
                    </Button>
                  </>
                )}

                <div className="my-2 border-t border-gray-100" />

                <Button
                  variant="ghost"
                  disabled={loggingOut}
                  className="w-full justify-start gap-3 rounded-xl px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={LogoutHandler}
                >
                  <LogOut size={17} />
                  {loggingOut ? "Logging out..." : "Logout"}
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          {user && (
            <Avatar className="h-9 w-9 border border-purple-100">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt={user?.fullname || "User"}
              />
              <AvatarFallback className="bg-purple-100 font-semibold text-purple-700">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          )}

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="h-10 w-10 rounded-xl border-gray-200"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden sm:px-6">
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-purple-700"
                    }`
                  }
                >
                  {Icon && <Icon size={18} />}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {!user ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => {
                  closeMobileMenu();
                  navigate("/login");
                }}
              >
                Login
              </Button>

              <Button
                className="w-full rounded-xl bg-purple-700 hover:bg-purple-800"
                onClick={() => {
                  closeMobileMenu();
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div className="px-2">
                <p className="truncate font-semibold text-gray-900">
                  {user?.fullname || "User"}
                </p>
                <p className="text-xs capitalize text-gray-500">
                  {user?.role}
                </p>
              </div>

              {user?.role === "student" && (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/profile");
                  }}
                >
                  <UserRound size={17} />
                  View Profile
                </Button>
              )}

              <Button
                variant="ghost"
                disabled={loggingOut}
                className="w-full justify-start gap-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={LogoutHandler}
              >
                <LogOut size={17} />
                {loggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
