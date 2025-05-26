import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';

export default function Program() {
  return (
    <div className="container py-12">
      <Head />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Program cursuri</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Consultă programul complet al cursurilor noastre de dans
          </p>
        </div>

        <Tabs defaultValue="luni și miercuri" className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-4 h-auto">
            <TabsTrigger value="luni și miercuri">Luni și Miercuri</TabsTrigger>
            <TabsTrigger value="marti și joi">Marți și Joi</TabsTrigger>
            <TabsTrigger value="vineri">Vineri</TabsTrigger>
            <TabsTrigger value="sambata">Sâmbătă</TabsTrigger>
            
          </TabsList>

          <TabsContent value="luni și miercuri" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Program Luni și Miercuri
                </h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="18:30 - 19:45"
                    course="Latino și societate (Intermediari 1)"
                    instructor="Miriam"
                    room="Sala 3"
                  />
                  <ScheduleItem
                    time="18:30 - 19:30"
                    course="Salsa și bachata (Începători)"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="18:30 - 19:45"
                    course="Dansuri populare (Intermediari 1)"
                    instructor="Cătălina"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="19:45 - 20:45"
                    course="Latino și societate (Începători)"
                    instructor="Miriam"
                    room="Sala 3"
                  />
                  <ScheduleItem
                    time="19:45 - 21:00"
                    course="Latino și societate (Intermediari 3)"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="19:45 - 21:00"
                    course="Dansuri populare (Intermediari 2)"
                    instructor="Cătălina"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="21:00 - 22:15"
                    course="Salsa și bachata (Intermediari 3)"
                    instructor="Alexandra și Nicholas"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="21:00 - 22:15"
                    course="Dansuri populare (Avansati)"
                    instructor="Cătălina"
                    room="Sala 3"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marti și joi" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Program Marți și Joi</h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="17:15 - 18:15"
                    course="Grupă copii intermediari (7-12 ani)"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="18:30 - 19:45"
                    course="Dansuri populare (Avansați)"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="18:30 - 19:45"
                    course="Dansuri populare (Intermediari 3)"
                    instructor="Cătălina"
                    room="Sala 3"
                  />
                  <ScheduleItem
                    time="19:45 - 20:45"
                    course="Dansuri populare (Începători)"
                    instructor="Cătălina"
                    room="Sala 3"
                  />
                  <ScheduleItem
                    time="19:45 - 21:00"
                    course="Salsa și bachata (Intermediari 2)"
                    instructor="Alexandra și Nicholas"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="21:00 - 22:15"
                    course="Latino și societate (Avansați)"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="21:00 - 22:15"
                    course="Dansuri populare (Intermdiari 2)"
                    instructor="Cătălina"
                    room="Sala 3"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vineri" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Program Vineri</h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="18:30 - 19:30"
                    course="Grupă copii intermediari (9-14 ani)"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="19:30 - 20:30"
                    course="Dansuri populare (Intermediari 1)"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="19:30 - 20:30"
                    course="Dansuri populare (Intermediari 1)"
                    instructor="Cătălina"
                    room="Sala 3"
                  />
                  <ScheduleItem
                    time="20:30 - 21:30"
                    course="Dansuri populare (Intermediari 1)"
                    instructor="Cătălina"
                    room="Sala 3"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sambata" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Program Sâmbătă</h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="11:00 - 12:00"
                    course="Formație copii intermediari"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="12:00 - 13:00"
                    course="Grupă copii intermediari (9-14 ani)"
                    instructor="Alexandra"
                    room="Sala 2"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="duminica" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Program Duminică</h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="11:00 - 13:00"
                    course="Dans pentru Nuntă - Personalizat"
                    instructor="Alexandru și Maria"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="14:00 - 16:00"
                    course="Practică Liberă (pentru cursanți)"
                    instructor="Supraveghere instructor de serviciu"
                    room="Sala Mare"
                  />
                  <ScheduleItem
                    time="17:00 - 19:00"
                    course="Workshop (în funcție de calendar)"
                    instructor="Invitat special"
                    room="Sala Mare"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold dark:text-black">
              Rezervă-ți locul la curs
            </h2>
            <p className="dark:text-black mb-10">
              Pentru a asigura calitatea cursurilor, numărul de participanți
              este limitat. Rezervă-ți locul din timp pentru a te asigura că
              poți participa la cursul dorit.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Rezervă acum
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}

function ScheduleItem({
  time,
  course,
  instructor,
  room,
}: {
  time: string;
  course: string;
  instructor: string;
  room: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
      <div className="md:w-1/4">
        <p className="font-semibold">{time}</p>
      </div>
      <div className="md:w-2/5">
        <p className="font-medium">{course}</p>
      </div>
      <div className="md:w-1/5">
        <p className="text-gray-500">{instructor}</p>
      </div>
      <div className="md:w-1/5 text-right">
        <p className="text-gray-500">{room}</p>
      </div>
    </div>
  );
}
