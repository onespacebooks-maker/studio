import { AppSidebar } from '@/components/app-sidebar';
import { AppointmentProvider } from '@/context/AppointmentContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppointmentProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </AppointmentProvider>
  );
}
