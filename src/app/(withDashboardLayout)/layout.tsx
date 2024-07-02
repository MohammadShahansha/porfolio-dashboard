"use client";
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import PrivateRoute from "@/components/privateRoute/privateRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default PrivateRoute(DashboardLayout);
