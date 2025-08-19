<?php

class Users extends Controller
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = $this->model('M_Users');
    }

    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Process form

            // Validate the data
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_FULL_SPECIAL_CHARS); // ISSUE IN FILTER_SANITIZE_STRING

            // Input data
            $data = [
                'name' => trim($_POST['name']),
                'email' => trim($_POST['email']),
                'password' => trim($_POST['password']),
                'confirm_password' => trim($_POST['confirm_password']),
                'user_type' => trim($_POST['user_type']),

                'name_err' => '',
                'email_err' => '',
                'password_err' => '',
                'confirm_password_err' => '',
                'user_type_err' => ''
            ];

            // validate each inputs

            // Validate name
            if (empty($data['name'])) {
                $data['name_err'] = 'Please enter a name';
            }

            // Validate email
            if (empty($data['email'])) {
                $data['email_err'] = 'Please enter a email';
            } else {
                // check email is already registered or not
                if ($this->userModel->findUserByEmail($data['email'])) {
                    $data['email_err'] = 'Email is already registered';
                }
            }

            if (empty($data['user_type'])) {
                $data['user_type_err'] = 'Please select a user type';
            } elseif (!in_array($data['user_type'], ['admin', 'property_manager', 'tenant', 'landlord'])) {
                $data['user_type_err'] = 'Please select a valid user type';
            }

            // Validate password
            if (empty($data['password'])) {
                $data['password_err'] = 'Please enter a password';
            } elseif (empty($data['confirm_password'])) {
                $data['confirm_password_err'] = 'Please confirm the password';
            } else {
                if ($data['password'] != $data['confirm_password']) {
                    $data['confirm_password_err'] = 'Passwords are not matching';
                }
            }

            if (empty($data['name_err']) && empty($data['email_err']) && empty($data['password_err']) && empty($data['confirm_password_err']) && empty($data['user_type_err'])) {
                // Hash password - Using strong one way hashing algorithm
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

                // Register user
                if ($this->userModel->register($data)) {
                    // Create a flash message
                    // SET the message in session for later use
                    flash('reg_flash', 'You are successfully registered!');

                    redirect('Users/login');
                } else {
                    die('Something went wrong');
                }
            } else {
                //Load view
                $this->view('users/v_register', $data);
            }
        } else {
            // Initial form
            $data = [
                'name' => '',
                'email' => '',
                'password' => '',
                'confirm_password' => '',
                'user_type' => '',

                'name_err' => '',
                'email_err' => '',
                'password_err' => '',
                'confirm_password_err' => '',
                'user_type_err' => ''
            ];

            //Load view
            $this->view('users/v_register', $data);
        }
    }


    // User login
    public function login()
    {
        // Check for POST
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Process form

            // Sanitize POST data
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_FULL_SPECIAL_CHARS); // ISSUE IN FILTER_SANITIZE_STRING

            // Init data
            $data = [
                'email' => trim($_POST['email']),
                'password' => trim($_POST['password']),

                'email_err' => '',
                'password_err' => '',
            ];

            // Validate email
            if (empty($data['email'])) {
                $data['email_err'] = 'Please enter email';
            }
            // Check for user email
            else {
                if ($this->userModel->findUserByEmail($data['email'])) {
                    // User is found
                } else {
                    //User not found
                    $data['email_err'] = 'User not found';
                }
            }

            // Validate the password
            if (empty($data['password'])) {
                $data['password_err'] = 'Please enter password';
            }

            // If no error found then login the user
            if (empty($data['email_err']) && empty($data['password_err'])) {

                // Authenticate user credentials and get user data if valid
                $loggedUser = $this->userModel->login($data['email'], $data['password']);

                if ($loggedUser) {
                    // Create user session
                    $this->createUserSession($loggedUser);

                    $this->redirectBasedOnUserType($loggedUser->user_type);
                } else {
                    $data['password_err'] = 'Password incorrect';

                    // Load view with errors
                    $this->view('users/v_login', $data);
                }
            } else {
                // Load view with errors
                $this->view('users/v_login', $data);
            }
        } else {
            // Init data
            $data = [
                'email' => '',
                'password' => '',

                'email_err' => '',
                'password_err' => '',
            ];
        }
        // Load view
        $this->view('users/v_login', $data);
    }

    private function redirectBasedOnUserType($userType)
    {
        switch ($userType) {
            case 'admin':
                redirect('admin/dashboard');
                break;
            case 'property_manager':
                redirect('manager/dashboard');
                break;
            case 'tenant':
                redirect('tenant/dashboard');
                break;
            case 'landlord':
                redirect('landlord/dashboard');
                break;
            default:
                redirect('pages/index');
                break;
        }
    }

    // Store user data in session to keep them logged in across pages
    public function createUserSession($user)
    {
        // After successful login, store user info in session (Taken from database)
        $_SESSION['user_id'] = $user->id;
        $_SESSION['user_email'] = $user->email;
        $_SESSION['user_name'] = $user->name;
        $_SESSION['user_type'] = $user->user_type;

    }

    // Clear user session data and log them out
    public function logout()
    {
        // Clear all memory of this user
        unset($_SESSION['user_id']);
        unset($_SESSION['user_email']);
        unset($_SESSION['user_name']);
        unset($_SESSION['user_type']);

        session_destroy();

        redirect('Users/login');
    }

    // Check if user is currently logged in by verifying session exists
    public function isLoggedIn()
    {
        if (isset($_SESSION['user_id'])) {
            return true;
        } else {
            return false;
        }
    }
}
