import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, Heart, Users, Mail } from "lucide-react";

export default function ThomasPhotographyPortfolioBook() {
  const pages = useMemo(
    () => [
      {
        id: "cover",
        type: "cover",
        title: "Thomas Benavente",
        subtitle: "A photography portfolio told like a book.",
      },
      {
        id: "intro",
        type: "editorial",
        eyebrow: "Chapter One",
        title: "Real moments, held still.",
        body:
          "This portfolio is meant to feel slower and more intentional than a typical scrolling website. Turn each page like you are flipping through a printed photo book.",
        image: "REPLACE_WITH_HUG_BY_WATER_IMAGE",
      },
      {
        id: "couples-1",
        type: "photo",
        eyebrow: "Couples",
        title: "The beginning of a story",
        body:
          "Proposals, quiet connection, and the kind of images that feel emotional without being forced.",
        image: "REPLACE_WITH_PROPOSAL_IMAGE",
      },
      {
        id: "couples-2",
        type: "spread",
        leftImage: "REPLACE_WITH_RING_IMAGE",
        rightImage: "REPLACE_WITH_PORCH_COUPLE_IMAGE",
        leftCaption: "Detail",
        rightCaption: "Connection",
      },
      {
        id: "family-1",
        type: "photo",
        eyebrow: "Family",
        title: "The in-between moments matter most",
        body:
          "Family work should feel warm, honest, and alive. The goal is never stiff poses. It is emotion, movement, and memory.",
        image: "REPLACE_WITH_BABY_LEAF_IMAGE",
      },
      {
        id: "family-2",
        type: "spread",
        leftImage: "REPLACE_WITH_BABY_CLOSEUP_IMAGE",
        rightImage: "REPLACE_WITH_FALL_BABY_IMAGE",
        leftCaption: "Portrait",
        rightCaption: "Milestone",
      },
      {
        id: "family-3",
        type: "photo",
        eyebrow: "Generations",
        title: "Images with weight to them",
        body:
          "The best photos age well. They become more valuable later.",
        image: "REPLACE_WITH_GRANDMA_BW_IMAGE",
      },
      {
        id: "portraits",
        type: "photo",
        eyebrow: "Portraits",
        title: "Clean. Personal. Intentional.",
        body:
          "Portrait sessions that feel cinematic without losing the person in the frame.",
        image: "REPLACE_WITH_CITY_PORTRAIT_IMAGE",
      },
      {
        id: "about",
        type: "about",
        title: "About the photographer",
        body:
          "I am an Ohio-based photographer focused on couples, family, and lifestyle sessions. I care most about making images that feel real and last longer than the moment itself.",
      },
      {
        id: "contact",
        type: "contact",
        title: "Let’s make something worth keeping.",
        body:
          "Currently booking sessions in Ohio. Reach out for couples, family, and lifestyle photography.",
        email: "your@email.com",
        instagram: "https://instagram.com/yourhandle",
      },
    ],
    []
  );

  const [pageIndex, setPageIndex] = useState(0);
  const currentPage = pages[pageIndex];

  const goNext = () => setPageIndex((prev) => Math.min(prev + 1, pages.length - 1));
  const goPrev = () => setPageIndex((prev) => Math.max(prev - 1, 0));

  const placeholderImage = (label = "Add image") => (
    <div className="w-full h-full min-h-[320px] rounded-2xl border border-neutral-300 bg-gradient-to-br from-[#ece7de] to-[#f7f3ed] flex items-end p-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Placeholder</p>
        <p className="text-lg font-medium text-neutral-800 mt-1">{label}</p>
      </div>
    </div>
  );

  const PhotoFrame = ({ src, alt }: { src?: string; alt: string }) => {
    const isPlaceholder = !src || src.startsWith("REPLACE_WITH");
    if (isPlaceholder) return placeholderImage(alt);

    return (
      <div className="rounded-2xl overflow-hidden border border-neutral-300 bg-neutral-100 shadow-sm">
        <img src={src} alt={alt} className="w-full h-full object-cover min-h-[320px]" />
      </div>
    );
  };

  const PageShell = ({ children, pageNumber }: { children: React.ReactNode; pageNumber: number }) => (
    <motion.div
      key={pageNumber}
      initial={{ rotateY: 18, opacity: 0, x: 30 }}
      animate={{ rotateY: 0, opacity: 1, x: 0 }}
      exit={{ rotateY: -18, opacity: 0, x: -30 }}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-6xl"
      style={{ perspective: 1800 }}
    >
      <div className="grid lg:grid-cols-[28px_1fr] items-stretch">
        <div className="hidden lg:block bg-gradient-to-b from-[#8e6d4f] via-[#6f5137] to-[#4f3926] rounded-l-[2rem] shadow-[inset_-4px_0_10px_rgba(255,255,255,0.15)]" />
        <div className="bg-[#f8f4ec] rounded-[2rem] border border-[#d8cbb7] shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[760px]">
            {children}
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-8 text-xs tracking-[0.3em] uppercase text-neutral-500">
        Page {pageNumber + 1}
      </div>
    </motion.div>
  );

  const TextPage = ({
    eyebrow,
    title,
    body,
    icon: Icon,
  }: {
    eyebrow?: string;
    title: string;
    body: string;
    icon?: any;
  }) => (
    <div className="border-r border-[#ddd2c2] p-8 md:p-12 flex flex-col justify-between bg-[#fbf8f2]">
      <div>
        {Icon ? (
          <div className="w-12 h-12 rounded-full border border-[#d8cbb7] flex items-center justify-center mb-8">
            <Icon className="w-5 h-5 text-neutral-700" />
          </div>
        ) : null}
        {eyebrow ? <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-5">{eyebrow}</p> : null}
        <h2 className="text-4xl md:text-5xl leading-tight font-semibold tracking-tight text-neutral-900">{title}</h2>
        <p className="mt-6 text-lg leading-8 text-neutral-700 max-w-xl">{body}</p>
      </div>
      <p className="text-sm text-neutral-500">Turn the page to continue.</p>
    </div>
  );

  const renderPage = (page: any) => {
    switch (page.type) {
      case "cover":
        return (
          <PageShell pageNumber={pageIndex}>
            <div className="col-span-2 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_30%),linear-gradient(135deg,#3b2b1f,#7b5d43_55%,#c8ac8a)] text-white p-10 md:p-16 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-[0.3em]">Portfolio Book</span>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/70">Ohio</span>
              </div>
              <div className="max-w-3xl py-12">
                <p className="text-sm uppercase tracking-[0.45em] text-white/70 mb-5">Thomas Benavente Photography</p>
                <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-tight">{page.title}</h1>
                <p className="mt-6 text-lg md:text-2xl text-white/85 max-w-2xl leading-8">{page.subtitle}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-white/75">
                <span>Couples • Family • Portraits</span>
                <span>Open the book</span>
              </div>
            </div>
          </PageShell>
        );

      case "editorial":
      case "photo":
        return (
          <PageShell pageNumber={pageIndex}>
            <TextPage
              eyebrow={page.eyebrow}
              title={page.title}
              body={page.body}
              icon={page.eyebrow === "Couples" ? Heart : page.eyebrow === "Family" || page.eyebrow === "Generations" ? Users : Camera}
            />
            <div className="p-6 md:p-8 bg-[#f3ede3] flex items-center justify-center">
              <PhotoFrame src={page.image} alt={page.title} />
            </div>
          </PageShell>
        );

      case "spread":
        return (
          <PageShell pageNumber={pageIndex}>
            <div className="border-r border-[#ddd2c2] p-6 md:p-8 bg-[#fbf8f2] flex flex-col justify-between">
              <PhotoFrame src={page.leftImage} alt={page.leftCaption} />
              <p className="mt-4 text-sm uppercase tracking-[0.3em] text-neutral-500">{page.leftCaption}</p>
            </div>
            <div className="p-6 md:p-8 bg-[#f3ede3] flex flex-col justify-between">
              <PhotoFrame src={page.rightImage} alt={page.rightCaption} />
              <p className="mt-4 text-sm uppercase tracking-[0.3em] text-neutral-500">{page.rightCaption}</p>
            </div>
          </PageShell>
        );

      case "about":
        return (
          <PageShell pageNumber={pageIndex}>
            <TextPage eyebrow="About" title={page.title} body={page.body} icon={Camera} />
            <div className="p-8 md:p-12 bg-[#f3ede3] flex flex-col justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-5">What I photograph</p>
                <div className="space-y-5 text-2xl md:text-3xl font-medium text-neutral-900">
                  <div className="flex items-center justify-between border-b border-[#d8cbb7] pb-4"><span>Couples</span><span className="text-neutral-400">01</span></div>
                  <div className="flex items-center justify-between border-b border-[#d8cbb7] pb-4"><span>Family</span><span className="text-neutral-400">02</span></div>
                  <div className="flex items-center justify-between pb-2"><span>Portraits</span><span className="text-neutral-400">03</span></div>
                </div>
              </div>
              <p className="text-sm text-neutral-500 leading-7">Built like a digital photo book so people slow down and actually experience your work.</p>
            </div>
          </PageShell>
        );

      case "contact":
        return (
          <PageShell pageNumber={pageIndex}>
            <TextPage eyebrow="Contact" title={page.title} body={page.body} icon={Mail} />
            <div className="p-8 md:p-12 bg-[#f3ede3] flex flex-col justify-center">
              <div className="rounded-[1.75rem] border border-[#d8cbb7] bg-white/70 p-8 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-4">Reach out</p>
                <div className="space-y-5">
                  <a href={`mailto:${page.email}`} className="block text-xl md:text-2xl font-medium text-neutral-900 break-all hover:opacity-70">
                    {page.email}
                  </a>
                  <a href={page.instagram} target="_blank" rel="noreferrer" className="block text-lg text-neutral-700 hover:opacity-70">
                    Instagram
                  </a>
                </div>
                <div className="mt-8 pt-6 border-t border-[#e8dece] text-sm text-neutral-500 leading-7">
                  Currently booking sessions in Ohio for couples, family, and lifestyle photography.
                </div>
              </div>
            </div>
          </PageShell>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#d9cab5_0%,#bca486_100%)] px-4 py-6 md:px-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-700">Thomas Benavente Photography</p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Interactive portfolio book</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={pageIndex === 0}
              className="w-12 h-12 rounded-full border border-neutral-700/20 bg-white/70 backdrop-blur disabled:opacity-40 flex items-center justify-center hover:bg-white"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-4 py-2 rounded-full bg-white/60 border border-neutral-700/10 text-sm text-neutral-700">
              {pageIndex + 1} / {pages.length}
            </div>
            <button
              onClick={goNext}
              disabled={pageIndex === pages.length - 1}
              className="w-12 h-12 rounded-full border border-neutral-700/20 bg-white/70 backdrop-blur disabled:opacity-40 flex items-center justify-center hover:bg-white"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">{renderPage(currentPage)}</AnimatePresence>

        <div className="mt-6 text-center text-sm text-neutral-700/80">
          Use the arrows to flip through the portfolio like a book.
        </div>
      </div>
    </div>
  );
}
