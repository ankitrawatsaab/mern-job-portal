import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bottom-0 left-0 w-full bg-white text-black py-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                    <div className="mb-4 md:mb-0">
                        <span className="font-bold text-lg">Job<span className="text-[#6A38C2]">Portal</span></span>
                    </div>

                    <div className="text-sm text-black-400">
                        &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
                    </div>
                </div>
            </footer>


        </div>
    )
}

export default Footer
