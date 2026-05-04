import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";

const socialLinks = [
  { icon: Github, href: "https://github.com/abdallah-ahmed222", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abdallah-ahmed-783512231/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:abdallah.ahmed2022222@gmail.com", label: "Email" },
];

export default function SocialLinks() {
  return (
    <div className="pt-4">
      <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider font-mono">
        {site.contact.followMe}
      </h4>
      <div className="flex gap-3">
        {socialLinks.map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 border border-primary/20 hover:border-primary"
          >
            <social.icon className="w-5 h-5" />
            <span className="sr-only">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
