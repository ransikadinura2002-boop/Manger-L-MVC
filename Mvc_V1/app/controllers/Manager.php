<?php
class Manager extends Controller {
    public function __construct() {
        $this->userModel = $this->model('M_Users');
        // Check if user is logged in and is a property manager
        if (!isLoggedIn() || $_SESSION['user_type'] !== 'property_manager') {
            redirect('users/login');
        }
    }

    public function index() {
        $this->dashboard();
    }

    public function dashboard() {
        $data = [
            'title' => 'Property Manager Dashboard',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('manager/v_dashboard', $data);
    }

    public function properties() {
        $data = [
            'title' => 'My Properties',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('manager/v_properties', $data);
    }

    public function tenants() {
        $data = [
            'title' => 'Manage Tenants',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('manager/v_tenants', $data);
    }
}
?>
