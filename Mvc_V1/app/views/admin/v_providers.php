<?php require APPROOT . '/views/inc/admin_header.php'; ?>

<div class="admin-content">
    <div class="page-header">
        <h1>Service Providers</h1>
        <button class="btn btn-primary" onclick="addProvider()">
            <i class="icon-plus"></i> Add Provider
        </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon bg-blue">
                <i class="icon-users"></i>
            </div>
            <div class="stat-content">
                <h3>45</h3>
                <p>Total Providers</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-green">
                <i class="icon-check"></i>
            </div>
            <div class="stat-content">
                <h3>38</h3>
                <p>Active Providers</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-orange">
                <i class="icon-clock"></i>
            </div>
            <div class="stat-content">
                <h3>12</h3>
                <p>Pending Jobs</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-purple">
                <i class="icon-star"></i>
            </div>
            <div class="stat-content">
                <h3>4.6</h3>
                <p>Avg Rating</p>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
        <div class="search-box">
            <input type="text" placeholder="Search providers..." id="providerSearch">
            <i class="icon-search"></i>
        </div>
        <select id="categoryFilter">
            <option value="">All Categories</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="cleaning">Cleaning</option>
            <option value="landscaping">Landscaping</option>
        </select>
        <select id="statusFilter">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>
    </div>

    <!-- Providers Table -->
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Provider</th>
                    <th>Category</th>
                    <th>Contact</th>
                    <th>Jobs Completed</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="providersTableBody">
                <tr>
                    <td>
                        <div class="user-info">
                            <div class="avatar">AB</div>
                            <div>
                                <strong>ABC Plumbing</strong>
                                <small>ID: SP001</small>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-info">Plumbing</span></td>
                    <td>
                        <div>contact@abcplumbing.com</div>
                        <small>+1 234 567 8901</small>
                    </td>
                    <td>127 jobs</td>
                    <td>
                        <div class="rating">
                            <span class="stars">★★★★★</span>
                            <small>4.8</small>
                        </div>
                    </td>
                    <td><span class="status-badge status-active">Active</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewProvider('SP001')" title="View">
                                <i class="icon-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="editProvider('SP001')" title="Edit">
                                <i class="icon-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="assignJob('SP001')" title="Assign Job">
                                <i class="icon-briefcase"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <!-- More provider rows would be here -->
            </tbody>
        </table>
    </div>
</div>

<?php require APPROOT . '/views/inc/admin_footer.php'; ?>
