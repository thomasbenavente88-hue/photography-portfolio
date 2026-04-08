"use client";

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
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 320,
        borderRadius: 24,
        border: "1px solid #d4c7b5",
        background: "linear-gradient(135deg, #ece7de, #f7f3ed)",
        display: "flex",
        alignItems: "flex-end",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#737373", margin: 0 }}>
          Placeholder
        </p>
        <p style={{ fontSize: 18, fontWeight: 500, color: "#262626", margin: "6px 0 0 0" }}>{label}</p>
      </div>
    </div>
  );

  const PhotoFrame = ({ src, alt }: { src?: string; alt: string }) => {
    const isPlaceholder = !src || src.startsWith("REPLACE_WITH");
    if (isPlaceholder) return placeholderImage(alt);

    return (
      <div
        style={{
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid #d4c7b5",
          background: "#f5f5f5",
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        }}
      >
        <img src={src} alt={alt} style={{ width: "100%", minHeight: 320, objectFit: "cover", display: "block" }} />
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
      style={{ position: "relative", width: "100%", maxWidth: 1200, perspective: 1800 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "28px 1fr", alignItems: "stretch" }}>
        <div
          style={{
            background: "linear-gradient(180deg, #8e6d4f, #6f5137 55%, #4f3926)",
            borderTopLeftRadius: "2rem",
            borderBottomLeftRadius: "2rem",
          }}
        />
        <div
          style={{
            background: "#f8f4ec",
            borderRadius: "2rem",
            border: "1px solid #d8cbb7",
            boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: typeof window !== "undefined" && window.innerWidth < 900 ? "1fr" : "1fr 1fr",
              minHeight: 760,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 32,
          fontSize: 12,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#737373",
        }}
      >
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
    <div
      style={{
        borderRight: "1px solid #ddd2c2",
        padding: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fbf8f2",
      }}
    >
      <div>
        {Icon ? (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "999px",
              border: "1px solid #d8cbb7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            <Icon size={20} color="#404040" />
          </div>
        ) : null}
        {eyebrow ? (
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#737373", marginBottom: 20 }}>
            {eyebrow}
          </p>
        ) : null}
        <h2 style={{ fontSize: 48, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.03em", color: "#171717", margin: 0 }}>
          {title}
        </h2>
        <p style={{ marginTop: 24, fontSize: 20, lineHeight: 1.8, color: "#404040", maxWidth: 520 }}>{body}</p>
      </div>
      <p style={{ fontSize: 14, color: "#737373" }}>Turn the page to continue.</p>
    </div>
  );

  const renderPage = (page: any) => {
    switch (page.type) {
      case "cover":
        return (
          <PageShell pageNumber={pageIndex}>
            <div
              style={{
                gridColumn: "1 / -1",
                background:
                  "radial-gradient(circle at top left, rgba(255,255,255,0.35), transparent 30%), linear-gradient(135deg, #3b2b1f, #7b5d43 55%, #c8ac8a)",
                color: "white",
                padding: 64,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 16px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Camera size={16} />
                  <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.3em" }}>Portfolio Book</span>
                </div>
                <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)" }}>
                  Ohio
                </span>
              </div>

              <div style={{ maxWidth: 800, padding: "48px 0" }}>
                <p style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.45em", color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>
                  Thomas Benavente Photography
                </p>
                <h1 style={{ fontSize: 72, lineHeight: 0.95, fontWeight: 600, letterSpacing: "-0.04em", margin: 0 }}>{page.title}</h1>
                <p style={{ marginTop: 24, fontSize: 28, color: "rgba(255,255,255,0.85)", maxWidth: 680, lineHeight: 1.5 }}>
                  {page.subtitle}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
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
            <div style={{ padding: 32, background: "#f3ede3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PhotoFrame src={page.image} alt={page.title} />
            </div>
          </PageShell>
        );

      case "spread":
        return (
          <PageShell pageNumber={pageIndex}>
            <div style={{ borderRight: "1px solid #ddd2c2", padding: 32, background: "#fbf8f2", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <PhotoFrame src={page.leftImage} alt={page.leftCaption} />
              <p style={{ marginTop: 16, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.3em", color: "#737373" }}>{page.leftCaption}</p>
            </div>
            <div style={{ padding: 32, background: "#f3ede3", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <PhotoFrame src={page.rightImage} alt={page.rightCaption} />
              <p style={{ marginTop: 16, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.3em", color: "#737373" }}>{page.rightCaption}</p>
            </div>
          </PageShell>
        );

      case "about":
        return (
          <PageShell pageNumber={pageIndex}>
            <TextPage eyebrow="About" title={page.title} body={page.body} icon={Camera} />
            <div style={{ padding: 48, background: "#f3ede3", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.35em", color: "#737373", marginBottom: 20 }}>What I photograph</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 36, fontWeight: 500, color: "#171717" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d8cbb7", paddingBottom: 16 }}>
                    <span>Couples</span><span style={{ color: "#a3a3a3" }}>01</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d8cbb7", paddingBottom: 16 }}>
                    <span>Family</span><span style={{ color: "#a3a3a3" }}>02</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 8 }}>
                    <span>Portraits</span><span style={{ color: "#a3a3a3" }}>03</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.8 }}>
                Built like a digital photo book so people slow down and actually experience your work.
              </p>
            </div>
          </PageShell>
        );

      case "contact":
        return (
          <PageShell pageNumber={pageIndex}>
            <TextPage eyebrow="Contact" title={page.title} body={page.body} icon={Mail} />
            <div style={{ padding: 48, background: "#f3ede3", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div
                style={{
                  borderRadius: 28,
                  border: "1px solid #d8cbb7",
                  background: "rgba(255,255,255,0.7)",
                  padding: 32,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                }}
              >
                <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.35em", color: "#737373", marginBottom: 16 }}>Reach out</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <a href={`mailto:${page.email}`} style={{ fontSize: 32, fontWeight: 500, color: "#171717", textDecoration: "none", wordBreak: "break-all" }}>
                    {page.email}
                  </a>
                  <a href={page.instagram} target="_blank" rel="noreferrer" style={{ fontSize: 18, color: "#404040", textDecoration: "none" }}>
                    Instagram
                  </a>
                </div>
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #e8dece", fontSize: 14, color: "#737373", lineHeight: 1.8 }}>
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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #d9cab5 0%, #bca486 100%)",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.35em", color: "#404040", margin: 0 }}>
              Thomas Benavente Photography
            </p>
            <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", color: "#171717", margin: "8px 0 0 0" }}>
              Interactive portfolio book
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={goPrev}
              disabled={pageIndex === 0}
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                border: "1px solid rgba(64,64,64,0.2)",
                background: "rgba(255,255,255,0.7)",
                opacity: pageIndex === 0 ? 0.4 : 1,
                cursor: pageIndex === 0 ? "default" : "pointer",
              }}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(64,64,64,0.1)",
                fontSize: 14,
                color: "#404040",
              }}
            >
              {pageIndex + 1} / {pages.length}
            </div>

            <button
              onClick={goNext}
              disabled={pageIndex === pages.length - 1}
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                border: "1px solid rgba(64,64,64,0.2)",
                background: "rgba(255,255,255,0.7)",
                opacity: pageIndex === pages.length - 1 ? 0.4 : 1,
                cursor: pageIndex === pages.length - 1 ? "default" : "pointer",
              }}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">{renderPage(currentPage)}</AnimatePresence>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: "rgba(64,64,64,0.8)" }}>
          Use the arrows to flip through the portfolio like a book.
        </div>
      </div>
    </div>
  );
}
