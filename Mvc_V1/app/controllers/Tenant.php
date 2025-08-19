<?php
class Tenant extends Controller {
    public function __construct() {
        $this->userModel = $this->model('M_Users');
        // Check if user is logged in and is a tenant
        if (!isLoggedIn() || $_SESSION['user_type'] !== 'tenant') {
            redirect('users/login');
        }
    }

    public function index() {
        $this->dashboard();
    }

    public function dashboard() {
        $data = [
            'title' => 'Tenant Dashboard',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('tenant/v_dashboard', $data);
    }

    public function payments() {
        $data = [
            'title' => 'My Payments',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('tenant/v_payments', $data);
    }

    public function maintenance() {
        $data = [
            'title' => 'Maintenance Requests',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('tenant/v_maintenance', $data);
    }
}
?>
