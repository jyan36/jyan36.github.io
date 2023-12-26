'use client'

import Image from 'next/image'
import './globals.css';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const messages = [
  'Web Developer.',
  'Composer and Arranger.',
  'Math Enjoyer.',
  '1B Computer Science Student at the University of Waterloo.',
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Define time ranges for different content
  const morningRange = [6, 12];
  const afternoonRange = [12, 18];
  const eveningRange = [18, 24];

  let greeting = '';

  // Determine the time range and set the greeting accordingly
  if (currentHour >= morningRange[0] && currentHour < morningRange[1]) {
    greeting = 'Good morning!';
  } else if (currentHour >= afternoonRange[0] && currentHour < afternoonRange[1]) {
    greeting = 'Good afternoon!';
  } else if (currentHour >= eveningRange[0] && currentHour < eveningRange[1]) {
    greeting = 'Good evening!';
  } else {
    greeting = 'Hello!';
  }
  
  const [displayText, setDisplayText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let currentCharIndex = -1;
    let messageIntervalId: string | number | NodeJS.Timeout | undefined;

    const startMessageInterval = () => {
      messageIntervalId = setInterval(() => {
        currentCharIndex++;
        setDisplayText((prevText) => prevText + messages[currentMessageIndex][currentCharIndex]);

        // Stop interval when all letters are displayed
        if (currentCharIndex === messages[currentMessageIndex].length-1) {
          clearInterval(messageIntervalId);

          // Move to the next message after a short delay
          setTimeout(() => {
            setDisplayText('');
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
            startMessageInterval();
          }, 1000); // In milliseconds
        }
      }, 100); // In milliseconds
    };

    startMessageInterval(); 

    return () => {
      clearInterval(messageIntervalId);
    };
  }, [currentMessageIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacity = typeof window !== 'undefined' ? Math.min(scrollPosition / window.innerHeight * 36, 36) : 0;
  return (
    
    <div className="bg-gray-900 text-white">

      <header className={`py-4 fixed top-0 w-full z-20`} style={{ backgroundColor: `rgb(8, 8, ${56-opacity})` }}>
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">Jacob Yan</a>
          <nav className="space-x-12">
            <a href="#about" className="hover:text-blue-500 font-bold">
              About
            </a>
            <a href="#projects" className="hover:text-blue-500 font-bold">
              Experience
            </a>
            <a href="#projects" className="hover:text-blue-500 font-bold">
              Projects
            </a>
            <a href="#projects" className="hover:text-blue-500 font-bold">
              Course Notes
            </a>
            <a href="#contact" className="hover:text-blue-500 font-bold">
              Resume
            </a>
          </nav>
        </div>
      </header>

      <main className="z-10 flex min-h-screen flex-col items-center justify-between p-2" style={{ backgroundColor: `rgb(8, 8, 20)` }}>
        {/* bg-gradient-to-b from-gray-800 to-gray-900 */}
      <div className="flex items-center justify-center h-screen w-screen z-10" style={{ background: `linear-gradient(to bottom, rgb(8, 8, 56), rgb(8, 8, 20))` }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{greeting}</h1>
          <h1 className="text-4xl font-bold mb-4">My name is Jacob Yan.</h1>
          <p className="text-lg mb-8">{"I am a " + displayText}</p>
          <div className="flex justify-center items-center">
            <a href="https://www.linkedin.com/in/jacob-yan/" target="_blank" rel="noopener noreferrer" className="pr-3">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>

            <a href="https://github.com/jyan36" target="_blank" rel="noopener noreferrer" className="pr-3">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>

            <a href="https://discord.com/users/598873655904174102" target="_blank" rel="noopener noreferrer" className="pr-3">
              <FontAwesomeIcon icon={faDiscord} size="2x" />
            </a>

            <a href="https://www.instagram.com/j.yan36" target="_blank" rel="noopener noreferrer" className="pr-3">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>

            <a href="mailto:1yanjac@gmail.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>

          </div>
        </div>
      </div>

      {/* Basic about me, APIs like chess.com, Spotify, link resume, and experience levels in languages and frameworks */}
      <section id="about" className="additional-section">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
      </section>

      <section id="projects" className="additional-section">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
      </section>

      <section id="skills" className="additional-section">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
      </section>

      <section id="contact" className="additional-section">
        <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
      </section>
    </main>
    </div>
  )
}
