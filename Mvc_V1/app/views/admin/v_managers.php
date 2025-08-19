<?php require APPROOT . '/views/inc/admin_header.php'; ?>

<div class="admin-content">
    <div class="page-header">
        <h1>Property Managers</h1>
        <button class="btn btn-primary" onclick="openAddManagerModal()">
            <i class="icon-plus"></i> Add Manager
        </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon bg-blue">
                <i class="icon-users"></i>
            </div>
            <div class="stat-content">
                <h3>24</h3>
                <p>Total Managers</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-green">
                <i class="icon-check"></i>
            </div>
            <div class="stat-content">
                <h3>18</h3>
                <p>Active Managers</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-orange">
                <i class="icon-clock"></i>
            </div>
            <div class="stat-content">
                <h3>6</h3>
                <p>Pending Approval</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-red">
                <i class="icon-x"></i>
            </div>
            <div class="stat-content">
                <h3>2</h3>
                <p>Suspended</p>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
        <div class="search-box">
            <input type="text" placeholder="Search managers..." id="managerSearch">
            <i class="icon-search"></i>
        </div>
        <select id="statusFilter">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
        </select>
        <select id="experienceFilter">
            <option value="">All Experience</option>
            <option value="0-2">0-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
        </select>
    </div>

    <!-- Managers Table -->
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Manager</th>
                    <th>Contact</th>
                    <th>Properties</th>
                    <th>Experience</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="managersTableBody">
                <tr>
                    <td>
                        <div class="user-info">
                            <div class="avatar">JD</div>
                            <div>
                                <strong>John Doe</strong>
                                <small>ID: PM001</small>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>john.doe@email.com</div>
                        <small>+1 234 567 8900</small>
                    </td>
                    <td><span class="badge badge-info">12 Properties</span></td>
                    <td>5 years</td>
                    <td>
                        <div class="rating">
                            <span class="stars">★★★★★</span>
                            <small>4.8</small>
                        </div>
                    </td>
                    <td><span class="status-badge status-active">Active</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewManager('PM001')" title="View">
                                <i class="icon-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="editManager('PM001')" title="Edit">
                                <i class="icon-edit"></i>
                            </button>
                            <button class="btn-icon btn-danger" onclick="suspendManager('PM001')" title="Suspend">
                                <i class="icon-ban"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <!-- More manager rows would be here -->
            </tbody>
        </table>
    </div>
</div>

<?php require APPROOT . '/views/inc/admin_footer.php'; ?>
