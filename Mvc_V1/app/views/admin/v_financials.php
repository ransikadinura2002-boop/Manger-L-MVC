<?php require APPROOT . '/views/inc/admin_header.php'; ?>

<div class="admin-content">
    <div class="page-header">
        <h1>Financial Management</h1>
        <button class="btn btn-primary" onclick="generateReport()">
            <i class="icon-file-text"></i> Generate Report
        </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon bg-green">
                <i class="icon-dollar-sign"></i>
            </div>
            <div class="stat-content">
                <h3>$124,500</h3>
                <p>Total Revenue</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-blue">
                <i class="icon-trending-up"></i>
            </div>
            <div class="stat-content">
                <h3>$98,200</h3>
                <p>Collected</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-orange">
                <i class="icon-clock"></i>
            </div>
            <div class="stat-content">
                <h3>$26,300</h3>
                <p>Pending</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-red">
                <i class="icon-alert-circle"></i>
            </div>
            <div class="stat-content">
                <h3>$8,450</h3>
                <p>Overdue</p>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
        <div class="search-box">
            <input type="text" placeholder="Search transactions..." id="transactionSearch">
            <i class="icon-search"></i>
        </div>
        <select id="typeFilter">
            <option value="">All Types</option>
            <option value="rent">Rent Payment</option>
            <option value="deposit">Security Deposit</option>
            <option value="maintenance">Maintenance Fee</option>
            <option value="utility">Utility Payment</option>
        </select>
        <select id="statusFilter">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
        </select>
        <input type="date" id="dateFilter" placeholder="Filter by date">
    </div>

    <!-- Transactions Table -->
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Property</th>
                    <th>Tenant</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="transactionsTableBody">
                <tr>
                    <td><strong>#TXN001</strong></td>
                    <td>Sunset Villa #101</td>
                    <td>Alice Johnson</td>
                    <td><span class="badge badge-primary">Rent Payment</span></td>
                    <td><strong>$1,200.00</strong></td>
                    <td>2024-01-15</td>
                    <td><span class="status-badge status-completed">Completed</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewTransaction('TXN001')" title="View">
                                <i class="icon-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="downloadReceipt('TXN001')" title="Receipt">
                                <i class="icon-download"></i>
                            </button>
                            <button class="btn-icon" onclick="sendReminder('TXN001')" title="Send Reminder">
                                <i class="icon-mail"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <!-- More transaction rows would be here -->
            </tbody>
        </table>
    </div>
</div>

<?php require APPROOT . '/views/inc/admin_footer.php'; ?>
