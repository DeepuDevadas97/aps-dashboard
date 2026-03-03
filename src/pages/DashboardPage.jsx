import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Button from "../component/ui/Button";
import SearchInput from "../component/ui/SearchInput";
import StatusChip from "../component/ui/StatusChip";
import SeverityBadge from "../component/ui/SeverityBadge";
import { STATUS_ORDER } from "../data/mockData";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { PiProhibit } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { LuSearchX } from "react-icons/lu";

export default function DashboardPage({ onNotify, scanRows, setScanRows }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showVulnerabilityColumn, setShowVulnerabilityColumn] =
        useState(true);
    const navigate = useNavigate();

    const visibleRows = useMemo(() => {
        return scanRows.filter((row) => {
            const matchesSearch =
                row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.type.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "All" || row.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [scanRows, searchTerm, statusFilter]);

    const severityTotals = useMemo(() => {
        return visibleRows.reduce(
            (acc, row) => {
                acc.critical += row.vulnerabilities.critical;
                acc.high += row.vulnerabilities.high;
                acc.medium += row.vulnerabilities.medium;
                acc.low += row.vulnerabilities.low;
                return acc;
            },
            { critical: 0, high: 0, medium: 0, low: 0 },
        );
    }, [visibleRows]);

    const handleStatusCycle = () => {
        const currentIndex = STATUS_ORDER.indexOf(statusFilter);
        const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;
        setStatusFilter(STATUS_ORDER[nextIndex]);
    };

    const handleAddScan = () => {
        const newScan = {
            id: `scan-${Date.now()}`,
            name: "New Enterprise Scan",
            type: "Greybox",
            status: "Scheduled",
            progress: 0,
            vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
            lastScan: "Just now",
        };

        setScanRows((prev) => [newScan, ...prev]);
        onNotify("New scan scheduled.");
    };

    return (
        <AppLayout
            onNotify={onNotify}
            activeNav="dashboard"
            firstScanId={scanRows[0]?.id}
            headerActions={
                <>
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() => onNotify("Report export queued.")}
                    >
                        Export Report
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={() =>
                            onNotify("No active scan selected on this page.")
                        }
                        className="stop-scan"
                    >
                        Stop Scan
                    </Button>
                </>
            }
        >
            <section className="stats-grid">
                <article className="stat-card">
                    <div className="flex justify-between items-center">
                        <p>Critical Severity</p>
                        <div className="w-6 h-6 rounded-[4px] bg-red-400/20 flex items-center justify-center">
                            <PiProhibit size={16} color="red" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <h3>{severityTotals.critical}</h3>
                        <span className="stat-change up pt-3 flex items-center gap-1">
                            <FaArrowUpLong /> 2% increase than yesterday
                        </span>
                    </div>
                </article>
                <article className="stat-card">
                    <div className="flex justify-between items-center">
                        <p>High Severity</p>
                        <div className="w-6 h-6 rounded-[4px] bg-amber-500/20 flex items-center justify-center">
                            <IoWarningOutline size={16} color="brown"/>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <h3>{severityTotals.high}</h3>
                        <span className="stat-change up pt-3 flex items-center gap-1">
                            <FaArrowUpLong /> 0.9% increase than yesterday
                        </span>
                    </div>
                </article>
                <article className="stat-card">
                    <div className="flex justify-between items-center">
                        <p>Medium Severity</p>
                        <div className="w-6 h-6 rounded-[4px] bg-yellow-400/20 flex items-center justify-center">
                            <IoWarningOutline size={16} color="orange"/>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <h3>{severityTotals.medium}</h3>
                        <span className="stat-change down pt-3 flex items-center gap-1">
                            <FaArrowDownLong /> 0.9% decrease than yesterday
                        </span>
                    </div>
                </article>
                <article className="stat-card">
                    <div className="flex justify-between items-center">
                        <p>Low Severity</p>
                        <div className="w-6 h-6 rounded-[4px] bg-blue-500/10 flex items-center justify-center">
                            <LuSearchX size={16} color="blue" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <h3>{severityTotals.low}</h3>
                        <span className="stat-change up pt-3 flex items-center gap-1">
                            <FaArrowUpLong /> 0.9% increase than yesterday
                        </span>
                    </div>
                </article>
            </section>

            <section className="table-shell">
                <div className="table-toolbar">
                    <SearchInput
                        id="scan-search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search scans by name or type..."
                    />
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={handleStatusCycle}
                    >
                        Filter: {statusFilter}
                    </Button>
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() => {
                            setShowVulnerabilityColumn((prev) => !prev);
                            onNotify("Visible columns updated.");
                        }}
                    >
                        Column
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleAddScan}
                    >
                        + New Scan
                    </Button>
                </div>

                <div className="table-wrap">
                    <table className="text-[14px]">
                        <thead>
                            <tr>
                                <th>Scan Name</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Progress</th>
                                {showVulnerabilityColumn && (
                                    <th>Vulnerability</th>
                                )}
                                <th>Last Scan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleRows.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => navigate(`/scan/${row.id}`)}
                                >
                                    <td>{row.name}</td>
                                    <td>{row.type}</td>
                                    <td>
                                        <StatusChip value={row.status} />
                                    </td>
                                    <td>
                                        <div className="progress-cell">
                                            <div className="progress-track">
                                                <span
                                                    style={{
                                                        width: `${row.progress}%`,
                                                    }}
                                                />
                                            </div>
                                            <strong>{row.progress}%</strong>
                                        </div>
                                    </td>
                                    {showVulnerabilityColumn && (
                                        <td>
                                            <div className="severity-stack">
                                                <SeverityBadge
                                                    severity="critical"
                                                    value={
                                                        row.vulnerabilities
                                                            .critical
                                                    }
                                                />
                                                <SeverityBadge
                                                    severity="high"
                                                    value={
                                                        row.vulnerabilities.high
                                                    }
                                                />
                                                <SeverityBadge
                                                    severity="medium"
                                                    value={
                                                        row.vulnerabilities
                                                            .medium
                                                    }
                                                />
                                                <SeverityBadge
                                                    severity="low"
                                                    value={
                                                        row.vulnerabilities.low
                                                    }
                                                />
                                            </div>
                                        </td>
                                    )}
                                    <td>{row.lastScan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </AppLayout>
    );
}
