import React from "react";
import { assets } from "../assets/assets";

const About = () => {
    return (
        <div> 
            <div className="text-center text-2xl pt-10 text-gray-500"> 
                <p><span className="text-gray-700 font-medium font-bold"></span> ABOUT US</p>
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-12">
                <img 
                    className="w-full md:max-w-[360px]"  
                    src={assets.about_image} 
                    alt="About Us"
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
                    <p className="text-lg font-medium">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur omnis repudiandae unde aperiam rem. Natus cupiditate labore atque? Nobis, asperiores.
                    </p>
                    <p className="text-lg font-medium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus distinctio alias pariatur magni molestiae illo excepturi voluptatem? Hic optio enim harum cupiditate accusantium, qui officia saepe itaque laudantium odit totam?
                    </p>
                    <p className="text-gray-800 font-bold text-lg">Our Vision</p>
                    <p className="text-lg font-medium">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque optio ratione et quia quis sint harum sunt reprehenderit voluptatem quam animi repudiandae, eveniet, velit molestiae.
                    </p>
                </div>
            </div>

            <div className="text-xl my-4">
                <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span> </p>
            </div>
            <div className="flex flex-row md:flex-row mb-120">
             <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 
             text-gray-600 cursor-pointer">
                <b>Effiency:</b>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, animi.</p>
             </div>
             <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 
             text-gray-600 cursor-pointer">
             <b>Convience:</b>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, exercitationem!</p>
             </div>
             <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 
             text-gray-600 cursor-pointer">
             <b>Personalization:</b>
             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, architecto.</p>
                </div>   
            </div>
        </div>
    );
};

export default About;
