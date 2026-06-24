import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Balephi Energy Pvt. Ltd. - 40MW Hydropower Project Nepal",
    template: "%s | Balephi Energy Pvt. Ltd.",
  },
  description:
    "Balephi Energy Pvt. Ltd. (BEPL) is developing the 40MW Balephi Khola Hydroelectric Project in Jugal Rural Municipality, Sindhupalchowk, Nepal. Part of RM Group. Clean, renewable energy for Nepal's future.",
  keywords: [
    "hydropower",
    "Nepal",
    "Balephi",
    "40MW",
    "renewable energy",
    "RM Group",
    "Balephi Khola",
    "hydroelectric project",
    "Sindhupalchowk",
    "clean energy",
    "Nepal hydropower",
  ],
  authors: [{ name: "Balephi Energy Pvt. Ltd." }],
  creator: "Balephi Energy Pvt. Ltd.",
  publisher: "Balephi Energy Pvt. Ltd.",
  metadataBase: new URL("https://balephienergy.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Balephi Energy Pvt. Ltd.",
    title: "Balephi Energy Pvt. Ltd. - 40MW Hydropower Project Nepal",
    description:
      "Developing the 40MW Balephi Khola Hydroelectric Project in Nepal. Part of RM Group. Clean, renewable energy for a sustainable future.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Balephi Energy - 40MW Hydropower Project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Balephi Energy Pvt. Ltd. - 40MW Hydropower Project Nepal",
    description:
      "Developing the 40MW Balephi Khola Hydroelectric Project in Nepal. Part of RM Group.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/images/logo.jpeg" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.jpeg" />
        <meta name="theme-color" color="#0C223F" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Balephi Energy Pvt. Ltd.",
              url: "https://balephienergy.com.np",
              logo: "https://balephienergy.com.np/images/logo.jpeg",
              description:
                "Balephi Energy Pvt. Ltd. is developing the 40MW Balephi Khola Hydroelectric Project in Nepal.",
              parentOrganization: {
                "@type": "Organization",
                name: "RM Group",
                url: "https://rmgroup.com.np",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kathmandu",
                addressRegion: "Bagmati",
                addressCountry: "NP",
                streetAddress: "New Baneshwor, Kathmandu-10",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+977-014791891",
                contactType: "customer service",
                email: "Balephi.energy@rmgroup.com.np",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
