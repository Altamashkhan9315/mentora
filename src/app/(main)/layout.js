import React from "react";
import { checkUser } from "@/lib/CheckUser";

const MainLayout = async ({children})=>{
    // Ensure user exists in the database
    await checkUser();
    
    return (
        <div className="container mx-auto pt-24 mb-20">{children}</div>
    )
}

export default MainLayout;