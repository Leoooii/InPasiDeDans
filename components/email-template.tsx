import * as React from 'react';

interface EmailTemplateProps {
  name: '';
  email: '';
  subject: '';
  message: '';
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div>
    <h1>
      Buna! Numele meu este{name}, cu emailul {email}
    </h1>
    <h2>{message}</h2>

    {/* <h2>{subject}</h2> */}
  </div>
);

export default EmailTemplate;
