import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({
    name: "",
    email: "",
    subject: "",
    message: "",
    })
  }

  return (
    <div className="md:py-24 py-10 px-4 bg-background text-foreground min-h-screen">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="text-muted-foreground">
            We'd love to hear from you. Whether it's a question about deliveries, partnership opportunities,
            or general feedback — our team is ready to help.
          </p>
          <div>
            <h2 className="font-semibold mb-1">📍 Office Address</h2>
            <p className="text-sm text-muted-foreground">
              123 Delivery Lane, Logistics City, Country 45678
            </p>
          </div>
          <div>
            <h2 className="font-semibold mb-1">📧 Email</h2>
            <p className="text-sm text-muted-foreground">support@parcelsystem.com</p>
          </div>
          <div>
            <h2 className="font-semibold mb-1">📞 Phone</h2>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Regarding delivery issue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <Input
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full cursor-pointer dark:text-black font-bold">
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl font-semibold mb-2">✅ Message Sent</p>
                <p className="text-muted-foreground">Thank you for contacting us. We’ll get back to you soon.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
