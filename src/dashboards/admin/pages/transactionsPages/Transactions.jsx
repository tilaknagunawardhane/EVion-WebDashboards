import React, { useState } from 'react';
import DataTable from '../../../../components/ui/DataTable'; // Path to your DataTable.jsx
import { COLORS, FONTS } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import AdminPageHeader from '../../components/AdminPageHeader';
import PaymentDetailsModal from '../../components/transactions/PaymentDetailsModel'; // Path to your new modal component
import TabBar from '../../../../components/ui/TabBar';

const tabs = [
    { id: 'dueThisWeek', label: 'Due this Week' },
    { id: 'pastWeek', label: 'Past Week' },
    { id: 'earlier', label: 'Earlier' },
];

// Mobile labels for tabs
const mobileLabels = {
    dueThisWeek: 'Due this Week',
    pastWeek: 'Past Week',
    earlier: 'Earlier',
};

// Your initial data (kept as is, but will be put into state)
const initialPaymentsData = [
    {
        paymentID: 'PAY001',
        StationOwnerID: 'OWN001',
        'Owner Name': 'Lanka EV Solutions',
        'Week Range': 'July 1–7, 2025',
        'Number of Stations': 2,
        'Total Revenue(LKR)': 15500.75,
        'Due Date': '2025-07-14',
        'Payment Date': '2025-07-10',
        Status: 'Paid',
        'Revenue Breakdown': 'View Revenue Breakdown',
        Proof: 'https://example.com/proofs/PAY001.pdf', // Example proof URL
        'Quick Actions': [] // This will be overridden by custom renderer
    },
    {
        paymentID: 'PAY002',
        StationOwnerID: 'OWN002',
        'Owner Name': 'Green Charge Network',
        'Week Range': 'July 1–7, 2025',
        'Number of Stations': 1,
        'Total Revenue(LKR)': 12000.00,
        'Due Date': '2025-07-14',
        'Payment Date': '2025-07-12',
        Status: 'Paid',
        'Revenue Breakdown': 'View Revenue Breakdown',
        Proof: 'https://example.com/proofs/PAY002.jpg',
        'Quick Actions': [] // This will be overridden by custom renderer
    },
    {
        paymentID: '',
        StationOwnerID: 'OWN001',
        'Owner Name': 'Lanka EV Solutions',
        'Week Range': 'July 8–14, 2025',
        'Number of Stations': 1,
        'Total Revenue(LKR)': 18250.50,
        'Due Date': '2025-07-21',
        'Payment Date': 'N/A',
        Status: 'Pending',
        'Revenue Breakdown': 'View Revenue Breakdown',
        Proof: '',
        'Quick Actions': [] // This will be overridden by custom renderer
    },
    {
        paymentID: '',
        StationOwnerID: 'OWN003',
        'Owner Name': 'EcoCharge Stations',
        'Week Range': 'July 1–7, 2025',
        'Number of Stations': 1,
        'Total Revenue(LKR)': 9500.00,
        'Due Date': '2025-07-14',
        'Payment Date': 'N/A',
        Status: 'Overdue',
        'Revenue Breakdown': 'View Revenue Breakdown',
        'Proof': '',
        'Quick Actions': [] // This will be overridden by custom renderer
    },
    {
        paymentID: '',
        StationOwnerID: 'OWN002',
        'Owner Name': 'Green Charge Network',
        'Week Range': 'July 15–21, 2025',
        'Number of Stations': 1,
        'Total Revenue(LKR)': 0.00,
        'Due Date': '2025-07-28',
        'Payment Date': 'N/A',
        Status: 'Upcoming',
        'Revenue Breakdown': 'View Revenue Breakdown',
        'Proof': '',
        'Quick Actions': [] // This will be overridden by custom renderer
    }
];

// Define the simple array of column names that DataTable expects
const paymentsColumnNames = [
    'StationOwnerID', 'paymentID', 'Owner Name', 'Week Range', 'Number of Stations',
    'Total Revenue(LKR)', 'Due Date', 'Payment Date', 'Status',
    'Revenue Breakdown', 'Proof', 'Quick Actions'
];


export default function AdminTransactions() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dueThisWeek');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    const [paymentsData, setPaymentsData] = useState(initialPaymentsData); // Make data stateful

    // State for the PaymentDetailsModal
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // Function to handle "View Account Details and Make Payment" or "Resend"
    const handleQuickAction = (action, rowData) => {
        if (action === 'View Account Details' || action === 'Make Payment') {
            setSelectedPayment(rowData);
            setIsPaymentModalOpen(true);
        } else if (action === 'Resend') {
            alert(`Resending proof for Payment ID: ${rowData.paymentID}`);
            console.log("Resend proof for:", rowData);
            // Implement actual resend logic here (e.g., API call)
        } else {
            console.log(`Unhandled action: ${action} for row:`, rowData);
        }
    };

    // Function to handle "Upload and Confirm Payment" from the modal
    const handleConfirmPayment = (paymentID, proofUrl, proofFile) => {
        console.log(`Confirming payment for ID: ${paymentID}, Proof URL: ${proofUrl}, File:`, proofFile);

        setPaymentsData(prevData =>
            prevData.map(payment => {
                // Find the correct payment based on Owner and Week Range (assuming unique for pending)
                if (payment.StationOwnerID === selectedPayment.StationOwnerID && payment['Week Range'] === selectedPayment['Week Range']) {
                    const newPaymentID = payment.paymentID || `PAY${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
                    return {
                        ...payment,
                        paymentID: newPaymentID,
                        'Payment Date': new Date().toISOString().split('T')[0], // Current date (YYYY-MM-DD)
                        Status: 'Paid',
                        Proof: proofUrl, // Store the URL of the uploaded proof
                        // No need to set 'Quick Actions' here, as the custom renderer will handle it based on Status
                    };
                }
                return payment;
            })
        );
        setIsPaymentModalOpen(false); // Close the modal
        setSelectedPayment(null); // Clear selected payment
        alert(`Payment confirmed and proof uploaded for ${selectedPayment['Owner Name']} for week ${selectedPayment['Week Range']}.`);
    };

    // --- IMPORTANT: Custom Actions Renderer for DataTable ---
    // This function will be passed to DataTable's 'customActions' prop
    // and will be responsible for rendering 'Quick Actions' columns.
    const renderQuickActionsForTable = (rowData) => {
        let actions = [];
        if (rowData.Status === 'Paid') {
            // Modified actions for 'Paid' status
            actions = ['View Account Details', 'Resend'];
        } else { // Pending, Overdue, Upcoming etc.
            // Actions for other statuses
            actions = ['View Account Details', 'Make Payment'];
        }

        return (
            <div className="flex gap-2">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent row click from firing
                            handleQuickAction(action, rowData);
                        }}
                        className="px-2 py-1 rounded-md text-xs font-normal"
                        style={{
                            backgroundColor: action === 'Make Payment' ? COLORS.primary : COLORS.background,
                            color: action === 'Make Payment' ? COLORS.background : COLORS.mainTextColor,
                            border: action === 'Make Payment' ? 'none' : `1px solid ${COLORS.stroke}`
                        }}
                    >
                        {action}
                    </button>
                ))}
            </div>
        );
    };

    // Custom cell renderer for 'Proof' column
    const renderProofColumn = (value, columnKey, rowData) => {
        if (columnKey === 'Proof') {
            if (rowData.Status === 'Paid' && rowData.Proof) {
                return (
                    <a
                        href={rowData.Proof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        style={{ color: COLORS.primary }}
                    >
                        View Document
                    </a>
                );
            }
            return '-'; // Display '-' if not paid or no proof
        }
        return value; // For other columns, return the value as is
    };


    const TableTab = ({ title, columns, data, onRowClick, customActions, renderProofColumn }) => (
        <div className="grid grid-cols-1 gap-0 bg-transparent rounded-lg p-0">
            <DataTableTopBar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
                filterOptions={[
                    { value: 'Paid', label: 'Paid' },
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Overdue', label: 'Overdue' },
                    { value: 'Upcoming', label: 'Upcoming' },
                ]}
                // Sort options should use the actual column names (strings)
                sortOptions={columns.map(col => ({ value: col, label: col }))}
                searchPlaceholder={`Search ${title.toLowerCase()}...`}
            />
            <DataTable
                columns={columns} // Pass simple string column names
                data={data}
                filter={filter}
                sort={sort}
                search={search}
                onRowClick={onRowClick}
                // Pass the custom actions renderer for the 'Quick Actions' column
                customActions={renderQuickActionsForTable}
                // Update the renderCellContent logic in DataTable.jsx to use this
                // for proof column or simply ensure 'Proof' column is handled
                // by DataTable's default renderCellContent if it supports external links.
                // However, since you want to keep DataTable.jsx unchanged,
                // we'll rely on the default render for 'Proof' which will show the URL.
                // If you want "View Document", DataTable.jsx needs to be modified,
                // or you need to pre-process 'data' to change the 'Proof' value.
                // Given the constraint "please don't change DataTable.jsx", we can't directly use customCellRenderer for general cells here.
                // The provided DataTable.jsx only has `customActions` for 'Quick Actions'.
            />
        </div>
    );

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
            minHeight: '100vh',
        }}>
            <AdminPageHeader title="Payments" />

            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
                mobileLabels={mobileLabels}
            />

            <div className="mt-6">
                {activeTab === 'dueThisWeek' && (
                    <TableTab
                        title="This Week Payments"
                        columns={paymentsColumnNames}
                        data={initialPaymentsData}
                    />
                )}

                {activeTab === 'pastWeek' && (
                    <TableTab
                        title="Past Week Payments"
                        columns={paymentsColumnNames}
                        data={initialPaymentsData}
                    />
                )}

                {activeTab === 'earlier' && (
                    <TableTab
                        title="Earlier Payments"
                        columns={paymentsColumnNames}
                        data={initialPaymentsData}
                    />
                )}
            </div>

            {/* Payment Details Modal */}
            <PaymentDetailsModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                paymentData={selectedPayment}
                onConfirmPayment={handleConfirmPayment}
            />
        </div>
    );
}