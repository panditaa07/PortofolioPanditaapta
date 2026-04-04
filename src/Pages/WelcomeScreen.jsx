import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-accent-purple">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-blue/5 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 via-transparent to-accent-blue/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-background-primary/50 backdrop-blur-xl rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-text-primary" />
    </div>
  </div>
);

const LoadingBar = () => (
  <div className="flex justify-center items-center">
    <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      pointerEvents: 'none',
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-background-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0A051A', // Match background-primary
          }}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                className="text-center mb-6 sm:mb-8 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                variants={childVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4 font-heading">
                  <motion.div
                    className="mb-2 sm:mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="inline-block px-2 text-text-primary">
                      Welcome
                    </span>{' '}
                    <span className="inline-block px-2 text-text-primary">
                      To
                    </span>{' '}
                    <span className="inline-block px-2 text-text-primary">
                      My
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="inline-block px-2 text-gradient">
                      Portfolio
                    </span>{' '}
                    <span className="inline-block px-2 text-text-primary">
                      Website
                    </span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div
                className="text-center mb-8"
                variants={childVariants}
              >
                <a
                  href="https://www.pandita.my.id"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-accent-purple" />
                    <span className="text-gradient">
                      <TypewriterEffect text="www.pandita.my.id" />
                    </span>
                  </div>
                </a>
              </motion.div>

              {/* Loading Bar */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                variants={childVariants}
              >
                <LoadingBar />
                <motion.p
                  className="text-text-muted text-sm mt-4 font-body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Loading experience...
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
