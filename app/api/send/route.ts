import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY || "demo-api-key");

export async function POST(request:any) {
  try {
    // Citește datele din cerere (firstName și subject)
    const body = await request.json();
    const { name= '',
      email= '',
      subject= 'Doresc informatii despre serviciile voastre',
      message='' } = body; // Fallback pentru subject
     
    const { data, error } = await resend.emails.send({
      from: 'InscriereWebsite by Leo <onboarding@resend.dev>',
      to: ['lioneh39@gmail.com'],
      subject, // Folosim subiectul dinamic
      react: EmailTemplate({ name,email,subject,message }) as React.ReactElement,
    });

    if (error) {
      console.error('Eroare la trimiterea emailului:', error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}