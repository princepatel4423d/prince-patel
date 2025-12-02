import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Terms & Conditions
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <section className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            By using this website, you agree to the following terms and
            conditions. Please read them carefully.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
              1. Use of Content
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              All content on this site, including text, images, and code, is my
              intellectual property unless stated otherwise. You may view and
              share the content for personal use, but you may not copy,
              reproduce, or distribute it without permission.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
              2. User Conduct
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              You agree not to use this site in any way that may harm, disrupt,
              or damage its functionality, security, or reputation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
              3. External Links
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              This site may contain links to third-party websites. I am not
              responsible for the content or privacy practices of those sites.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
              4. Limitation of Liability
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              I am not liable for any damages or losses resulting from your use
              of this site or its content.
            </p>
          </div>
        </section>

        <footer className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            These terms are subject to change without notice. Continued use of
            the site means you accept the updated terms.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Terms;