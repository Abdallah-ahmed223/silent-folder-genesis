import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/content/site";

const contactInfo = [
  {
    icon: Mail,
    label: site.contact.info.email,
    value: "abdallah.ahmed2022222@gmail.com",
    href: "mailto:abdallah.ahmed2022222@gmail.com",
  },
  {
    icon: Phone,
    label: site.contact.info.phone,
    value: "+20 100 254 6915",
    href: "tel:+201002546915",
  },
  {
    icon: MapPin,
    label: site.contact.info.location,
    value: "Giza, Egypt",
    href: "https://maps.google.com/?q=Giza,Egypt",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-3">
      {contactInfo.map((item) => (
        <motion.a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="block premium-card p-4 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {item.label}
              </p>
              <p className="font-medium text-foreground truncate">{item.value}</p>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
