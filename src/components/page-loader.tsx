"use client";

import { useEffect, useState, type ReactNode } from "react";
import LoadingScreen from "@/components/loading-screen";

export default function PageLoader({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    isLoading: true,
    isContentVisible: false,
  });

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        const criticalImages = Array.from(document.images).filter((img) => {
          const rect = img.getBoundingClientRect();
          return rect.top < window.innerHeight;
        });

        await Promise.all([
          ...criticalImages
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise((resolve) => {
                  img.onload = resolve;
                  img.onerror = resolve;
                })
            ),
          new Promise((resolve) => setTimeout(resolve, 500)),
        ]);

        if (mounted) {
          setState({ isLoading: false, isContentVisible: true });
        }
      } catch {
        if (mounted) {
          setState({ isLoading: false, isContentVisible: true });
        }
      }
    };

    loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`transition-opacity duration-300 ${
        state.isContentVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
