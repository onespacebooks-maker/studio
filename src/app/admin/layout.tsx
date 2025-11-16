import { AppProvider } from '@/context/AppContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppProvider>{children}</AppProvider>;
}
