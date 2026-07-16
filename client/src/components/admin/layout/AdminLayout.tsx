import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-gray-950 transition-colors duration-300">
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-20'}`}>
          <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};