import { useState } from 'react';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';

export default function AppLayout({ onNotify, activeNav, firstScanId, headerActions, children, footer }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        activeNav={activeNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNotify={onNotify}
        firstScanId={firstScanId}
      />
      {/* <AppHeader onOpenMenu={() => setSidebarOpen((prev) => !prev)} actions={headerActions} /> */}
      <main className="content-area">
        <AppHeader onOpenMenu={() => setSidebarOpen((prev) => !prev)} actions={headerActions} />
        {children}
        {footer}
      </main>
      {sidebarOpen && (
        <button
          className="backdrop"
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}
    </div>
  );
}
