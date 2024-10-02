'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Bot, Code, MessageSquare, Zap } from 'lucide-react'
import Head from 'next/head'

// Remove fs, path, matter, and MDXRemote imports

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  headerImage?: string;
  authorImage?: string;
}

interface DangerAILandingProps {
  posts: Post[];
}

interface DangerAILandingProps {
  posts: Post[];
}

export default function DangerAILanding({ posts }: DangerAILandingProps) {
  const [isInView, setIsInView] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    setIsInView(true)
  }, [])

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const glitch = {
    initial: { skew: 0, opacity: 1 },
    animate: { 
      skew: [-2, 2, -2, 2, 0],
      opacity: [1, 0.8, 1, 0.8, 1],
      transition: { 
        duration: 0.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5
      }
    }
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        .libre-franklin-heading {
          font-family: "Libre Franklin", sans-serif;
          font-optical-sizing: auto;
          font-weight: 700;
          font-style: normal;
        }
        .libre-franklin-body {
          font-family: "Libre Franklin", sans-serif;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
        }
        .logo-shadow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
        }
        .letter-shadow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
        }
      `}</style>
      <div className="min-h-screen bg-[#353c42] text-white libre-franklin-body">
        <nav className="bg-[#2a2f33] p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-[#e7531a] libre-franklin-heading" onClick={() => setActiveSection('home')}>
              <motion.span
                initial="initial"
                animate="animate"
                variants={glitch}
                className="logo-shadow letter-shadow"
              >
                Danger AI
              </motion.span>
            </Link>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveSection('blog')} 
                className={`text-gray-300 hover:text-[#e7531a] transition-colors ${activeSection === 'blog' ? 'text-[#e7531a]' : ''}`}
              >
                Blog
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-12">
          {activeSection === 'home' && (
            <AnimatePresence>
              {isInView && (
                <motion.section
                  initial="initial"
                  animate="animate"
                  variants={stagger}
                  className="text-center mb-24"
                >
                  <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 leading-tight libre-franklin-heading">
                    Unleash the Power of <br />
                    <span className="text-[#e7531a] inline-block transform hover:scale-105 transition-transform">Danger AI</span>
                  </motion.h1>
                  <motion.p variants={fadeInUp} className="text-xl mb-10 text-gray-300">
                    Cutting-edge AI solutions that push the boundaries
                  </motion.p>
                  <motion.div variants={fadeInUp}>
                    <Link
                      href="#contact"
                      className="bg-[#e7531a] text-white px-8 py-4 rounded-full inline-flex items-center hover:bg-[#ff6b3d] transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#e7531a]/30"
                    >
                      Ignite Your AI Strategy
                      <ChevronRight className="ml-2" />
                    </Link>
                  </motion.div>
                </motion.section>
              )}
            </AnimatePresence>
          )}

          {activeSection === 'blog' && (
            <motion.section
              initial="initial"
              animate="animate"
              variants={stagger}
              className="mb-24"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-8 libre-franklin-heading">Danger AI Blog</motion.h2>
              {posts.map((post, index) => (
                <motion.article key={post.slug} variants={fadeInUp} className="mb-12">
                  <Link href={`/posts/${post.slug}`}>
                    <h3 className="text-2xl font-bold mb-2 libre-franklin-heading">{post.title}</h3>
                  </Link>
                  <p className="text-gray-400 mb-4">
                    {post.date} | {post.author}
                  </p>
                  <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
                  {index !== posts.length - 1 && (
                    <hr className="my-8 border-gray-700" />
                  )}
                </motion.article>
              ))}
            </motion.section>
          )}

          {activeSection === 'home' && (
            <>
              <motion.section
                initial="initial"
                animate="animate"
                variants={stagger}
                id="services"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
              >
                <motion.div 
                  variants={fadeInUp} 
                  className="bg-[#2a2f33] p-8 rounded-lg shadow-lg hover:shadow-[#e7531a]/20 transition-all transform hover:scale-105"
                  whileHover={{ y: -10 }}
                >
                  <Bot className="text-[#e7531a] w-12 h-12 mb-6" />
                  <h2 className="text-2xl font-bold mb-4 libre-franklin-heading">Custom AI Models</h2>
                  <p className="text-gray-300">Tailored AI solutions designed to meet your specific business needs.</p>
                </motion.div>
                <motion.div 
                  variants={fadeInUp} 
                  className="bg-[#2a2f33] p-8 rounded-lg shadow-lg hover:shadow-[#e7531a]/20 transition-all transform hover:scale-105"
                  whileHover={{ y: -10 }}
                >
                  <MessageSquare className="text-[#e7531a] w-12 h-12 mb-6" />
                  <h2 className="text-2xl font-bold mb-4 libre-franklin-heading">Intelligent Chatbots</h2>
                  <p className="text-gray-300">Engage your customers with AI-powered conversational interfaces.</p>
                </motion.div>
                <motion.div 
                  variants={fadeInUp} 
                  className="bg-[#2a2f33] p-8 rounded-lg shadow-lg hover:shadow-[#e7531a]/20 transition-all transform hover:scale-105"
                  whileHover={{ y: -10 }}
                >
                  <Code className="text-[#e7531a] w-12 h-12 mb-6" />
                  <h2 className="text-2xl font-bold mb-4 libre-franklin-heading">AI Integration</h2>
                  <p className="text-gray-300">Seamlessly integrate AI capabilities into your existing systems.</p>
                </motion.div>
              </motion.section>

              <motion.section
                initial="initial"
                animate="animate"
                variants={stagger}
                id="about"
                className="bg-[#2a2f33] p-10 rounded-lg shadow-lg mb-24"
              >
                <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 libre-franklin-heading">About Danger AI</motion.h2>
                <motion.p variants={fadeInUp} className="mb-6 text-gray-300 text-lg">
                  At Danger AI, we don&apos;t just push boundaries—we obliterate them. Our team of elite data scientists and engineers are committed to creating AI solutions that catapult your business into the future. We&apos;re not just ahead of the curve; we&apos;re creating the next dimension.
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Link
                    href="#contact"
                    className="text-[#e7531a] inline-flex items-center text-lg hover:underline"
                  >
                    Discover Our Edge
                    <ChevronRight className="ml-1" />
                  </Link>
                </motion.div>
              </motion.section>

              <motion.section
                initial="initial"
                animate="animate"
                variants={stagger}
                id="contact"
                className="text-center"
              >
                <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 libre-franklin-heading">Ready to Revolutionize?</motion.h2>
                <motion.p variants={fadeInUp} className="mb-10 text-gray-300 text-xl">
                  Step into the future with Danger AI. Let&apos;s redefine what&apos;s possible.
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Link
                    href="/contact"
                    className="bg-[#e7531a] text-white px-8 py-4 rounded-full inline-flex items-center hover:bg-[#ff6b3d] transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#e7531a]/30"
                  >
                    Initiate Contact
                    <Zap className="ml-2" />
                  </Link>
                </motion.div>
              </motion.section>
            </>
          )}
        </main>

        <footer className="bg-[#2a2f33] text-center p-6 mt-24">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Danger AI. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}