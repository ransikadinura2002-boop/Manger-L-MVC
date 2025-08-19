<?php require APPROOT . '/views/inc/admin_header.php'; ?>

<div class="admin-content">
    <div class="page-header">
        <h1>Notifications</h1>
        <button class="btn btn-primary" onclick="sendNotification()">
            <i class="icon-send"></i> Send Notification
        </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon bg-blue">
                <i class="icon-bell"></i>
            </div>
            <div class="stat-content">
                <h3>1,247</h3>
                <p>Total Sent</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-green">
                <i class="icon-check"></i>
            </div>
            <div class="stat-content">
                <h3>1,198</h3>
                <p>Delivered</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-orange">
                <i class="icon-clock"></i>
            </div>
            <div class="stat-content">
                <h3>23</h3>
                <p>Pending</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-red">
                <i class="icon-x"></i>
            </div>
            <div class="stat-content">
                <h3>26</h3>
                <p>Failed</p>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
        <div class="search-box">
            <input type="text" placeholder="Search notifications..." id="notificationSearch">
            <i class="icon-search"></i>
        </div>
        <select id="typeFilter">
            <option value="">All Types</option>
            <option value="payment">Payment Reminder</option>
            <option value="maintenance">Maintenance</option>
            <option value="announcement">Announcement</option>
            <option value="alert">Alert</option>
        </select>
        <select id="statusFilter">
            <option value="">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
        </select>
        <input type="date" id="dateFilter" placeholder="Filter by date">
    </div>

    <!-- Notifications Table -->
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Notification</th>
                    <th>Type</th>
                    <th>Recipients</th>
                    <th>Sent Date</th>
                    <th>Delivery Rate</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="notificationsTableBody">
                <tr>
                    <td>
                        <div>
                            <strong>Monthly Rent Reminder</strong>
                            <small>Rent payment due in 3 days</small>
                        </div>
                    </td>
                    <td><span class="badge badge-warning">Payment Reminder</span></td>
                    <td>124 tenants</td>
                    <td>2024-01-15 10:30 AM</td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 96%"></div>
                        </div>
                        <small>96% (119/124)</small>
                    </td>
                    <td><span class="status-badge status-completed">Delivered</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewNotification('NOT001')" title="View">
                                <i class="icon-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="resendFailed('NOT001')" title="Resend Failed">
                                <i class="icon-refresh-cw"></i>
                            </button>
                            <button class="btn-icon" onclick="duplicateNotification('NOT001')" title="Duplicate">
                                <i class="icon-copy"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <!-- More notification rows would be here -->
            </tbody>
        </table>
    </div>
</div>

<?php require APPROOT . '/views/inc/admin_footer.php'; ?>
