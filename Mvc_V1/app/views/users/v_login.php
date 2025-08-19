<?php require APPROOT . '/views/inc/header.php'; ?>

<!-- TOP NAVIGATION -->
<?php require APPROOT . '/views/inc/components/topnavbar.php'; ?>

<h1> User Login</h1>

<!-- REGISTER FORM -->
<div class="form-container">
    <div class="form-header">
        <center>
            <h1>User Login</h1>
        </center>
        <br>
        <p>
            <b>Please fill the correct credentials to login.</b>
        </p>
    </div>

    <form action="" method="POST">
        <!-- email -->
        <div class="form-input-title">Email</div>
        <input type="text" name="email" id="email" class="email" value="<?php echo $data['email']; ?>">
        <span class="form-invalid"> <?php echo $data['email_err']; ?> </span>

        <!-- password -->
        <div class="form-input-title">Password</div>
        <input type="text" name="password" id="password" class="password" value="<?php echo $data['password'] ?>">
        <span class="form-invalid"> <?php echo $data['password_err']; ?> </span>

        <br>
        <input type="submit" value="Login" class="form-btn">
    </form>

    <!-- DISPLAY and DELETE the message -->
    <?php flash('reg_flash'); ?>

</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>
