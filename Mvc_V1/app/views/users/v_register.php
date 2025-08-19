<?php require APPROOT . '/views/inc/header.php'; ?>

<!-- TOP NAVIGATION -->
<?php require APPROOT . '/views/inc/components/topnavbar.php'; ?>

<h1> User sign up</h1>

<!-- REGISTER FORM -->
<div class="form-container">
    <div class="form-header">
        <center>
            <h1>User sign up</h1>
        </center>
        <br>
        <p>
            <b>Please fill the form to register.</b>
        </p>
    </div>

    <form action="<?php echo URLROOT ?>/users/register" method="POST">

        <!-- profile image -->
        <div class="form-drag-area">
            <div class="icon">
                <img src="<?php echo URLROOT; ?>/img/components/imageUpload/placeholder-icon.png" alt="placeholder" width="90px" height="90px" id="profile-preview">
            </div>

            <div class="right-content">
                <div class="description">Drag & Drop to Upload File</div>
                <div class="form-upload">
                    <input type="file" name="profile_image" id="profile_image" style="display:none">
                    Browse File
                </div>
            </div>
        </div>

        <div class=" form-validation">
            <div class="profile-image-validation">
                <img src="<?php echo URLROOT; ?>/img/components/imageUpload/green-tick-icon.png" alt="green-tick" width="15px" height="15px">
                Select a Profile picture
            </div>
        </div>

        <!-- name -->
        <div class="form-input-title">Name</div>
        <input type="text" name="name" id="name" class="name" value="<?php echo $data['name']; ?>">
        <span class="form-invalid"><?php echo $data['name_err']; ?></span>

        <!-- email -->
        <div class="form-input-title">Email</div>
        <input type="text" name="email" id="email" class="email" value="<?php echo $data['email']; ?>">
        <span class="form-invalid"><?php echo $data['email_err']; ?></span>

        <!-- Added user type selection dropdown -->
        <div class="form-input-title">User Type</div>
        <select name="user_type" id="user_type" class="user_type" required>
            <option value="">Select User Type</option>
            <option value="tenant" <?php echo ($data['user_type'] == 'tenant') ? 'selected' : ''; ?>>Tenant</option>
            <option value="landlord" <?php echo ($data['user_type'] == 'landlord') ? 'selected' : ''; ?>>Landlord</option>
            <option value="property_manager" <?php echo ($data['user_type'] == 'property_manager') ? 'selected' : ''; ?>>Property Manager</option>
            <option value="admin" <?php echo ($data['user_type'] == 'admin') ? 'selected' : ''; ?>>Admin</option>
        </select>
        <span class="form-invalid"><?php echo $data['user_type_err']; ?></span>

        <!-- password -->
        <div class="form-input-title">Password</div>
        <input type="password" name="password" id="password" class="password" value="<?php echo $data['password']; ?>">
        <span class="form-invalid"><?php echo $data['password_err']; ?></span>

        <!-- confirm password -->
        <div class="form-input-title">Confirm password</div>
        <input type="password" name="confirm_password" id="confirm_password" class="confirm_password" value="<?php echo $data['confirm_password']; ?>">
        <span class="form-invalid"><?php echo $data['confirm_password_err']; ?></span>

        <br>
        <input type="submit" value="Register" class="form-btn">
    </form>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>
