import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";
import SocialLinks from "./contact/SocialLinks";
import { site } from "@/content/site";

const floatingElements = [
  { id: 1, x: "10%", y: "20%" },
  { id: 2, x: "90%", y: "30%" },
  { id: 3, x: "15%", y: "80%" },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-stage relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 neural-grid opacity-8" />

      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full opacity-40 pointer-events-none"
          style={{ left: element.x, top: element.y }}
          aria-hidden
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <div>
          <div className="text-center mb-16">
            <div className="identity-panel px-6 py-3 inline-flex items-center mb-8">
              <div className="w-2 h-2 bg-primary rounded-full mr-3 shrink-0" />
              <span className="text-xs sm:text-sm font-neural text-accent font-code tracking-wider">
                {site.contact.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              {site.contact.title}{" "}
              <span className="text-primary">{site.contact.titleHighlight}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {site.contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="premium-card p-6">
                <h3 className="text-2xl font-semibold mb-6">
                  {site.contact.letsConnect}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {site.contact.connectDescription}
                </p>
              </div>

              <ContactInfo />
              <SocialLinks />
            </div>

            <ContactForm />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/40 pointer-events-none z-[5]" />
    </section>
  );
}
