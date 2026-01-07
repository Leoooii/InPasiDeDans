import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/email-template';
import * as React from 'react';
import { rateLimitMiddleware } from '../../../lib/rateLimiter';
import { z } from 'zod';

// Schema de validare pentru datele de intrare
const FormSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere').max(100),
  email: z.string().email('Adresa de e-mail invalidă').max(255),
  // subject: z.string().min(1, 'Subiectul este obligatoriu').max(200).default('Informatii'),
  message: z.string().max(5000, 'Mesajul este prea lung').optional().default(''),
  danceclass: z.string().max(200).optional().default(''),
  instructor: z.string().max(200).optional().default(''),
  phone: z.string().max(20).optional().default(''),
  honey: z.string().optional().default(''),
  // 'cf-turnstile-response': z.string().min(1, 'Token Turnstile lipsă'),
  consent: z
    .boolean({ required_error: 'Consimțământul este obligatoriu' })
    .refine(val => val === true, { message: 'Trebuie să acceptați Politica de Confidențialitate' }),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // Obține IP-ul clientului la nivelul funcției pentru a fi accesibil în catch
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  try {
    
    // Verifică cheile de mediu
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY lipsește');
      return NextResponse.json({ error: 'Configurație server invalidă' }, { status: 500 });
    }
    if (!process.env.TURNSTILE_SECRET_KEY) {
      console.error('TURNSTILE_SECRET_KEY lipsește');
      return NextResponse.json({ error: 'Configurație server invalidă' }, { status: 500 });
    }

    await rateLimitMiddleware(ip);

    // Validează originea cererii
    const origin = request.headers.get('origin');
    // console.log('Cerere primită:', { origin, url: request.url, method: request.method });
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3001',
      'https://in-pasi-de-dans.vercel.app',
      'https://www.inpasidedans.ro/',
       'https://www.inpasidedans.ro'
    ];
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Origine neautorizată' }, { status: 403 });
    }

    const body = await request.json();

    // Validează datele de intrare
    const validatedData = FormSchema.safeParse(body);
    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors;
      console.warn('Validare eșuată:', { errors });
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const {
      name,
      email,
     
      message,
      danceclass,
      instructor,
      phone,
      honey,
      // 'cf-turnstile-response': token,
      consent,
    } = validatedData.data;

    // Verifică honeypot
    if (honey) {
      console.warn('Spam detectat prin honeypot', { ip: ip });
      return NextResponse.json({ error: 'Spam detectat' }, { status: 400 });
    }

    // Validare token Turnstile
    // const turnstileResponse = await fetch(
    //   'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       secret: process.env.TURNSTILE_SECRET_KEY,
    //       response: token,
    //     }),
    //   }
    // );

    // const turnstileResult = await turnstileResponse.json();

    // if (!turnstileResult.success) {
    //   console.warn('Validare Turnstile eșuată', { ip: ip, token });
    //   return NextResponse.json({ error: 'Validare Turnstile eșuată' }, { status: 400 });
    // }

    // Documentează consimțământul (ex. salvează în baza de date)
    const consentRecord = {
      email,
      ip: ip.split(',')[0], // Ia primul IP din x-forwarded-for
      timestamp: new Date().toISOString(),
      consentGiven: consent,
    };
    // TODO: Salvează consentRecord într-o bază de date securizată
    // console.log('Consimțământ înregistrat:', consentRecord);

    // Trimite emailul folosind Resend
    const { data, error } = await resend.emails.send({
      from: `${name} <inscriere@inpasidedans.ro>`, // Folosește domeniul tău
      to: ['inpasidedans@gmail.com'],
      subject: 'Inscriere pe site',
      replyTo: email,
      react: EmailTemplate({
        name,
        email,
        message,
        danceclass,
        instructor,
        phone,
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Eroare la trimiterea emailului:', { error });
      return NextResponse.json({ error: 'Eroare la trimiterea emailului' }, { status: 500 });
    }

    console.log('Email trimis cu succes:', { email, ip: ip });
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Eroare in procesarea cererii:', error.message, { ip: ip });
    if (error.message === 'Too many requests') {
      return NextResponse.json(
        { error: 'Prea multe cereri. Încearcă din nou mai târziu.' },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}