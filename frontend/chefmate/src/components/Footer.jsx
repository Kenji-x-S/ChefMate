import React from 'react'

export default function Footer(){
  return(
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16 px-10 text-center">
        {/* Logo Section */}
        <div className="mb-8">
            <h2 className="text-5xl font-light tracking-widest text-orange-300 mb-8">ChefMate</h2>
        </div>
        
        {/* Description */}
        <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg leading-relaxed text-gray-300">
                Your ultimate cooking companion. Discover recipes, plan meals, and cook with confidence. 
                Easy meal planning and recipe management for food lovers everywhere.
            </p>
        </div>

        {/* Team Profiles */}
        <div className="flex justify-center gap-20 mb-10 flex-wrap">
            <div className="text-center min-w-[200px]">
                <div className="mb-5">
                    <div className="w-30 h-30 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center text-5xl mx-auto border-4 border-orange-300/30 shadow-lg shadow-orange-300/20">
                        👨‍💻
                    </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-1">John Smith</h3>
                <p className="text-orange-300 text-base font-medium mb-2">Lead Developer</p>
                <p className="text-gray-400 text-sm">Follow at @johnsmith</p>
            </div>

            <div className="text-center min-w-[200px]">
                <div className="mb-5">
                    <div className="w-30 h-30 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center text-5xl mx-auto border-4 border-orange-300/30 shadow-lg shadow-orange-300/20">
                        👩‍💻
                    </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-1">Sarah Johnson</h3>
                <p className="text-orange-300 text-base font-medium mb-2">UI/UX Designer</p>
                <p className="text-gray-400 text-sm">Follow at @sarahjohnson</p>
            </div>

            <div className="text-center min-w-[200px]">
                <div className="mb-5">
                    <div className="w-30 h-30 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center text-5xl mx-auto border-4 border-orange-300/30 shadow-lg shadow-orange-300/20">
                        👨‍💻
                    </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-1">Mike Wilson</h3>
                <p className="text-orange-300 text-base font-medium mb-2">Backend Developer</p>
                <p className="text-gray-400 text-sm">Follow at @mikewilson</p>
            </div>
        </div>

        {/* Divider Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent my-10 max-w-4xl mx-auto"></div>

        {/* Social and Contact Info */}
        <div className="mb-6">
            <p className="text-gray-300 text-base mb-2 leading-relaxed">Follow @chefmate on Twitter for the latest news.</p>
            <p className="text-gray-300 text-base leading-relaxed">For other inquiries, you may email us at hello@chefmate.com</p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-5 mt-5">
            <p className="text-gray-500 text-sm">Copyright © 2024 ChefMate - All Rights Reserved</p>
        </div>
    </div>
  )
}