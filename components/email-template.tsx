import * as React from 'react';

interface EmailTemplateProps {
  name?: '';
  email?: '';
  message?: '';
  danceclass?: '';
  phone?: '';
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
  danceclass,
  phone,
}) => (
  <div className="bg-orange-600 text-white p-4">
    <h1 className="text-2xl font-bold">Inscriere</h1>
    <h1>Nume: {name}</h1>
    {phone && <h2>Telefon: {phone}</h2>}
    {email && <h2>Email: {email}</h2>}
    {danceclass && <h2>Clasa de dans: {danceclass}</h2>}
    {message && <h2>Mesaj: {message}</h2>}
  </div>
);

export default EmailTemplate;
