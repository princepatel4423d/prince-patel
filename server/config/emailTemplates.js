export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f2f4f7;
      font-family: "Open Sans", sans-serif;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 520px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #4C83EE, #6BA8FF);
      padding: 24px;
      text-align: center;
      color: white;
      font-size: 20px;
      font-weight: 700;
    }

    .main {
      padding: 32px 30px;
      color: #333333;
      font-size: 14px;
      line-height: 1.6;
    }

    .otp-box {
      margin: 20px 0;
      padding: 14px 0;
      text-align: center;
      background: #4C83EE;
      color: white;
      font-size: 22px;
      letter-spacing: 4px;
      border-radius: 8px;
      font-weight: 700;
    }

    .footer {
      padding: 18px 30px;
      text-align: center;
      font-size: 12px;
      color: #777;
      background: #fafafa;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
      }
      .otp-box {
        font-size: 20px !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" bgcolor="#f2f4f7" align="center">
    <tr>
      <td align="center">
        
        <table class="container">

          <!-- Header -->
          <tr>
            <td class="header">
              Password Reset Request
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="main">

              <p style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">
                Forgot your password?
              </p>

              <p>
                We received a password reset request for your account:
                <span style="color: #4C83EE; font-weight: 600;">{{email}}</span>.
              </p>

              <p style="font-weight: 700; margin-top: 20px;">
                Use the OTP below to reset your password:
              </p>

              <div class="otp-box">{{otp}}</div>

              <p style="margin-top: 10px;">
                The password reset OTP is only valid for the next <strong>2 minutes</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              If you didn’t request this, you can safely ignore this email.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>

</html>

`