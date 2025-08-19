<?php
class Landlord extends Controller {
    public function __construct() {
        $this->userModel = $this->model('M_Users');
        // Check if user is logged in and is a landlord
        if (!isLoggedIn() || $_SESSION['user_type'] !== 'landlord') {
            redirect('users/login');
        }
    }

    public function index() {
        $this->dashboard();
    }

    public function dashboard() {
        $data = [
            'title' => 'Landlord Dashboard',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('landlord/v_dashboard', $data);
    }

    public function properties() {
        $data = [
            'title' => 'My Properties',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('landlord/v_properties', $data);
    }

    public function income() {
        $data = [
            'title' => 'Income Reports',
            'user_name' => $_SESSION['user_name']
        ];
        $this->view('landlord/v_income', $data);
    }
}
?>
