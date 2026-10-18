
import React from "react";
import {FaInstagram,FaLinkedinIn,FaFacebookF,FaGithub,FaXTwitter,FaBriefcase,} from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    { name: "Instagram", Icon: FaInstagram },
    { name: "LinkedIn", Icon: FaLinkedinIn },
    { name: "Facebook", Icon: FaFacebookF },
    { name: "X (Twitter)", Icon: FaXTwitter },
    { name: "GitHub", Icon: FaGithub },
  ];

  return (
    <footer className="mt-auto w-full bg-[#17152B] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-950/30">
                <FaBriefcase size={23} />
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Career<span className="text-purple-400">Verse</span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Discover opportunities, connect with great companies, and take
              the next step in your career journey.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ name, Icon }) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  title={name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400/50 hover:bg-purple-600 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              For Job Seekers
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <a href="/jobs" className="transition-colors hover:text-purple-300">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/browse" className="transition-colors hover:text-purple-300">
                  Explore Opportunities
                </a>
              </li>
              <li>
                <a href="/profile" className="transition-colors hover:text-purple-300">
                  My Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Recruiters */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              For Recruiters
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <a href="/admin/jobs" className="transition-colors hover:text-purple-300">
                  Manage Jobs
                </a>
              </li>
              <li>
                <a href="/admin/companies" className="transition-colors hover:text-purple-300">
                  Manage Companies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 transition-colors hover:text-purple-300"
                >
                  Join Our Network
                  <FaArrowUpRightFromSquare size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CareerVerse. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Built for your next big opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
