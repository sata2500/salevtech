"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { promoSlides } from "@/data/promos";
import styles from "./PromoSlider.module.css";

const SLIDE_DURATION = 6000; // 6 seconds per slide

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  bgGradient: string;
  imageSrc: string | null;
}

interface PromoSliderProps {
  initialSlides?: Slide[];
}

export default function PromoSlider({ initialSlides }: PromoSliderProps) {
  const slides = initialSlides && initialSlides.length > 0 ? initialSlides : promoSlides;
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  // Reset timer helper
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (slides.length === 0) return;

    // Setup autoplay
    timerRef.current = setInterval(nextSlide, SLIDE_DURATION);

    // Setup progress bar increment
    const intervalSteps = 100; // Increment 100 times per SLIDE_DURATION
    const stepDuration = SLIDE_DURATION / intervalSteps;
    
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, stepDuration);
  }, [nextSlide, slides.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeIdx, resetTimer]);

  if (slides.length === 0) return null;

  return (
    <div className={styles.wrapper} id="promo-slider-container">
      <div className={`${styles.slider} glass`}>
        {slides.map((slide, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={slide.id}
              className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
              style={{ background: slide.bgGradient }}
              id={`promo-slide-${slide.id}`}
            >
              {/* Content Column */}
              <div className={styles.content}>
                <span className={styles.badge}>{slide.badge}</span>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <Link href={slide.linkHref} className={styles.link} id={`promo-link-${slide.id}`}>
                  <span>{slide.linkText}</span>
                  <svg className={styles.linkIcon} viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>

              {/* Optional Right Column Image overlay */}
              {slide.imageSrc && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={slide.imageSrc}
                    alt={slide.title}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Controls: Dots & Arrows */}
        <div className={styles.controls}>
          <div className={styles.dots} id="promo-slider-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${idx === activeIdx ? styles.dotActive : ""}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                id={`promo-dot-${idx}`}
              />
            ))}
          </div>

          <div className={styles.arrows}>
            <button
              className={styles.arrowBtn}
              onClick={prevSlide}
              aria-label="Previous slide"
              id="promo-prev-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className={styles.arrowBtn}
              onClick={nextSlide}
              aria-label="Next slide"
              id="promo-next-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Animated autoplay progress indicator bar */}
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
