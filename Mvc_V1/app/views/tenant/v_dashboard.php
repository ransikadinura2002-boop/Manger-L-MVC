<?php require APPROOT . '/views/inc/header.php'; ?>

<div class="container-fluid">
    <div class="row">
        <!-- Sidebar -->
        <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div class="position-sticky pt-3">
                <h6 class="sidebar-heading px-3 mt-4 mb-1 text-muted">Tenant Portal</h6>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="<?php echo URLROOT; ?>/tenant/dashboard">
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo URLROOT; ?>/tenant/payments">
                            Payments
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo URLROOT; ?>/tenant/maintenance">
                            Maintenance
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Tenant Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <span class="text-muted">Welcome, <?php echo $data['user_name']; ?></span>
                </div>
            </div>

            <!-- Dashboard Cards -->
            <div class="row mb-4">
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <h5 class="card-title">Next Rent Due</h5>
                            <h3>$1,200</h3>
                            <p class="card-text">Due: March 1, 2024</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-white bg-success">
                        <div class="card-body">
                            <h5 class="card-title">Lease Status</h5>
                            <h3>Active</h3>
                            <p class="card-text">Expires: Dec 31, 2024</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-white bg-warning">
                        <div class="card-body">
                            <h5 class="card-title">Maintenance</h5>
                            <h3>1</h3>
                            <p class="card-text">Open requests</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h5>Quick Actions</h5>
                        </div>
                        <div class="card-body">
                            <a href="<?php echo URLROOT; ?>/tenant/payments" class="btn btn-primary mb-2 d-block">Pay Rent</a>
                            <a href="<?php echo URLROOT; ?>/tenant/maintenance" class="btn btn-warning mb-2 d-block">Request Maintenance</a>
                            <button class="btn btn-info d-block">Contact Landlord</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h5>Property Information</h5>
                        </div>
                        <div class="card-body">
                            <p><strong>Address:</strong> 123 Main St, Apt 4B</p>
                            <p><strong>Property Manager:</strong> John Smith</p>
                            <p><strong>Emergency Contact:</strong> (555) 123-4567</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>
