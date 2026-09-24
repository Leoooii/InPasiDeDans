// Imaginile din galeriile „Atmosfera de la cursurile noastre" (componenta GalerieFoto).

export type ImagineGalerie = { src: string; alt: string };

export const GALERIE_SOCIETATE: ImagineGalerie[] = [
    { src: '/images/societate/1.jpeg', alt: 'Workshop vals - învățăm grația și eleganța mișcărilor' },
    { src: '/images/societate/2.jpeg', alt: 'Workshop tango - descoperim pasiunea și dramă dansului' },
    { src: '/images/societate/3.jpeg', alt: 'Workshop foxtrot - perfecționăm fluiditatea și sofisticarea' },
    { src: '/images/societate/4.jpeg', alt: 'Workshop quickstep - ne bucurăm de energia și veselia dansului' },
    { src: '/images/societate/5.jpeg', alt: 'Workshop vals vienez - învățăm rotațiile elegante și rapide' },
    { src: '/images/societate/6.jpeg', alt: 'Workshop dansuri de societate - momente de armonie și frumusețe' },
    { src: '/images/societate/7.jpeg', alt: 'Workshop final - celebram progresul și farmecul dansului' }
];

export const GALERIE_LATINO: ImagineGalerie[] = [
    { src: '/images/latino/1.jpeg', alt: 'Atmosferă vibrantă la cursurile de salsa - energie și pasiune' },
    { src: '/images/latino/2.jpeg', alt: 'Curs bachata - momente de conexiune și senzualitate' },
    { src: '/images/latino/3.jpeg', alt: 'Workshop cha-cha - ritm și precizie în mișcări' },
    { src: '/images/latino/4.jpeg', alt: 'Atmosferă caldă la cursurile de rueda - comunitate și bucurie' },
    { src: '/images/latino/5.jpeg', alt: 'Curs rumba - eleganță și expresivitate în dans' },
    { src: '/images/latino/6.jpeg', alt: 'Workshop samba - energie braziliană și ritm contagios' },
    { src: '/images/latino/7.jpeg', alt: 'Curs lindy hop - veselie și improvizație în mișcare' },
    // { src: '/images/latino/8.jpeg', alt: 'Atmosferă vibrantă la cursurile de jive - energie și bucurie' },
    { src: '/images/latino/9.jpeg', alt: 'Workshop paso doble - dramă și intensitate în dans' },
    { src: '/images/latino/10.jpeg', alt: 'Cursuri latino - momente de conexiune și prietenie' },
    { src: '/images/latino/11.jpeg', alt: 'Atmosferă plină de viață la cursurile de dans latino' },
    { src: '/images/latino/12.jpeg', alt: 'Comunitate vibrantă de dansatori latino - bucurie și energie' },
    { src: '/images/latino/13.jpeg', alt: 'Celebrarea progresului la cursurile de dans latino' }
];

export const GALERIE_POPULARE: ImagineGalerie[] = [1, 2, 3, 4, 5, 6, 7, 8].map(n => ({
  src: `/images/populare/${n}.jpeg`,
  alt: `Dansuri populare la În Pași de Dans – fotografia ${n}`,
}));
