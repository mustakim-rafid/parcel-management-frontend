import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import heroImage from "@/assets/images/image-1.avif"
import image2 from "@/assets/images/image-2.avif"
import image3 from "@/assets/images/image-3.webp"
import image4 from "@/assets/images/image-4.avif"
import { Link } from "react-router"

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <section className="md:py-36 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-20">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fast. <span className="text-primary">Reliable</span>. Nationwide Parcel Delivery.
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Deliver anything, anywhere — track your packages in real-time, schedule pickups, and experience logistics made easy.
            </p>
            <div className="flex gap-4">
              <Button className="dark:text-black font-bold cursor-pointer">
                <Link to={"/register"}>Get Started</Link>
              </Button>
              <Button variant="outline" className="cursor-pointer">
                <Link to={"/about"}>Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src={heroImage}  
              alt="Parcel delivery illustration"
              className="w-full max-h-[400px] object-contain rounded-md shadow"
            />
          </div>
        </div>
      </section>
      <section className="py-20 bg-input text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg mb-12">
            From booking to doorstep delivery, we've got you covered.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <Card>
              <CardHeader>
                <img
                  src={image2}
                  alt="Book a pickup"
                  className="w-full h-50 object-cover rounded-md mb-4"
                />
                <CardTitle className="text-xl">1. Book a Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Schedule a pickup online in minutes. Choose your package type, pickup location, and delivery speed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <img
                  src={image4}
                  alt="Track your package"
                  className="w-full h-50 object-cover rounded-md mb-4"
                />
                <CardTitle className="text-xl">2. Track in Real-Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Get real-time updates from pickup to drop-off with live tracking and status alerts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <img
                  src={image3}
                  alt="Safe delivery"
                  className="w-full h-50 object-cover rounded-md mb-4"
                />
                <CardTitle className="text-xl">3. Delivered Securely</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Your package is handled by trained, verified professionals and delivered on time — every time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ship?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start delivering smarter — create your first shipment in just a few clicks.
          </p>
          <Button size="lg" className="dark:text-black font-bold cursor-pointer">
            <Link to={"/register"}>Create a Shipment</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
