import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-gray-700 mb-4">
        <strong>Last Updated:</strong> July 9, 2025
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Use of Website</h2>
        <p className="text-gray-700">
          You may use this website for personal, non-commercial purposes only. You agree not to misuse this site, interfere with its security, or attempt unauthorized access.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Intellectual Property</h2>
        <p className="text-gray-700">
          All content on this site including text, designs, images, and logos is the property of SStudio unless stated otherwise. You may not reproduce, copy, or use any materials without prior written permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Accuracy of Information</h2>
        <p className="text-gray-700">
          We strive to keep the information on our site accurate and updated, but we do not guarantee its completeness or accuracy. Use the information at your own risk.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Third-Party Links</h2>
        <p className="text-gray-700">
          Our website may include links to third-party websites. We are not responsible for their content, privacy policies, or practices.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p className="text-gray-700">
          We are not liable for any damages that result from using this site, including but not limited to direct, indirect, or incidental damages.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Changes to These Terms</h2>
        <p className="text-gray-700">
          We may update these Terms and Conditions at any time. Your continued use of the website after any changes means you agree to the new terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p className="text-gray-700">
          If you have questions about these Terms, please contact us at:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Email: sstudio@email.com</li>
          <li>Phone: +1 234 567 8901</li>
          <li>Address: 123 Main Street, City, Country</li>
        </ul>
      </section>
    </div>
  );
};

export default Terms;
