import { Star, Quote, Heart, Link } from 'lucide-react';
import { Button } from './ui/button';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  highlight: string;
}

interface TestimonialsSectionProps {
  danceType?: 'latino' | 'societate' | 'default';
}

const latinoTestimonials: Testimonial[] = [
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

const societateTestimonials: Testimonial[] = [
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

export default function TestimonialsSection({ danceType = 'default' }: TestimonialsSectionProps) {
  // Selectăm testimoniale în funcție de tipul de dans
  const getTestimonials = () => {
    switch (danceType) {
      case 'latino':
        return latinoTestimonials;
      case 'societate':
        return societateTestimonials;
      default:
        return latinoTestimonials; // Fallback la testimoniale latino
    }
  };

  const testimonials = getTestimonials();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ce spun cursanții noștri
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descoperă experiențele autentice ale cursanților noștri și cum dansul le-a schimbat viața
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative p-8 rounded-2xl ${
                index % 2 === 0 
                  ? 'bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500' 
                  : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-500'
              } hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-red-500" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="w-6 h-6 text-yellow-500 fill-current mx-1"
                  />
                ))}
              </div>

              {/* Highlight Text */}
              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-gray-800 italic">
                  "{testimonial.highlight}"
                </p>
              </div>

              {/* Full Testimonial */}
              <p className="text-gray-700 leading-relaxed mb-8 text-center">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <p className="font-bold text-gray-900 text-lg">
                  {testimonial.name}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-10">
                <Heart className="w-12 h-12 text-red-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
