import React from 'react'
import logo from '../../assets/logo.svg'

const Footer = () => {
    return (
        <>
            <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-10 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-600 bg-linear-to-r from-white via-green-200/60 to-white mt-30">

                <div className="flex flex-wrap items-start gap-10 md:gap-15' xl:gap-20">
                    <a href="#home" className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="h-11 w-auto" />
                        <span className="text-lg font-semibold text-gray-900">
                            MakeYOURresume
                        </span>
                    </a>

                    <div>
                        <p className="text-gray-900 font-semibold">Product</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-indigo-600 transition">Home</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Support</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Pricing</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Affiliate</a></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-gray-900 font-semibold">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-indigo-600 transition">Company</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Blogs</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Community</a></li>
                            <li>
                                <a href="/" className="hover:text-indigo-600 transition">
                                    Careers
                                    <span className="text-xs text-white bg-indigo-600 rounded-md ml-2 px-2 py-1">
                                        We’re hiring!
                                    </span>
                                </a>
                            </li>
                            <li><a href="/" className="hover:text-indigo-600 transition">About</a></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-gray-900 font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-indigo-600 transition">Privacy</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
                    <p className="max-w-60">
                        Making every customer feel valued—no matter the size of your audience.
                    </p>

                    <a href="#" className="font-semibold text-green-600 hover:underline">
                        MakeYOURresume
                    </a>
                </div>
            </footer>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
        </>
    )
}

export default Footer