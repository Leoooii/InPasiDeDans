'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CalendarClock, CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react';

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
  SelectGroup,
  SelectItem,
  SelectLabel,
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

// Pe telefon lista nu trebuie să depășească ecranul: textele lungi se rup pe mai multe rânduri.
const OPTIUNE = 'py-2.5 whitespace-normal leading-snug';
const GRUP = 'mt-1 border-t border-slate-100 pt-1 first:mt-0 first:border-t-0 first:pt-0';
const ETICHETA_GRUP = 'pb-1 pt-2 text-xs uppercase tracking-wide text-slate-500';

const LISTA_ASTEPTARE = 'Listă de așteptare – anunțați-mă când se deschide o grupă nouă';

const WHATSAPP_URL = `https://wa.me/40722675126?text=${encodeURIComponent(
  'Bună! Tocmai m-am înscris pe site și aș avea o întrebare.'
)}`;

type CampObligatoriu = 'danceclass' | 'name' | 'email' | 'phone' | 'consent';

// Ordinea contează: primul câmp lipsă primește focus.
const CAMPURI_OBLIGATORII: CampObligatoriu[] = ['danceclass', 'name', 'email', 'phone', 'consent'];

const MESAJE_LIPSA: Record<CampObligatoriu, string> = {
  danceclass: 'Alege un curs',
  name: 'Completează numele',
  email: 'Completează adresa de e-mail',
  phone: 'Completează numărul de telefon',
  consent: 'Bifează acordul',
};

const EMAIL_VALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // ?curs=<id> preselectează un curs general (ex. din „Grupe cu locuri libere” de pe prima pagină).
  const preselectedCurs = searchParams.get('curs');
  useEffect(() => {
    if (!preselectedCurs || preselectedGrupaId) return;
    const optiune = defaultOptions.find(option => option.id === preselectedCurs);
    if (optiune) setFormData(prev => (prev.danceclass ? prev : { ...prev, danceclass: optiune.value }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedCurs, preselectedGrupaId]);

  const isFieldComplete = (field: keyof FormData) => {
    const value = formData[field];
    if (typeof value === 'boolean') {
      return value;
    }
    return Boolean(value && String(value).trim().length > 0);
  };

  // Erorile apar doar după prima încercare de trimitere, apoi se actualizează pe măsură ce se completează.
  const [incercat, setIncercat] = useState(false);

  const eroarePentru = (field: CampObligatoriu): string | null => {
    if (!isFieldComplete(field)) return MESAJE_LIPSA[field];
    if (field === 'email' && !EMAIL_VALID.test(formData.email.trim())) {
      return 'Adresa de e-mail nu pare corectă';
    }
    return null;
  };

  const erori = incercat
    ? (Object.fromEntries(
        CAMPURI_OBLIGATORII.map(f => [f, eroarePentru(f)] as const).filter(([, e]) => e)
      ) as Partial<Record<CampObligatoriu, string>>)
    : {};

  // Returnează true dacă formularul poate fi trimis; altfel marchează câmpurile și duce la primul lipsă.
  const valideaza = (): boolean => {
    const primulLipsa = CAMPURI_OBLIGATORII.find(f => eroarePentru(f));
    if (!primulLipsa) return true;
    setIncercat(true);
    const el = document.getElementById(primulLipsa);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }
    return false;
  };

  // Click-ul pe buton vine înaintea validării native, așa că o oprim și afișăm mesajele noastre.
  const laClickTrimite = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!valideaza()) e.preventDefault();
  };

  const laTrimitere = (e: React.FormEvent<HTMLFormElement>) => {
    if (!valideaza()) {
      e.preventDefault();
      return;
    }
    setIncercat(false);
    handleSubmit(e);
  };

  const clasaEroare = (field: CampObligatoriu) =>
    erori[field] ? 'border-red-500 ring-1 ring-red-400 focus-visible:ring-red-500' : null;

  const mesajEroare = (field: CampObligatoriu) =>
    erori[field] ? (
      <p id={`${field}-eroare`} className="mt-1 text-sm text-red-600">
        {erori[field]}
      </p>
    ) : null;

  const ariaEroare = (field: CampObligatoriu) =>
    erori[field] ? { 'aria-invalid': true as const, 'aria-describedby': `${field}-eroare` } : {};

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
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Gata, ești înscris!</h2>
                <p className="text-slate-600">
                  Am primit formularul. Te contactăm telefonic în cel mai scurt timp pentru a stabili
                  împreună grupa și prima ședință.
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
                  Pașii următori
                </h3>
                <ol className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-slate-900">Ține telefonul aproape.</span> Te
                      sunăm noi ca să confirmăm înscrierea. Dacă vrei, ne poți suna și tu la{' '}
                      <a href="tel:+40722675126" className="font-semibold text-red-600 hover:underline">
                        0722 675 126
                      </a>
                      .
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CalendarClock className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-slate-900">Aruncă o privire pe orar.</span>{' '}
                      Vezi zilele și orele grupelor în{' '}
                      <Link href="/program" className="font-semibold text-red-600 hover:underline">
                        programul cursurilor
                      </Link>
                      .
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-slate-900">Unde ne găsești:</span> Calea
                      Rahovei 262, sector 5, București.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1 bg-[#25D366] text-white hover:bg-[#1ebe5b]">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    Întreabă-ne pe WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href="tel:+40722675126">
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    Sună: 0722 675 126
                  </a>
                </Button>
              </div>

              <div className="mt-4 text-center">
                <Button variant="link" className="text-slate-500" onClick={() => setIsSubmitted(false)}>
                  Completează un nou formular
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-red-500 border-2">
            <CardHeader>
              <CardTitle>Informații înscriere</CardTitle>
              <CardDescription>Completează toate câmpurile obligatorii marcate cu *</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={laTrimitere} className="space-y-6">
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
                          {...ariaEroare('danceclass')}
                          className={cn(
                            'mt-1.5',
                            isFieldComplete('danceclass') && 'border-green-500 ring-1 ring-green-400 pr-8',
                            clasaEroare('danceclass')
                          )}
                        >
                          <SelectValue
                            placeholder={isGrupeLoading ? 'Se încarcă grupele...' : 'Alege un curs'}
                          />
                        </SelectTrigger>
                        <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)] max-h-[min(24rem,var(--radix-select-content-available-height))]">
                          {grupeOptions.length > 0 && (
                            <SelectGroup className={GRUP}>
                              <SelectLabel className={ETICHETA_GRUP}>Grupe în formare</SelectLabel>
                              {grupeOptions.map(option => (
                                <SelectItem key={option.id} value={option.value} className={OPTIUNE}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          )}
                          <SelectGroup className={GRUP}>
                            <SelectLabel className={ETICHETA_GRUP}>Cursuri</SelectLabel>
                            {defaultOptions.map(option => (
                              <SelectItem key={option.id} value={option.value} className={OPTIUNE}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup className={GRUP}>
                            <SelectLabel className={ETICHETA_GRUP}>Nu găsești o grupă potrivită?</SelectLabel>
                            <SelectItem value={LISTA_ASTEPTARE} className={OPTIUNE}>
                              {LISTA_ASTEPTARE}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {renderCompletionIcon('danceclass')}
                    </div>
                    {mesajEroare('danceclass')}
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
                        {...ariaEroare('name')}
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('name') && 'border-green-500 ring-1 ring-green-400',
                          clasaEroare('name')
                        )}
                      />
                      {renderCompletionIcon('name')}
                    </div>
                    {mesajEroare('name')}
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
                        {...ariaEroare('email')}
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('email') && 'border-green-500 ring-1 ring-green-400',
                          clasaEroare('email')
                        )}
                      />
                      {renderCompletionIcon('email')}
                    </div>
                    {mesajEroare('email')}
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
                        {...ariaEroare('phone')}
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('phone') && 'border-green-500 ring-1 ring-green-400',
                          clasaEroare('phone')
                        )}
                      />
                      {renderCompletionIcon('phone')}
                    </div>
                    {mesajEroare('phone')}
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
                        {...ariaEroare('consent')}
                        className={cn(
                          'h-4 w-4 shrink-0 accent-red-600 focus:ring-red-500 border-slate-300 rounded',
                          erori.consent && 'outline outline-2 outline-offset-2 outline-red-500'
                        )}
                      />
                      <span className="ml-2 text-sm text-slate-700">
                        Am citit și sunt de acord cu{' '}
                        <Link href="/privacy-policy" className="text-red-600 underline">
                          Politica de Confidențialitate
                        </Link>{' '}
                        și cu procesarea datelor mele personale pentru înscrierea la grupe.
                      </span>
                    </label>
                    {mesajEroare('consent')}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={laClickTrimite}
                  variant="brand"
                  className={cn('w-full', isSubmitting && 'opacity-60 cursor-not-allowed')}
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

