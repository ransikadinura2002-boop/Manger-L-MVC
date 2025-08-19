<?php require APPROOT . '/views/inc/admin_header.php'; ?>

<div class="admin-content">
    <div class="page-header">
        <h1>Document Management</h1>
        <button class="btn btn-primary" onclick="uploadDocument()">
            <i class="icon-upload"></i> Upload Document
        </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon bg-blue">
                <i class="icon-file"></i>
            </div>
            <div class="stat-content">
                <h3>1,247</h3>
                <p>Total Documents</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-orange">
                <i class="icon-clock"></i>
            </div>
            <div class="stat-content">
                <h3>23</h3>
                <p>Pending Review</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-green">
                <i class="icon-check"></i>
            </div>
            <div class="stat-content">
                <h3>1,198</h3>
                <p>Approved</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon bg-red">
                <i class="icon-x"></i>
            </div>
            <div class="stat-content">
                <h3>26</h3>
                <p>Rejected</p>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
        <div class="search-box">
            <input type="text" placeholder="Search documents..." id="documentSearch">
            <i class="icon-search"></i>
        </div>
        <select id="typeFilter">
            <option value="">All Types</option>
            <option value="lease">Lease Agreement</option>
            <option value="insurance">Insurance</option>
            <option value="inspection">Inspection Report</option>
            <option value="maintenance">Maintenance</option>
        </select>
        <select id="statusFilter">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
        </select>
    </div>

    <!-- Documents Table -->
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Document</th>
                    <th>Type</th>
                    <th>Property</th>
                    <th>Uploaded By</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="documentsTableBody">
                <tr>
                    <td>
                        <div class="document-info">
                            <i class="icon-file-text"></i>
                            <div>
                                <strong>Lease_Agreement_001.pdf</strong>
                                <small>2.4 MB</small>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-primary">Lease Agreement</span></td>
                    <td>Sunset Villa #101</td>
                    <td>John Doe</td>
                    <td>2024-01-15</td>
                    <td><span class="status-badge status-pending">Pending Review</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewDocument('DOC001')" title="View">
                                <i class="icon-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="downloadDocument('DOC001')" title="Download">
                                <i class="icon-download"></i>
                            </button>
                            <button class="btn-icon btn-success" onclick="approveDocument('DOC001')" title="Approve">
                                <i class="icon-check"></i>
                            </button>
                            <button class="btn-icon btn-danger" onclick="rejectDocument('DOC001')" title="Reject">
                                <i class="icon-x"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <!-- More document rows would be here -->
            </tbody>
        </table>
    </div>
</div>

<?php require APPROOT . '/views/inc/admin_footer.php'; ?>
