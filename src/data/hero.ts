import { HeroSlide } from "../module/Parallax";

export const heroSlides = [
  {
    image: "/aspac-teachers-salary-loan-apds.png",
    title: "Fuel your passion for teaching with ASPAC Teachers’ Loan",
    description:
      "Our Teachers’ Salary Loan (APDS) offers flexible terms and convenient salary deduction for teachers.",

    subtitleLinkText: "Teachers’ Loan (APDS)",
    subtitleLinkTo: "/teachers-loan",

    primaryButton: {
      label: "Inquire Now",
      action: "applyModal",
    },

    secondaryButton: {
      label: "Learn More",
      to: "/teachers-loan",
    },
  },

  {
    image: "/Growyoursavings.jpg",
    title: "Grow your savings with us",
    description:
      "Open a savings or time deposit account at your nearest branch.",

    subtitleLinkText: "branch",
    subtitleLinkTo: "/branches",

    primaryButton: {
      label: "Talk to Us",
      action: "contactModal",
    },

    secondaryButton: {
      label: "View Savings",
      to: "/deposit-account",
    },
  },

  {
    image: "/Simplysafe.jpg",
    title: "Simply safe banking",
    description:
      "Straightforward services and community-first support.",

    subtitleLinkText: "latest advisories",
    subtitleLinkTo: "/advisories",

    primaryButton: {
      label: "Know More",
      action: "explore",
    },

    secondaryButton: {
      label: "View Advisories",
      to: "/advisories",
    },
  },
] as const satisfies HeroSlide[];;