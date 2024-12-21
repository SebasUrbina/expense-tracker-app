import React from "react";

interface DashboardLayoutProps {
    filters?: React.ReactNode;
    kpis?: React.ReactNode;
    charts: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    filters,
    kpis,
    charts,
}) => {
    return (
        <div className="flex flex-col w-full gap-4">
            {/* Sección de filtros */}
            {filters && (
                <section className="bg-white rounded-lg shadow-md p-4">
                    {filters}
                </section>
            )}

            {/* Sección de KPIs */}
            {kpis && (
                <section className="bg-white rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kpis}
                </section>
            )}

            {/* Sección de gráficos */}
            <section className="bg-white rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {charts}
            </section>
        </div>
    );
};

export default DashboardLayout;
