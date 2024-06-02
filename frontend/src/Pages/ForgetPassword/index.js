import React from 'react';
import './index.css'; // Import your CSS file

function ResetPasswordForm() {
  return (
    <div className="wrapper">
      <form>
        <h1>Reset Password</h1>

        <div className="input-box">
          <input type="text" placeholder="username" name="username" required />
          <i className='bx bxs-user'></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" name="password" required />
          <i className='bx bxs-lock-alt'></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder="New Password" name="newPassword" required />
          <i className='bx bxs-lock-alt'></i>
        </div>

        <button type="submit" className="btn">Reset</button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
