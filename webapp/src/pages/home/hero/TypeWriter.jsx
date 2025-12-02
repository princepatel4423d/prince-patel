import { useEffect, useState } from 'react';

export const Typewriter = ({
  words = [],
  loop = false,
  cursor = true,
  speed = 80,
  delay = 1800,
}) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[wordIndex % words.length];

    const handleTyping = () => {
      const updatedText = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);

      setText(updatedText);
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));

      // Pause when word is completely typed
      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), delay);
      }

      // Pause when word is completely deleted
      if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) =>
          loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)
        );
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, loop, speed, delay]);

  return (
    <span className="whitespace-nowrap text-xl">
      {text}
      {cursor && <span className="ml-1 animate-pulse">|</span>}
    </span>
  );
};
