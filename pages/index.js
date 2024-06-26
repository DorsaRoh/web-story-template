import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import TypingEffect from './components/TypingEffect';
import styles from '../styles/Home.module.css';
import GlitchText from './components/GlitchText';

export default function Home() {
  const texts = [
    { text: "The world as you knew it had ended--not with a triumphant bang, but with a damp whimper. Cities that had once scraped the skies are now sprawling in ruins, their skyscrapers standing like tombstones over a civilization that had consumed it all, and ultimately itself."     , style: {} },
    { text: "Text 2", style: {} },
    { text: "Text 3", style: {} },
    { text: "Text 4", style: { color: "green" } },
    { text: "Etc..", style: { color: "green" } },
    // Additional texts...
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const textContainerRef = useRef(null);

  useEffect(() => {
    if (textContainerRef.current) {
      const container = textContainerRef.current;
      setShowScrollHint(container.scrollHeight > container.clientHeight);
    }
  }, [currentIndex]);

  const handleNextButtonClick = () => {
    if (currentIndex < texts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackButtonClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topTitle}>
        <GlitchText text="Title (Glitched Effect)"/>
      </div>
      <div className={styles.textContainer} ref={textContainerRef}>
        {texts.map((item, index) => (
          <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }} className={styles.textEntry}>
            {index === currentIndex && <TypingEffect text={item.text} textStyle={item.style} />}
          </div>
        ))}
        {showScrollHint && <div className={styles.scrollHint}>Scroll down to see more</div>}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.btn} onClick={handleBackButtonClick} disabled={currentIndex === 0}>
        <GlitchText text="⟵ back"></GlitchText>
        </button>
        <button className={styles.btn} onClick={handleNextButtonClick} disabled={currentIndex === texts.length - 1}>
        <GlitchText text="next ⟶"></GlitchText>
        </button>
      </div>
    </div>
  );
}
