import Sidebar from "./Sidebar";

function DashboardLayout({ links, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080b12", color: "white" }}>
      <Sidebar links={links} />
      <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;