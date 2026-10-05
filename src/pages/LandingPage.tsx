import { useEffect, useMemo, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bike,
  Building2,
  CheckCircle2,
  ChevronDown,
  Code2,
  MapPinned,
  Menu,
  MessageCircle,
  ShieldCheck,
  Store,
  Truck,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import bridgrxLogo from "../assets/brand/logos/bridgrx-logo-orange.svg";
import heroImage from "../assets/bridgrx-hero.png";
import { Badge, Button, Card, Input, Tabs, type TabItem } from "../components/ui";
import { classNames } from "../lib/classNames";

type RoutePath = "/" | "/pricing" | "/faq" | "/privacy" | "/terms" | "/cookies";

type NavItem = {
  label: string;
  href: string;
};


const navigationItems: NavItem[] = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

const routeMeta: Record<RoutePath, { title: string; description: string }> = {
  "/": {
    title: "BRIDGRX | Logistics infrastructure for social commerce",
    description:
      "BRIDGRX connects WhatsApp and Instagram merchants in Lagos to verified riders, logistics companies, live dispatch options, and customer delivery updates.",
  },
  "/pricing": {
    title: "Pricing | BRIDGRX",
    description:
      "Explore placeholder BRIDGRX pricing for pilot merchants, growing commerce teams, logistics companies, and future enterprise integrations.",
  },
  "/faq": {
    title: "FAQ | BRIDGRX",
    description:
      "Answers to common questions about BRIDGRX, WhatsApp dispatch, rider verification, pilot access, pricing, and customer tracking.",
  },
  "/privacy": {
    title: "Privacy Policy | BRIDGRX",
    description:
      "Structured placeholder privacy policy for BRIDGRX covering data collection, usage, cookies, third-party services, retention, and user rights.",
  },
  "/terms": {
    title: "Terms of Service | BRIDGRX",
    description:
      "Structured placeholder terms for BRIDGRX covering account responsibilities, acceptable use, payments, third-party services, and limitations.",
  },
  "/cookies": {
    title: "Cookie Policy | BRIDGRX",
    description:
      "Structured placeholder cookie policy for BRIDGRX covering essential, analytics, marketing cookies, and preference management.",
  },
};

const proofPoints = [
  { label: "Lagos survey responses", value: "91", note: "Product research source" },
  { label: "want provider choice", value: "85%", note: "Multi-rider comparison" },
  { label: "prioritize speed", value: "72%", note: "Fast dispatch matters most" },
  { label: "pilot delivery target", value: "500", note: "First 90 days" },
];

const featureCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp-first dispatch",
    description:
      "Merchants can trigger delivery from the channel where orders already happen, with automated customer updates at every milestone.",
  },
  {
    icon: MapPinned,
    title: "Live rider options",
    description:
      "Surface available riders and logistics companies with ETA, price, rating, and service coverage before assignment.",
  },
  {
    icon: Truck,
    title: "Parallel delivery flow",
    description:
      "High-volume sellers can launch many deliveries at once instead of manually booking one rider after another.",
  },
  {
    icon: ShieldCheck,
    title: "Verified marketplace",
    description:
      "Merchants, riders, bicycles, fleets, and logistics companies are designed around identity checks and operational trust.",
  },
  {
    icon: WalletCards,
    title: "Wallet and payout readiness",
    description:
      "BVN-linked wallet requirements give the platform a defensible audit trail for merchant fees and rider payouts.",
  },
  {
    icon: Code2,
    title: "API path for scale",
    description:
      "Website widgets, webhooks, Instagram, and partner logistics APIs are planned after the WhatsApp pilot proves the workflow.",
  },
];

const flowSteps = [
  {
    title: "Customer orders and pays",
    description:
      "The customer buys through WhatsApp, Instagram, phone, or the merchant's site. Payment stays in the merchant's current flow.",
  },
  {
    title: "Merchant confirms payment",
    description:
      "The merchant triggers BRIDGRX manually, or SuoOps sends a payment-confirmed webhook for merchants using SuoOps.",
  },
  {
    title: "BRIDGRX broadcasts the job",
    description:
      "Nearby riders and logistics fleets receive the job with pickup area, dropoff area, route context, and payout.",
  },
  {
    title: "Customer chooses or auto-assigns",
    description:
      "The customer sees options for five minutes. If they do nothing, BRIDGRX assigns the nearest high-rated available rider.",
  },
  {
    title: "Pickup and delivery updates",
    description:
      "The rider confirms pickup and delivery, while the merchant and customer receive automated WhatsApp status updates.",
  },
];

type SurfaceAccent = "primary" | "rider" | "merchant";

const useCases: {
  icon: typeof Store;
  title: string;
  description: string;
  bullets: string[];
  accent: SurfaceAccent;
}[] = [
  {
    icon: Store,
    title: "WhatsApp and Instagram merchants",
    description:
      "Trigger delivery after payment, compare rider options, reduce manual coordination, and give customers clearer delivery updates.",
    bullets: ["Fashion and food sellers", "Manual or SuoOps payment confirmation", "No full dashboard required for MVP"],
    accent: "primary",
  },
  {
    icon: Bike,
    title: "Independent riders",
    description:
      "Receive nearby delivery opportunities with upfront payout, simple accept/decline decisions, and status updates for the job.",
    bullets: ["Pilot app for accept and status", "WhatsApp fallback during rollout", "Weekly payout model planned"],
    // Rider Violet -- "Product UI system" (BridgrX UI Brand Guideline).
    accent: "rider",
  },
  {
    icon: Building2,
    title: "Small logistics companies",
    description:
      "Join the marketplace as a verified provider and make fleet capacity visible to merchants without building a custom app.",
    bullets: ["Company profile", "Per-rider verification", "Fleet jobs routed to available riders"],
    // A logistics company with its own fleet is the guideline's "Merchant"
    // persona (delivery business) -- Merchant Green, distinct from the
    // WhatsApp/Instagram seller card above, which stays on base brand orange.
    accent: "merchant",
  },
  {
    icon: Users,
    title: "Customers",
    description:
      "Get ETA, price choices, and WhatsApp updates instead of repeatedly asking the seller where an order is.",
    bullets: ["Five-minute selection window", "Fallback auto-assignment", "Post-delivery rating prompt"],
    accent: "primary",
  },
];

const surfaceAccentChipClasses: Record<SurfaceAccent, string> = {
  primary: "bg-brand-cream text-brand-primary",
  rider: "bg-brand-rider/10 text-brand-rider",
  merchant: "bg-brand-merchant/10 text-brand-merchant",
};

const surfaceAccentIconClasses: Record<SurfaceAccent, string> = {
  primary: "text-brand-primary",
  rider: "text-brand-rider",
  merchant: "text-brand-merchant",
};

const showcaseTabs: TabItem[] = [
  // "Merchant" here is the WhatsApp/Instagram seller creating a dispatch --
  // the guideline's base-brand/customer persona, not its green "Merchant"
  // (delivery-business) surface -- so it keeps the neutral ink tab styling,
  // same as Ops. Only Rider gets its own accent.
  { id: "merchant", label: "Merchant" },
  { id: "rider", label: "Rider", accent: "rider" },
  { id: "ops", label: "Ops" },
];

const showcaseEyebrowClasses: Record<string, string> = {
  merchant: "text-brand-primary-tint",
  rider: "text-brand-rider",
  ops: "text-white/70",
};

const showcasePanels = {
  merchant: {
    eyebrow: "Merchant dispatch",
    title: "Create many deliveries without opening five different rider chats.",
    items: [
      ["Order source", "WhatsApp Business"],
      ["Payment status", "Confirmed by merchant"],
      ["Selection window", "5 minutes"],
      ["Active deliveries", "14"],
    ],
  },
  rider: {
    eyebrow: "Rider job card",
    title: "Show the payout, distance, and pickup context before a rider accepts.",
    items: [
      ["Pickup", "Admiralty Way, Lekki"],
      ["Dropoff", "Bode Thomas, Surulere"],
      ["Payout", "NGN 1,200"],
      ["Accept timer", "60 seconds"],
    ],
  },
  ops: {
    eyebrow: "Pilot control room",
    title: "Track verification, active jobs, workflow health, and support issues.",
    items: [
      ["Merchant status", "Verified"],
      ["Rider response", "Under 3 min target"],
      ["Workflow failures", "0 in last 20 target"],
      ["Support queue", "Founder-led MVP"],
    ],
  },
};

const pricingPlans = [
  {
    name: "Pilot",
    price: "Free",
    frequency: "for approved early merchants",
    description: "For the first Lagos sellers helping prove the workflow.",
    badge: "Pilot placeholder",
    cta: "Join pilot waitlist",
    featured: false,
    features: [
      "Manual onboarding",
      "WhatsApp delivery trigger",
      "Customer status updates",
      "Founder-assisted setup",
    ],
  },
  {
    name: "Merchant",
    price: "NGN 100-300",
    frequency: "placeholder service fee per delivery",
    description: "A replaceable pricing model based on the PRD's test range.",
    badge: "Likely starting point",
    cta: "Request early access",
    featured: true,
    features: [
      "Parallel delivery dispatch",
      "Rider and company options",
      "Order history and ratings later",
      "SuoOps trigger support when available",
    ],
  },
  {
    name: "Fleet",
    price: "Custom",
    frequency: "volume or revenue-share placeholder",
    description: "For logistics companies joining the BRIDGRX supply network.",
    badge: "Replace before launch",
    cta: "Become a partner",
    featured: false,
    features: [
      "Company verification",
      "Per-rider onboarding",
      "Marketplace profile",
      "Delivery volume reporting later",
    ],
  },
];

const faqs = [
  {
    question: "What is BRIDGRX?",
    answer:
      "BRIDGRX is a plug-and-play logistics layer for social commerce. It helps merchants trigger delivery after payment, compare verified riders or logistics companies, and send customers tracking updates.",
  },
  {
    question: "Who is BRIDGRX for first?",
    answer:
      "The first launch is focused on Lagos merchants selling through WhatsApp Business and Instagram, starting around Lekki and Surulere with recruited riders and one small logistics partner.",
  },
  {
    question: "Does BRIDGRX handle the product payment?",
    answer:
      "Not in the MVP. Customers pay the merchant using the merchant's existing process. BRIDGRX starts once payment is confirmed manually or through an integration such as SuoOps.",
  },
  {
    question: "Is there a merchant dashboard?",
    answer:
      "A full merchant dashboard is part of the broader product plan, but the MVP deliberately starts with WhatsApp commands and simple form-based triggering so the team can prove the workflow first.",
  },
  {
    question: "How are riders verified?",
    answer:
      "The PRD calls for NIN, address evidence, BVN for wallet activation, license and plate details for motorized riders, and bicycle photos for bicycle riders. Logistics companies also submit company-level documents.",
  },
  {
    question: "Is pricing final?",
    answer:
      "No. The PRD recommends testing a merchant service fee in the NGN 100-300 range per delivery and not charging individual riders in Phase 1. Pricing shown here is placeholder content for the website structure.",
  },
  {
    question: "Will BRIDGRX support APIs?",
    answer:
      "Yes, but not first. Phase 2 includes API documentation, website checkout integration, webhooks, Instagram, and partner logistics API aggregation after the WhatsApp MVP is stable.",
  },
  {
    question: "What happens if a customer does not choose a rider?",
    answer:
      "The planned flow gives the customer a five-minute selection window. If they do not respond, BRIDGRX automatically assigns a nearby high-rated available rider.",
  },
];

const legalSections = {
  privacy: [
    ["Information we collect", "Placeholder copy: BRIDGRX may collect account details, contact information, delivery addresses, identity verification documents, transaction metadata, support messages, and device or usage information needed to operate the service."],
    ["How information is used", "Placeholder copy: information may be used to verify users, route deliveries, send service updates, improve reliability, prevent fraud, provide support, and comply with applicable obligations."],
    ["Cookies and analytics", "Placeholder copy: the marketing site may use essential cookies and, if enabled later, privacy-conscious analytics to understand page performance and campaign effectiveness."],
    ["Third-party services", "Placeholder copy: BRIDGRX may work with messaging providers, payment processors, verification partners, maps, hosting providers, and analytics tools where needed to provide the service."],
    ["Data retention", "Placeholder copy: records are kept only as long as needed for operations, legal obligations, dispute resolution, fraud prevention, and financial audit trails."],
    ["Security", "Placeholder copy: BRIDGRX intends to use administrative, technical, and organizational safeguards appropriate for identity, wallet, and delivery data."],
    ["User rights", "Placeholder copy: users may request access, correction, deletion, or restriction of personal data where applicable under relevant privacy laws."],
    ["Children's privacy", "Placeholder copy: BRIDGRX is not intended for children and should only be used by people who can legally enter into service relationships."],
    ["Changes and contact", "Placeholder copy: this policy may be updated before launch. Privacy questions can be sent to the BRIDGRX team once official contact details are confirmed."],
  ],
  terms: [
    ["Acceptance of terms", "Placeholder copy: by using BRIDGRX, users agree to the terms that govern access to the website, pilot program, and future logistics services."],
    ["Eligibility", "Placeholder copy: merchants, riders, logistics companies, and representatives must provide accurate information and meet verification requirements before transacting."],
    ["Account responsibilities", "Placeholder copy: users are responsible for maintaining accurate profiles, protecting login credentials, and notifying BRIDGRX about unauthorized use."],
    ["Acceptable use", "Placeholder copy: users must not misuse the platform, submit fraudulent documents, interfere with dispatch operations, harass others, or use the service for prohibited items."],
    ["Services", "Placeholder copy: BRIDGRX coordinates logistics discovery, dispatch, tracking, and related marketplace workflows. Service availability may vary by geography and launch phase."],
    ["Payments and fees", "Placeholder copy: pilot fees, rider payouts, wallet requirements, and service charges will be defined in final commercial terms before launch."],
    ["Intellectual property", "Placeholder copy: BRIDGRX branding, software, content, and product interfaces remain owned by BRIDGRX or its licensors."],
    ["Third-party services", "Placeholder copy: the service may depend on WhatsApp, Instagram, payment providers, maps, logistics partners, and other third-party systems outside BRIDGRX control."],
    ["Disclaimers and liability", "Placeholder copy: final legal language will define service limitations, liability caps, warranties, and dispute handling."],
    ["Termination and changes", "Placeholder copy: BRIDGRX may suspend access for fraud, safety issues, non-compliance, or operational risk. Terms may change before launch."],
    ["Governing law and contact", "Placeholder copy: governing law and formal contact details should be confirmed by counsel before publication."],
  ],
  cookies: [
    ["What cookies are", "Placeholder copy: cookies are small files stored on a device to keep a site working, remember preferences, or measure performance."],
    ["Essential cookies", "Placeholder copy: essential cookies may be used for security, navigation, form state, and core website functions."],
    ["Analytics cookies", "Placeholder copy: analytics cookies are not currently configured in this repository, but may be added later to understand traffic and improve content."],
    ["Marketing cookies", "Placeholder copy: marketing cookies are not currently configured in this repository. If added later, this policy should describe the provider and user choices."],
    ["Managing preferences", "Placeholder copy: users can control cookies in browser settings. A dedicated preference center should be added if non-essential cookies are introduced."],
  ],
};

function isRoutePath(pathname: string): pathname is RoutePath {
  return pathname === "/" || pathname === "/pricing" || pathname === "/faq" || pathname === "/privacy" || pathname === "/terms" || pathname === "/cookies";
}

function currentRoute(): RoutePath {
  return isRoutePath(window.location.pathname) ? window.location.pathname : "/";
}

function updateMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    if (property) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }

  element.content = content;
}

export function LandingPage() {
  const [route, setRoute] = useState<RoutePath>(currentRoute);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (href: string) => {
    const target = new URL(href, window.location.origin);
    const nextPath = isRoutePath(target.pathname) ? target.pathname : "/";
    window.history.pushState(null, "", `${nextPath}${target.hash}`);
    setRoute(nextPath);
    setMobileOpen(false);

    window.setTimeout(() => {
      if (target.hash) {
        document.getElementById(target.hash.slice(1))?.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0 });
      }
    }, 0);
  };

  useEffect(() => {
    const onPopState = () => setRoute(currentRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const meta = routeMeta[route];
    document.title = meta.title;
    updateMeta("description", meta.description);
    updateMeta("og:title", meta.title, true);
    updateMeta("og:description", meta.description, true);
    updateMeta("twitter:title", meta.title);
    updateMeta("twitter:description", meta.description);
    updateMeta("og:url", `${window.location.origin}${route}`, true);
    updateMeta("twitter:card", "summary_large_image");
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${window.location.origin}${route}`;
    document.head.appendChild(canonical);
  }, [route]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const page = useMemo(() => {
    if (route === "/pricing") return <PricingPage navigate={navigate} />;
    if (route === "/faq") return <FaqPage />;
    if (route === "/privacy") return <LegalPage title="Privacy Policy" intro="This is structured placeholder privacy content for BRIDGRX. It should be reviewed and replaced with approved legal copy before public launch." sections={legalSections.privacy} />;
    if (route === "/terms") return <LegalPage title="Terms of Service" intro="These are structured placeholder terms for BRIDGRX. They are not final legal terms and should be replaced with counsel-approved copy before launch." sections={legalSections.terms} />;
    if (route === "/cookies") return <LegalPage title="Cookie Policy" intro="This is structured placeholder cookie content. The current repository does not include cookie consent or analytics code, so this page is ready for future updates." sections={legalSections.cookies} />;
    return <HomePage navigate={navigate} />;
  }, [route]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink">
      <Header
        navigate={navigate}
        route={route}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {page}
      <Footer navigate={navigate} />
    </div>
  );
}

function SiteLink({
  href,
  children,
  className,
  navigate,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  navigate: (href: string) => void;
  onClick?: () => void;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href);
    onClick?.();
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

function Header({
  navigate,
  route,
  mobileOpen,
  setMobileOpen,
}: {
  navigate: (href: string) => void;
  route: RoutePath;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/90 bg-brand-bg/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <SiteLink href="/" navigate={navigate} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src={bridgrxLogo} alt="BRIDGRX" className="h-9 w-auto" />
        </SiteLink>

        <div className="hidden items-center gap-7 text-sm font-medium text-brand-muted lg:flex">
          {navigationItems.map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              navigate={navigate}
              className={classNames(
                "transition hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/35",
                item.href === route ? "text-brand-ink" : undefined,
              )}
            >
              {item.label}
            </SiteLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <SiteLink
            href="/#waitlist"
            navigate={navigate}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-brand-line bg-white px-4 text-sm font-semibold text-brand-ink transition hover:border-brand-primary/40"
          >
            Partner with us
          </SiteLink>
          <SiteLink
            href="/#waitlist"
            navigate={navigate}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-ink px-4 text-sm font-semibold text-white transition hover:bg-brand-primary"
          >
            Join waitlist
            <ArrowRight className="h-4 w-4" />
          </SiteLink>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand-line bg-white text-brand-ink transition hover:border-brand-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/35 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-brand-line bg-brand-bg px-4 py-4 shadow-[0_24px_60px_rgba(5,5,5,0.08)] lg:hidden">
          <div className="mx-auto grid max-w-[1180px] gap-2">
            {navigationItems.map((item) => (
              <SiteLink
                key={item.href}
                href={item.href}
                navigate={navigate}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-brand-ink hover:bg-brand-cream"
              >
                {item.label}
              </SiteLink>
            ))}
            <SiteLink
              href="/#waitlist"
              navigate={navigate}
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white"
            >
              Join waitlist
              <ArrowRight className="h-4 w-4" />
            </SiteLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HomePage({ navigate }: { navigate: (href: string) => void }) {
  const [activeShowcase, setActiveShowcase] = useState("merchant");
  const activePanel = showcasePanels[activeShowcase as keyof typeof showcasePanels];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="A Lagos merchant preparing a delivery package while a rider receives a dispatch job"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,248,244,0.98)_0%,_rgba(255,248,244,0.92)_42%,_rgba(255,248,244,0.38)_78%,_rgba(255,248,244,0.12)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,_rgba(255,248,244,0)_0%,_var(--color-brand-bg)_100%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-[1180px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.96fr_1.04fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <Badge className="border-brand-primary/20 bg-white/84 text-brand-primary shadow-[0_12px_34px_rgba(5,5,5,0.07)]">
              <BadgeCheck className="mr-2 h-4 w-4" />
              Lagos pilot opening soon
            </Badge>
            <h1 className="mt-5 max-w-[680px] text-[42px] font-bold leading-[1.03] text-brand-ink sm:text-[58px] lg:text-[72px]">
              Logistics infrastructure for social commerce.
            </h1>
            <p className="mt-6 max-w-[650px] text-[18px] leading-8 text-brand-muted sm:text-[20px]">
              BRIDGRX connects WhatsApp and Instagram sellers to verified riders,
              logistics companies, live delivery options, and customer updates from
              one automated dispatch flow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SiteLink href="/#waitlist" navigate={navigate} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(244,81,44,0.26)] transition hover:bg-brand-primary-deep">
                Join the pilot waitlist
                <ArrowRight className="h-4 w-4" />
              </SiteLink>
              <SiteLink href="/#how-it-works" navigate={navigate} className="inline-flex h-12 items-center justify-center rounded-lg border border-brand-line bg-white/84 px-5 text-sm font-semibold text-brand-ink transition hover:border-brand-primary/40 hover:bg-white">
                See how dispatch works
              </SiteLink>
            </div>
            <p className="mt-5 text-sm font-medium text-brand-muted">
              Built around Lagos research, WhatsApp workflows, verified riders, and pilot delivery targets.
            </p>
          </div>

          <HeroDispatchCard />
        </div>
      </section>

      <section aria-label="Pilot proof points" className="mx-auto -mt-2 w-full max-w-[1180px] px-4 pb-18 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <Card key={point.label} className="p-5 transition hover:-translate-y-1 hover:shadow-[0_22px_58px_rgba(5,5,5,0.075)] motion-reduce:hover:translate-y-0">
              <p className="text-[32px] font-semibold leading-none text-brand-ink">{point.value}</p>
              <p className="mt-2 text-sm font-semibold text-brand-ink">{point.label}</p>
              <p className="mt-1 text-xs text-brand-muted">{point.note}</p>
            </Card>
          ))}
        </div>
      </section>

      <SectionHeader
        id="features"
        eyebrow="Platform capabilities"
        title="One logistics layer for merchants, riders, fleets, and customers."
        description="The full BRIDGRX vision spans WhatsApp, Instagram, web dashboards, APIs, verified operators, wallets, and tracking. The MVP starts by proving the end-to-end delivery workflow."
      />

      <section className="mx-auto grid w-full max-w-[1180px] gap-4 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {featureCards.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(5,5,5,0.08)] motion-reduce:hover:translate-y-0">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-cream text-brand-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-[21px] font-semibold leading-7">{feature.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-brand-muted">{feature.description}</p>
            </Card>
          );
        })}
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-brand-ink py-20 text-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-primary-tint">From payment confirmation to doorstep</p>
            <h2 className="mt-4 text-[34px] font-semibold leading-tight sm:text-[46px]">
              The dispatch workflow starts after the merchant confirms payment.
            </h2>
            <p className="mt-5 text-[17px] leading-8 text-white/72">
              BRIDGRX does not replace the merchant's storefront or payment process in the MVP. It takes over the delivery workflow when the order is ready to move.
            </p>
          </div>
          <ol className="grid gap-3">
            {flowSteps.map((step, index) => (
              <li key={step.title} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-5 sm:grid-cols-[56px_1fr]">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-primary/15 text-brand-primary-tint font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold">{step.title}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-white/68">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-primary">Product showcase</p>
          <h2 className="mt-4 text-[34px] font-semibold leading-tight sm:text-[46px]">
            Product surfaces designed around the pilot workflow.
          </h2>
          <p className="mt-5 text-[17px] leading-8 text-brand-muted">
            These previews are structured UI representations using the existing component system. They are not screenshots of a live dashboard yet.
          </p>
          <div className="mt-7">
            <Tabs items={showcaseTabs} activeId={activeShowcase} onChange={setActiveShowcase} />
          </div>
        </div>
        <Card className="overflow-hidden">
          <div className="border-b border-brand-line bg-brand-ink p-5 text-white">
            <p className={classNames("text-xs font-semibold uppercase", showcaseEyebrowClasses[activeShowcase])}>{activePanel.eyebrow}</p>
            <h3 className="mt-2 max-w-[560px] text-[24px] font-semibold leading-tight">{activePanel.title}</h3>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2">
            {activePanel.items.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-brand-line bg-brand-bg p-4">
                <p className="text-xs font-semibold uppercase text-brand-muted">{label}</p>
                <p className="mt-2 text-[18px] font-semibold text-brand-ink">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <SectionHeader
        id="solutions"
        eyebrow="Use cases"
        title="A marketplace that has to work for every side of the delivery."
        description="The PRD centers four user groups: merchants, riders, customers, and logistics companies. Each gets a practical workflow instead of another disconnected chat thread."
      />

      <section className="mx-auto grid w-full max-w-[1180px] gap-4 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:px-8">
        {useCases.map((useCase) => {
          const Icon = useCase.icon;
          return (
            <Card key={useCase.title} className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={classNames(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                    surfaceAccentChipClasses[useCase.accent],
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[21px] font-semibold">{useCase.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-muted">{useCase.description}</p>
                </div>
              </div>
              <ul className="mt-5 grid gap-2">
                {useCase.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm text-brand-muted">
                    <CheckCircle2 className={classNames("mt-0.5 h-4 w-4 shrink-0", surfaceAccentIconClasses[useCase.accent])} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </section>

      <PricingPreview navigate={navigate} />
      <FaqPreview />
      <WaitlistSection />
    </main>
  );
}

function HeroDispatchCard() {
  return (
    <div className="hidden lg:block" aria-hidden="true">
      <div className="ml-auto max-w-[456px] rounded-lg border border-white/68 bg-white/84 p-4 shadow-[0_28px_80px_rgba(5,5,5,0.16)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-brand-line pb-4">
          <div>
            <p className="text-xs font-semibold uppercase text-brand-primary">Live dispatch</p>
            <p className="mt-1 text-[18px] font-semibold">Lekki to Surulere</p>
          </div>
          <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-primary">4 active</span>
        </div>
        <div className="space-y-3 pt-4">
          {[
            ["Kube Logistics", "42 min", "NGN 1,200", "4.8"],
            ["Emeka Rider", "35 min", "NGN 1,450", "4.7"],
            ["Bicycle pickup", "58 min", "NGN 900", "4.6"],
          ].map(([name, eta, price, rating]) => (
            <div key={name} className="grid grid-cols-[1fr_auto] gap-4 rounded-lg border border-brand-line bg-white p-4">
              <div>
                <p className="font-semibold text-brand-ink">{name}</p>
                <p className="mt-1 text-sm text-brand-muted">ETA {eta} - rating {rating}</p>
              </div>
              <p className="font-semibold text-brand-primary">{price}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-brand-ink p-4 text-white">
          <p className="text-xs font-semibold uppercase text-brand-primary-tint">Customer prompt</p>
          <p className="mt-2 text-sm leading-6 text-white/76">Choose a rider in 5 minutes or BRIDGRX auto-assigns the best available option.</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-[920px] scroll-mt-24 px-4 pb-10 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-brand-primary">{eyebrow}</p>
      <h2 className="mt-4 text-[34px] font-semibold leading-tight sm:text-[46px]">{title}</h2>
      <p className="mx-auto mt-5 max-w-[760px] text-[17px] leading-8 text-brand-muted">{description}</p>
    </section>
  );
}

function PricingPreview({ navigate }: { navigate: (href: string) => void }) {
  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-primary">Pricing</p>
            <h2 className="mt-4 max-w-[680px] text-[34px] font-semibold leading-tight sm:text-[46px]">
              Placeholder pricing shaped by the PRD, ready to replace before launch.
            </h2>
          </div>
          <SiteLink href="/pricing" navigate={navigate} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-brand-line bg-brand-bg px-4 text-sm font-semibold text-brand-ink transition hover:border-brand-primary/40">
            View pricing page
            <ArrowRight className="h-4 w-4" />
          </SiteLink>
        </div>
        <PricingGrid compact />
      </div>
    </section>
  );
}

function PricingGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={classNames("grid gap-4 md:grid-cols-3", compact ? "mt-10" : "mt-8")}>
      {pricingPlans.map((plan) => (
        <Card
          key={plan.name}
          className={classNames(
            "flex flex-col p-6",
            plan.featured ? "border-brand-primary shadow-[0_24px_70px_rgba(244,81,44,0.13)]" : undefined,
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[22px] font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{plan.description}</p>
            </div>
            <Badge className={plan.featured ? "border-brand-primary/20 bg-brand-cream text-brand-primary" : undefined}>
              {plan.badge}
            </Badge>
          </div>
          <div className="mt-7">
            <p className="text-[34px] font-semibold leading-none">{plan.price}</p>
            <p className="mt-2 text-sm text-brand-muted">{plan.frequency}</p>
          </div>
          <ul className="mt-7 grid gap-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2 text-sm leading-6 text-brand-muted">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <a href="/#waitlist" className={classNames("mt-8 inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold transition", plan.featured ? "bg-brand-primary text-white hover:bg-brand-primary-deep" : "border border-brand-line bg-white text-brand-ink hover:border-brand-primary/40")}>
            {plan.cta}
          </a>
        </Card>
      ))}
    </div>
  );
}

function FaqPreview() {
  return (
    <section className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase text-brand-primary">FAQ</p>
        <h2 className="mt-4 text-[34px] font-semibold leading-tight sm:text-[46px]">Questions a pilot merchant will ask first.</h2>
        <p className="mt-5 text-[17px] leading-8 text-brand-muted">
          Answers are grounded in the PRD and call out what is still placeholder or planned after the MVP.
        </p>
      </div>
      <FaqList limit={5} />
    </section>
  );
}

function FaqList({ limit }: { limit?: number }) {
  const visibleFaqs = typeof limit === "number" ? faqs.slice(0, limit) : faqs;

  return (
    <div className="divide-y divide-brand-line rounded-lg border border-brand-line bg-white">
      {visibleFaqs.map((faq, index) => (
        <details key={faq.question} className="group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/35">
            {faq.question}
            <ChevronDown className="h-5 w-5 shrink-0 text-brand-primary transition group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 text-[15px] leading-7 text-brand-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

function WaitlistSection() {
  return (
    <section id="waitlist" className="scroll-mt-24 bg-brand-ink py-20 text-white">
      <div className="mx-auto grid w-full max-w-[920px] gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-primary-tint">Pilot access</p>
          <h2 className="mt-4 text-[36px] font-semibold leading-tight sm:text-[52px]">
            Join the Lagos pilot waitlist.
          </h2>
          <p className="mx-auto mt-4 max-w-[690px] text-[17px] leading-8 text-white/70">
            Early access is focused on WhatsApp sellers, Instagram merchants,
            logistics fleets, and independent riders in the first pilot zones.
          </p>
        </div>
        <WaitlistForm dark />
      </div>
    </section>
  );
}

function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <form
        onSubmit={handleSubmit}
        className={classNames(
          "flex w-full flex-col gap-3 rounded-lg border p-3 sm:flex-row",
          dark ? "border-white/12 bg-white/8" : "border-brand-line bg-brand-bg",
        )}
      >
        <label className="sr-only" htmlFor={dark ? "waitlist-email-dark" : "waitlist-email"}>
          Email address
        </label>
        <Input
          id={dark ? "waitlist-email-dark" : "waitlist-email"}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="h-12 min-w-0 flex-1 rounded-lg border-brand-line text-brand-ink focus:border-brand-primary focus:ring-brand-primary/15"
          required
        />
        <Button type="submit" size="lg" className="h-12 rounded-lg px-5">
          Notify me
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      {submitted ? (
        <p role="status" className={classNames("mt-3 text-sm font-semibold", dark ? "text-brand-primary-tint" : "text-brand-primary")}>
          You are on the list. We will reach out when pilot access opens.
        </p>
      ) : null}
    </div>
  );
}

function PricingPage({ navigate }: { navigate: (href: string) => void }) {
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title="Pilot pricing is intentionally structured, not final."
        description="The PRD recommends validating per-delivery service fees during the Lagos pilot. The plans below are placeholder content designed so final commercial terms can replace them cleanly."
      />
      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 sm:px-6 lg:px-8">
        <PricingGrid />
        <Card className="mt-6 grid gap-5 p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-cream text-brand-primary">
            <Banknote className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[21px] font-semibold">Pricing note</h2>
            <p className="mt-2 text-sm leading-6 text-brand-muted">
              Individual riders are not expected to be charged in Phase 1. A small distance-based percentage may be introduced later only after value is proven.
            </p>
          </div>
          <SiteLink href="/#waitlist" navigate={navigate} className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white">
            Join waitlist
          </SiteLink>
        </Card>
      </section>
      <WaitlistSection />
    </main>
  );
}

function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers about the BRIDGRX pilot."
        description="These answers are based on the product requirements document and keep planned, placeholder, and MVP behavior clearly separated."
      />
      <section className="mx-auto w-full max-w-[920px] px-4 pb-20 sm:px-6 lg:px-8">
        <FaqList />
      </section>
      <WaitlistSection />
    </main>
  );
}

function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: string[][];
}) {
  return (
    <main>
      <PageHero eyebrow="Legal placeholder" title={title} description={intro} />
      <section className="mx-auto w-full max-w-[900px] px-4 pb-20 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-8">
          <p className="rounded-lg border border-brand-primary/18 bg-brand-cream p-4 text-sm leading-6 text-brand-muted">
            This page is structured dummy content for product and layout readiness. It should be replaced with approved legal copy before launch.
          </p>
          <div className="mt-8 grid gap-8">
            {sections.map(([heading, copy]) => (
              <section key={heading}>
                <h2 className="text-[22px] font-semibold">{heading}</h2>
                <p className="mt-3 text-[15px] leading-7 text-brand-muted">{copy}</p>
              </section>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}

function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto w-full max-w-[980px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
      <p className="text-sm font-semibold uppercase text-brand-primary">{eyebrow}</p>
      <h1 className="mt-4 text-[40px] font-bold leading-[1.06] sm:text-[58px]">{title}</h1>
      <p className="mx-auto mt-5 max-w-[760px] text-[18px] leading-8 text-brand-muted">{description}</p>
    </section>
  );
}

function Footer({ navigate }: { navigate: (href: string) => void }) {
  const groups = [
    {
      title: "Product",
      links: [
        ["Features", "/#features"],
        ["How it works", "/#how-it-works"],
        ["Pricing", "/pricing"],
        ["FAQ", "/faq"],
      ],
    },
    {
      title: "Company",
      links: [
        ["About", "/#features"],
        ["Contact", "/#waitlist"],
      ],
    },
    {
      title: "Resources",
      links: [
        ["API docs planned", "/#features"],
        ["Pilot updates", "/#waitlist"],
        ["Support", "/faq"],
      ],
    },
    {
      title: "Legal",
      links: [
        ["Privacy Policy", "/privacy"],
        ["Terms of Service", "/terms"],
        ["Cookie Policy", "/cookies"],
      ],
    },
  ];

  return (
    <footer className="border-t border-brand-line bg-white">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_2fr] lg:px-8">
        <div>
          <img src={bridgrxLogo} alt="BRIDGRX" className="h-9 w-auto" />
          <p className="mt-5 max-w-[360px] text-sm leading-6 text-brand-muted">
            Lagos-first logistics infrastructure for Africa's social commerce economy.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge className="border-brand-primary/20 bg-brand-cream text-brand-primary">WhatsApp MVP</Badge>
            <Badge className="border-brand-line bg-brand-bg text-brand-muted">Pilot content</Badge>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-brand-ink">{group.title}</h2>
              <ul className="mt-4 grid gap-3">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <SiteLink href={href} navigate={navigate} className="text-sm text-brand-muted transition hover:text-brand-primary">
                      {label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-brand-line px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-2 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BridgrX Cloud Ltd. All rights reserved.</p>
          <p>Placeholder legal pages included for pre-launch review.</p>
        </div>
      </div>
    </footer>
  );
}
