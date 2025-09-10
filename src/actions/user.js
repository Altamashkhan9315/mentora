"use server"

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data){
            const {userId} = await auth();
            if(!userId) throw new Error("Unauthorized");

            const user = await db.user.findUnique({
                where:{
                    clerkUserId:userId,
                },
            })

            if(!user) throw new Error ("user not found");

   try {
    const result = await db.$transaction(
        async (tx) => {
            let industryInsight=await tx.industryInsight.findUnique({
                where:{
                    industry:data.industry,
                }
            });

            if(!industryInsight){
                const insights=await generateAIInsights(data.industry);
                
                            industryInsight=await db.industryInsight.create({
                                data:{
                                    industry:data.industry,
                                    ...insights,
                                    nextUpdate:new Date(Date.now() +7 *24 *60 *60 *1000),
                                }
                            })
            }

            const updatedUser=await tx.user.update({
                where:{
                    id:user.id,
                },
                data:{
                    industry:data.industry,
                    experience:data.experience,
                    bio:data.bio,
                    skills:data.skills,
                }
            });

            return {
                updatedUser: {
                    id: updatedUser.id,
                    industry: updatedUser.industry,
                    experience: updatedUser.experience,
                    bio: updatedUser.bio,
                    skills: updatedUser.skills,
                },
                industryInsight: {
                    id: industryInsight.id,
                    industry: industryInsight.industry,
                }
            };

        },
        {
            timeout:10000
        }
    );
    return {success:true, data: result};
   } catch (error) {
    console.log("Error updating user and industries : ",error.message);
    throw new Error("Failed to update profile: " + error.message)
   }
}

export async function getUserOnboardingStatus(){
    const {userId}=await auth();

    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where:{
            clerkUserId:userId,
        },
    });

    if(!user) throw new Error("User not found");

    try {
        const user = await db.user.findUnique({
            where:{
                clerkUserId:userId,
            },
            select:{
                industry:true,
            },
        });

        return {
                isOnboarded: !!user?.industry,
            }
    } catch (error) {
        console.log("Error checking onboarding status : ",error.message);
        throw new Error("Failed to check onboarding status");
    }

}