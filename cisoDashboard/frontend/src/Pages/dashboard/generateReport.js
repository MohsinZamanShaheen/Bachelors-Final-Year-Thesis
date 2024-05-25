import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { mockTransactions } from "../../data/mockData";
import { getAlerts } from '../../apiClient';

const avgDowntimeData = {
    'CMS Issue': '00:09:20',
    'DNS Issues': '00:29:10',
    'Hardware Failure': '00:05:19',
    'Host Provider': '00:09:30',
    'default': '00:10:00'
};

const avgRepairTimeData = {
    'CMS Issue': '00:08:20',
    'DNS Issues': '00:24:55',
    'Hardware Failure': '00:03:19',
    'Host Provider': '00:08:11',
    'default': '00:10:00'
};

export const generatePDF = async () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text('Dashboard Report', 14, 22);

    // Add some general information
    doc.setFontSize(12);
    doc.text('Report generated on: ' + new Date().toLocaleString(), 14, 30);

    // Numeric stats
    doc.setFontSize(14);
    doc.text('Numeric Stats', 14, 40);
    const stats = [
        ["New Threats", "25", "+14%"],
        ["Remaining budget", "$59,342.32", "50%"],
        ["Number of Users", "32,441", "+10%"],
        ["Traffic Received", "1,325,134", "+73%"],
        ["Daily Threat Cost", "$371.87K", "+29%"]
    ];
    doc.autoTable({
        head: [['Metric', 'Value', 'Change']],
        body: stats,
        startY: 45
    });

    // MTTR Chart data
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Mean Time To Repair (MTTR)', 14, 22);
    const alertsResponse = await getAlerts(); // Fetch alerts data
    const alerts = alertsResponse.data;
    const issueCounts = alerts.reduce((acc, alert) => {
        const issue = alert.rule;
        acc[issue] = (acc[issue] || 0) + 1;
        return acc;
    }, {});
    const mttrData = Object.keys(issueCounts).map(issue => ({
        issue,
        avgDowntime: avgDowntimeData[issue] || avgDowntimeData['default'],
        avgRepairTime: avgRepairTimeData[issue] || avgRepairTimeData['default']
    }));
    doc.autoTable({
        head: [['Issue', 'Avg Downtime', 'Avg Repair Time']],
        body: mttrData.map(item => [item.issue, item.avgDowntime, item.avgRepairTime]),
        startY: 30
    });

    // Alerts by Severity
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Alerts by Severity', 14, 22);
    const severityCounts = alerts.reduce((acc, alert) => {
        const severity = alert.severity.toLowerCase();
        acc[severity] = (acc[severity] || 0) + 1;
        return acc;
    }, {});
    const alertData = [
        {
            id: "critical",
            label: "Critical",
            value: severityCounts.critical || 0
        },
        {
            id: "high",
            label: "High",
            value: severityCounts.high || 0
        },
        {
            id: "medium",
            label: "Medium",
            value: severityCounts.medium || 0
        }
    ];
    doc.autoTable({
        head: [['Severity', 'Count']],
        body: alertData.map(item => [item.label, item.value]),
        startY: 30
    });

    // Recent Transactions
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Recent Transactions', 14, 22);
    const transactions = mockTransactions.map(tx => [tx.txId, tx.user, tx.date, tx.cost]);
    doc.autoTable({
        head: [['Transaction ID', 'User', 'Date', 'Cost']],
        body: transactions,
        startY: 30
    });

    // Major Insights
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Major Insights', 14, 22);
    const insights = [
        { value: 287, description: "Assets with Critical Vulnerabilities" },
        {value: 142, description: "Internet Facing Assets with Critical Vulnerabilities"},
        { value: 763, description: "Phishing Attempts Blocked" },
        {value: 356, description: "Malware Incidents Detected"},
    ].map(insight => [insight.value, insight.description]);
    doc.autoTable({
        head: [['Value', 'Description']],
        body: insights,
        startY: 30
    });

    // Attack Paths
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Attack Paths', 14, 22);
    const attackPaths = [
        { value: 420, description: "Data: Data Exposure Incidents" },
        { value: 150, description: "Access: Broad Network Scans" },
        { value: 85, description: "Access: Host Compromise Attempts" },
        { value: 310, description: "Data: Unauthorized Data Access" },
        { value: 50, description: "Access: Privilege Escalation" },
    ].map(path => [path.value, path.description]);
    doc.autoTable({
        head: [['Value', 'Description']],
        body: attackPaths,
        startY: 30
    });

    // Save the PDF
    doc.save('dashboard-report.pdf');
};
