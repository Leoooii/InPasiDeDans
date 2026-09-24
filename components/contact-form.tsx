'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTrimitereFormular } from '@/hooks/use-trimitere-formular';
import Link from 'next/link';

// Tipizări explicite pentru evenimente
interface FormData {
  name: string;
  email: string;
  message: string;
  danceclass: string;
  phone: string;
  honey: string;
  consent: boolean;
}

const GOL: FormData = {
  name: '',
  email: '',
  message: '',
  danceclass: '',
  phone: '',
  honey: '',
  consent: false,
};

const ContactForm = () => {
  const { formData, handleChange, handleSubmit, isSubmitting, isSent, setIsSent } =
    useTrimitereFormular(GOL, () => ({ sursa: 'contact', tip: 'mesaj' }));

  return (
    <Card>
      <CardContent className="p-6 border-orange-600 border-2 rounded-md">
        {!isSent ? (
          <>
            <div className="text-xl font-bold mb-4">Trimite-ne un mesaj</div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Honeypot field – invizibil */}
              <div className="hidden">
                <Label htmlFor="honey">Nu completa acest câmp</Label>
                <Input
                  id="honey"
                  name="honey"
                  type="text"
                  value={formData.honey}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Nume</Label>
                <Input
                  id="name"
                  placeholder="Numele tău complet"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplu.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Numărul tău de telefon"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="danceclass">Clasă de dans</Label>
                <Input
                  id="danceclass"
                  placeholder="Clasa de dans dorită"
                  value={formData.danceclass}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Mesaj</Label>
                <Textarea
                  id="message"
                  placeholder="Scrie mesajul tău aici..."
                  className="min-h-[150px]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Checkbox pentru consimțământ */}
              <div className="grid gap-2">
                <label className="flex items-center">
                  <Input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 accent-red-600 focus:ring-red-500 border-slate-300 rounded"
                  />
                  <span className="ml-2 text-sm text-slate-700">
                    Am citit și sunt de acord cu{' '}
                    <Link
                      href="/privacy-policy"
                      className="text-red-600 underline"
                    >
                      Politica de Confidențialitate
                    </Link>{' '}
                    și cu procesarea datelor mele personale pentru înscrierea la
                    grupe.
                  </span>
                </label>
              </div>

              <Button variant="brand"
                type="submit"
                className="w-full"
                disabled={isSubmitting}>
                {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
              </Button>
            </form>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6 pb-6 text-center">
              <div className="mb-4 flex justify-center">
                <video
                  src="/images/Rick.mp4"
                  width={300}
                  className="w-full max-w-[300px] h-auto"
                  height={200}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Școala de dans"
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div className="mb-4 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-600">
                Formular trimis cu succes!
              </h3>
              <p className="text-slate-500 mb-4">
                Îți mulțumim pentru interesul arătat. Te vom contacta în cel mai
                scurt timp posibil pentru a confirma înscrierea.
              </p>
              <Button variant="brand"
                onClick={() => setIsSent(false)}>
                Completează un nou formular
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;
