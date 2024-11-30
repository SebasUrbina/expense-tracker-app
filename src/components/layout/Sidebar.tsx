import { Link, useLocation } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    FolderIcon,
    CalendarIcon,
    DocumentIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";
import { FaWallet } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export function Sidebar() {
    const location = useLocation();
    const { user } = useAuth();
    const mainMenuItems = [
        { name: "Dashboard", path: "/", icon: HomeIcon },
        { name: "Transactions", path: "/transactions", icon: CreditCardIcon },
        { name: "Budgets", path: "/budgets", icon: CreditCardIcon },
        // { name: "Team", path: "/team", icon: UsersIcon },
        // { name: "Projects", path: "/projects", icon: FolderIcon },
        // { name: "Calendar", path: "/calendar", icon: CalendarIcon },
        // { name: "Documents", path: "/documents", icon: DocumentIcon },
        // { name: "Reports", path: "/reports", icon: ChartBarIcon },
    ];

    return (
        <div className="w-64 h-screen bg-[#0F172A] text-gray-400 fixed left-0 top-0 flex flex-col">
            {/* Logo */}
            <div className="p-5">
                <div className="flex items-center">
                    <FaWallet className="w-8 h-8 text-indigo-500" />
                    <span className="ml-3 text-lg font-semibold text-gray-200">
                        Expense Tracker
                    </span>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {mainMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                                isActive
                                    ? "bg-indigo-500/10 text-indigo-500"
                                    : "text-gray-400 hover:bg-slate-800/50"
                            }`}
                        >
                            <Icon
                                className={`h-5 w-5 mr-3 ${
                                    isActive ? "text-indigo-500" : ""
                                }`}
                            />
                            <span className="text-sm font-medium">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Settings & User Profile */}
            <div className="p-4 border-t border-slate-800/80">
                <Link
                    to="/settings"
                    className="flex items-center px-3 py-2 text-sm rounded-lg transition-colors hover:bg-slate-800/50 mb-3"
                >
                    <Cog6ToothIcon className="h-5 w-5 mr-3" />
                    <span className="font-medium">Settings</span>
                </Link>

                <div className="flex items-center px-3 py-2">
                    <img
                        className="h-8 w-8 rounded-full"
                        src={
                            user?.avatarUrl || "https://via.placeholder.com/32"
                        }
                        alt="User avatar"
                    />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-200">
                            {user?.name || "Usuario"}
                        </p>
                        <p className="text-xs text-gray-500">
                            {user?.email || "tom@example.com"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
