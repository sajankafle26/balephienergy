import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function HomeWelcome() {
  return (
    <section className="py-24 bg-white text-center">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="h-px w-8 bg-secondary"></span>
            <h3 className="text-secondary font-bold uppercase tracking-widest text-sm">
              Welcome to Balephi Energy
            </h3>
            <span className="h-px w-8 bg-secondary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 font-heading">
            Committed to Energizing Nepal&apos;s Future
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            We are focused on developing and implementing affordable renewable
            energy projects that enhance productivity and improve Nepalese living
            standards.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center bg-primary text-white font-semibold hover:bg-primaryLight py-3.5 px-10 rounded-full transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
          >
            Learn More About Us{" "}
            <FaArrowRight className="ml-2 text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
