import * as React from 'react';

interface EmailTemplateProps {
  text: string;
}

export const ForgotPasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  text,
}) => (
  <div>
    <h1>{text}</h1>
  </div>
);
