import ThemeToggle from '../component/ui/ThemeToggle';

export default function AppHeader({ onOpenMenu, actions }) {
  return (
    <header className="top-bar z-50">
      <button className="menu-button" type="button" onClick={onOpenMenu}>
        Menu
      </button>
      <div className="breadcrumb">Scan / Private Assets / New Scan</div>
      <div className="top-actions">
        <ThemeToggle />
        {actions}
      </div>
    </header>
  );
}
