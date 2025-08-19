<?php
class Admin extends Controller {
    
    public function __construct() {
        // Initialize any required dependencies
    }
    
    // Main dashboard page
    public function index() {
        $data = [
            'title' => 'Admin Dashboard - Rentigo',
            'page' => 'dashboard'
        ];
        
        $this->view('admin/v_dashboard', $data);
    }
    
    // Properties management page
    public function properties() {
        $data = [
            'title' => 'Properties - Rentigo Admin',
            'page' => 'properties'
        ];
        
        $this->view('admin/v_properties', $data);
    }
    
    // Property managers page
    public function managers() {
        $data = [
            'title' => 'Property Managers - Rentigo Admin',
            'page' => 'managers'
        ];
        
        $this->view('admin/v_managers', $data);
    }
    
    // Documents management page
    public function documents() {
        $data = [
            'title' => 'Documents - Rentigo Admin',
            'page' => 'documents'
        ];
        
        $this->view('admin/v_documents', $data);
    }
    
    // Financial management page
    public function financials() {
        $data = [
            'title' => 'Financials - Rentigo Admin',
            'page' => 'financials'
        ];
        
        $this->view('admin/v_financials', $data);
    }
    
    // Service providers page
    public function providers() {
        $data = [
            'title' => 'Service Providers - Rentigo Admin',
            'page' => 'providers'
        ];
        
        $this->view('admin/v_providers', $data);
    }
    
    // Policies management page
    public function policies() {
        $data = [
            'title' => 'Policies - Rentigo Admin',
            'page' => 'policies'
        ];
        
        $this->view('admin/v_policies', $data);
    }
    
    // Notifications page
    public function notifications() {
        $data = [
            'title' => 'Notifications - Rentigo Admin',
            'page' => 'notifications'
        ];
        
        $this->view('admin/v_notifications', $data);
    }
}
?>
