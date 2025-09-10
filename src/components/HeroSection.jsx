"use client"
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {

  const imageRef = useRef(null);

  useEffect(()=>{
   const imageElement=imageRef.current;

   const handleScroll=()=>{
    if (!imageElement) return;
    const scrollPosition=window.scrollY;
    const scrollThresold=100;

    if(scrollPosition>scrollThresold){
        imageElement.classList.add("scrolled");
    }else{
        imageElement.classList.remove("scrolled");
    }
    }

    window.addEventListener("scroll",handleScroll);
    return()=>window.removeEventListener("scroll",handleScroll);
  },[])

  return (
    <section className='container pt-36 md:pt-24 pb-10'>
      <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto' >
            <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl  gradient-title'>Your AI Career Coach for
                <br />
                Professional Success
            </h1>
            <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                Advanced your career with personalized guidance, interview prep, and AI-powered tools for job success.
            </p>
        </div>
        <div className='flex justify-center gap-4'>
            <Link href='/dashboard' >
            <Button size='lg' className='px-8'>Get Started</Button>
            </Link>
            <Link href='/'>
            <Button size='lg' variant="outline" className='px-8'>Get Started</Button>
            </Link>
        </div>
        <div className='hero-image-wrapper mt-5 md:mt-0'>
            <div ref={imageRef} className='hero-image'>
                <Image src={'/banner3.jpeg'}
                    width={1080}
                    height={720}
                    alt='banner mentora'
                    className='rounded-lg shadow-2xl border mx-auto'
                    priority

                />
            </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
