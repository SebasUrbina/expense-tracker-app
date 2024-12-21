import React from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-center h-screen ml-64">
            <Sidebar />
            <main className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
