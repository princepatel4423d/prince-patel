import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
        </header>

        <section className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Your privacy is important to me. This Privacy Policy explains how I
            collect, use, and safeguard your information when you visit my
            portfolio website.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
              1. Information I Collect
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              I may collect personal information such as your name and email
              address when you submit a contact form, sign a guestbook, or
              interact with the site in other ways. Non-personal information
              like browser type, device, and IP address may also be collected
              through analytics tools.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
              2. How I Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>To respond to inquiries or messages</li>
              <li>To improve the website’s performance and content</li>
              <li>To ensure site security and prevent misuse</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
              3. Third-Party Services
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              This site may use third-party services like Google Analytics or
              embedded media, which may collect information according to their
              own privacy policies.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
              4. Your Rights
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              You have the right to request access to or deletion of your
              personal data. Contact me if you wish to exercise these rights.
            </p>
          </div>
        </section>

        <footer className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            If you have questions about this Privacy Policy, please contact me.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;