"use client"; // cause using gsap

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type AvatarProps = {
  image: ImageField;
  className?: string;
};

import React from "react";

export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        { opacity: 0, scale: 1.4 },
        { opacity: 1, scale: 1, ease: "power3.inOut", duration: 1.3 }
      );

      window.onmousemove = (e) => {
        if (!component.current) return;
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };

        let distFromCenter = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: {
              duration: .5,
              overwrite: "auto",
              ease: "power3.Out",
            },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenter - 0.7,
              x: -10 + 20 & componentPercent.x,
              duration: .5,
            },
            0 // ensure no delay
          );
      };
    }, component);
  }, []);

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage
          field={image}
          className="avatar-image he-full w-full object-fill"
          imgixParams={{ q: 90 }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-t from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
