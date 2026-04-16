"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const termsContent = `
## 1. Acceptance of Terms
By accessing and using Medicare's services, you accept and agree to be bound by the terms and provision of this agreement.

## 2. Medical Disclaimer
The content provided on our website is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.

## 3. Prescription Services
All prescription orders are subject to verification. We reserve the right to refuse service if a prescription cannot be verified with the issuing physician.

## 4. Product Returns
Due to the nature of medical products and health regulations, most prescription medications cannot be returned. Please refer to our detailed return policy for over-the-counter products.

## 5. User Account Security
You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
`;

const privacyContent = `
## 1. Information Collection
We collect information that you provide directly to us, including your name, contact information, prescription details, and health history necessary for fulfilling your orders.

## 2. HIPAA Compliance
As a healthcare provider, we strictly adhere to HIPAA regulations regarding the privacy and security of your protected health information (PHI).

## 3. Data Usage
Your information is used strictly to process orders, manage your account, and provide you with pharmacist consultations or relevant healthcare updates.

## 4. Information Sharing
We do not sell your personal information. We may share information with third parties only when necessary to fulfill your request, such as with your physician or insurance provider.

## 5. Data Security
We implement robust, state-of-the-art security measures to protect your personal and medical data against unauthorized access, alteration, disclosure, or destruction.
`;

export default function TermsPrivacyPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  return (
    <main className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Legal Information</h1>
          <p className="text-muted-foreground text-lg">Please read our terms and privacy guidelines carefully.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sticky Sidebar */}
          <aside className="w-full md:w-64 shrink-0 md:sticky md:top-32">
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col gap-2">
              <button
                onClick={() => setActiveTab("terms")}
                className={`text-left px-5 py-3 rounded-xl font-medium transition-all ${
                  activeTab === "terms" 
                    ? "bg-medical-50 text-medical-600" 
                    : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`text-left px-5 py-3 rounded-xl font-medium transition-all ${
                  activeTab === "privacy" 
                    ? "bg-medical-50 text-medical-600" 
                    : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                }`}
              >
                Privacy Policy
              </button>
            </div>
            
            <div className="mt-8 p-6 bg-medical-900 rounded-2xl text-white">
              <h3 className="font-bold mb-2">Have questions?</h3>
              <p className="text-medical-200 text-sm mb-4">Our support team is here to help clarify any legal terms.</p>
              <a href="mailto:legal@medicare.com" className="text-medical-400 font-medium hover:text-white transition-colors text-sm">
                legal@medicare.com
              </a>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm min-h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="prose prose-slate max-w-none 
                  prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6"
              >
                {activeTab === "terms" ? (
                  <>
                    <h2 className="text-3xl font-bold !mt-0 !mb-8">Terms of Service</h2>
                    <p className="text-sm border-b border-border pb-6 !mb-8">Last updated: October 15, 2023</p>
                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(termsContent) }} />
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold !mt-0 !mb-8">Privacy Policy</h2>
                    <p className="text-sm border-b border-border pb-6 !mb-8">Last updated: October 15, 2023</p>
                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(privacyContent) }} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

// Simple markdown parser for the legal content
function parseMarkdown(text: string) {
  return text
    .split('\\n\\n')
    .map(paragraph => {
      if (paragraph.startsWith('## ')) {
        return `<h2>${paragraph.replace('## ', '')}</h2>`;
      }
      return `<p>${paragraph}</p>`;
    })
    .join('');
}
