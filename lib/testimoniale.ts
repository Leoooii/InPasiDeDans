// Testimonialele afișate pe paginile de cursuri (componenta Testimoniale).

export type Testimonial = {
  id: number;
  name: string;
  text: string;
  rating: number;
  highlight: string;
  date?: string;
};

export const TESTIMONIALE_LATINO: Testimonial[] = [
  {
    id: 1,
    name: 'Magda Istrate',
    text: 'Am venit aici cu ideea: trecem un modul, învățăm ceva figuri și gata. Au trecut de atunci multe "module". După o zi grea, când zici "nu cred că pot să mă mișc", descoperi că dansezi cu plăcere, că abia aștepți să ajungi la sală. Și pleci încărcat cu o energie care ar putea să mute munții. Am descoperit un instructor, în persoana Alexandrei, care ar putea să învețe și un stâlp să danseze. Îi mulțumesc pentru răbdare, pentru motivare, pentru că există. Haideți la dans! Nici nu stiți ce pierdeți.',
    rating: 5,
    highlight: 'Energie care ar putea să mute munții'
  },
  {
    id: 2,
    name: 'Simona Haghighi',
    text: 'Este o atmosferă minunată, relaxantă și extrem de plăcută! Alexandra este o profesionistă, are răbdare cu cursanții, explică foarte clar toți pașii și toate mișcările și ne simțim extraordinar la curs! Mulțumim, Alexandra, pentru clipele frumoase petrecute în sala ta!',
    rating: 5,
    highlight: 'Atmosferă minunată și relaxantă'
  },
  {
    id: 3,
    name: 'Daniela Vlad',
    text: 'Atmosfera este de fiecare dată excelentă. Recomand cu încredere pe Alexandra, fie ca sunt cursuri de dans popular, fie de latino sau societate, nu ai cum să nu înveți să dansezi cu ea. Este cel mai bun profesor.',
    rating: 5,
    highlight: 'Cel mai bun profesor'
  },
  {
    id: 4,
    name: 'Antonia Anghel',
    text: 'Un loc care combină dansul, mișcarea și relaxarea în cel mai plăcut mod. Nu mă așteptam să îmi placă atât de mult, însă acum a devenit o activitate pe care nu o ratez.',
    rating: 5,
    highlight: 'Dans, mișcare și relaxare'
  },
  {
    id: 5,
    name: 'Adriana Băluță',
    text: 'Nu mă așteptam să îmi placă atât de mult! Învățăm să dansăm, să ne facem prieteni, să fim toleranți. Asta pe lângă matematica și fizica dansului, de care nu știam ca există până acum😊. Alexandra este minunată, dedicată, entuziasta, o frumusețe de om. Fericirea vine-n pași de dans!💃',
    rating: 5,
    highlight: 'Fericirea vine-n pași de dans'
  },
  {
    id: 6,
    name: 'Inga Bulat',
    text: 'Sunteți minunați, pe lângă eliminarea stresului, buna dispoziție, ținuta corectă, stima de sine crescută și o echipă plină de voie bună, as putea să mai adaug ca ne ajutați cu fiecare ședință să devenim mai buni, să iubim frumosul și să ne simțim bine in corpul nostru. Vă îmbrățișăm cu drag și ne bucurăm că am avut ocazia să vă cunoaștem!',
    rating: 5,
    highlight: 'Eliminarea stresului și buna dispoziție'
  }
];

export const TESTIMONIALE_SOCIETATE: Testimonial[] = [
  {
    id: 1,
    name: 'Lavinia Nicolescu',
    text: 'Recomand cu căldură această școală de dans. Alexandra este super! Este o persoana dinamică, implicată și foarte pasionată. ❤️',
    rating: 5,
    highlight: 'Recomand cu căldură această școală'
  },
  {
    id: 2,
    name: 'Simona Petcu',
    text: 'Oameni prietenoși, muzică, mișcare, veselie, siguranța condițiilor de lucru, atmosfera faină, implicare. Combinația din care ai numai de câștigat.',
    rating: 5,
    highlight: 'Combinația din care ai numai de câștigat'
  },
  {
    id: 3,
    name: 'Irina Roșu',
    text: 'Mulțumim pentru răbdarea de care ați dat dovadă pentru a învața tango ca dansul mirilor! A fost minunat și... emoționant! 🥳🤗😍',
    rating: 5,
    highlight: 'A fost minunat și... emoționant!'
  },
  {
    id: 4,
    name: 'Mirabela Năstase',
    text: 'Recomand școala În Pași de Dans, deoarece este cel mai potrivit loc de a face mișcare și de a scăpa de stresul cotidian! Unde mai pui că înveți și să dansezi! Așadar, ce poate fi mai plăcut decât dansul predat de Alexandra Dumitrache, o instructoare de dans cu har!',
    rating: 5,
    highlight: 'O instructoare de dans cu har!'
  },
  {
    id: 5,
    name: 'Miruna Băcilă',
    text: 'M-am înscris la dansuri din dorința de a avea o activitate care să iasă din rutină și am avut ocazia să descopăr o atmosfera plăcută și oameni frumoși. Recomand din tot sufletul!',
    rating: 5,
    highlight: 'Recomand din tot sufletul!'
  },
  {
    id: 6,
    name: 'Sorina Diamandescu',
    text: 'Cea mai plăcută modalitate de a face mișcare într-un mediu relaxant. Ce apreciez cel mai mult? Faptul că nu sunt doar cursuri de dans, ci o adevărată comunitate. Iar activitățile "extrașcolare" sunt deosebite… cele mai frumoase petreceri!!! și vacanțe de neuitat. Ați ridicat sus de tot ștacheta!',
    rating: 5,
    highlight: 'O adevărată comunitate'
  }
];

export const TESTIMONIALE_SALSA_BACHATA: Testimonial[] = [
  {
    id: 1,
    name: 'Adriana Baluță',
    text: 'Cursurile de salsa și bachata au devenit cea mai așteptată parte a săptămânii pentru mine. Am descoperit nu doar dansul, ci și o comunitate caldă și prietenoasă.',
    rating: 5,
    highlight: 'Cea mai așteptată parte a săptămânii',
    date: 'Octombrie 2025'
  },
  {
    id: 2,
    name: 'Carmen Niculae',
    text: 'Nu am crezut că voi învăța pașii atât de repede! Instructorii explică pe înțelesul tuturor și reușesc să facă totul foarte distractiv.',
    rating: 5,
    highlight: 'Învățare rapidă și distractivă',
    date: 'Septembrie 2025'
  },
  {
    id: 3,
    name: 'Cristina Popa',
    text: 'Pentru mine, dansul a devenit o terapie. În fiecare oră de bachata uit de griji și plec cu zâmbetul pe buze.',
    rating: 5,
    highlight: 'Dansul ca terapie',
    date: 'Noiembrie 2025'
  },
  {
    id: 4,
    name: 'Cătălin Nistor',
    text: 'Atmosfera e minunată – multă energie, voie bună și muzică care te face să nu mai vrei să stai pe scaun.',
    rating: 5,
    highlight: 'Multă energie și voie bună',
    date: 'August 2025'
  },
  {
    id: 5,
    name: 'Victor Păducel',
    text: 'Cursurile de salsa m-au ajutat să am mai multă încredere în mine și să îmi dezvolt coordonarea. Plus că am cunoscut oameni super faini!',
    rating: 5,
    highlight: 'Încredere și coordonare',
    date: 'Ianuarie 2026'
  },
  {
    id: 6,
    name: 'Daria Mușat',
    text: 'Recomand din toată inima! Fiecare lecție e o combinație perfectă între tehnică, distracție și socializare.',
    rating: 5,
    highlight: 'Combinație perfectă',
    date: 'Decembrie 2025'
  }
];

export const TESTIMONIALE_COPII: Testimonial[] = [
  {
    id: 1,
    name: 'Ioana Marinescu',
    text: 'Fiica mea are 9 ani și de când a început cursurile la În Pași de Dans s-a transformat complet. Este mai sigură pe ea, mai coordonată și abia așteaptă fiecare oră de dans.',
    rating: 5,
    highlight: 'Mai sigură pe ea și mai coordonată',
    date: 'Octombrie 2025'
  },
  {
    id: 2,
    name: 'Radu Ionescu',
    text: 'Băiatul meu era timid și nu voia să iasă din cochilie. Cursurile de dans l-au ajutat enorm — acum participă la concursuri și e mândru de el. Mulțumim instructorilor!',
    rating: 5,
    highlight: 'Participă la concursuri și e mândru de el',
    date: 'Noiembrie 2025'
  },
  {
    id: 3,
    name: 'Alina Georgescu',
    text: 'Atmosfera la cursurile de copii este extraordinară. Instructorii au o răbdare incredibilă și știu să facă orele distractive și educative în același timp.',
    rating: 5,
    highlight: 'Ore distractive și educative',
    date: 'Septembrie 2025'
  },
  {
    id: 4,
    name: 'Mihai Dumitrescu',
    text: 'Fetița noastră face dans de 2 ani la această școală. Progresul ei este vizibil de la lună la lună. A participat la primul concurs și a câștigat locul 2!',
    rating: 5,
    highlight: 'Progres vizibil, locul 2 la concurs',
    date: 'Ianuarie 2026'
  },
  {
    id: 5,
    name: 'Elena Petre',
    text: 'Recomand cu toată inima! Copiii se simt ca acasă, instructorii sunt minunați și sala este dotată perfect. Cel mai bun cadou pe care l-am putut face copilului meu.',
    rating: 5,
    highlight: 'Cel mai bun cadou pentru copilul meu',
    date: 'Decembrie 2025'
  },
  {
    id: 6,
    name: 'Cristina Voicu',
    text: 'De la prima lecție, fiul meu a adorat cursurile. Acum dansează și acasă, singur, din plăcere. Este o activitate extraordinară pentru dezvoltarea lor.',
    rating: 5,
    highlight: 'Dansează și acasă din plăcere',
    date: 'Octombrie 2025'
  }
];

export const TESTIMONIALE_POPULARE: Testimonial[] = [
  {
    id: 1,
    name: 'Angelica Barbu',
    text: 'Recomandăm cu mare drag această școală de dans! Eu și soțul meu facem cursuri aici de aproximativ 10 luni și mergem cu drag de două ori pe săptămână! Am început din dorința de a face mișcare și chiar nu ne așteptam să ne placă atât de mult! Cătălina este foarte implicată, pune mult suflet in fiecare curs, e mereu veselă și prietenoasă! Chiar își dorește sa aibă cursanți bine pregătiți, iar noi facem tot posibilul sa ne ținem de treabă. Atât de mult ne place încât regretăm când suntem în concedii sau intervine ceva și nu putem ajunge! De fiecare dată repetăm acasă cu drag dansurile învățate, mai ales când se întâmplă să lipsim. Cred că acest lucru se datorează in mare parte Cătălinei care a reușit să transforme câteva ore de mișcare în pasiune. Îi mulțumim tare mult pentru răbdarea pe care o are cu noi, pentru modul profesionist de a ne corecta fără a ne face să ne simțim prost și pentru faptul ca fiecare om care trece prin sala de dans pleacă de la ore cu o bucățică din sufletul ei. E ,,o mâna de om", dar are o putere fantastică de a aduna oamenii, de a-i apropia unii de alții, de a transmite bucurie și de a te scoate din grijile de zi cu zi. Ne bucurăm că am luat decizia de a învața aici dansuri populare! ❤️',
    rating: 5,
    highlight: 'O putere fantastică de a aduna oamenii'
  },
  {
    id: 2,
    name: 'Roxana',
    text: 'De ,,În pași de dans" am auzit de la o fată care a avut și ea, la rândul ei o experiență foarte faină cu oamenii de aici. Pentru că m-am trezit la o petrecere, unde se cânta muzică populară și se dansa până nu se mai putea, iar eu stăteam pe scaun 🥴 am început cu dansurile populare, cu Cătălina ca instructor. Ne-a plăcut atât de mult, încât dacă pierdeam puțin, nu știam cum sa recuperăm mai repede. O recomandăm cu drag și îi mulțumim că ne-a scăpat de două picioare stângi!🥰🤗♥️',
    rating: 5,
    highlight: 'Ne-a scăpat de două picioare stângi!'
  },
  {
    id: 3,
    name: 'Mihaela Vulpe',
    text: 'Dansuri populare de calitate, muzică bună și distracție maximă!',
    rating: 5,
    highlight: 'Dansuri populare de calitate'
  },
  {
    id: 4,
    name: 'Victoria Neacșu',
    text: 'Recomand pentru profesionalism, căldură, prietenie, răbdare și dedicație. Oricât de stângaci ești, nu pleci fără să dobândești cunoștințe de bază. Înveți și te distrezi în același loc. Felicitări!',
    rating: 5,
    highlight: 'Înveți și te distrezi în același loc'
  },
  {
    id: 5,
    name: 'Camelia Măgureanu',
    text: 'E combinația perfectă între distracție și plăcerea de a învața să dansezi. M-am simțit minunat printre profesioniști care îți arată că e ușor să dansezi chiar dacă ai două picioare stângi. Mulțumim!',
    rating: 5,
    highlight: 'Combinația perfectă între distracție și plăcerea de a învața'
  },
  {
    id: 6,
    name: 'Elena Apostolescu',
    text: 'Sunt multe de spus despre În Pași de Dans. E unul din locurile speciale în care am cunoscut oameni minunați, am descoperit pasiunea pentru dans și muzică, am legat prietenii temeinice și mi-am creat amintiri de neuitat. Este de departe cel mai special loc în care aș fi putut începe să dansez și în care revin cu drag ori de câte ori am ocazia. Recomand cu căldură!',
    rating: 5,
    highlight: 'Cel mai special loc în care aș fi putut începe să dansez'
  }
];

export const TESTIMONIALE_MIRI: Testimonial[] = [
  {
    id: 1,
    name: 'Alina',
    text: 'Am avut o experiență excelentă cu Miriam. Este răbdătoare, a reușit din două persoane care nu au dansat niciodată să scoată un vals al mirilor superb, apreciat de toți invitații, în câteva ședințe. O recomand cu căldură tuturor celor care vor să învețe să danseze!',
    rating: 5,
    highlight: 'Un vals al mirilor superb, apreciat de toți invitații',
    date: 'Mai 2025'
  },
  {
    id: 2,
    name: 'Alexandra Popescu',
    text: 'Multumim, Luiza pentru tot ce ne ai învățat și abordarea cu răbdare pe care ai aplicat o mereu! 😇 Pentru dansul mirilor ai realizat cea mai frumoasa coregrafie și totul a ieșit minunat! Un dar de nunta prețios care rămâne în inimile noastre pentru totdeauna! 🥰 Recomand sa lucrați cu Luiza deoarece este o persoana sociabila, vesela, adaptabila și foarte inteligenta, care are capacitatea de a găsi cel puțin o soluție la orice impediment. ❤️',
    rating: 5,
    highlight: 'Cea mai frumoasa coregrafie și totul a ieșit minunat!',
    date: 'August 2024'
  },
  {
    id: 3,
    name: 'Andra',
    text: 'Am colaborat, pentru dansul mirilor, cu Daniela și am fost foarte mulțumiți! A ieșit foarte bine și ne-a plăcut mult și coregrafia! Ședințele erau relaxante și veneam mereu cu plăcere. Deși a trecut nunta și acum ne place să facem coregrafia acasă. Recomand!',
    rating: 5,
    highlight: 'Ședințele erau relaxante și veneam mereu cu plăcere',
    date: 'Septembrie 2024'
  },
  {
    id: 4,
    name: 'Roxana',
    text: 'De scoala In Pași de Dans am auzit de la o fată care a avut și ea, la rândul ei o experiența foarte faină cu oamenii de aici. Pentru că m-am trezit la o petrecere, unde se cânta muzică populară și se dansa până nu se mai putea, iar eu stăteam pe scaun 🥴 am început cu dansurile populare, cu Cătălina ca instructor. Ne-a plăcut atât de mult, încât dacă pierdeam puțin, nu știam cum sa recuperăm mai repede. Atunci când a trebuit să ne gândim serios la nuntă și la faptul că ne dorim un dans al mirilor, nu ne-a venit decât Cătălina în minte… și a fost cea mai bună decizie! E omul cu care poți să râzi oricât și din orice și e cel mai bun instructor posibil, mai ales când vine vorba de o coregrafie pentru dansul mirilor, pune suflet și ajunge la un rezultat care este muult peste ce vă imaginați inițial! O recomandăm cu drag și îi mulțumim că ne-a scăpat de doua picioare stângi!🥰🤗♥️',
    rating: 5,
    highlight: 'Cel mai bun instructor posibil pentru dansul mirilor',
    date: 'Iulie 2023'
  },
  {
    id: 5,
    name: 'Iuliana Francusi',
    text: 'Recomand cu drag Luiza! Din prima secundă în care am pășit în sală am avut o senzație de confort și impresia ca ne cunoaștem de ani, iar asta ne-a ajutat să ne detașam și să venim cu drag la fiecare ședință✨🌸! Un om minunat cu o energie aparte!',
    rating: 5,
    highlight: 'O senzație de confort și impresia ca ne cunoaștem de ani',
    date: 'Septembrie 2023'
  },
  {
    id: 6,
    name: 'Cristina Taras',
    text: 'Am avut un dans divin, datorită ție, cea mai talentată și răbdătoare profesoară de dans din lume, care ne-a ajutat să învățăm în doar câteva ședințe un dans apreciat de toți invitații! Recomand pentru profesionalism, căldură, prietenie, răbdare și dedicare, un om deosebit! Multumim, Alexandra pentru răbdarea acordată pregătirii coregrafiei celui mai important dans din viața noastră!❤️💃🕺',
    rating: 5,
    highlight: 'Cea mai talentată și răbdătoare profesoară de dans',
    date: 'August 2022'
  }
];
