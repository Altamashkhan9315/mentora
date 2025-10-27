"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";



const Features = () => {
  const router = useRouter();
  return (
    <section className="w-full my-12 py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12 gradient-title">Powerful Features for Your Career Growth</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
           {features.map((feature, index) => {
             return (
               <Card className="gradient-card border border-blue-200 dark:border-blue-800 hover:border-2 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300" key={index} onClick={() => router.push(feature.link)} >
                <CardContent className="pt-6 text-center flex flex-col items-center" >
                  <div className="flex flex-col items-center justify-center" >
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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

export default Features
