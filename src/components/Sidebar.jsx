import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { NAV_ITEMS } from "../data/mockData";
import { Link } from "react-router-dom";

export default function Sidebar({
    activeNav,
    isOpen,
    onClose,
    onNotify,
    firstScanId,
}) {
    const navigate = useNavigate();

    const onNavClick = (item) => {
        if (item.id === "dashboard") {
            navigate("/dashboard");
            onClose();
            return;
        }

        if (item.id === "scans") {
            navigate(firstScanId ? `/scan/${firstScanId}` : "/dashboard");
            onClose();
            return;
        }

        onNotify(`${item.label} is not part of this challenge flow.`);
        onClose();
    };

    return (
        <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
            <div className="sidebar-top">
                <Link to="/dashboard"><Logo /></Link>
                
                <button
                    className="sidebar-close"
                    type="button"
                    onClick={onClose}
                >
                    x
                </button>
            </div>

            <nav className="sidebar-nav" aria-label="Main navigation">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div className={item.id === 'notifications' ? 'pt-4 mt-4 border-t border-black/10' : ''}>
                            <button
                                key={item.id}
                                type="button"
                                className={`nav-item w-full ${activeNav === item.id ? "active" : ""}`}
                                onClick={() => onNavClick(item)}
                            >
                                {/* <span className="nav-dot" aria-hidden="true" /> */}
                                <Icon size={16} />
                                {item.label}
                            </button>
                        </div>
                    );
                })}
            </nav>

            <div className="sidebar-profile">
                <div className="profile-avatar" aria-hidden="true">
                    DL
                </div>
                <div>
                    <p className="profile-email">admin@edu.com</p>
                    <p className="profile-role">Security Lead</p>
                </div>
            </div>
        </aside>
    );
}
