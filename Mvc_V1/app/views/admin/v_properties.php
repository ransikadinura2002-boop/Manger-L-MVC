<?php require APPROOT . '/views/inc/admin_header.php'; ?>

<div class="page-content">
    <!-- Page Header -->
    <div class="page-header">
        <div class="header-content">
            <h2>Properties Management</h2>
            <p>Manage and approve property listings</p>
        </div>
        <div class="header-actions">
            <button class="btn btn-primary">
                <i class="fas fa-plus"></i> Add Property
            </button>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
        <div class="filters-row">
            <div class="filter-group">
                <label>Status</label>
                <select class="form-select">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Location</label>
                <select class="form-select">
                    <option value="">All Locations</option>
                    <option value="ny">New York</option>
                    <option value="ca">California</option>
                    <option value="tx">Texas</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Price Range</label>
                <select class="form-select">
                    <option value="">All Prices</option>
                    <option value="0-1000">$0 - $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500+">$2,500+</option>
                </select>
            </div>
            <div class="filter-group">
                <button class="btn btn-secondary">Reset Filters</button>
            </div>
        </div>
    </div>

    <!-- Properties Table -->
    <div class="table-section">
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" class="select-all">
                        </th>
                        <th>Property ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date Added</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" class="row-select"></td>
                        <td>#P001</td>
                        <td><img src="<?php echo URLROOT; ?>/img/property1.jpg" alt="Property" class="property-thumb"></td>
                        <td>Modern Apartment Downtown</td>
                        <td>John Smith</td>
                        <td>New York, NY</td>
                        <td>$2,500/month</td>
                        <td>Apartment</td>
                        <td><span class="status-badge pending">Pending</span></td>
                        <td>2024-01-15</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-success" title="Approve">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" title="Reject">
                                    <i class="fas fa-times"></i>
                                </button>
                                <button class="btn btn-sm btn-primary" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-sm btn-secondary" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <!-- More rows would be generated dynamically -->
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-wrapper">
            <div class="pagination-info">
                Showing 1 to 10 of 234 entries
            </div>
            <div class="pagination">
                <button class="page-btn" disabled>Previous</button>
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <button class="page-btn">Next</button>
            </div>
        </div>
    </div>
</div>

<?php require APPROOT . '/views/inc/admin_footer.php'; ?>
