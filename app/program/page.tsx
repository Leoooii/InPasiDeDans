import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Program() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Program Cursuri</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Consultă programul complet al cursurilor noastre de dans
          </p>
        </div>

        <Tabs defaultValue="luni" className="w-full">
          <TabsList className="grid grid-cols-4 h-auto">
            <TabsTrigger value="luni si miercuri">Luni si Miercuri</TabsTrigger>
            <TabsTrigger value="marti si joi">Marți si Joi</TabsTrigger>
            {/* <TabsTrigger value="miercuri">Miercuri</TabsTrigger> */}
            {/* <TabsTrigger value="joi">Joi</TabsTrigger> */}
            <TabsTrigger value="vineri">Vineri</TabsTrigger>
            <TabsTrigger value="sambata">Sâmbătă</TabsTrigger>
            {/* <TabsTrigger value="duminica">Duminică</TabsTrigger> */}
          </TabsList>

          <TabsContent value="luni si miercuri" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Program Luni si Miercuri
                </h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="16:00 - 17:00"
                    course="Dans pentru Copii (4-6 ani)"
                    instructor="Ana Maria"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="17:30 - 19:00"
                    course="Dans de Societate - Începători"
                    instructor="Alexandru și Maria"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="19:00 - 20:30"
                    course="Salsa - Începători"
                    instructor="Carlos Mendez"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="20:00 - 21:30"
                    course="Dans de Societate - Avansați"
                    instructor="Cristian și Ana"
                    room="Sala 2"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marti si joi" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Program Marți si Joi</h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="16:00 - 17:00"
                    course="Dans pentru Copii (4-6 ani)"
                    instructor="Ana Maria"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="17:30 - 19:00"
                    course="Dansuri Românești - Începători"
                    instructor="Ion Marin"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="18:00 - 19:30"
                    course="Bachata - Începători"
                    instructor="Elena și Andrei"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="19:30 - 21:00"
                    course="Dans de Societate - Intermediari"
                    instructor="Mihai și Elena"
                    room="Sala 2"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="miercuri" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Program Miercuri</h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="16:30 - 17:30"
                    course="Dans pentru Copii (7-10 ani)"
                    instructor="Maria Popescu"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="18:00 - 19:30"
                    course="Dans de Societate - Începători"
                    instructor="Alexandru și Maria"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="19:00 - 20:30"
                    course="Salsa - Începători"
                    instructor="Carlos Mendez"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="20:00 - 21:30"
                    course="Dans de Societate - Avansați"
                    instructor="Cristian și Ana"
                    room="Sala 2"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="joi" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Program Joi</h2>
                <div className="space-y-4">
                  <ScheduleItem
                    time="16:00 - 17:00"
                    course="Dans pentru Copii (4-6 ani)"
                    instructor="Ana Maria"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="18:00 - 19:30"
                    course="Bachata - Începători"
                    instructor="Elena și Andrei"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="19:00 - 20:30"
                    course="Dansuri Balcanice - Mixt"
                    instructor="Elena Popescu"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="19:30 - 21:00"
                    course="Dans de Societate - Intermediari"
                    instructor="Mihai și Elena"
                    room="Sala 1"
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
                    time="16:00 - 17:30"
                    course="Dans pentru Copii (7-10 ani)"
                    instructor="Ana Maria"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="17:30 - 19:00"
                    course="Dans pentru Adolescenți (11-14 ani)"
                    instructor="Maria Popescu"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="18:00 - 20:00"
                    course="Dans de Societate - Avansați"
                    instructor="Cristian și Ana"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="19:00 - 21:00"
                    course="Latino Mix - Intermediari"
                    instructor="Maria Dumitrescu"
                    room="Sala 2"
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
                    time="10:00 - 11:00"
                    course="Dans pentru Copii (4-6 ani)"
                    instructor="Ana Maria"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="11:00 - 13:00"
                    course="Dansuri Internaționale - Mixt"
                    instructor="Mihai Ionescu"
                    room="Sala 2"
                  />
                  <ScheduleItem
                    time="14:00 - 16:00"
                    course="Workshop Dans Contemporan"
                    instructor="Elena Dumitrescu"
                    room="Sala 1"
                  />
                  <ScheduleItem
                    time="18:00 - 22:00"
                    course="Petrecere Tematică (în funcție de calendar)"
                    instructor="Toți instructorii"
                    room="Sala Mare"
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
            <p className="dark:text-black">
              Pentru a asigura calitatea cursurilor, numărul de participanți
              este limitat. Rezervă-ți locul din timp pentru a te asigura că
              poți participa la cursul dorit.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
            >
              Rezervă acum
            </Button>
          </div>
        </div>
      </div>
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
