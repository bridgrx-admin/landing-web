import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  CheckCircle2,
  Clock3,
  Code2,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Store,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";
import heroImage from "../assets/bridgrx-hero.png";
import { Button, Card } from "../components/ui";

const proofPoints = [
  { label: "target dispatch", value: "3-5 min" },
  { label: "pilot merchants", value: "20" },
  { label: "seed riders", value: "50" },
  { label: "90-day target", value: "500 deliveries" },
];

const valueCards = [
  {
    icon: Store,
    title: "For WhatsApp and Instagram merchants",
    description:
      "Trigger many deliveries at once, compare rider options, and send customers a tracking link without leaving the sales flow.",
  },
  {
    icon: Truck,
    title: "For riders and logistics fleets",
    description:
      "Get steady nearby jobs with upfront payout, simple accept/decline flows, and visibility across Lagos merchants.",
  },
  {
    icon: Smartphone,
    title: "For customers",
    description:
      "Choose speed or price, receive WhatsApp updates, and track each order from pickup to delivery.",
  },
];

const flowSteps = [
  {
    icon: MessageCircle,
    title: "Order confirmed",
    description: "Merchant confirms payment from WhatsApp, Instagram, web, or SuoOps.",
  },
  {
    icon: MapPinned,
    title: "Riders surfaced",
    description: "Available providers show live ETA, price, rating, and coverage.",
  },
  {
    icon: Clock3,
    title: "Five-minute choice",
    description: "Customer picks a preferred rider or BridgrX auto-assigns the best match.",
  },
  {
    icon: CheckCircle2,
    title: "Tracked delivery",
    description: "Pickup, transit, arrival, delivery, and rating updates stay visible.",
  },
];

const platformHighlights = [
  "Unlimited simultaneous deliveries for high-volume sellers",
  "Verified merchants, riders, fleets, BVN-linked wallets, and audit trail",
  "WhatsApp Cloud API, Instagram Graph API, web app, API, and webhooks",
  "Merchant wallet, customer-paid delivery, and SuoOps payment trigger support",
];

const partnerTypes = [
  { icon: Building2, label: "Logistics companies" },
  { icon: Users, label: "Independent riders" },
  { icon: Code2, label: "Commerce APIs" },
  { icon: WalletCards, label: "Payment bridges" },
];

export function LandingPage() {
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
    <div className="min-h-screen bg-[#f7faf8] text-slate-950">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/30 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="BRIDGRX home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f7d5d] text-white shadow-[0_10px_24px_rgba(15,125,93,0.22)]">
              <Boxes className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[18px] font-semibold tracking-[0] text-slate-950">
              BRIDGRX
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-slate-950" href="#market">
              Market
            </a>
            <a className="transition hover:text-slate-950" href="#flow">
              Flow
            </a>
            <a className="transition hover:text-slate-950" href="#waitlist">
              Waitlist
            </a>
          </div>

          <a
            href="#waitlist"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-[#0f7d5d]"
          >
            Join waitlist
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </header>

      <main>
        <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-16">
          <img
            src={heroImage}
            alt="A Lagos merchant preparing a package while a dispatch rider receives a tracked delivery job"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(247,250,248,0.96)_0%,_rgba(247,250,248,0.88)_37%,_rgba(247,250,248,0.28)_72%,_rgba(247,250,248,0.08)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,_rgba(247,250,248,0)_0%,_#f7faf8_100%)]" />

          <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.96fr_1.04fr] lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0f7d5d]/20 bg-white/80 px-3 py-2 text-sm font-semibold text-[#0f7d5d] shadow-[0_12px_34px_rgba(15,23,42,0.07)]">
                <BadgeCheck className="h-4 w-4" />
                Coming soon in Lagos
              </div>

              <h1 className="max-w-[640px] text-[42px] font-semibold leading-[1.03] text-slate-950 sm:text-[58px] lg:text-[72px]">
                The logistics layer for social commerce.
              </h1>

              <p className="mt-6 max-w-[620px] text-[18px] leading-8 text-slate-700 sm:text-[20px]">
                BRIDGRX connects WhatsApp and Instagram sellers to verified riders,
                fleets, live prices, ETA, and customer tracking from one automated
                dispatch flow.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#waitlist"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0f7d5d] px-5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,125,93,0.24)] transition hover:bg-[#0b674d]"
                >
                  Get early access
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#flow"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white/80 px-5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="hidden lg:block" aria-hidden="true">
              <div className="ml-auto max-w-[430px] rounded-lg border border-white/60 bg-white/78 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#0f7d5d]">
                      Live dispatch
                    </p>
                    <p className="mt-1 text-[18px] font-semibold">Lekki to Surulere</p>
                  </div>
                  <span className="rounded-full bg-[#e9f8f0] px-3 py-1 text-xs font-semibold text-[#0f7d5d]">
                    4 active
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  {[
                    ["Kube Logistics", "42 min", "₦1,200", "4.8"],
                    ["Emeka Rider", "35 min", "₦1,450", "4.7"],
                    ["Bicycle pickup", "58 min", "₦900", "4.6"],
                  ].map(([name, eta, price, rating]) => (
                    <div
                      key={name}
                      className="grid grid-cols-[1fr_auto] gap-4 rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-950">{name}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          ETA {eta} · ⭐ {rating}
                        </p>
                      </div>
                      <p className="font-semibold text-[#0f7d5d]">{price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="market" className="mx-auto -mt-4 w-full max-w-[1180px] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((item) => (
              <Card key={item.label} className="rounded-lg p-5">
                <p className="text-[28px] font-semibold text-slate-950">{item.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">{item.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1180px] gap-4 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:px-8">
          {valueCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card key={card.title} className="rounded-lg p-6">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e9f8f0] text-[#0f7d5d]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-[21px] font-semibold leading-7">{card.title}</h2>
                <p className="mt-4 text-[15px] leading-7 text-slate-600">
                  {card.description}
                </p>
              </Card>
            );
          })}
        </section>

        <section id="flow" className="bg-[#10221d] py-20 text-white">
          <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase text-[#87dfae]">
                From payment confirmation to doorstep
              </p>
              <h2 className="mt-4 text-[34px] font-semibold leading-tight sm:text-[46px]">
                One integration. Parallel dispatch. Clear tracking.
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/72">
                BRIDGRX begins when the seller confirms payment, then automates the
                dispatch process across riders, fleets, customers, and merchant teams.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {flowSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#87dfae]/15 text-[#87dfae]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[18px] font-semibold">{step.title}</h3>
                    <p className="mt-3 text-[14px] leading-7 text-white/68">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-[#0f7d5d]">
              Built for the real Lagos workflow
            </p>
            <h2 className="mt-4 text-[34px] font-semibold leading-tight sm:text-[46px]">
              Trust, routing, and payouts are designed into the marketplace.
            </h2>
          </div>

          <div className="space-y-3">
            {platformHighlights.map((highlight) => (
              <div key={highlight} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.045)]">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#0f7d5d]" />
                <p className="text-[15px] leading-7 text-slate-700">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((partner) => {
              const Icon = partner.icon;

              return (
                <div key={partner.label} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff4df] text-[#9a6217]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-semibold text-slate-800">{partner.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="waitlist" className="bg-white py-20">
          <div className="mx-auto grid w-full max-w-[920px] gap-8 px-4 text-center sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0f7d5d]">
                Coming soon
              </p>
              <h2 className="mt-4 text-[36px] font-semibold leading-tight sm:text-[52px]">
                Join the Lagos pilot waitlist.
              </h2>
              <p className="mx-auto mt-4 max-w-[680px] text-[17px] leading-8 text-slate-600">
                Early access is focused on WhatsApp sellers, Instagram merchants,
                logistics fleets, and independent riders
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mx-auto flex w-full max-w-[620px] flex-col gap-3 rounded-lg border border-slate-200 bg-[#f7faf8] p-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="waitlist-email">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-12 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#0f7d5d] focus:ring-4 focus:ring-[#0f7d5d]/10"
                required
              />
              <Button type="submit" className="h-12 rounded-lg bg-[#0f7d5d] px-5 hover:bg-[#0b674d]">
                Notify me
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {submitted ? (
              <p className="text-sm font-semibold text-[#0f7d5d]">
                You are on the list. We will reach out when pilot access opens.
              </p>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-7">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 BridgrX Cloud Ltd. Confidential preview.</p>
          <p>Lagos-first logistics infrastructure for Africa’s social commerce.</p>
        </div>
      </footer>
    </div>
  );
}
