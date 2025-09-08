import image from "@/assets/images/image-2.avif"

const About = () => {

  return (
    <div>
      <div className="flex flex-col items-center justify-center md:py-32 py-10 bg-background text-foreground mx-5">
        <div className="w-full max-w-4xl p-8 bg-card text-card-foreground shadow-lg rounded-lg">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0">
                <img className="rounded-lg" src={image} alt="" />
            </div>

            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              <p className="text-lg mb-4">
                <strong>Reliable. Fast. Secure.</strong><br />
                We are a technology-driven parcel delivery platform focused on making shipping simple, transparent, and efficient. Our mission is to connect individuals and businesses with a seamless way to send and receive packages — anytime, anywhere.
              </p>
              <p className="text-lg">
                With real-time tracking, automated dispatching, and a user-friendly interface, our system ensures every delivery is handled with care and precision. Whether it's a small document or a large shipment, we offer the tools and support to get it where it needs to go — on time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground">Why Choose Us?</h2>
            <p className="mt-4 text-lg">
              We’re committed to redefining parcel delivery with technology, reliability, and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="text-3xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Real-Time Tracking</h3>
              <p className="text-sm">
                Stay updated every step of the way with live package tracking.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Flexible Delivery Options</h3>
              <p className="text-sm">
                Choose from standard, express, or same-day delivery to meet your needs.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="text-3xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Secure Handling</h3>
              <p className="text-sm">
                Verified delivery agents and secure packaging ensure peace of mind.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">24/7 Support</h3>
              <p className="text-sm">
                Our support team is always here to help — anytime you need us.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-foreground">
              Join thousands who trust us to move what matters.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About