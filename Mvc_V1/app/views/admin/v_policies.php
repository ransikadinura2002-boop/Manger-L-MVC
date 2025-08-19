<?php require APPROOT . '/views/inc/admin_header.php'; ?>

<div class="admin-content">
    <div class="page-header">
        <h1>Policy Management</h1>
        <button class="btn btn-primary" onclick="createPolicy()">
            <i class="icon-plus"></i> Create Policy
        </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon bg-blue">
                <i class="icon-file-text"></i>
            </div>
            <div class="stat-content">
                <h3>18</h3>
                <p>Total Policies</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-green">
                <i class="icon-check"></i>
            </div>
            <div class="stat-content">
                <h3>15</h3>
                <p>Active Policies</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-orange">
                <i class="icon-clock"></i>
            </div>
            <div class="stat-content">
                <h3>2</h3>
                <p>Under Review</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-red">
                <i class="icon-alert-circle"></i>
            </div>
            <div class="stat-content">
                <h3>1</h3>
                <p>Expired</p>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
        <div class="search-box">
            <input type="text" placeholder="Search policies..." id="policySearch">
            <i class="icon-search"></i>
        </div>
        <select id="categoryFilter">
            <option value="">All Categories</option>
            <option value="rental">Rental Policies</option>
            <option value="maintenance">Maintenance</option>
            <option value="security">Security</option>
            <option value="payment">Payment</option>
        </select>
        <select id="statusFilter">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="review">Under Review</option>
            <option value="expired">Expired</option>
        </select>
    </div>

    <!-- Policies Table -->
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Policy Name</th>
                    <th>Category</th>
                    <th>Created By</th>
                    <th>Last Updated</th>
                    <th>Applies To</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="policiesTableBody">
                <tr>
                    <td>
                        <div>
                            <strong>Late Payment Policy</strong>
                            <small>POL001</small>
                        </div>
                    </td>
                    <td><span class="badge badge-warning">Payment</span></td>
                    <td>Admin User</td>
                    <td>2024-01-10</td>
                    <td>All Properties</td>
                    <td><span class="status-badge status-active">Active</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewPolicy('POL001')" title="View">
                                <i class="icon-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="editPolicy('POL001')" title="Edit">
                                <i class="icon-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="duplicatePolicy('POL001')" title="Duplicate">
                                <i class="icon-copy"></i>
                            </button>
                            <button class="btn-icon btn-danger" onclick="archivePolicy('POL001')" title="Archive">
                                <i class="icon-archive"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <!-- More policy rows would be here -->
            </tbody>
        </table>
    </div>
</div>

<?php require APPROOT . '/views/inc/admin_footer.php'; ?>
