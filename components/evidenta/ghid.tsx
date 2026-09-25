'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Check, ChevronDown, X } from 'lucide-react';
import { ETICHETE_STATUS, STIL_STATUS, type CodStatus } from '@/lib/evidenta/abonament';
import { cn } from '@/lib/utils';

// Ghidul evidenței, pe site: o versiune pentru admin și una pentru instructori.

type Rol = 'admin' | 'instructor';

function Sectiune({ titlu, deschis = false, children }: { titlu: string; deschis?: boolean; children: React.ReactNode }) {
  return (
    <details open={deschis} className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 text-base font-semibold text-slate-900 sm:px-5 [&::-webkit-details-marker]:hidden">
        <span className="flex-1">{titlu}</span>
        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-3 border-t border-slate-100 px-4 py-4 text-sm leading-relaxed text-slate-700 sm:px-5">{children}</div>
    </details>
  );
}

function Pasi({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-red-600">{children}</ol>;
}

function Nota({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl bg-amber-50 px-3 py-2 text-amber-900">{children}</p>;
}

function Buton({ children }: { children: React.ReactNode }) {
  return <span className="whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-semibold text-slate-800">{children}</span>;
}

const EXPLICATII: Record<CodStatus, string> = {
  activ: 'are abonament valabil azi, cu ședințe rămase',
  la_limita: 'mai are cel mult 2 ședințe sau cel mult 3 zile până expiră',
  neinceput: 'Full Pass cumpărat, dar încă nefolosit (sau abonament care începe mai târziu)',
  expirat: 'au trecut cele 4 săptămâni, chiar dacă au rămas ședințe nefolosite',
  epuizat: 'a folosit toate ședințele, deși mai are zile',
  fara: 'nu are niciun abonament înregistrat',
};

function LegendaStatus() {
  return (
    <ul className="space-y-2">
      {(['activ', 'la_limita', 'neinceput', 'expirat', 'epuizat', 'fara'] as CodStatus[]).map(c => (
        <li key={c} className="flex flex-wrap items-center gap-2">
          <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium', STIL_STATUS[c].badge)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', STIL_STATUS[c].punct)} />
            {ETICHETE_STATUS[c]}
          </span>
          <span className="text-slate-600">{EXPLICATII[c]}</span>
        </li>
      ))}
    </ul>
  );
}

export function Ghid({ rol }: { rol: Rol }) {
  const admin = rol === 'admin';
  const acasa = admin ? '/admin/evidenta' : '/instructor';
  const L = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="font-medium text-red-600 underline">
      {children}
    </Link>
  );

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white sm:p-6">
        <h1 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
          <BookOpen className="h-6 w-6 text-orange-300" />
          {admin ? 'Ghidul evidenței' : 'Ghid pentru instructori'}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          {admin
            ? 'Grupe, prezență, cursanți, abonamente, conturile instructorilor, încasări și rapoarte — tot ce se poate face în evidență.'
            : 'Cum faci prezența la grupele tale, cum adaugi cursanți și cum înregistrezi un abonament plătit la sală.'}
        </p>
      </div>

      <Sectiune titlu="Pe scurt: cum funcționează" deschis>
        <ul className="space-y-2">
          {[
            <>Un abonament ține <strong>4 săptămâni</strong> de la data de început; data de expirare se calculează singură.</>,
            <><strong>Full Pass</strong> începe de la prima ședință la care vine cursantul, nu de la data plății.</>,
            <>Când salvezi prezența, fiecare ședință <strong>se scade automat</strong> din abonamentul valabil al cursantului.</>,
            <>Cine vine fără abonament valabil e trecut oricum prezent, marcat <strong>„fără abonament”</strong>; când îi înregistrezi abonamentul (în aceeași perioadă), ședințele acelea intră automat în el.</>,
            <>Un cursant din altă grupă poate veni la <strong>recuperare</strong>: e trecut prezent și i se scade ședința, dar nu devine membru al grupei.</>,
            <>Tipurile de abonament și prețurile vin din pagina de Tarife a site-ului.</>,
          ].map((t, i) => (
            <li key={i} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Sectiune>

      <Sectiune titlu="Intrarea în evidență (și aplicația de pe telefon)">
        <p>
          Toată lumea intră pe <strong>inpasidedans.ro/panou</strong>: apeși pe poza ta și scrii parola. Adminul ajunge în panoul de admin,
          instructorul în grupele lui.
        </p>
        <p>
          Pe telefon, evidența se poate pune pe ecranul principal ca o aplicație (iconița cu dansatorii): pe Android apasă{' '}
          <Buton>Instalează aplicația pe telefon</Buton> pe pagina de intrare; pe iPhone, în Safari: <strong>Distribuie</strong> →{' '}
          <strong>Adaugă pe ecranul principal</strong>.
        </p>
      </Sectiune>

      <Sectiune titlu="Ce înseamnă culorile și bulina cu număr">
        <LegendaStatus />
        <p>
          Lângă fiecare nume, <strong>bulina</strong> arată câte ședințe mai are: verde = are, galben = la limită, roșu „0” = terminat sau
          expirat, „–” = fără abonament, ∞ = Full Pass.
        </p>
      </Sectiune>

      <Sectiune titlu={admin ? 'Grupe și prezență (pagina principală)' : 'Grupele mele (pagina principală)'}>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Sus ai ceasul și data. Alegi ziua (Luni … Vineri); ziua de azi are eticheta „AZI”.</li>
          {admin && <li>Rândul cu poze filtrează după instructor; primul (logo-ul) arată toate grupele.</li>}
          <li>
            Grupele de azi sunt primele și au o stare după oră: <strong>⏳ Urmează</strong>, <strong>💃 LIVE</strong> (în desfășurare),{' '}
            <strong>✅ Terminată</strong>. Sub ea scrie dacă <strong>prezența e făcută</strong> sau nu.
          </li>
          <li>Pe card vezi cursanții cu poza, numele și bulina cu ședințe rămase; apasă pe un nume pentru fișa lui.</li>
          <li>
            <Buton>Prezența</Buton> deschide prezența de azi; <Buton>Detalii</Buton> (sau numele grupei) deschide pagina grupei.
          </li>
        </ul>
      </Sectiune>

      <Sectiune titlu="Marchează prezența">
        <Pasi>
          <li>
            În <L href={acasa}>{admin ? 'Grupe și prezență' : 'Grupele mele'}</L>, pe cardul grupei, apasă <Buton>Prezența</Buton>.
          </li>
          <li>Apasă cercul din stânga fiecărui cursant venit. Pentru toată grupa: <Buton>Toți prezenți</Buton>.</li>
          <li>
            Apasă <Buton>Salvează</Buton>. <Buton>Înapoi</Buton> te duce de unde ai venit.
          </li>
        </Pasi>
        <Nota>
          Prezența se face pentru <strong>ziua de azi</strong>. Greșeală? Apasă pe bifa verde a unei prezențe salvate și confirmă: se anulează
          și ședința revine în abonament.
          {admin && ' Ca admin poți corecta și o zi trecută: în pagina grupei, alege ziua în Istoric prezențe → „Modifică prezența din această zi”.'}
        </Nota>
      </Sectiune>

      <Sectiune titlu="Recuperare (cursant din altă grupă)">
        <p>Cineva care a lipsit la grupa lui vine să recupereze la altă grupă, în aceeași perioadă a abonamentului:</p>
        <Pasi>
          <li>
            În prezența grupei la care a venit, apasă <Buton>Recuperare</Buton>.
          </li>
          <li>Caută-l după nume și alege-l. Apare în listă cu eticheta „recuperare”, deja bifat.</li>
          <li>Salvează. Ședința i se scade din abonament, ca de obicei.</li>
        </Pasi>
        <p>
          E <strong>doar pentru ziua aceea</strong>: cursantul rămâne în grupa lui și nu apare în lista grupei la care a recuperat.
        </p>
      </Sectiune>

      <Sectiune titlu="Adaugă un cursant">
        <Pasi>
          <li>
            În prezență sau în pagina grupei apasă <Buton>Adaugă</Buton> (sau, din Cursanți, <Buton>Cursant nou</Buton>).
          </li>
          <li>Scrie numele: dacă există deja (vine și la altă grupă), apare în listă — alege-l, ca să nu se creeze de două ori.</li>
          <li>
            Dacă e nou, apasă <Buton>Cursant nou</Buton>, completează numele (telefonul e util pentru WhatsApp) și, dacă e cazul, alege grupa:
            întâi instructorul, apoi grupa lui.
          </li>
        </Pasi>
        {!admin && <p>Poți adăuga cursanți doar în grupele tale.</p>}
      </Sectiune>

      <Sectiune titlu="Înregistrează sau reînnoiește un abonament">
        <Pasi>
          <li>
            Lângă cursant apasă butonul cu cardul <Buton>Abonament</Buton> (apare la cei fără abonament, expirat, epuizat sau la limită).
            Tipul ultimului abonament e deja ales.
          </li>
          <li>Verifică data de început (implicit azi) și apasă <Buton>Salvează abonamentul</Buton>. Prețul se completează singur.</li>
        </Pasi>
        <p>
          Și mai rapid: în fișa cursantului, <Buton>Reînnoiește</Buton> vinde același tip de abonament, cu începere azi, după o confirmare.
        </p>
        <Nota>Full Pass nu are dată de început: pornește singur la prima ședință marcată.</Nota>
      </Sectiune>

      <Sectiune titlu="Fișa unui cursant">
        <ul className="list-disc space-y-1 pl-5">
          <li>abonamentul curent, cu bara de ședințe folosite, și butoanele Reînnoiește / Abonament nou;</li>
          <li>
            <strong>Cât de des vine</strong>: la câte din ședințele grupelor lui a venit în ultimele 30 de zile și în abonamentul curent (plus
            recuperările);
          </li>
          <li>toate prezențele pe luni (cele fără abonament sunt marcate cu roșu), grupele și abonamentele anterioare;</li>
          <li>
            <Buton>WhatsApp</Buton> (dacă are telefon): deschide WhatsApp cu un mesaj pregătit după situația abonamentului (expirat, se
            termină etc.); îl verifici și îl trimiți tu. Creionul de lângă el deschide editorul: schimbi textul, vezi cum arată mesajul și
            poți folosi variabilele <code>{'{nume}'}</code> (numele complet), <code>{'{abonament}'}</code>, <code>{'{expira}'}</code>,{' '}
            <code>{'{ramase}'}</code>.{admin ? ' Cu „Salvează pentru toți” textul devine cel implicit pentru toți cursanții.' : ''}
          </li>
          <li>
            <Buton>Editează</Buton>: nume, telefon, email, observații și un avatar ilustrat.
          </li>
        </ul>
      </Sectiune>

      <Sectiune titlu="Pagina grupei și istoricul prezențelor">
        <ul className="list-disc space-y-1 pl-5">
          <li>informațiile grupei, instructorul, câți cursanți are, câți sunt de rezolvat și câți vin în medie;</li>
          <li>lista completă de cursanți (cu × scoți pe cineva din grupă — abonamentul și prezențele lui rămân);</li>
          <li>
            <strong>Istoric prezențe</strong>: alegi ziua din calendar (verde = prezență salvată) și vezi cine a venit și cine a lipsit —
            doar pentru citire{admin ? ', cu excepția butonului „Modifică prezența din această zi”' : ''};
          </li>
          <li>
            <strong>Descarcă prezențele pe o lună</strong> în PDF, Excel sau CSV.
          </li>
        </ul>
      </Sectiune>

      <Sectiune titlu="Contul meu: nume, avatar, parolă">
        <p>
          Apasă pe avatarul tău ({admin ? 'jos în bara din stânga' : 'dreapta sus'}) ca să deschizi <strong>Contul meu</strong>. Poți
          schimba numele afișat (apare în istoric), avatarul (ilustrație, logo, poza unui instructor sau o poză proprie, decupată rotund) și
          parola.
        </p>
        {admin && <p>Bara din stânga se restrânge la iconițe cu butonul de lângă logo; se ține minte pe fiecare dispozitiv.</p>}
        {!admin && <p>Dacă îți uiți parola, cere-i administratorului una nouă.</p>}
      </Sectiune>

      {admin && (
        <>
          <Sectiune titlu="Dashboard (prima pagină din admin)">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Acum la sală</strong>: grupele în desfășurare, cu prezența lor, și grupele terminate azi fără prezență.
              </li>
              <li>cifrele importante: cursanți cu abonament, încasat luna aceasta, prezențe în ultimele 7 zile, de rezolvat;</li>
              <li>grafice: prezențe pe zi (14 zile), încasări (6 luni), starea abonamentelor;</li>
              <li>listele „De rezolvat” (cu WhatsApp), înscrieri noi, activitate recentă și scurtături către toate paginile.</li>
            </ul>
          </Sectiune>

          <Sectiune titlu="De rezolvat (banda galbenă)">
            <p>
              Pe paginile Grupe și prezență și Cursanți, banda galbenă arată cursanții cu abonament expirat sau epuizat, cei la limită și cei
              care au venit fără abonament. Apasă pe ea și intră pe fiecare nume (de acolo, Reînnoiește sau WhatsApp).
            </p>
          </Sectiune>

          <Sectiune titlu="Înscrierile de pe site → cursanți">
            <p>
              În <L href="/admin/inscrieri">Înscrieri</L>, la fiecare înscriere ai <Buton>Fă-l cursant</Buton>: creează cursantul în
              evidență (cu telefon, email și grupa aleasă în formular, dacă e cazul) și trece înscrierea pe „Înscris”. Dacă există deja un
              cursant cu același telefon, înscrierea se leagă de el.
            </p>
          </Sectiune>

          <Sectiune titlu="Încasări">
            <p>
              <L href="/admin/evidenta/incasari">Încasări</L> arată cât s-a încasat din abonamente într-o lună, comparația cu luna anterioară,
              graficul ultimelor 12 luni (apeși pe o lună ca s-o alegi) și împărțirea pe tip de abonament, adulți/copii și pe cine a
              înregistrat abonamentul. Abonamentele anulate nu intră.
            </p>
          </Sectiune>

          <Sectiune titlu="Istoric: cine ce a făcut">
            <p>
              În <L href="/admin/evidenta/istoric">Istoric</L> apare fiecare acțiune (cursanți, abonamente, prezențe, conturi), cu autorul și
              ora, plus avertizările automate (expiră în 3 zile, expirat, epuizat, ședințe fără abonament). Se filtrează după tip, persoană,
              grupă și perioadă.
            </p>
            <Nota>Istoricul nu se poate modifica sau șterge din aplicație.</Nota>
          </Sectiune>

          <Sectiune titlu="Conturile instructorilor">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                În <L href="/admin/evidenta/instructori">Conturi instructori</L>, panoul „Conturi pentru instructorii de pe site” creează
                dintr-un clic conturile instructorilor care au grupe (cu poza lor și grupele deja atribuite).
              </li>
              <li>
                <Buton>Grupe</Buton> schimbă grupele unui instructor; <Buton>Profil</Buton> numele și poza; comutatorul „activ” îi
                blochează accesul.
              </li>
              <li>
                <Buton>Parolă nouă</Buton> setează direct o parolă nouă (adresele @inpasidedans.ro nu primesc emailuri); i-o trimiți
                instructorului.
              </li>
              <li>
                <strong>Instructorul poate</strong>: prezența de azi la grupele lui, adăuga cursanți în grupele lui, înregistra abonamente,
                vedea istoricul grupelor lui și descărca prezențele pe o lună. <strong>Nu poate</strong>: șterge cursanți, anula abonamente,
                vedea istoricul acțiunilor sau încasările, lucra cu alte grupe.
              </li>
            </ul>
          </Sectiune>

          <Sectiune titlu="Export și backup">
            <p>
              În <L href="/admin/evidenta/export">Export și backup</L>: rapoarte pe lună, grupă, cursant sau complet (opțional pe instructor și
              perioadă), în PDF, Excel sau CSV. Excel-ul are foi separate pentru rezumat, cursanți (cu procentul de prezență), abonamente și
              prezențe.
            </p>
            <Nota>
              Descarcă lunar un <strong>backup complet</strong> (JSON cu toate datele) și păstrează-l într-un loc sigur.
            </Nota>
          </Sectiune>

          <Sectiune titlu="Anulare, arhivare, ștergere">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Anulează abonamentul</strong> (fișa cursantului): pentru o greșeală sau o restituire; ședințele lui devin „fără
                abonament”.
              </li>
              <li>
                <strong>Arhivează</strong>: cursantul nu mai vine; dispare din liste, datele rămân, se poate reactiva (filtrul Arhivați).
              </li>
              <li>
                <strong>Șterge definitiv</strong>: cu toate abonamentele și prezențele; doar pentru înregistrări greșite sau de test.
              </li>
            </ul>
          </Sectiune>
        </>
      )}

      {!admin && (
        <Sectiune titlu="Ce poți și ce nu poți face">
          <p>
            <strong>Poți:</strong> face prezența de azi la grupele tale, adăuga cursanți în grupele tale, înregistra și reînnoi abonamente
            plătite la sală, anula o prezență greșită de azi, trimite un mesaj pe WhatsApp unui cursant, vedea istoricul grupelor și descărca
            prezențele pe o lună.
          </p>
          <p>
            <strong>Nu poți:</strong> șterge cursanți, anula abonamente, modifica prezențe din zilele trecute sau lucra cu grupele altor
            instructori — pentru acestea vorbește cu administratorul. Tot ce faci apare, cu numele tău, în istoricul văzut de administrator.
          </p>
        </Sectiune>
      )}
    </div>
  );
}

/** Invitația la ghid, afișată până când e închisă (ținută minte în browser). */
export function BannerGhid({ rol }: { rol: Rol }) {
  const cheie = `ghid-evidenta-${rol}`;
  const [vizibil, setVizibil] = useState(false);

  useEffect(() => {
    try {
      setVizibil(!localStorage.getItem(cheie));
    } catch {
      setVizibil(false);
    }
  }, [cheie]);

  if (!vizibil) return null;
  const inchide = () => {
    try {
      localStorage.setItem(cheie, '1');
    } catch {}
    setVizibil(false);
  };

  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
      <BookOpen className="h-5 w-5 shrink-0 text-red-600" />
      <span className="min-w-0 flex-1 text-slate-700">
        Prima dată aici?{' '}
        <Link href={rol === 'admin' ? '/admin/evidenta/ghid' : '/instructor/ghid'} onClick={inchide} className="font-semibold text-red-600 underline">
          Citește ghidul
        </Link>{' '}
        (2 minute).
      </span>
      <button onClick={inchide} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Închide">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
