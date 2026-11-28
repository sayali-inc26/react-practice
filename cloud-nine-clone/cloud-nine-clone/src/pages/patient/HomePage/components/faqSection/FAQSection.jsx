import { useState } from "react";
import { Plus, X } from "lucide-react";

import "./FAQSection.css";

export default function FAQSection() {

    const [openIndex, setOpenIndex] = useState(null);

    const handleFAQ = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        }
        else {
            setOpenIndex(index);
        }
    };

    return (
        <section className="faqSection">

            <h2>Frequently Asked Questions</h2>

            <div className="faqContainer">

                <div className="faqItem">

                    <div className="faqQuestion" onClick={() => handleFAQ(1)}>
                        <h3>Which is the best hospital for pregnancy and delivery in Pune?</h3>

                        {openIndex === 1 ? <X /> : <Plus />}
                    </div>

                    {openIndex === 1 && (
                        <div className="faqAnswer">
                            <p>Choosing the right hospital depends on your location, medical requirements, available facilities and doctor's experience.</p>
                        </div>
                    )}

                </div>


                <div className="faqItem">

                    <div className="faqQuestion" onClick={() => handleFAQ(2)}>
                        <h3>Which is the best hospital near me for high-risk pregnancy?</h3>

                        {openIndex === 2 ? <X /> : <Plus />}
                    </div>

                    {openIndex === 2 && (
                        <div className="faqAnswer">
                            <p>For high-risk pregnancy, look for a hospital with experienced obstetricians, specialists and emergency care facilities.</p>
                        </div>
                    )}

                </div>


                <div className="faqItem">

                    <div className="faqQuestion" onClick={() => handleFAQ(3)}>
                        <h3>How to check the baby's health during pregnancy?</h3>

                        {openIndex === 3 ? <X /> : <Plus />}
                    </div>

                    {openIndex === 3 && (
                        <div className="faqAnswer">
                            <p>Regular antenatal checkups, ultrasound scans and tests recommended by your doctor help monitor the baby's health.</p>
                        </div>
                    )}

                </div>

                <div className="faqItem">

                    <div className="faqQuestion" onClick={() => handleFAQ(4)}>
                        <h3>When can you hear a baby's heartbeat?</h3>

                        {openIndex === 4 ? <X /> : <Plus />}
                    </div>

                    {openIndex === 4 && (
                        <div className="faqAnswer">
                            <p>A baby's heartbeat can often be detected through an ultrasound around 6 weeks of pregnancy.</p>
                        </div>
                    )}

                </div>


                <div className="faqItem">

                    <div className="faqQuestion" onClick={() => handleFAQ(5)}>
                        <h3>How many scans are done during pregnancy?</h3>

                        {openIndex === 5 ? <X /> : <Plus />}
                    </div>

                    {openIndex === 5 && (
                        <div className="faqAnswer">
                            <p>The number of scans depends on the pregnancy and your doctor's recommendations.</p>
                        </div>
                    )}

                </div>


                <div className="faqItem">

                    <div className="faqQuestion" onClick={() => handleFAQ(6)}>
                        <h3>Which week is best for delivery?</h3>

                        {openIndex === 6 ? <X /> : <Plus />}
                    </div>

                    {openIndex === 6 && (
                        <div className="faqAnswer">
                            <p>For an uncomplicated pregnancy, delivery is generally recommended around 39 to 40 weeks. Your doctor will guide you based on your condition.</p>
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}