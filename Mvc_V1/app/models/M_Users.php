<?php
class M_Users
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    // Register the user
    public function register($data)
    {
        $this->db->query('INSERT INTO Users(name, email, password, user_type) VALUES (:name, :email, :password, :user_type)');
        $this->db->bind(':name', $data['name']);
        $this->db->bind(':email', $data['email']);
        $this->db->bind(':password', $data['password']);
        $this->db->bind(':user_type', $data['user_type']);

        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // Find the user
    public function findUserByEmail($email)
    {
        $this->db->query('SELECT * FROM Users WHERE email = :email');
        // The :email is a placeholder - like a blank to fill in later

        $this->db->bind(':email', $email);
        // Safely bind email parameter to prevent SQL injection

        $row = $this->db->single();

        if ($this->db->rowcount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    // Login the user
    public function login($email, $password)
    {
        $this->db->query('SELECT * FROM Users WHERE email = :email');
        $this->db->bind(':email', $email);

        $row = $this->db->single();

        $hashed_password = $row->password;

        //Check if password matches the hashed version
        if (password_verify($password, $hashed_password)) {
            return $row; // Return user data if login successful
        } else {
            return false; // Login failed
        }
    }
}
