import { AppSidebar } from '@/components/app-sidebar';
import { AppProvider } from '@/context/AppContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </AppProvider>
  );
}
