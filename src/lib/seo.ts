import { Metadata } from "next";

const baseUrl = "https://balephienergy.com.np";

export function generatePageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title: `${title} | Balephi Energy Pvt. Ltd.`,
      description,
      url: `${baseUrl}${path}`,
      siteName: "Balephi Energy Pvt. Ltd.",
      type: "website",
      images: ["/images/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Balephi Energy Pvt. Ltd.`,
      description,
      images: ["/images/og-image.jpg"],
    },
  };
}

export const pageData = {
  home: {
    title: "Balephi Energy Pvt. Ltd. - 40MW Hydropower Project Nepal",
    description: "Balephi Energy Pvt. Ltd. is developing the 40MW Balephi Khola Hydroelectric Project in Sindhupalchowk, Nepal. Part of RM Group. Clean, renewable energy for Nepal.",
    path: "/",
  },
  about: {
    title: "About Us",
    description: "Learn about Balephi Energy Pvt. Ltd. (BEPL), the developer of the 40MW Balephi Khola Hydroelectric Project. Our milestones, vision, and commitment to renewable energy in Nepal.",
    path: "/about",
  },
  chairman: {
    title: "Message from Chairman",
    description: "Read the message from Mr. Krishna Acharya, Chairman of RM Group and Chief of Management for Balephi Energy, on Nepal's hydropower future.",
    path: "/chairman",
  },
  team: {
    title: "Our Team",
    description: "Meet the Board of Directors and Core Management team of Balephi Energy Pvt. Ltd., driving Nepal's 40MW Balephi Khola Hydroelectric Project forward.",
    path: "/team",
  },
  project: {
    title: "Project Details - 40MW Balephi Khola HEP",
    description: "Technical specifications, project status, and site access details for the 40MW Balephi Khola Hydroelectric Project in Sindhupalchowk, Nepal.",
    path: "/project",
  },
  rmgroup: {
    title: "RM Group Projects",
    description: "Explore the RM Group's hydropower portfolio across Nepal, including Bindhyabasini, Modi, Khimti 2, Langtang, and Balephi Khola HEP projects.",
    path: "/rmgroup",
  },
  gallery: {
    title: "Project Gallery",
    description: "View photos and images of the 40MW Balephi Khola Hydroelectric Project construction site and surroundings in Sindhupalchowk, Nepal.",
    path: "/gallery",
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with Balephi Energy Pvt. Ltd. Head office in Kathmandu and site office in Sindhupalchowk. Phone, email, and location details.",
    path: "/contact",
  },
};
