import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/email-template';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name = '',
      email = '',
      subject = 'Informatii',
      message = '',
      danceclass = '',
      phone = '',
      honey = '',
      'cf-turnstile-response': token,
    } = body;

    // Verifică honeypot
    if (honey) {
      return NextResponse.json({ error: 'Spam detectat' }, { status: 400 });
    }

    // Verifică dacă token-ul Turnstile există
    if (!token) {
      return NextResponse.json(
        { error: 'Token Turnstile lipsă' },
        { status: 400 }
      );
    }

    // Validare token Turnstile
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: 'Validare Turnstile eșuată' },
        { status: 400 }
      );
    }

    // Trimite emailul folosind Resend
    const { data, error } = await resend.emails.send({
      from: 'InscriereWebsite by Leo <onboarding@resend.dev>',
      to: ['lioneh39@gmail.com'],
      subject,
      react: EmailTemplate({
        name,
        email,
        message,
        danceclass,
        phone,
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Eroare la trimiterea emailului:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Eroare:', error);
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}