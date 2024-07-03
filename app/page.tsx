"use client";
import React from "react";
import Navbar from "./components/Landing Page/Navbar";
import IntroHero from "./components/Landing Page/IntroHero";
import Testimonials from "./components/Landing Page/Testimonials";
import MisVis from "./components/Landing Page/MisVis";
import Footer from "./components/Footer";
import Faq from "./components/Landing Page/Faq";
import Course_Teaser from "./components/Landing Page/Course_Teaser";

export default function Home() {
  return (
    <>
      <Navbar />
      <IntroHero />
      <MisVis />
      <div className=" bg-nyanza-800 min-w-[30%] mx-10">
        <div className="text-3xl font-semibold flex flex-row place-items-center my-5">
          Need some suggestions on what to take? Follow in their steps
        </div>
        <div className="flex flex-row carousel carousel-center space-x-12 mx-12 mb-12">
          <Testimonials
            imgsrc="/poc_!.png"
            name="Sarah Diwali Johnson"
            jobTitle="Freelance UIUX Designer  "
            courseRef="/login"
          />
          <Testimonials
            imgsrc="/cust_2.png"
            name="Geoff Ramsey"
            jobTitle="Part-time streamer to Software Engineer "
            courseRef="/login"
          />
          <Testimonials
            imgsrc="/cust_3.png"
            name="Patrick Jhonson Sweeny "
            jobTitle="Coroporate Lawyer to Full Stack Developer"
            courseRef="/login"
          />
          <Testimonials
            imgsrc="/cust_1.png"
            name="Kareena Smith-Enrile "
            jobTitle="Business Owner turned QA at Wacdorals Co."
            courseRef="/login"
          />
        </div>
      </div>

      <Course_Teaser />

      <Faq />

      <Footer />
    </>
  );
}
