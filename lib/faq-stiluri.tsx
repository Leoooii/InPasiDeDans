import type { IntrebareFaq } from '@/components/faq-block';
import type { TarifeGrupate } from '@/lib/types';
import { ePretIntrebare, raspunsPretAdulti, raspunsPretCopii } from '@/lib/text-preturi';

// Întrebările FAQ ale paginilor de cursuri; afișate și marcate pentru Google de FaqBlock.

const FAQ_ADULTI: IntrebareFaq[] = [
  {
    q: "Care sunt cele mai populare cursuri de dans pentru adulți în București pentru începători?",
    a: "Cele mai căutate cursuri de dans pentru adulți în București sunt cele de dansuri latino, populare și de societate, ideale pentru relaxare, socializare și dezvoltarea coordonării într-un mediu plăcut și prietenos."
  },
  {
    q: "De ce merită să aleg cursuri de dans pentru adulți la În Pași de Dans?",
    a: "Școala oferă grupe mici, instructori dedicați și programe adaptate nivelului fiecărui cursant, asigurând o evoluție reală și o atmosferă relaxată la fiecare lecție."
  },
  {
    q: "Cât durează un program complet de cursuri de dans în București pentru adulți?",
    a: "Durata diferă în funcție de nivel, dar fiecare etapă (începători, intermediari, avansați) se întinde pe câteva luni, permițând participanților să progreseze natural și constant."
  },
  {
    q: "Pot participa singur la lecții de dans pentru adulți?",
    a: "Da, înscrierea nu necesită partener; instructorii asigură rotația între cursanți pentru ca toată lumea să se simtă confortabil și să învețe corect pașii de bază."
  },
  {
    q: "Ce stiluri se predau la cursurile de dans pentru adulți la școala În Pași de Dans?",
    a: "La În Pași de Dans se predau dansuri de societate (vals, tango, foxtrot) și latino (salsa, bachata, rumba), potrivite atât pentru socializare, cât și pentru evenimente speciale, dar și dansuri populare, românești și internaționale."
  },
  {
    q: "Care este frecvența recomandată pentru cursuri de dans pentru adulți în București?",
    a: "Pentru rezultate vizibile, se recomandă două ședințe pe săptămână, fiecare durând o oră, într-un mediu activ și plin de energie pozitivă."
  },
  {
    q: "Cât costă un abonament la cursuri de dans pentru adulți la școala În Pași de Dans?",
    a: "Prețurile variază în funcție de pachet: abonamentele lunare oferă acces la 8 sau 16 ședințe, iar pentru lecții private există tarife separate adaptate nevoilor cursanților."
  },
  {
    q: "Ce beneficii aduc lecțiile de dans în București pentru adulți pe termen lung?",
    a: "Dansul îmbunătățește postura, coordonarea și tonusul general, reducând stresul și oferind o activitate socială plăcută și dinamică."
  },
  {
    q: "Există vreo limită de vârstă pentru lecțiile de dans pentru adulți de la În Pași de Dans?",
    a: "Nu, cursurile sunt deschise tuturor, indiferent de vârstă sau experiență, fiind structurate pentru a oferi o experiență relaxantă și potrivită pentru toată lumea."
  },
  {
    q: "Cum pot să mă înscriu la un curs de dans pentru adulți la școala În Pași de Dans?",
    a: "Înscrierea se face simplu, completând formularul online de pe site sau direct la recepția școlii, după care ești repartizat într-o grupă potrivită nivelului tău."
  }
];

const FAQ_COPII: IntrebareFaq[] = [
  {
    q: "Care este vârsta minimă pentru înscrierea la cursurile de dans pentru copii?",
    a: "Copiii pot începe cursurile de dans de la vârsta de 7 ani, atunci când pot urma instrucțiunile și pot învăța coregrafii simple într-un mod distractiv și sigur."
  },
  {
    q: "Ce stiluri sunt incluse la cursurile de dans pentru copii de la școala În Pași de Dans?",
    a: "În cadrul cursurilor de dans pentru copii, micii dansatori învață dansuri precum cha cha, jive, vals lent și quick step, dezvoltându-și postura, coordonarea și simțul ritmului."
  },
  {
    q: "Cât durează un program complet la cursurile de dans pentru copii din București?",
    a: "Un modul are loc pe parcursul a mai multor luni, cu lecții săptămânale ce urmăresc progresul natural al fiecărui copil."
  },
  {
    q: "De ce să aleg cursuri de dans pentru copii în București la În Pași de Dans?",
    a: "Școala oferă un mediu cald și motivant, cu instructori pasionați care transformă cursurile de dans pentru copii într-o experiență educativă și plină de bucurie."
  },
  {
    q: "Cât costă participarea la lecții de dans pentru copii la școala În Pași de Dans?",
    a: "Prețul variază în funcție de abonament, iar pachetele lunare includ de la 4 la 12 ședințe interactive și pline de energie."
  },
  {
    q: "Pot părinții asista la cursurile de dans pentru copii?",
    a: "Da, părinții pot urmări ocazional cursurile, pentru a vedea progresul micilor dansatori și pentru a-i susține emoțional."
  },
  {
    q: "Cum se desfășoară o ședință tipică din cursurile de dans pentru copii?",
    a: "Fiecare lecție începe cu exerciții de încălzire, urmate de învățarea pașilor de bază și se încheie cu momente de repetiție și jocuri ritmice."
  },
  {
    q: "Ce echipament este necesar pentru participarea la cursurile de dans pentru copii de la școala În Pași de Dans?",
    a: "Recomandăm haine lejere, încălțăminte confortabilă și o atitudine pozitivă, pregătită pentru mișcare și distracție."
  },
  {
    q: "Cum pot înscrie copilul la cursurile de dans pentru copii din București la școala În Pași de Dans?",
    a: "Înscrierea se poate face online, completând formularul disponibil pe site, sau direct la sediul școlii, în funcție de grupa și programul dorit."
  }
];

export const FAQ_POPULARE: IntrebareFaq[] = [
  {
    q: "Ce beneficii aduc dansurile populare practicate în cadrul școlii În Pași de Dans?",
    a: "Participarea la dansurile populare ajută la menținerea tradițiilor românești vii, îmbunătățește coordonarea și oferă o activitate socială plină de energie și bucurie."
  },
  {
    q: "Ce presupune un curs de dans popular pentru începători?",
    a: "Un curs de dans popular pentru începători include învățarea pașilor de bază și a ritmurilor tradiționale din diferite regiuni, într-un mod accesibil și plin de voie bună."
  },
  {
    q: "De ce merită să aleg cursuri de dansuri populare pentru adulți în București la școala În Pași de Dans?",
    a: "Prin cursurile pe care le oferim, participanții redescoperă cultura românească, se relaxează și se conectează cu alți pasionați într-o atmosferă autentică și prietenoasă."
  },
  {
    q: "Care este structura unui program de cursuri de dansuri populare în București?",
    a: "Un modul include lecții săptămânale, exerciții de coordonare și repetiții coregrafice, adaptate nivelului fiecărui participant."
  },
  {
    q: "Pot participa fără experiență la cursurile de dansuri populare pentru adulți în București la școala În Pași de Dans?",
    a: "Da, dansurile populare sunt deschise tuturor, inclusiv celor fără experiență, instructorii adaptând ritmul și pașii în funcție de nivelul grupului."
  },
  {
    q: "Ce zone folclorice se studiază în cadrul cursurilor de dansuri populare la școala În Pași de Dans?",
    a: "Cursurile noastre de dansuri populare includ stiluri din regiuni diverse ale României - Ardeal, Oltenia, Moldova sau Muntenia - pentru o experiență completă."
  },
  {
    q: "Care sunt beneficiile fizice aduse de participarea la cursurile de dansuri populare de la școala În Pași de Dans?",
    a: "Practicarea unui dans popular contribuie la îmbunătățirea echilibrului, tonusului muscular și rezistenței fizice, fiind o formă excelentă de mișcare recreativă."
  },
  {
    q: "Ce durată are un modul de cursuri de dansuri populare pentru adulți în București?",
    a: "Un modul se desfășoară pe o perioadă de câteva luni, cu întâlniri săptămânale ce asigură progres constant."
  },
  {
    q: "Este nevoie de echipament special pentru cursurile de dansuri populare de la școala În Pași de Dans?",
    a: "Pentru cursurile noastre, se recomandă îmbrăcăminte comodă și încălțăminte flexibilă; costumele tradiționale sunt folosite doar la evenimente sau spectacole."
  },
  {
    q: "Cum mă pot înscrie la cursurile de dansuri populare pentru adulți în București?",
    a: "Înscrierea se face online, prin completarea formularului de pe site, sau direct la sediul școlii, în funcție de programul grupelor."
  },
  {
    q: "Ce beneficii aduc cursurile de dansuri populare pentru copii în București?",
    a: "Participarea la cursuri de dansuri populare ajută copiii să descopere tradițiile românești, să-și îmbunătățească echilibrul și să își dezvolte spiritul de echipă."
  }
];

export const FAQ_LATINO: IntrebareFaq[] = [
  {
    q: 'Cum mă pot înscrie la cursurile de dans latino și ce pași trebuie să urmez?',
    a: (
      <div className="space-y-3">
        <p>Înscrierea este foarte simplă, folosind una din variantele de mai jos!</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><a href="/inscriere" className="text-red-600 hover:text-red-700 underline">Completezi formularul de pe site</a></li>
          <li>Ne scrii direct pe WhatsApp la <a href="https://wa.me/40722675126" className="text-red-600 hover:text-red-700 underline">0722 675 126</a></li>
          <li>Ne trimiți un e-mail la <a href="mailto:inpasidedans@gmail.com" className="text-red-600 hover:text-red-700 underline">inpasidedans@gmail.com</a></li>
        </ul>
        <p>După ce te înscrii, îți confirmăm locul în grupă și îți trimitem toate detaliile despre program și abonament.</p>
      </div>
    )
  },
  {
    q: 'Este obligatoriu să vin cu partener la cursurile de dans latino?',
    a: 'Nu, nu este obligatoriu. Atunci când dansăm în perechi folosim un sistem de rotație, astfel încât toată lumea să aibă ocazia să danseze cu toată lumea.'
  },
  {
    q: 'Pot încerca o lecție gratuită înainte de a alege abonamentul?',
    a: 'Da, dacă avem deschisă o grupă de nivel începător, puteți participa la o ședință de probă gratuită. Dacă aveți deja experiență în dans, vă putem invita la o lecție într-o grupă de nivel potrivit sau chiar puțin sub nivelul dumneavoastră, pentru a vă acomoda. De asemenea, este posibil să asistați la o lecție într-o grupă intermediară sau avansată, pentru a vedea atmosfera și stilul cursurilor noastre.'
  },
  {
    q: 'Cât durează un modul de curs de dans latino?',
    a: 'Cursurile noastre nu au o durată fixă de finalizare. Ele se desfășoară pe termen nelimitat, atâta timp cât există un număr minim de participanți în grupă. Astfel, puteți progresa în ritmul propriu, fără presiunea unei perioade limitate.'
  },
  {
    q: 'Oferiți cursuri pentru toate nivelurile (începători, intermediari, avansați)?',
    a: 'Da, cursurile sunt structurate pe niveluri – începători, intermediari și avansați – pentru ca fiecare cursant să învețe treptat și să evolueze în ritmul său.'
  },
  {
    q: 'Dacă lipsesc, pot recupera ședința pierdută?',
    a: 'Da, ședințele pierdute pot fi recuperate la alte grupe, dacă în acel moment există o grupă de nivel apropiat sau sub nivelul dumneavoastră. Dacă nu este posibil să recuperați, abonamentul nu poate fi prelungit. În schimb, pentru flexibilitate, oferim și opțiunea de a plăti fiecare ședință individual.'
  },
  {
    q: 'Organizați și evenimente sociale pentru cursanți?',
    a: 'Da! Pe lângă cursuri, organizăm periodic petreceri, seri de practice, excursii și participări la festivaluri, congrese sau workshop-uri, pentru ca dansul să devină o experiență completă și plină de bucurie.'
  }
];

export const FAQ_SOCIETATE: IntrebareFaq[] = [
  {
    q: 'Cum mă pot înscrie la cursurile de dansuri de societate și ce nivel trebuie să aleg?',
    a: (
      <div className="space-y-3">
        <p>Înscrierea este foarte simplă, folosind una din variantele de mai jos!</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li> <a href="/inscriere" className="text-red-600 hover:text-red-700 underline">Completezi formularul de pe site</a></li>
          <li>Ne scrii direct pe WhatsApp la <a href="https://wa.me/40722675126" className="text-red-600 hover:text-red-700 underline">0722 675 126</a></li>
          <li>Ne trimiți un e-mail la <a href="mailto:inpasidedans@gmail.com" className="text-red-600 hover:text-red-700 underline">inpasidedans@gmail.com</a></li>
        </ul>
        <p>Dacă ai deja experiență în dans, poți alege o grupă de nivel intermediar sau avansat. Dacă ești la primul pas în lumea dansului, îți recomandăm să te înscrii la o grupă de nivel începător.</p>
        <p>După ce te înscrii, îți confirmăm locul în grupă și îți trimitem toate detaliile despre program și abonament.</p>
      </div>
    )
  },
  {
    q: 'Este nevoie să vin cu un partener la cursurile de dansuri de societate sau pot participa și singur(ă)?',
    a: 'Nu este obligatoriu să ai partener(ă). Mulți cursanți vin singuri, iar noi ne asigurăm că toată lumea dansează și schimbă partenerii pe parcursul lecțiilor.'
  },
  {
    q: 'Oferiți cursuri pentru toate nivelurile (începători, intermediari, avansați)?',
    a: (
      <div className="space-y-3">
        <p>Da, avem grupe pentru toate nivelurile, astfel încât să evoluezi treptat și să dansezi cu încredere pe orice ritm.</p>
        <p>Poți verifica aici <a href="/program" className="text-red-600 hover:text-red-700 underline">programul grupelor</a> aflate în desfășurare și <a href="/grupe-in-formare" className="text-red-600 hover:text-red-700 underline">grupele aflate în formare</a>.</p>
      </div>
    )
  },
  {
    q: 'Pot participa la cursuri dacă nu am experiență deloc în dans?',
    a: 'Bineînțeles! Cursurile pentru începători sunt gândite exact pentru cei care nu au mai dansat până acum.'
  },
  {
    q: 'Există o vârstă minimă sau maximă pentru a participa la cursurile de dansuri de societate?',
    a: 'Nu există limită de vârstă – dansul este pentru toată lumea. Avem cursuri dedicate atât pentru adulți, cât și pentru copii.'
  },
  {
    q: 'Pot beneficia de o lecție demonstrativă gratuită înainte de înscriere?',
    a: 'Da, dacă avem deschisă o grupă de nivel începător, puteți participa la o ședință de probă gratuită. Dacă aveți deja experiență în dans, vă putem invita la o lecție într-o grupă de nivel potrivit sau chiar puțin sub nivelul dumneavoastră, pentru a vă acomoda. De asemenea, este posibil să asistați la o lecție într-o grupă intermediară sau avansată, pentru a vedea atmosfera și stilul cursurilor noastre.'
  }
];

export const FAQ_SALSA_BACHATA: IntrebareFaq[] = [
  {
    q: 'Cum mă pot înscrie la cursurile de Salsa și Bachata și ce pași trebuie să urmez?',
    a: (
      <div className="space-y-3">
        <p>Înscrierea este foarte simplă! Poți alege una din variantele de mai jos:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Completezi formularul de pe site</li>
          <li>Ne scrii direct pe WhatsApp la <a href="https://wa.me/40722675126" className="text-red-600 hover:text-red-700 underline">0722 675 126</a></li>
          <li>Ne trimiți un e-mail la <a href="mailto:inpasidedans@gmail.com" className="text-red-600 hover:text-red-700 underline">inpasidedans@gmail.com</a></li>
        </ul>
        <p>După înregistrare, îți confirmăm locul în grupa potrivită nivelului tău și îți trimitem detaliile complete despre program și abonament.</p>
      </div>
    )
  },
  {
    q: 'Trebuie să vin cu partener la cursuri?',
    a: 'Nu este obligatoriu să vii cu partener. La cursuri facem rotații, astfel încât fiecare să poată dansa și să învețe pașii atât pe rolul de lider, cât și pe cel de follower.'
  },
  {
    q: 'Pot testa o lecție înainte să mă decid?',
    a: 'Da! Poți participa la o lecție de probă pentru a descoperi atmosfera și stilul nostru de predare, înainte să alegi abonamentul.'
  },
  {
    q: 'Cât durează o lecție și ce învăț la început?',
    a: 'O lecție durează 60 de minute. La nivel de începători, înveți pașii de bază, tehnica de mișcare și primele figuri simple, astfel încât să te poți bucura de dans încă din primele ședințe.'
  },
  {
    q: 'Aveți cursuri pentru toate nivelurile?',
    a: 'Da! Avem grupe pentru începători, intermediari și avansați. Indiferent dacă abia faci primii pași sau dansezi deja de ceva timp, vei găsi grupa potrivită pentru tine.'
  },
  {
    q: 'Pot recupera ce am pierdut dacă lipsesc mai multe ședințe?',
    a: 'Da, dacă lipsești, îți oferim opțiunea de a recupera într-o altă grupă de același nivel (în funcție de disponibilitate) sau prin recapitulările periodice pe care le facem la curs.'
  },
  {
    q: 'Organizați și evenimente sociale pentru cursanți?',
    a: 'Absolut! Pe lângă cursuri, organizăm seri de practică, petreceri tematice și ieșiri de socializare, unde poți dansa liber și lega prietenii.'
  }
];

// Răspunsul despre prețuri se construiește din tarifele reale (Firestore).
const cuPreturi = (lista: IntrebareFaq[], raspuns: typeof raspunsPretAdulti, tarife: TarifeGrupate | null) =>
  lista.map(i => (ePretIntrebare(i.q) && typeof i.a === 'string' ? { ...i, a: raspuns(tarife, i.a) } : i));

export const faqAdulti = (tarife: TarifeGrupate | null) => cuPreturi(FAQ_ADULTI, raspunsPretAdulti, tarife);
export const faqCopii = (tarife: TarifeGrupate | null) => cuPreturi(FAQ_COPII, raspunsPretCopii, tarife);
