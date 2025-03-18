
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <div className="mb-8">
            <Link to="/" className="text-farm-primary hover:underline flex items-center">
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At Farmly.ng, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We may collect information about you in various ways, including:
            </p>
            <ul>
              <li>Personal Data: Name, email address, phone number, banking information, and other identifiers.</li>
              <li>Usage Data: Information about how you use our website and services.</li>
              <li>Cookies and Tracking Technologies: Information collected through cookies, web beacons, and other tracking technologies.</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We may use the information we collect about you for various purposes, including:
            </p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To process your investments and payouts</li>
              <li>To notify you about changes to our services</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
            
            <h2>4. Disclosure of Your Information</h2>
            <p>
              We may share your information with third parties in certain situations, including:
            </p>
            <ul>
              <li>With service providers to monitor and analyze the use of our services</li>
              <li>For business transfers, such as mergers, sales of company assets, or acquisitions</li>
              <li>With affiliates, in which case we will require those affiliates to honor this Privacy Policy</li>
              <li>With business partners to offer you certain products, services or promotions</li>
              <li>When required by law, such as in response to a subpoena or similar legal process</li>
            </ul>
            
            <h2>5. Security of Your Data</h2>
            <p>
              We employ industry-standard security measures to protect your personal information, including SSL/TLS encryption for data transmission and industry best practices for data storage. However, no method of transmission over the Internet or method of electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            
            <h2>6. Your Data Protection Rights</h2>
            <p>
              You have certain data protection rights, including:
            </p>
            <ul>
              <li>The right to access, update, or delete the information we have on you</li>
              <li>The right of rectification - to have your information rectified if it is inaccurate or incomplete</li>
              <li>The right to object to our processing of your personal data</li>
              <li>The right of restriction - to request that we restrict the processing of your personal information</li>
              <li>The right to data portability - to receive a copy of your data in a structured, machine-readable format</li>
            </ul>
            
            <h2>7. Cookies Policy</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18.
            </p>
            
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at invest@farmly.ng.
            </p>
            
            <p className="text-sm text-muted-foreground mt-8">
              Last updated: June 1, 2023
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
