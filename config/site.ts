export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "GrootHub",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    { id: "about", label: "About", href: "/about" },
    { id: "faq", label: "FAQ", href: "/faq" },
    {
      id: "help",
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    // {
    //   label: "Settings",
    //   href: "/settings",
    // },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
  features: [
    { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
    { icon: "💳", title: "Secure Payment", desc: "Safe & encrypted" },
    { icon: "↩️", title: "Easy Returns", desc: "30-day policy" },
    { icon: "🎧", title: "24/7 Support", desc: "Always here to help" },
  ],
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  grootHub: [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: "💳",
      title: "Secure Payment",
      description: "Your payment information is safe with us",
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      description: "Get help whenever you need it",
    },
  ],
};
