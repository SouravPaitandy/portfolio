import React from "react";
import Navbar from "../Navbar";
import WelcomeScreen from "../WelcomeScreen";
import Hero from "../../Hero";
import About from "../../About";
import Projects from "../../Projects";
import Contact from "../../Contact";
import ClientPageWrapper from "../client/ClientPageWrapper";

export default function HomePage({ dict, lang }) {
  return (
    <>
      {/* ClientPageWrapper manages analytics, scroll spy, selection color picker, MirrorMindWidget, and theme body class */}
      <ClientPageWrapper lang={lang}>
        <WelcomeScreen dict={dict} />
        <Navbar dict={dict} lang={lang} />
        <Hero dict={dict} />
        <About dict={dict} />
        <Projects dict={dict} lang={lang} />
        <Contact dict={dict} />
      </ClientPageWrapper>
    </>
  );
}
