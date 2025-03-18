import { useState } from "react";
import faqArray from "./assets/faqs";
import { AnimatePresence, motion } from "motion/react";

//image imports
import iconPlus from "./assets/icon-plus.svg";
import iconMinus from "./assets/icon-minus.svg";
import mobileViewCoverImage from "./assets/backgroundPatternMobile.svg";
import desktopViewCoverImage from "./assets/backgroundPatternDesktop.svg";
import starIcon from "./assets/iconStar.svg";

function App() {
  const [faq, setFaqArray] = useState(faqArray);

  function toggleAnswer(item) {
    setFaqArray((prev) =>
      prev.map((faq) =>
        item === faq
          ? { ...item, answerShown: !item.answerShown }
          : { ...faq, answerShown: false },
      ),
    );
  }

  function FaqElements() {
    return faq.map((item, index) => (
      <article className="space-y-4" key={index + Math.random()}>
        <div className="flex items-center justify-between gap-8">
          <p
            className="text-Dark-purple cursor-pointer text-sm font-bold transition ease-in hover:text-purple-700 md:text-lg"
            onClick={() => toggleAnswer(item)}
          >
            {item.question}
          </p>
          <img
            src={item.answerShown ? iconMinus : iconPlus}
            alt={item.answerShown ? "collapse button" : "show button"}
            aria-expanded={item.answerShown}
            className="cursor-pointer"
            onClick={() => toggleAnswer(item)}
          />
        </div>

        <AnimatePresence>
          {item.answerShown && (
            <motion.p
              className="text-Grayish-purple text-sm font-semibold md:text-lg"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {item.answer}
            </motion.p>
          )}
        </AnimatePresence>

        {faq.length - 1 === index ? undefined : (
          <hr className="text-Dark-purple opacity-20" />
        )}
      </article>
    ));
  }

  return (
    <>
      <main className="bg-Light-pink relative flex min-h-screen flex-col items-center justify-center">
        <img
          src={mobileViewCoverImage}
          alt="cover image"
          className="absolute top-0 w-full md:hidden"
        />

        <img
          src={desktopViewCoverImage}
          alt="cover image"
          className="absolute top-0 w-full"
        />
        <div className="z-10 w-9/10 rounded-lg bg-white p-6 shadow-lg md:max-w-lg">
          <div className="mb-4 flex items-center gap-4">
            <img
              src={starIcon}
              alt="icon of a star"
              className="size-5 md:size-7"
            />

            <h1 className="text-Dark-purple text-2xl font-bold md:text-4xl">
              FAQs
            </h1>
          </div>

          <section className="space-y-4">
            <FaqElements />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
