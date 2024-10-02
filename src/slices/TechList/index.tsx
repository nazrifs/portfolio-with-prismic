"use client"; // cause we will be using gsap = js

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// components
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  // marquee
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          // markers: true,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut"
        }
      );
    }, component);
    return () => ctx.revert(); // cleanup
  });

  return (
    // not using bounded cause styling will be whacked out
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading size="lg" as="h2" className="mb-8">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.primary.tech_item.map((item, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={item.tech_name || undefined}
        >
          {Array.from(
            { length: 15 },
            (
              _,
              index // marquee
            ) => (
              <React.Fragment key={index}>
                <span
                  className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                  style={{
                    color:
                      index === 7 && item.tech_color
                        ? item.tech_color
                        : "inherit",
                  }}
                >
                  {item.tech_name}
                </span>
                <span className="text-3xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            )
          )}
        </div>
      ))}
    </section>
  );
};

export default TechList;
