import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto bg-white dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.03] dark:to-transparent">
<div className="container">
                <div className="grid gap-y-10 gap-x-4 py-14 sm:grid-cols-3 lg:grid-cols-5 lg:py-[100px]">
                    <div>
                        <ul className="flex flex-col gap-3 font-bold">
                            <li className="mb-3 text-lg font-extrabold text-black dark:text-white">Quick Menu</li>
                            <li>
                                <Link to="/" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Career
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-3 font-bold">
                            <li className="mb-3 text-lg font-extrabold text-black dark:text-white">Services</li>
                            <li>
                                <Link to="/join" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Clubs
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/news" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-3 font-bold">
                            <li className="mb-3 text-lg font-extrabold text-black dark:text-white">Legal</li>
                            <li>
                                <Link to="/terms-conditions" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/404" className="inline-block transition hover:scale-110 hover:text-secondary">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
