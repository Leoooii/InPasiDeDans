'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTrimitereFormular } from '@/hooks/use-trimitere-formular';
import Link from 'next/link';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import { cn } from '@/lib/utils';
import { usePublicData } from '@/components/public-data-provider';

interface FormData {
  danceclass: string;
  instructor: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  honey: string;
  consent: boolean;
}

const GOL: FormData = {
  danceclass: '',
  instructor: '',
  name: '',
  email: '',
  phone: '',
  message: '',
  honey: '',
  consent: false,
};

const LISTA_ASTEPTARE = 'Listă de așteptare – anunțați-mă când se deschide o grupă nouă';

type GrupaOption = {
  id: string;
  label: string;
  value: string;
  instructor?: string;
};

export default function InscriereForm() {
  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Înscriere' },
  ];

  const { grupe } = usePublicData();
  const grupeOptions: GrupaOption[] = useMemo(
    () =>
      (grupe ?? []).map(g => ({
        id: g.id,
        value: g.titlu || 'Grupă în formare',
        label: g.titlu || 'Grupă în formare',
        instructor: g.instructor,
      })),
    [grupe]
  );
  const isGrupeLoading = false;
  const searchParams = useSearchParams();
  const preselectedGrupaId = searchParams.get('grupa');

  const defaultOptions: GrupaOption[] = [
    {
      id: 'dans-adulti-latino-societate',
      value: 'dans-adulti-latino-societate',
      label: 'Cursuri dans adulți latino și societate',
    },
    {
      id: 'dansuri-adulti-populare',
      value: 'dansuri-adulti-populare',
      label: 'Cursuri dans adulți populare',
    },
    {
      id: 'dans-copii',
      value: 'dans-copii',
      label: 'Cursuri dans copii',
    },
    {
      id: 'dans-privat',
      value: 'dans-privat',
      label: 'Lecții private',
    },
  ];

  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    isSubmitting,
    isSent: isSubmitted,
    setIsSent: setIsSubmitted,
  } = useTrimitereFormular(GOL, () => ({ sursa: 'inscriere', ...tipSelectie() }));

  useEffect(() => {
    if (!preselectedGrupaId || !grupeOptions.length) return;
    const matchedOption = grupeOptions.find(option => option.id === preselectedGrupaId);
    if (matchedOption) {
      setFormData(prev => ({
        ...prev,
        danceclass: matchedOption.value,
        instructor: matchedOption.instructor || '',
      }));
    }
  }, [preselectedGrupaId, grupeOptions]);

  const isFieldComplete = (field: keyof FormData) => {
    const value = formData[field];
    if (typeof value === 'boolean') {
      return value;
    }
    return Boolean(value && String(value).trim().length > 0);
  };

  const requiredFields: (keyof FormData)[] = ['danceclass', 'name', 'email', 'phone', 'consent'];
  const isFormValid = requiredFields.every(isFieldComplete);

  const renderCompletionIcon = (field: keyof FormData) => {
    if (!isFieldComplete(field)) return null;
    return (
      <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
    );
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'danceclass') {
      const matchedOption = grupeOptions.find(option => option.value === value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        instructor: matchedOption?.instructor || '',
      }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const tipSelectie = (): { tip: string; grupaId: string } => {
    if (formData.danceclass === LISTA_ASTEPTARE) {
      return { tip: 'lista-asteptare', grupaId: '' };
    }
    const grupa = grupeOptions.find(option => option.value === formData.danceclass);
    return grupa ? { tip: 'grupa', grupaId: grupa.id } : { tip: 'curs', grupaId: '' };
  };

  return (
    <div className="container py-12">
      <SEOBreadcrumbs
        items={breadcrumbItems}
        currentPageUrl="https://www.inpasidedans.ro/inscriere"
      />
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Formular de înscriere</h1>
          <p className="text-slate-500 ">
            Completează formularul de mai jos pentru a te înscrie la cursurile noastre de dans
          </p>
        </div>

        {isSubmitted ? (
          <Card className="border-green-500">
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
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 text-green-600">Formular trimis cu succes!</h2>
              <p className="text-slate-500 mb-4">
                Îți mulțumim pentru interesul arătat. Te vom contacta în cel mai scurt timp posibil
                pentru a confirma înscrierea.
              </p>
              <Button variant="brand"
                onClick={() => setIsSubmitted(false)}>
                Completează un nou formular
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-red-500 border-2">
            <CardHeader>
              <CardTitle>Informații înscriere</CardTitle>
              <CardDescription>Completează toate câmpurile obligatorii marcate cu *</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="danceclass">Ce curs te interesează? *</Label>
                    <div className="relative">
                      <Select
                        required
                        value={formData.danceclass}
                        onValueChange={value => handleSelectChange('danceclass', value)}
                      >
                        <SelectTrigger
                          id="danceclass"
                          className={cn(
                            'mt-1.5',
                            isFieldComplete('danceclass') && 'border-green-500 ring-1 ring-green-400 pr-8'
                          )}
                        >
                          <SelectValue
                            placeholder={isGrupeLoading ? 'Se încarcă grupele...' : 'Alege un curs'}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={LISTA_ASTEPTARE}>{LISTA_ASTEPTARE}</SelectItem>
                          <SelectItem value="cursuri-divider" disabled>
                            — Cursuri —
                          </SelectItem>
                          {defaultOptions.map(option => (
                            <SelectItem key={option.id} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                          {grupeOptions.length > 0 && (
                            <>
                              <SelectItem value="grupe-divider" disabled>
                                — Grupe în formare —
                              </SelectItem>
                              {grupeOptions.map(option => (
                                <SelectItem key={option.id} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      {renderCompletionIcon('danceclass')}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name">Spune-ne numele tău complet *</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nume complet"
                        required
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('name') && 'border-green-500 ring-1 ring-green-400'
                        )}
                      />
                      {renderCompletionIcon('name')}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Pe ce adresă vrei să îți răspundem? *</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Adresa ta de e-mail"
                        required
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('email') && 'border-green-500 ring-1 ring-green-400'
                        )}
                      />
                      {renderCompletionIcon('email')}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">La ce număr de telefon te putem suna? *</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Numărul tău de telefon"
                        required
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('phone') && 'border-green-500 ring-1 ring-green-400'
                        )}
                      />
                      {renderCompletionIcon('phone')}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Vrei să ne dai mai multe detalii?</Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Scrie mesajul tău aici..."
                        className={cn(
                          'mt-1.5 min-h-[120px] pr-10',
                          isFieldComplete('message') && 'border-green-500 ring-1 ring-green-400'
                        )}
                      />
                      {renderCompletionIcon('message')}
                    </div>
                  </div>

                  <div>
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
                        <Link href="/privacy-policy" className="text-red-600 underline">
                          Politica de Confidențialitate
                        </Link>{' '}
                        și cu procesarea datelor mele personale pentru înscrierea la grupe.
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  variant="brand"
                  className={cn(
                    'w-full',
                    (!isFormValid || isSubmitting) && 'opacity-60 cursor-not-allowed'
                  )}
                >
                  {isSubmitting ? 'Se trimite...' : 'Trimite formularul'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

