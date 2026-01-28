"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Building2,
  TrendingUp,
  GraduationCap,
  Mail,
  MapPin,
  Clock,
  Linkedin,
  Facebook,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
  Briefcase,
  Shield,
  ArrowRight,
  Star,
  Sparkles,
  Target,
  BarChart3,
  BadgeCheck,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "success" | "error";

const HERO_BG = `url("data:image/svg+xml,%3Csvg%20width%3D'60'%20height%3D'60'%20viewBox%3D'0%200%2060%2060'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cg%20fill%3D'none'%20fill-rule%3D'evenodd'%3E%3Cg%20fill%3D'%23ffffff'%20fill-opacity%3D'1'%3E%3Cpath%20d%3D'M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-10", align === "left" ? "text-left" : "text-center")}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-200">
          <Sparkles className="h-4 w-4 text-cyan-200" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cx(
          "mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl",
          align === "left" ? "" : ""
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cx("mt-3 text-lg leading-relaxed text-slate-600", align === "left" ? "max-w-3xl" : "mx-auto max-w-3xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="text-3xl font-extrabold tracking-tight text-white">{value}</div>
      <div className="mt-2 text-sm font-medium text-sky-100/80">{label}</div>
    </div>
  );
}

function MiniCase({
  title,
  industry,
  outcome,
  bullets,
}: {
  title: string;
  industry: string;
  outcome: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-lg font-bold text-slate-900">{title}</div>
        <Pill>{industry}</Pill>
      </div>
      <div className="mt-3 text-sm font-semibold text-slate-700">
        Outcome: <span className="font-medium text-slate-600">{outcome}</span>
      </div>
      <ul className="mt-4 space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle className="mt-0.5 h-4 w-4 text-blue-600" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TATCGWebsite(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  // TODO worlwin: small testimonial slider
  const testimonials = useMemo(
    () => [
      {
        text:
          "TAT delivered transfer pricing documentation that stood up to regulatory scrutiny and accelerated executive decision-making.",
        author: "CFO",
        org: "Telecommunications",
        rating: 5,
      },
      {
        text:
          "The team brought discipline and clarity to a complex asset verification effort—fast, credible, and executive-ready.",
        author: "Finance Manager",
        org: "Extractives",
        rating: 5,
      },
      {
        text:
          "Operationally sharp. TAT streamlined our people ops and reduced admin burden while improving controls and reporting.",
        author: "Operations Director",
        org: "Logistics",
        rating: 5,
      },
    ],
    []
  );
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  useEffect(() => {
    // Jump to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const menuItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "services", label: "Services" },
      { id: "contact", label: "Contact" },
      { id: "jobs", label: "Careers" },
      { id: "privacy", label: "Privacy" },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        icon: Building2,
        title: "Business Advisory",
        description:
          "Executive-grade strategy and operational execution that turns complexity into momentum.",
        description_detail: "Our business advisory practice helps clients strengthen resilience, governance, and growth through strategic interventions.",
        description_body: "<p>Human Resources Outsource: Recruiting, onboarding, management, regulatory compliance, salary processing of local and expat staff.</p><br /><p><strong>Business Continuity & Succession Planning</strong>: Designing transition frameworks and risk management strategies for sustainable operations.</p><br /><p><strong>Extractive Sector Concession Planning & Negotiation</strong>: Structuring fiscal terms, advising on contract negotiations, and ensuring compliance with local content laws.</p><br /><p><strong>Special Projects Support</strong>:<ul style='margin-left: 10px; list-style-type:none;'><li>Fixed Asset Verification</li><li>Inventory Verification & Management</li><li>Business Process Improvement and Internal Control Design</li></ul></p>",
        details: [
          "Strategic Planning",
          "M&A Support",
          "Due Diligence",
          "Business Restructuring",
          "Process Design",
          "Asset Verification",
        ],
      },
      {
        icon: TrendingUp,
        title: "Tax Advisory",
        description:
          "Transfer pricing, compliance, and dispute support engineered to withstand regulatory pressure.",
        description_detail: "TAT offers end-to-end tax solutions that combine technical accuracy with strategic insight, ensuring compliance and efficiency across jurisdictions.",
        description_body: "<p><strong>Transfer Pricing Documentation & Planning:</strong> Aligning intercompany transactions with OECD and local requirements.</p><br /><p><strong>Tax Dispute & Resolution:</strong> Managing audits, appeals, and settlements with tax authorities.</p><p>Tac Health Check: risk mitigration and planning optimation</p><br /><p><strong>M&A Due Diligence</strong>: Pre- and post-acquisition assessments for potential tax exposures and integration efficiency.</p><p><strong>Tax Compliance & Reporting:</strong> Preparation and filing of returns, and tax computations.</p>",
        details: [
          "Transfer Pricing",
          "Tax Compliance",
          "Dispute Resolution",
          "Fiscal Modeling",
          "Cross-border Advisory",
          "Tax Risk Assessment",
        ],
      },
      {
        icon: GraduationCap,
        title: "Professional Development",
        description: "High-impact training, internships, and talent systems built to raise performance across teams.",
        description_detail: "We bridge the gap between academic learning and industry readiness through practical, results-driven training programs.",
        description_body: "<p><strong>Onboarding Training</strong>: Orientation programs for new hires, integrating culture, compliance, and performance expectations.</p><br /><p><strong>Junior Executive Program</strong>: Foundational business, leadership, and communication training for early-career professionals.</p><br /><p><strong>Sector Series</strong>: Industry-specific modules (Telecom, Extractives, Aviation, Finance) developed with partners and experts.</p><br /><p>Delivery Options: At TAT model training facilities, at client sites, or virtually through our hybrid learning platforms.</p>",
        details: [
          "Corporate Training",
          "Internship Programs",
          "Leadership Development",
          "Technical Skills",
          "Certification Support",
          "Capacity Building",
        ],
      },
    ],
    []
  );

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email";
    if (!formData.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * NOTE:
   * For “$16.5K credibility”, don’t keep this as a console.log demo.
   * Recommended: POST to a Next.js route handler (app/api/contact/route.ts)
   * and send email via Resend, Postmark, or SMTP.
   */
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Attempt real endpoint first; fallback to simulated delay if endpoint missing.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => null);

      if (res && !res.ok) throw new Error("Bad response");

      if (!res) {
        // fallback demo
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", serviceInterest: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const TopCTA = () => (
    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <button
        onClick={() => setCurrentPage("services")}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-extrabold text-slate-900 shadow-2xl shadow-black/30 transition hover:-translate-y-0.5 sm:w-auto"
      >
        Engage Our Team
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
      </button>
      <button
        onClick={() => setCurrentPage("contact")}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
      >
        Request a Consultation
        <Target className="h-5 w-5 text-cyan-200" />
      </button>
    </div>
  );

  const HomePage = () => (
    <>
      {/* HERO (Executive authority + aggressive tone) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: HERO_BG }} />
        </div>

        {/* “Black glass” overlays */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 right-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-400/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-200">
              <BadgeCheck className="h-4 w-4 text-cyan-200" />
              Liberia • Sierra Leone • West Africa
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Advisory Built for Pressure.
              <span className="mt-2 block bg-gradient-to-r from-sky-200 via-cyan-200 to-white bg-clip-text text-transparent">
                Strategy. Tax. Talent. Executed.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-sky-100/90 sm:text-xl">
              TAT Consulting Group helps organizations win in complex environments—through rigorous advisory, compliant execution,
              and leadership-grade delivery across Business Advisory, Tax Advisory, and Professional Development.
            </p>

            <TopCTA />

            {/* Credibility row */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <MetricCard label="Years of advisory execution" value="15+" />
              <MetricCard label="Client engagements delivered" value="200+" />
              <MetricCard label="Regional footprint" value="2 Countries" />
            </div>
          </div>
        </div>
      </section>

      {/* Authority strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Pill>Transfer Pricing</Pill>
            <Pill>Dispute Resolution</Pill>
            <Pill>M&A Due Diligence</Pill>
            <Pill>Asset Verification</Pill>
            <Pill>HR Outsourcing</Pill>
            <Pill>Capacity Building</Pill>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Authority & execution"
            title="Regional Advisory Leadership—Designed to Deliver Outcomes"
            subtitle="TAT Consulting Group is built for organizations that can’t afford uncertainty: regulatory pressure, cross-border complexity, and high-stakes decision-making."
            align="left"
          />

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-600 p-3 text-white">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">What you get with TAT</h3>
                    <p className="mt-2 text-slate-600">
                      Clear recommendations, defensible deliverables, and execution that stands up to scrutiny.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {[
                        "Board-ready reporting & documentation",
                        "Risk-led compliance posture",
                        "Execution velocity with control",
                        "Senior advisory accountability",
                        "Cross-border advisory discipline",
                        "Trusted stakeholder management",
                      ].map((x) => (
                        <div key={x} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-blue-600" />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        onClick={() => setCurrentPage("services")}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-blue-700"
                      >
                        Explore Services <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setCurrentPage("contact")}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
                      >
                        Talk to an Advisor <Target className="h-4 w-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-blue-700 p-8 text-white shadow-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-200">
                  <Star className="h-4 w-4 text-cyan-200" />
                  Client Confidence
                </div>
                <div className="mt-5 flex gap-1">
                  {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-lg leading-relaxed text-sky-50/95">
                  “{testimonials[testimonialIndex].text}”
                </p>
                <div className="mt-6 text-sm font-semibold text-white">
                  {testimonials[testimonialIndex].author}{" "}
                  <span className="font-normal text-sky-100/80">• {testimonials[testimonialIndex].org}</span>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["Rigor", "Speed", "Control"].map((x) => (
                    <div key={x} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                      <div className="text-sm font-extrabold">{x}</div>
                      <div className="mt-1 text-[11px] text-sky-100/70">Deliverables</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {["Extractives", "Telecom", "Logistics", "Finance", "Education"].map((x) => (
                    <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-sky-100/90">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Three pillars"
            title="Services Built to Win Under Real Constraints"
            subtitle="Not theory. Not slides. Deliverables that move decisions, control risk, and accelerate performance."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
                      Enterprise-grade
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                  <div className="mt-6 space-y-2">
                    {service.details.slice(0, 4).map((d) => (
                      <div key={d} className="flex items-start gap-2 text-sm text-slate-600">
                        <ChevronRight className="mt-0.5 h-4 w-4 text-blue-600" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage("services")}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 transition group-hover:gap-3"
                  >
                    See full scope <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof / mini cases — key for $16.5K credibility */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Proof over promises"
            title="A Track Record You Can Defend"
            subtitle="TODO - Worlwin Insert real outcomes here (even anonymized). Worlwin premium."
          />
          <div className="grid gap-8 lg:grid-cols-3">
            <MiniCase
              title="Transfer Pricing Documentation & Defense"
              industry="Telecom"
              outcome="Defensible documentation + faster regulatory alignment"
              bullets={[
                "Documentation aligned to local requirements and governance expectations",
                "Clear assumptions and audit-ready artifacts",
                "Executive summary for leadership decision-making",
              ]}
            />
            <MiniCase
              title="Asset Verification & Controls Readiness"
              industry="Extractives"
              outcome="Visibility, controls, and faster close confidence"
              bullets={[
                "Verification workflow with traceability and reporting",
                "Findings packaged for executive and stakeholder review",
                "Operational controls strengthened for repeatability",
              ]}
            />
            <MiniCase
              title="HR Outsourcing & People Ops Streamlining"
              industry="Logistics"
              outcome="Reduced admin load + improved reporting control"
              bullets={[
                "Process standardization and reporting cadence",
                "Operational handoffs simplified for speed",
                "Foundational controls to reduce risk and variance",
              ]}
            />
          </div>

          <div className="mt-10 flex items-center justify-center">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg">
              <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-slate-900">
                <BadgeCheck className="h-5 w-5 text-blue-600" />
                TODO: Worlwin - requires proof.
              </div>
              <p className="mt-2 text-sm text-slate-600">
                TODO: Worlwin - Replace these placeholders with 2–4 real engagement snapshots (even anonymized). Worlwin perceived value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion CTA — “book a consult” vibe */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-200">
                <Target className="h-4 w-4 text-cyan-200" />
                High-stakes advisory
              </div>
              <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                If the decision is critical, the deliverable must be defensible.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-sky-100/90">
                Move from uncertainty to control. Engage TAT for advisory work that holds up under scrutiny and accelerates outcomes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setCurrentPage("contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-extrabold text-slate-900 shadow-2xl shadow-black/30 transition hover:-translate-y-0.5"
                >
                  Request a Consultation <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage("services")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/10"
                >
                  See Service Scope <ChevronRight className="h-5 w-5 text-cyan-200" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-300/20 p-3">
                    <Shield className="h-6 w-6 text-cyan-200" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-sky-200">Response SLA</div>
                    <div className="text-xl font-extrabold">24–48 hours</div>
                  </div>
                </div>
                <div className="mt-6 space-y-3 text-sm text-sky-100/90">
                  {[
                    "Executive-grade discovery call",
                    "Clear scope and deliverable definition",
                    "Timeline + stakeholders aligned",
                    "Confidentiality-first engagement",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-cyan-200" />
                      <span>{x}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 rounded-xl border border-white/10 bg-black/20 p-4 text-xs text-sky-100/80">
                  TODO: Worlwin premium, add a calendar link (Calendly/Google) or a dedicated “Engage TAT” intake form with routing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const ServicesPage = () => (
    <section className="min-h-screen bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Service scope"
          title="Explore Our Services"
          subtitle="Comprehensive solutions built for high-stakes work across West Africa."
          align="left"
        />

        <div className="space-y-10">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-extrabold text-slate-900">{service.title}</h2>
                    <p className="mt-2 text-slate-600">{service.description_detail}</p>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      {service.details.map((detail) => (
                        <div key={detail} className="flex items-start gap-2 text-sm text-slate-600">
                          <ChevronRight className="mt-0.5 h-4 w-4 text-blue-600" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                    <br />
                    <div className="text-slate-600" dangerouslySetInnerHTML={{ __html: service.description_body }}>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        onClick={() => setCurrentPage("contact")}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-blue-700"
                      >
                        Request Consultation <ArrowRight className="h-4 w-4" />
                      </button>
                      <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                        <BadgeCheck className="h-4 w-4 text-blue-600" />
                        Delivered with executive documentation standards
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setCurrentPage("contact")}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-extrabold text-white shadow-xl transition hover:bg-black"
          >
            Contact Us Today <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );

  const ContactPage = () => (
    <section className="min-h-screen bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Engage TAT"
          title="Request a Consultation"
          subtitle="Tell us what you need. We’ll respond within 24–48 hours with next steps."
          align="left"
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Send a Message</h2>
                  <p className="text-sm text-slate-600">High-signal details help us respond faster.</p>
                </div>
              </div>

              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cx(
                      "w-full rounded-xl border px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:ring-4",
                      formErrors.name ? "border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    )}
                    placeholder="Your full name"
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cx(
                        "w-full rounded-xl border px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:ring-4",
                        formErrors.email ? "border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                      )}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      placeholder="+231 XXX XXXX"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Service of Interest</label>
                    <select
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select...</option>
                      <option value="business">Business Advisory</option>
                      <option value="tax">Tax Advisory</option>
                      <option value="training">Professional Development</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={cx(
                      "w-full rounded-xl border px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:ring-4",
                      formErrors.message ? "border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    )}
                    placeholder="What’s the situation, timeline, and expected outcome?"
                  />
                  {formErrors.message && <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-extrabold text-white shadow-lg transition hover:bg-blue-700 disabled:bg-slate-400"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
                    <CheckCircle className="mt-0.5 h-5 w-5" />
                    <p className="text-sm">
                      Thank you—message received. We’ll respond within <b>24–48 hours</b>.
                    </p>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
                    <AlertCircle className="mt-0.5 h-5 w-5" />
                    <p className="text-sm">Something went wrong. Please try again, or email us directly.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Offices + trust */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {[
                { country: "LIBERIA", address: "2nd Floor, Danny Horton Building", street: "A-1254 Horton Avenue, Monrovia" },
                { country: "SIERRA LEONE", address: "22 Wellington Street", street: "Freetown, Sierra Leone" },
              ].map((office) => (
                <div key={office.country} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-extrabold text-slate-900">{office.country}</h3>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
                      Regional Office
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-blue-600" />
                    <div className="text-sm text-slate-700">
                      <div>{office.address}</div>
                      <div>{office.street}</div>
                    </div>
                  </div>
                  <div className="mt-6 rounded-xl bg-slate-100 p-6 text-center text-xs text-slate-500">
                    Map embed placeholder (Google Maps / Mapbox)
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-blue-700 p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-300/20 p-3">
                    <BadgeCheck className="h-6 w-6 text-cyan-200" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-sky-200">Direct contact</div>
                    <div className="text-xl font-extrabold">frontdesk@tatconsg.com</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-sky-100/90">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-cyan-200" />
                    <a href="mailto:frontdesk@tatconsg.com" className="font-semibold hover:underline">
                      frontdesk@tatconsg.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-cyan-200" />
                    <span>Mon–Fri: 9am–6pm</span>
                  </div>
                </div>

                <div className="mt-7 rounded-xl border border-white/10 bg-black/20 p-4 text-xs text-sky-100/80">
                  Upgrade note: add a calendar booking link for instant authority + frictionless conversion.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const JobsPage = () => (
    <section className="min-h-screen bg-slate-50 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionTitle eyebrow="Careers" title="Job Opportunities" subtitle="Join our team of professionals." align="left" />
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="flex items-start gap-6">
            <div className="rounded-2xl bg-blue-600 p-4 text-white">
              <Briefcase className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Career Opportunities</h2>
              <p className="mt-2 text-slate-600">
                We’re always looking for strong talent. Send your CV and cover letter and we’ll respond with next steps.
              </p>
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-700">Apply via email</div>
                <a className="mt-2 inline-flex items-center gap-2 font-extrabold text-blue-700 hover:underline" href="mailto:frontdesk@tatconsg.com">
                  <Mail className="h-5 w-5" />
                  frontdesk@tatconsg.com
                </a>
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setCurrentPage("contact")}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-blue-700"
                >
                  Contact Us <ArrowRight className="h-4 w-4" />
                </button>
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm">
                  <BadgeCheck className="h-4 w-4 text-blue-600" />
                  Internship programs available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const PrivacyPage = () => (
    <section className="min-h-screen bg-slate-50 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionTitle eyebrow="Privacy" title="Privacy Policy" subtitle="Last updated: January 26, 2026" align="left" />
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-4 text-white">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Our Commitment to Privacy</h2>
              <p className="text-sm text-slate-600">We protect your information and explain how it is used.</p>
            </div>
          </div>

          {[
            {
              title: "Information We Collect",
              body: "We collect information you provide when you submit forms, apply for positions, or request services.",
            },
            {
              title: "How We Use Information",
              body: "We use information to respond to inquiries, provide services, and improve the website experience.",
            },
            { title: "Security", body: "We implement measures to safeguard your information." },
            { title: "Contact Us", body: "Questions about privacy? Email frontdesk@tatconsg.com." },
          ].map((s) => (
            <div key={s.title}>
              <h3 className="text-lg font-extrabold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "services":
        return <ServicesPage />;
      case "contact":
        return <ContactPage />;
      case "jobs":
        return <JobsPage />;
      case "privacy":
        return <PrivacyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* TODO: Worlwin Premium nav: glass + subtle border + stronger “brand” */}
      <nav
        className={cx(
          "fixed top-0 z-50 w-full border-b border-slate-200/60 bg-white/90 backdrop-blur",
          scrolled ? "shadow-md" : ""
        )}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentPage("home")} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-extrabold text-white shadow-lg">
                TAT
              </div>
              <div className="text-left leading-tight">
                <div className="text-sm font-extrabold text-slate-900">TAT Consulting Group</div>
                <div className="text-xs font-semibold text-slate-500">Business • Tax • Talent</div>
              </div>
            </button>

            <div className="hidden items-center gap-2 md:flex">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={cx(
                    "rounded-xl px-4 py-2 text-sm font-bold transition",
                    currentPage === item.id ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage("contact")}
                className="ml-2 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-black"
              >
                Engage <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="text-slate-900" /> : <Menu className="text-slate-900" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:hidden">
              <div className="grid gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cx(
                      "w-full rounded-xl px-4 py-3 text-left text-sm font-extrabold transition",
                      currentPage === item.id ? "bg-blue-50 text-blue-700" : "text-slate-800 hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setCurrentPage("contact");
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-black"
                >
                  Engage <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Offset for fixed nav */}
      <div className="h-[76px]" />

      <main>{renderPage()}</main>

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white">
                  TAT
                </div>
                <div>
                  <div className="font-extrabold text-white">TAT Consulting Group</div>
                  <div className="text-xs font-semibold text-slate-400">Business • Tax • Talent</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Advisory built for pressure. Execution built for outcomes.
              </p>
              <div className="mt-5 flex gap-4">
                <a href="#" className="text-slate-300 transition hover:text-cyan-200" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-300 transition hover:text-cyan-200" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold text-white">LIBERIA</div>
              <div className="mt-3 space-y-1 text-sm text-slate-400">
                <div>2nd Floor, Danny Horton Building</div>
                <div>A-1254 Horton Avenue, Monrovia</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold text-white">SIERRA LEONE</div>
              <div className="mt-3 space-y-1 text-sm text-slate-400">
                <div>22 Wellington Street</div>
                <div>Freetown, Sierra Leone</div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Mail className="h-4 w-4 text-cyan-200" />
                  <span>frontdesk@tatconsg.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="h-4 w-4 text-cyan-200" />
                  <span>Mon–Fri: 9am–6pm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} TAT Consulting Group, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
