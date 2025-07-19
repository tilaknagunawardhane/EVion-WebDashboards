import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../constants'; // Adjust path as needed
import { FiSearch, FiMail, FiPhone, FiDownload, FiMessageCircle } from 'react-icons/fi'; // Icons for search, email, phone, download, chat

export default function SupportAndHelpCenter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(null); // To show/hide articles in a category

    const helpCenterData = {
        "Getting Started (Onboarding, Station Setup)": [
            { title: "How to create a station owner profile", content: "Detailed steps to set up your account on the Evion platform." },
            { title: "Steps to register a new charging station", content: "A guide through the process of adding your first charging station." },
            { title: "Required documents and approvals for station setup", content: "List of necessary paperwork and regulatory steps." },
            { title: "Platform policies every new station owner should know", content: "Key rules and guidelines for operating on our platform." },
        ],
        "Managing Chargers & Stations": [
            { title: "Adding a new charger to an existing station", content: "Instructions on expanding your station's capacity." },
            { title: "Editing station or charger details", content: "How to update information like location, power, and availability." },
            { title: "Viewing performance analytics for each charger", content: "Understand your charger's usage, uptime, and revenue." },
            { title: "Removing or deactivating a faulty charger", content: "Steps to temporarily or permanently remove a charger from service." },
        ],
        "Handling Bookings and Walk-ins": [
            { title: "Understanding how bookings are made", content: "Learn the user's booking journey and what to expect." },
            { title: "How to view and manage upcoming bookings", content: "Access your booking calendar and manage reservations." },
            { title: "Policy on no-shows and late arrivals", content: "Information regarding user conduct and charges for unattended bookings." },
            { title: "Walk-in session tracking and differences from bookings", content: "How spontaneous charging sessions are handled and recorded." },
        ],
        "Understanding Earnings & Payouts": [
            { title: "How earnings are calculated", content: "Breakdown of our revenue sharing model and fee structures." },
            { title: "Viewing transactions per charger or station", content: "Access detailed reports of all financial transactions." },
            { title: "Payout schedule and methods", content: "Information on when and how you'll receive your earnings." },
            { title: "How to resolve payout discrepancies", content: "Steps to take if you notice any issues with your payouts." },
        ],
        "Fault Reporting and Resolution": [
            { title: "Types of faults: Station, Charger, Booking", content: "Categorization of common issues and their impact." },
            { title: "How to respond to EV user-reported faults", content: "Your role in addressing immediate user concerns." },
            { title: "Escalating faults to the platform support team", content: "When and how to involve our dedicated support for complex issues." },
            { title: "Monitoring fault resolution status", content: "Track the progress of reported faults until they are resolved." },
        ],
        "Using the Dashboard": [
            { title: "Overview of your dashboard layout", content: "A tour of the main features and navigation of your dashboard." },
            { title: "Filtering data by charger/station/time period", content: "Learn to customize your view for specific insights." },
            { title: "Interpreting session and revenue analytics", content: "How to make sense of the data presented to you." },
            { title: "Accessing station profile and performance summary", content: "Quick links to your station's overall performance metrics." },
        ],
        "Compliance / Technical Setup (Charger software, connectivity)": [
            { title: "Requirements for charger software integration", content: "Technical specifications and guidelines for software compatibility." },
            { title: "What to do if your charger goes offline", content: "Immediate troubleshooting steps for connectivity issues." },
            { title: "Technical support for software updates", content: "Guidance on keeping your charger software current and efficient." },
            { title: "Network and connectivity troubleshooting", content: "Advanced steps to diagnose and resolve internet connection problems." },
        ],
    };

    const faqs = [
        {
            q: "How to update station details?",
            a: "Go to “My Stations” → Select the station → Click “Edit Details.” You can update the name, location, image, description, and contact info. Changes are reviewed and approved within 24 hours."
        },
        {
            q: "What happens when a booking is canceled?",
            a: "If a user cancels a booking before the session, it won’t appear in the sessions table. If repeated cancellations occur, the system may flag the user. No earnings are recorded for canceled bookings."
        },
        {
            q: "How do I view session reports?",
            a: "Navigate to a specific charger or station, then go to the “Sessions” tab. You can view reports by date, connector type, or energy delivered. Use filters for detailed insights."
        },
        {
            q: "What should I do when a charger shows ‘offline’?",
            a: "First, check physical connectivity and power supply. If all seems fine, contact platform support. Offline chargers may not be bookable and should be flagged for quick resolution."
        },
    ];

    const filteredArticles = Object.entries(helpCenterData)
        .map(([category, articles]) => ({
            category,
            articles: articles.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }))
        .filter(category => category.articles.length > 0 || searchTerm === ''); // Show all categories if no search term

    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleCategory = (categoryName) => {
        setActiveCategory(activeCategory === categoryName ? null : categoryName);
    };

    return (
        <div
            className="rounded-xl bg-transparent p-0 flex flex-col gap-8"
            style={{
                fontFamily: FONTS.family.sans,
                color: COLORS.mainTextColor
            }}
        >

            {/* Search Bar */}
            <div className="relative mb-0">
                <input
                    type="text"
                    placeholder="Search articles and FAQs..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: COLORS.stroke, background: COLORS.white, color: COLORS.mainTextColor }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Help Center / Knowledge Base */}
            <div className="flex flex-col gap-6 bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg" style={{ color: COLORS.mainTextColor }}>
                    Help Center / Knowledge Base
                </h3>
                {filteredArticles.length > 0 ? (
                    filteredArticles.map(({ category, articles }) => (
                        <div key={category} className="border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: COLORS.stroke }}>
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full text-left py-2 font-medium flex justify-between items-center"
                                style={{ color: COLORS.mainTextColor }}
                            >
                                {category}
                                <span className="text-xl">
                                    {activeCategory === category ? '-' : '+'}
                                </span>
                            </button>
                            {activeCategory === category && (
                                <ul className="mt-2 space-y-4 p-8 rounded-xl" style={{backgroundColor: COLORS.bgGreen}}>
                                    {articles.map((article, index) => (
                                        <li key={index} className="text-sm text-gray-700">
                                            <h4 className="font-medium" style={{ color: COLORS.mainTextColor }}>{article.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1">{article.content}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No articles found matching your search.</p>
                )}
            </div>

            {/* Quick FAQs */}
            <div className="flex flex-col gap-6 bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg" style={{ color: COLORS.mainTextColor }}>
                    Quick FAQs
                </h3>
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: COLORS.stroke }}>
                            <h4 className="font-medium mb-1" style={{ color: COLORS.mainTextColor }}>
                                ❓ {faq.q}
                            </h4>
                            <p className="text-sm text-gray-700">{faq.a}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No FAQs found matching your search.</p>
                )}
            </div>

            {/* Contact Methods */}
            <div className="flex flex-col gap-6 p-6 rounded-xl" style={{backgroundColor: COLORS.bgGreen}}>
                <h3 className="font-semibold text-lg" style={{ color: COLORS.mainTextColor }}>
                    Contact Methods
                </h3>
                <div className="flex items-center gap-3">
                    <FiMail size={24} style={{ color: COLORS.primary }} />
                    <div>
                        <p className="font-medium" style={{ color: COLORS.mainTextColor }}>Email Support</p>
                        <p className="text-sm text-gray-700">Reach out to our support team at: <a href="mailto:support@evionplatform.com" style={{ color: COLORS.primary, textDecoration: 'underline' }}>support@evionplatform.com</a></p>
                        <p className="text-xs text-gray-600">Response Time: Within 12–24 hours on business days.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <FiPhone size={24} style={{ color: COLORS.primary }} />
                    <div>
                        <p className="font-medium" style={{ color: COLORS.mainTextColor }}>Phone Support</p>
                        <p className="text-sm text-gray-700">Call us at: <a href="tel:+94771234567" style={{ color: COLORS.primary, textDecoration: 'underline' }}>+94 77 123 4567</a></p>
                        <p className="text-xs text-gray-600">For urgent technical issues, please call rather than email.</p>
                    </div>
                </div>
            </div>

            {/* Documents & Downloads */}
            <div className="flex flex-col gap-4 bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg" style={{ color: COLORS.mainTextColor }}>
                    Documents & Downloads
                </h3>
                <div className="flex items-center gap-3">
                    <FiDownload size={24} style={{ color: COLORS.primary }} />
                    <div>
                        <p className="font-medium" style={{ color: COLORS.mainTextColor }}>Platform User Guide PDF</p>
                        <p className="text-sm text-gray-700">Download the comprehensive user guide for station owners.</p>
                        <a href="/path/to/platform_user_guide.pdf" download="Evion_User_Guide.pdf" className="text-sm font-semibold mt-1 inline-block" style={{ color: COLORS.primary }}>
                            [Download PDF]
                        </a>
                    </div>
                </div>
            </div>

            {/* Talk to Support Officer */}
            <div className="flex flex-col gap-4 bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg" style={{ color: COLORS.mainTextColor }}>
                    Talk to Support Officer
                </h3>
                <p className="text-gray-700">Need direct help?</p>
                <div className="flex items-center gap-3">
                    <FiMessageCircle size={24} style={{ color: COLORS.primary }} />
                    <a
                        href="#" // Replace with your actual chat link (e.g., to a live chat widget or dedicated chat page)
                        className="text-sm font-semibold inline-block"
                        style={{ color: COLORS.primary, textDecoration: 'underline' }}
                        onClick={(e) => { e.preventDefault(); alert('Initiating chat with a Support Officer...'); }} // Placeholder for actual chat initiation
                    >
                        Click here to [Start Chat]
                    </a>
                </div>
                <p className="text-sm text-gray-600">Support Officers help with:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 pl-4">
                    <li>Technical troubleshooting</li>
                    <li>Fault escalations</li>
                    <li>New charger setup assistance</li>
                    <li>Urgent platform usage issues</li>
                </ul>
            </div>
        </div>
    );
}