/**
 * @description Email Template for Verify Account
 * @param {string} fullName Name of the User
 * @param {string} url Frontend Application Url wit Token
 * @param {string} reactAppUrl Frontend Application Url
 * @returns {string} HTML Email
 */
const verifyAccountTemplate = ({ fullName, url, reactAppUrl }) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html style="box-sizing: border-box; --acccentp: #5299d3ff; --accents: #9381ffff; margin: 0; padding: 0;">
  <head>
    <!-- Compiled with Bootstrap Email version: 1.1.2 --><meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
      *::after {
      margin: 0; padding: 0; box-sizing: border-box;
      }
      *::before {
      margin: 0; padding: 0; box-sizing: border-box;
      }
      @media (max-width: 440px) {
        :root {
          font-size: 14px;
        }
      }
    </style>          <style type="text/css">
      body,table,td{font-family:Helvetica,Arial,sans-serif !important}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:150%}a{text-decoration:none}*{color:inherit}a[x-apple-data-detectors],u+#body a,#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}img{-ms-interpolation-mode:bicubic}table:not([class^=s-]){font-family:Helvetica,Arial,sans-serif;mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-collapse:collapse}table:not([class^=s-]) td{border-spacing:0px;border-collapse:collapse}@media screen and (max-width: 600px){.w-full,.w-full>tbody>tr>td{width:100% !important}*[class*=s-lg-]>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-5>tbody>tr>td{font-size:20px !important;line-height:20px !important;height:20px !important}}
    </style>
  </head>
  <body class="bg-light" style="outline: 0; width: 100%; min-width: 100%; height: 100vh; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Garamond, serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; background: #80808030; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
    <table class="bg-light body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
      <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
        <tr style="box-sizing: border-box; margin: 0; padding: 0;">
          <td valign="top" style="line-height: 24px; font-size: 16px; box-sizing: border-box; margin: 0; padding: 0;" align="left" bgcolor="#f7fafc">
            <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: clamp(200px, 80%, 600px); box-sizing: border-box; margin: 1em auto; padding: 1em;">
              <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                  <td align="center" style="line-height: 24px; font-size: 16px; box-sizing: border-box; margin: 0; padding: 0 16px;">
                    <!--[if (gte mso 9)|(IE)]>
                      <table align="center" role="presentation">
                        <tbody>
                          <tr>
                            <td width="600">
                    <![endif]-->
                    <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; box-sizing: border-box; margin: 0 auto; padding: 0;">
                      <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                        <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                          <td style="line-height: 24px; font-size: 16px; box-sizing: border-box; margin: 0; padding: 0;" align="left">
                            <div class="box" style="box-sizing: border-box; background-color: #ffffff; border-radius: 12px; margin: 0; padding: 2em 1em;">
                              <img src="https://sundar-clinic.herokuapp.com/assets/logo/logoSmall.png" alt="Sundar Clinic Logo" class="logoSvg" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; box-sizing: border-box; width: clamp(120px, 100%, 200px); margin: 1em auto; padding: 0; border-style: none; border-width: 0;">
                              <header class="text-center" style="text-align: center !important; box-sizing: border-box; margin: 0; padding: 0;">
                                <h1 class="text-center" style="font-weight: 500; vertical-align: baseline; font-size: 36px; line-height: 43.2px; box-sizing: border-box; margin: 0; padding: 0;" align="center">Verify You Account</h1>
                                <p class="text-center" style="line-height: 24px; font-size: 16px; width: 100%; box-sizing: border-box; margin: 0; padding: 0;" align="center">Hey ${fullName}!</p>
                                <p class="text-center" style="line-height: 24px; font-size: 16px; width: 100%; box-sizing: border-box; margin: 0; padding: 0;" align="center">Your request to verify your email was noted or either you have to verify your new email!</p>
                                <p class="text-center" style="line-height: 24px; font-size: 16px; width: 100%; box-sizing: border-box; margin: 0; padding: 0;" align="center">Please confirm your email to verify your account.</p>
                              </header>
                              <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; box-sizing: border-box; margin: 0; padding: 0;" width="100%">
                                <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                                  <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                                    <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; box-sizing: border-box; margin: 0; padding: 0;" align="left" width="100%" height="20">
                                      &#160;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; box-sizing: border-box; margin: 0; padding: 0;">
                                <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                                  <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                                    <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; box-sizing: border-box; margin: 0; padding: 0;" align="left">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; box-sizing: border-box; margin: 0; padding: 0;" width="100%">
                                <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                                  <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                                    <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; box-sizing: border-box; margin: 0; padding: 0;" align="left" width="100%" height="20">
                                      &#160;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p style="line-height: 24px; font-size: 16px; width: 100%; box-sizing: border-box; margin: 0; padding: 0;" align="left">Confirm you account by clicking the button below:</p>
                              <a href="${url}" class="button" style="color: #fff; box-sizing: border-box; text-decoration: none; width: clamp(80px, 100%, 220px); text-align: center; background: #5299d3ff; border-radius: 4px; font-weight: bold; font-size: 1rem; display: block; margin: 1em auto; padding: 1em;">Verify Account</a>
                              <p style="line-height: 24px; font-size: 16px; width: 100%; box-sizing: border-box; margin: 0; padding: 0;" align="left">Alternatively click or copy and paste this link in your browser:</p>
                              <a href="${url}" style="color: #04f; box-sizing: border-box; text-decoration: none; margin: 0; padding: 0;">${url}</a>
                              <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; box-sizing: border-box; margin: 0; padding: 0;" width="100%">
                                <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                                  <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                                    <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; box-sizing: border-box; margin: 0; padding: 0;" align="left" width="100%" height="20">
                                      &#160;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; box-sizing: border-box; margin: 0; padding: 0;">
                                <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                                  <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                                    <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; box-sizing: border-box; margin: 0; padding: 0;" align="left">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; box-sizing: border-box; margin: 0; padding: 0;" width="100%">
                                <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                                  <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                                    <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; box-sizing: border-box; margin: 0; padding: 0;" align="left" width="100%" height="20">
                                      &#160;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p class="text-center" style="line-height: 24px; font-size: 16px; width: 100%; box-sizing: border-box; margin: 0; padding: 0;" align="center">
                                Your healthcare partners at Sundar Clinic.
                                <span class="text-red" style="box-sizing: border-box; color: #f00; margin: 0; padding: 0;">&#10084;</span>
                              </p>
                            </div>
                            <footer class="text-center text-xs" style="font-size: 12px; line-height: 14.4px; text-align: center !important; box-sizing: border-box; margin: 0; padding: 1em;">
                              <p class="address text-center text-xs" style="line-height: 14.4px; font-size: 12px; width: 100%; box-sizing: border-box; margin: 0.5em auto; padding: 0;" align="center">
                                &#169; Sundar Clinic, 1195A, Nehru Street, Bangalore-Chennai Highway,
                                Pappanchatiram, Chennai - 600123.
                              </p>
                              <table class="ax-center" role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="box-sizing: border-box; margin: 0 auto; padding: 0;">
                                <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                                  <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                                    <td style="line-height: 24px; font-size: 16px; box-sizing: border-box; margin: 0; padding: 0;" align="left">
                                      <nav class="" style="box-sizing: border-box; width: clamp(200px, 100%, 320px); margin: 0; padding: 0;">
                                        <ul style="box-sizing: border-box; list-style-type: none; display: flex; align-items: center; justify-content: center; margin: 0; padding: 0;">
                                          <li style="box-sizing: border-box; margin: 1em; padding: 0;">
                                            <a href="${reactAppUrl}/termsOfService" class="text-xs" style="color: #04f; font-size: 12px; line-height: 14.4px; box-sizing: border-box; text-decoration: none; margin: 0; padding: 0;">Terms of Service</a>
                                          </li>
                                          <li style="box-sizing: border-box; margin: 1em; padding: 0;"><a href="${reactAppUrl}/privacyPolicy" class="text-xs" style="color: #04f; font-size: 12px; line-height: 14.4px; box-sizing: border-box; text-decoration: none; margin: 0; padding: 0;">Privacy Policy</a></li>
                                          <li style="box-sizing: border-box; margin: 1em; padding: 0;"><a href="${reactAppUrl}/contact" class="text-xs" style="color: #04f; font-size: 12px; line-height: 14.4px; box-sizing: border-box; text-decoration: none; margin: 0; padding: 0;">Contact</a></li>
                                        </ul>
                                      </nav>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="ax-center" role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="box-sizing: border-box; margin: 0 auto; padding: 0;">
                                <tbody style="box-sizing: border-box; margin: 0; padding: 0;">
                                  <tr style="box-sizing: border-box; margin: 0; padding: 0;">
                                    <td style="line-height: 24px; font-size: 16px; box-sizing: border-box; margin: 0; padding: 0;" align="left">
                                      <ul class="socials" style="box-sizing: border-box; list-style-type: none; display: flex; align-items: center; justify-content: center; margin: 0; padding: 0;">
                                        <li style="box-sizing: border-box; margin: 0; padding: 0;">
                                          <a href="https://www.instagram.com/sundarclinic/" style="color: #04f; box-sizing: border-box; text-decoration: none; margin: 0; padding: 0;"><img src="https://sundar-clinic.herokuapp.com/icons/instagram.png" alt="Instagram Icon" style="height: 20px; line-height: 100%; outline: none; text-decoration: none; display: block; box-sizing: border-box; width: 20px; margin: 1em; padding: 0; border-style: none; border-width: 0;"></a>
                                        </li>
                                        <li style="box-sizing: border-box; margin: 0; padding: 0;">
                                          <a href="https://api.whatsapp.com/send?phone=8939881708&amp;text=Hello%20there!%20" style="color: #04f; box-sizing: border-box; text-decoration: none; margin: 0; padding: 0;"><img src="https://sundar-clinic.herokuapp.com/icons/whatsapp.png" alt="Whatsapp Icon" style="height: 20px; line-height: 100%; outline: none; text-decoration: none; display: block; box-sizing: border-box; width: 20px; margin: 1em; padding: 0; border-style: none; border-width: 0;"></a>
                                        </li>
                                        <li style="box-sizing: border-box; margin: 0; padding: 0;">
                                          <a href="mailto:sundarclinic@gmail.com" style="color: #04f; box-sizing: border-box; text-decoration: none; margin: 0; padding: 0;"><img src="https://sundar-clinic.herokuapp.com/icons/gmail.png" alt="Gmail Icon" style="height: 20px; line-height: 100%; outline: none; text-decoration: none; display: block; box-sizing: border-box; width: 20px; margin: 1em; padding: 0; border-style: none; border-width: 0;"></a>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </footer>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </tbody>
              </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

    `;
};

module.exports = verifyAccountTemplate;