import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { site } from "@/content/site";

const TARGET_EMAIL = "abdallah.ahmed2022222@gmail.com";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const fullName = `${firstName} ${lastName}`.trim();
    const emailSubject =
      subject || `New message from ${fullName || "your portfolio"}`;
    const emailBody = `Hi Abdallah,\n\n${message}\n\n— ${fullName}\n${email}`;

    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
      emailSubject,
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;

    toast({
      title: "Opening your email client",
      description: "Your message is ready to send.",
    });

    setTimeout(() => setSubmitting(false), 1000);
  };

  return (
    <div>
      <Card className="premium-card">
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6">
            {site.contact.sendMessage}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-2"
                >
                  {site.contact.form.firstName}
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder={site.contact.form.placeholders.firstName}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-2"
                >
                  {site.contact.form.lastName}
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder={site.contact.form.placeholders.lastName}
                  required
                  className="bg-background/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {site.contact.form.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={site.contact.form.placeholders.email}
                required
                className="bg-background/50"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
              >
                {site.contact.form.subject}
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder={site.contact.form.placeholders.subject}
                required
                className="bg-background/50"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {site.contact.form.message}
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder={site.contact.form.placeholders.message}
                rows={5}
                required
                className="bg-background/50 resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full group"
            >
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
              {site.contact.form.send}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
