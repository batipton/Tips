import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  link: string;
}

export const ForgotPasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  link,
}) => (
  <div>
    <h1>Hello, {name}!</h1>
    <p>
      We received a request to reset your password. You can reset it by clicking the link below:
    </p>
    <a href={link} style={{ color: '#007bff', textDecoration: 'none' }}>
      Reset Password
    </a>
    <p>
      If you didn’t request this, you can safely ignore this email.
    </p>
    <p>
      Thanks,<br />
      The Team
    </p>
  </div>
);


