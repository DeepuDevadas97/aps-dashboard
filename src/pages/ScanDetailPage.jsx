import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Button from "../component/ui/Button";
import { ACTIVITY_LOG, FINDINGS, VERIFICATION_LOG } from "../data/mockData";
import { renderHighlightedLine } from "../utils/highlightText";
import { LiaGlobeSolid, LiaSitemapSolid } from "react-icons/lia";
import { CiFilter } from "react-icons/ci";
import { BsListCheck } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";


export default function ScanDetailPage({
    onNotify,
    scanRows,
    scanActive,
    setScanActive,
}) {
    const [activeLogTab, setActiveLogTab] = useState("activity");
    const { id } = useParams();
    const navigate = useNavigate();

    const scan = useMemo(
        () => scanRows.find((row) => row.id === id),
        [scanRows, id],
    );

    if (!scan) {
        return (
            <AppLayout
                onNotify={onNotify}
                activeNav="scans"
                firstScanId={scanRows[0]?.id}
                headerActions={
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </Button>
                }
            >
                <section className="not-found-card">
                    <h2>Scan not found</h2>
                    <p>
                        The scan id in the URL does not exist. Open another scan
                        from dashboard.
                    </p>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => navigate("/dashboard")}
                    >
                        Go to Dashboard
                    </Button>
                </section>
            </AppLayout>
        );
    }

    const activeLog =
        activeLogTab === "activity" ? ACTIVITY_LOG : VERIFICATION_LOG;
    const stepIndex = scanActive ? 0 : 4;
    const progressValue = scanActive ? 0 : 100;

    const handleStopScan = () => {
        setScanActive(false);
        onNotify("Active scan stopped. Report is ready for export.");
    };

    const stepsArray = [
        { label: "Spidering", icon: LiaGlobeSolid },
        { label: "Mapping", icon: LiaSitemapSolid },
        { label: "Testing", icon: CiFilter },
        { label: "Validating", icon: BsListCheck },
        { label: "Reporting", icon: FaRegFileAlt },
    ];

    return (
        <AppLayout
            onNotify={onNotify}
            activeNav="scans"
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
                        className="stop-scan"
                        onClick={handleStopScan}
                    >
                        Stop Scan
                    </Button>
                </>
            }
            footer={
                <footer className="status-footer">
                    <span>Sub-agents: 0</span>
                    <span>Parallel Executions: 2</span>
                    <span>Operations: 1</span>
                    <span>Critical: 0</span>
                    <span>High: 0</span>
                    <span>Medium: 0</span>
                    <span>Low: 0</span>
                </footer>
            }
        >
            <section className="scan-overview-card">
                <div className="progress-ring-wrap">
                    <div
                        className="progress-ring bg-black"
                        style={{ "--percent": progressValue }}
                    >
                        <strong className="text-[#0cc8a8]">
                            {progressValue}%
                        </strong>
                        <span>{scanActive ? "In Progress" : "Completed"}</span>
                    </div>
                </div>

                <div className="step-section">
                    <ol className="stepper">
                        {/* {['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'].map((step, index) => (
              <li key={step} className={index === stepIndex ? 'active' : index < stepIndex ? 'done' : ''}>
                <span className="step-dot flex justify-center items-center" aria-hidden="true"><LiaGlobeSolid size={16} color='white'/></span>
                <span>{step}</span>
              </li>
            ))} */}
                        {stepsArray.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <li
                                    key={step.label}
                                    className={
                                        index === stepIndex
                                            ? "active"
                                            : index < stepIndex
                                              ? "done"
                                              : ""
                                    }
                                >
                                    <span
                                        className="step-dot flex justify-center items-center"
                                        aria-hidden="true"
                                    >
                                        <Icon size={16} color="white" />
                                    </span>
                                    <span>{step.label}</span>
                                </li>
                            );
                        })}
                    </ol>

                    <div className="meta-grid">
                        <article>
                            <p>Scan Type</p>
                            <strong className="text-[15px]">{scan.type}</strong>
                        </article>
                        <article>
                            <p>Targets</p>
                            <strong className="text-[15px]">google.com</strong>
                        </article>
                        <article>
                            <p>Started At</p>
                            <strong className="text-[15px]">
                                Nov 22, 09:00 AM
                            </strong>
                        </article>
                        <article>
                            <p>Credentials</p>
                            <strong className="text-[15px]">2 Active</strong>
                        </article>
                        <article>
                            <p>Files</p>
                            <strong className="text-[15px]">Control.pdf</strong>
                        </article>
                        <article>
                            <p>Checklists</p>
                            <strong className="text-[#0cc8a8] text-[15px]">
                                40/350
                            </strong>
                        </article>
                    </div>
                </div>
            </section>

            <section className="scan-panels">
                <article className="console-panel">
                    <header className="!pb-0">
                        <div className="panel-title-wrap">
                            <h3>Live Scan Console</h3>
                            <span className="panel-pill">
                                {scanActive ? "Running..." : "Stopped"}
                            </span>
                        </div>
                        <div
                            className="panel-tabs"
                            role="tablist"
                            aria-label="Console tabs"
                        >
                            <button
                                role="tab"
                                type="button"
                                aria-selected={activeLogTab === "activity"}
                                className={
                                    activeLogTab === "activity" ? "active" : ""
                                }
                                onClick={() => setActiveLogTab("activity")}
                            >
                                Activity Log
                            </button>
                            <button
                                role="tab"
                                type="button"
                                aria-selected={activeLogTab === "verification"}
                                className={
                                    activeLogTab === "verification"
                                        ? "active"
                                        : ""
                                }
                                onClick={() => setActiveLogTab("verification")}
                            >
                                Verification Loops
                            </button>
                        </div>
                    </header>

                    <div className="console-body" role="log" aria-live="polite">
                        {activeLog.map((entry) => (
                            <p key={entry.id} className="console-line">
                                <span className="line-time">
                                    [{entry.timestamp}]
                                </span>{" "}
                                {renderHighlightedLine(
                                    entry.text,
                                    entry.highlights,
                                )}
                            </p>
                        ))}
                    </div>
                </article>

                <article className="finding-panel">
                    <header>
                        <h3>Finding Log</h3>
                    </header>

                    <div className="finding-list">
                        {FINDINGS.map((finding) => (
                            <article key={finding.id} className="finding-card">
                                <div className="finding-top">
                                    <span
                                        className={`finding-severity sev-${finding.severity.toLowerCase()}`}
                                    >
                                        {finding.severity}
                                    </span>
                                    <time>{finding.time}</time>
                                </div>
                                <h4>{finding.title}</h4>
                                <p className="finding-endpoint">
                                    {finding.endpoint}
                                </p>
                                <p>{finding.description}</p>
                            </article>
                        ))}
                    </div>
                </article>
            </section>
        </AppLayout>
    );
}
