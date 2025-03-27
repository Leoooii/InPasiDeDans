import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageSkeleton from "@/components/image-skeleton"

export default function DansuriPopulare() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dansuri Populare</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Descoperă frumusețea și energia dansurilor tradiționale românești și internaționale
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tradiție și pasiune</h2>
            <p>
              Dansurile populare reprezintă o parte importantă a patrimoniului cultural, transmițând obiceiuri, tradiții
              și povești din generație în generație. La școala noastră, puteți învăța atât dansuri populare românești,
              cât și dansuri tradiționale din alte țări.
            </p>
            <p>
              Cursurile noastre sunt potrivite pentru toate vârstele și nivelurile de experiență, de la începători până
              la avansați. Vino să descoperi bucuria și energia dansurilor populare!
            </p>
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Înscrie-te la curs
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <ImageSkeleton width={600} height={400} className="w-full h-full" />
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="incepatori" className="w-full">
            <TabsList className="grid grid-cols-3 h-auto">
              <TabsTrigger value="incepatori">Începători</TabsTrigger>
              <TabsTrigger value="intermediari">Intermediari</TabsTrigger>
              <TabsTrigger value="avansati">Avansați</TabsTrigger>
            </TabsList>

            <TabsContent value="incepatori" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Dansuri pentru începători</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora (simplă, mințită)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional românesc în cerc, cu pași simpli, accesibil tuturor.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Sârba (în doi, trei și patru pași)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans vioi, cu ritm alert și pași laterali, foarte popular la petreceri.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Bătuta moldovenească</h3>
                      <p className="text-gray-500 text-sm">
                        Dans energic din Moldova, cu bătăi din picioare și mișcări dinamice.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Ofițereasca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans elegant cu influențe militare, cu pași măsurați și poziție dreaptă.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Musamaua</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional cu pași simpli și ritm moderat, potrivit pentru începători.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Geampara</h3>
                      <p className="text-gray-500 text-sm">
                        Dans cu influențe balcanice, cu ritm specific și mișcări expresive.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Perinița</h3>
                      <p className="text-gray-500 text-sm">
                        Dans de petrecere cu reguli simple, în care participanții se schimbă.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Brașoveanca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans popular din zona Brașovului, cu pași ritmați și figuri simple.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Sârba studenților</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă de sârbă cu ritm alert, populară în mediul studențesc.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Zvâc</h3>
                      <p className="text-gray-500 text-sm">
                        Dans dinamic cu mișcări rapide și energice, plin de vitalitate.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Ghimpele</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional cu pași specifici și ritm alert, accesibil începătorilor.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="intermediari" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Dansuri pentru intermediari</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Sârba pe loc</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă de sârbă cu pași executați pe loc, cu accent pe tehnică.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Sârba moldovenească</h3>
                      <p className="text-gray-500 text-sm">
                        Sârbă specifică zonei Moldovei, cu elemente și pași caracteristici.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Sârba dogarilor</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional cu mișcări ce imită munca dogarilor, plin de energie.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Alunelul</h3>
                      <p className="text-gray-500 text-sm">
                        Dans popular cu pași laterali și sincronizați, executat în linie.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Ungurica</h3>
                      <p className="text-gray-500 text-sm">
                        Dans cu influențe maghiare, cu ritm specific și pași caracteristici.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora-n două părți</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă de horă cu mișcări în două direcții, mai complexă decât hora simplă.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora oltenească</h3>
                      <p className="text-gray-500 text-sm">Horă specifică Olteniei, cu ritm alert și pași vioi.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora oltenească ca la Gorj</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă specifică zonei Gorjului, cu elemente distinctive.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora Lelea</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional cu figuri specifice și ritm caracteristic.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Floricica oltenească</h3>
                      <p className="text-gray-500 text-sm">
                        Dans vioi din Oltenia, cu pași rapizi și figuri expresive.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Ciuleandra</h3>
                      <p className="text-gray-500 text-sm">
                        Dans în cerc cu ritm progresiv, de la lent la foarte rapid.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Schioapa</h3>
                      <p className="text-gray-500 text-sm">
                        Dans cu pași asimetrici, ce imită mersul șchiop, cu ritm specific.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Bălăceanca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional cu elemente specifice zonei de proveniență.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Zdroboleanca</h3>
                      <p className="text-gray-500 text-sm">Dans energic cu bătăi din picioare și mișcări dinamice.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Țărăneasca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional ce reflectă viața la țară, cu pași simpli dar expresivi.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Bătrâneasca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans lent, cu pași măsurați și figuri ce exprimă înțelepciunea.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Promoroaca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans cu ritm specific și pași caracteristici, de dificultate medie.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Ariciul</h3>
                      <p className="text-gray-500 text-sm">
                        Dans cu mișcări specifice ce imită comportamentul ariciului.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hodoroaga</h3>
                      <p className="text-gray-500 text-sm">Dans tradițional cu figuri complexe și ritm variat.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Vulpița</h3>
                      <p className="text-gray-500 text-sm">
                        Dans vioi cu mișcări șirete, ce imită comportamentul vulpii.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Sălcioara</h3>
                      <p className="text-gray-500 text-sm">
                        Dans grațios cu mișcări ondulatorii, asemenea ramurilor de salcie.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Ardeleana (joc de doi din Banat)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans în pereche specific zonei Banatului, cu ritm și pași caracteristici.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Învârtita (joc de doi din Ardeal)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans în pereche din Transilvania, cu rotiri și pași sincronizați.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Cadâneasca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans cu influențe orientale, cu mișcări grațioase și ritm specific.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Rața</h3>
                      <p className="text-gray-500 text-sm">
                        Dans cu mișcări ce imită mersul rațelor, plin de umor și energie.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Fedelesul</h3>
                      <p className="text-gray-500 text-sm">Dans tradițional cu pași specifici și ritm alert.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Paidușca (dans macedonesc)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans de origine macedoneană, cu ritm asimetric și pași specifici.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Huțulca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans specific zonei huțule, cu influențe ucrainene și ritm caracteristic.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Sârba de la Oltina</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă de sârbă specifică localității Oltina, cu elemente distinctive.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora din Banat</h3>
                      <p className="text-gray-500 text-sm">
                        Horă specifică regiunii Banatului, cu pași și ritm caracteristic.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avansati" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Dansuri pentru avansați</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora bătută</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă complexă de horă cu bătăi din picioare și figuri dificile.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora boierească</h3>
                      <p className="text-gray-500 text-sm">
                        Dans elegant cu elemente complexe, specific claselor înalte de altădată.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora ca la Romanați</h3>
                      <p className="text-gray-500 text-sm">
                        Horă specifică zonei Romanați, cu figuri și pași caracteristici.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora peste picior (Moțăței)</h3>
                      <p className="text-gray-500 text-sm">
                        Horă complexă cu pași încrucișați și sărituri peste picior.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Gălăonul</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional cu figuri complexe și ritm alert, pentru dansatori experimentați.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Bordeiașul</h3>
                      <p className="text-gray-500 text-sm">Dans complex cu elemente tehnice dificile și ritm variat.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Breaza</h3>
                      <p className="text-gray-500 text-sm">
                        Dans din zona Prahova, cu pași complicați și ritm specific.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Brâul de la Făgăraș</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex specific zonei Făgăraș, cu pași tehnici și ritm alert.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Jiane (ca la Tilișca, ca la Gura Râului, ca la Avrig)</h3>
                      <p className="text-gray-500 text-sm">
                        Variante de jiene din diferite localități, fiecare cu specificul său.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Corăgheasca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex cu figuri dificile și ritm specific, pentru dansatori experimentați.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Corăgheasca de la Târnița</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă specifică localității Târnița, cu elemente distinctive.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Huțulca</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă avansată a dansului huțul, cu figuri complexe și ritm rapid.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Drumul dracului</h3>
                      <p className="text-gray-500 text-sm">
                        Dans foarte dificil cu pași complicați și ritm alert, ce necesită multă tehnică.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hangul de la Cahul</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex din zona Cahul, cu figuri specifice și ritm caracteristic.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hangul de la Talpigi</h3>
                      <p className="text-gray-500 text-sm">
                        Variantă de hang specifică localității Talpigi, cu elemente distinctive.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Risipiceanca</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex cu figuri dificile și ritm variat, pentru dansatori experimentați.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Cârligul</h3>
                      <p className="text-gray-500 text-sm">
                        Dans cu figuri complexe și schimbări de direcție, ce necesită multă tehnică.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Tropotica</h3>
                      <p className="text-gray-500 text-sm">
                        Dans alert cu multe bătăi din picioare și figuri dificile.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Trei păzește de la Bistreț</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex specific localității Bistreț, cu pași și ritm caracteristic.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hora de la Contești</h3>
                      <p className="text-gray-500 text-sm">
                        Horă specifică localității Contești, cu figuri complexe și ritm alert.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Pâmporea (dans macedonesc)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans de origine macedoneană, cu ritm complex și figuri dificile.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Ceancul (dans macedonesc)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans macedonean cu ritm asimetric și pași complicați, pentru avansați.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Arnăuțeasca de la Crivina</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex specific localității Crivina, cu influențe balcanice.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Sârba de la Izvoare</h3>
                      <p className="text-gray-500 text-sm">Variantă complexă de sârbă specifică localității Izvoare.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Căluşul</h3>
                      <p className="text-gray-500 text-sm">
                        Dans ritual complex, cu figuri acrobatice și ritm alert, ce necesită multă tehnică.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Rustemul oltenesc</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex din Oltenia, cu figuri dificile și ritm alert.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Brâul pe șase</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex cu ritm în 6 timpi și figuri dificile, pentru dansatori experimentați.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Brâul pe opt</h3>
                      <p className="text-gray-500 text-sm">
                        Dans complex cu ritm în 8 timpi și figuri dificile, pentru dansatori experimentați.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Hasapiko (dans grecesc)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans tradițional grecesc, cu pași sincronizați și ritm specific.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">Ikariotiko (dans grecesc)</h3>
                      <p className="text-gray-500 text-sm">
                        Dans grecesc complex, originar din insula Ikaria, cu ritm progresiv.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Programul Cursurilor</h2>
          <div className="grid gap-4">
            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Românești - Începători</h3>
                <p className="text-gray-500">Instructor: Ion Marin</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Marți, 18:00 - 19:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Balcanice - Mixt</h3>
                <p className="text-gray-500">Instructor: Elena Popescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Joi, 19:00 - 20:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Internaționale - Mixt</h3>
                <p className="text-gray-500">Instructor: Mihai Ionescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Sâmbătă, 11:00 - 13:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageSkeleton width={600} height={400} className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Alătură-te ansamblului nostru</h2>
              <p className="mb-6">
                Pentru cei pasionați, oferim posibilitatea de a face parte din ansamblul nostru de dansuri populare,
                care participă la diverse evenimente culturale și festivaluri.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Contactează-ne
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

