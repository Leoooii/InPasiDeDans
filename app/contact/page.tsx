import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
          <p className="text-gray-500 dark:text-gray-400">Contactează-ne pentru orice informații sau întrebări</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold">Adresă</h3>
                    <p className="text-gray-500">Strada Exemplu, Nr. 123, București, România</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold">Telefon</h3>
                    <p className="text-gray-500">+40 123 456 789</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-500">contact@inpasidedans.ro</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Program secretariat</h3>
                <div className="space-y-1 text-gray-500">
                  <p>Luni - Vineri: 10:00 - 20:00</p>
                  <p>Sâmbătă: 10:00 - 16:00</p>
                  <p>Duminică: Închis</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Trimite-ne un mesaj</h2>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nume</Label>
                    <Input id="name" placeholder="Numele tău" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@exemplu.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subiect</Label>
                    <Input id="subject" placeholder="Subiectul mesajului" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea id="message" placeholder="Scrie mesajul tău aici..." className="min-h-[150px]" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                    Trimite mesajul
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Locația noastră</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden border">
            <iframe
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91158.11409353752!2d26.0311541!3d44.439663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucure%C8%99ti!5e0!3m2!1sro!2sro!4v1648218144749!5m2!1sro!2sro"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27906.446609943578!2d26.05848152000265!3d44.41678693184258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff9e4072cc6f%3A0x901ceb768f754f2a!2sIn%20Pa%C8%99i%20de%20Dans!5e0!3m2!1sen!2sro!4v1743080359713!5m2!1sen!2sro" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold dark:text-black">Vino să ne cunoști</h2>
            <p className="dark:text-black">
              Te invităm să ne vizitezi pentru a cunoaște instructorii, a vedea sălile de dans și a afla mai multe
              despre cursurile noastre. Prima lecție este gratuită!
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
            >
              Programează o vizită
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

