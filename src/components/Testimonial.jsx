import { testimonial } from '@/data/testimonial';
import React from 'react'
import { Card, CardContent } from './ui/card';
import Image from 'next/image';

const Testimonial = () => {
  return (
    <section className="w-full my-12 py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-black">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 gradient-title">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonials, index) => {
              return (
                <Card  className="gradient-card" key={index} >
                  <CardContent className="pt-6" >
                    <div className='flex flex-col space-y-4'>
                        <div className='flex items-center space-x-4'>
                          <div className='relative h-12 w-12 flex-shrink-0'>
                            <Image 
                          width={40}
                          height={40}
                          src={testimonials.image}
                          alt={testimonials.author}
                          className='rounded-full object-cover border-2 border-blue-500/20'
                          />
                          </div>
                          <div >
                            <p className='font-semibold'>{testimonials.author}</p>
                            <p className='text-sm text-muted-foreground'>{testimonials.role}</p>
                            <p className='text-sm text-blue-600'>{testimonials.company}</p>
                          </div>
                        </div>
                        <blockquote>
                            <p className='text-muted-foreground italic relative'>
                                <span className='text-3xl text-blue-600 absolute -top-4 -left-2'>
                                    &quot;
                                </span>
                                {testimonials.quote}
                                <span className='text-3xl text-blue-600 absolute -bottom-4'>
                                    &quot;
                                </span>
                            </p>
                        </blockquote>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
  )
}

export default Testimonial
