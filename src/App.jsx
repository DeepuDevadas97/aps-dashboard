import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ScanDetailPage from './pages/ScanDetailPage';
import Toast from './component/ui/Toast';
import { INITIAL_SCAN_ROWS } from './data/mockData';

export default function App() {
  const [toast, setToast] = useState(null);
  const [scanRows, setScanRows] = useState(INITIAL_SCAN_ROWS);
  const [scanActive, setScanActive] = useState(true);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const pushToast = (message) => {
    setToast({ id: Date.now(), message });
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<SignupPage onNotify={pushToast} />} />
        <Route
          path="/dashboard"
          element={<DashboardPage onNotify={pushToast} scanRows={scanRows} setScanRows={setScanRows} />}
        />
        <Route
          path="/scan/:id"
          element={
            <ScanDetailPage
              onNotify={pushToast}
              scanRows={scanRows}
              scanActive={scanActive}
              setScanActive={setScanActive}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {toast && <Toast message={toast.message} />}
    </div>
  );
}
