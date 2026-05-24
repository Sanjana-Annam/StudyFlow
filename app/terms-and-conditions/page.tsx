// app/terms-and-conditions/page.tsx
import type { Metadata } from 'next';
import PublicNav from '@/components/layout/PublicNav';
import Footer from '@/components/layout/Footer';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms and Conditions — StudyFlow',
  description: 'Read StudyFlow\'s Terms and Conditions governing your use of the platform.',
  alternates: { canonical: 'https://studyflowapp.com/terms-and-conditions' },
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using StudyFlow ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the Service.

These Terms apply to all users of the Service, including visitors, registered users, and contributors. We reserve the right to update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.

If you are under 18, you affirm that you have obtained the consent of a parent or legal guardian to use the Service.`,
  },
  {
    title: '2. Description of Service',
    content: `StudyFlow is a web-based educational productivity platform that provides students with tools including Pomodoro timers, study planners, distraction trackers, productivity analytics, and a gamification system to support academic performance.

The Service is provided free of charge. We reserve the right to introduce premium features in the future. Any paid features will be clearly disclosed in advance, and existing free functionality will remain available at no cost.

We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation.`,
  },
  {
    title: '3. User Accounts',
    content: `To access certain features of the Service, you must create an account. You are responsible for:

- Providing accurate, current, and complete information during registration
- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Notifying us immediately of any unauthorised use of your account

You must be at least 13 years of age to create an account. By creating an account, you confirm you meet this requirement.

We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or use the Service in a manner that could harm other users or the Service.`,
  },
  {
    title: '4. Acceptable Use',
    content: `You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:

- Use the Service in any way that violates applicable laws or regulations
- Upload, transmit, or distribute any content that is harmful, obscene, defamatory, or otherwise objectionable
- Attempt to gain unauthorised access to any part of the Service or its related systems
- Use automated tools to scrape, crawl, or extract data from the Service without our express permission
- Interfere with or disrupt the integrity or performance of the Service
- Impersonate any person or entity or misrepresent your affiliation with any person or entity
- Engage in any activity that could damage the reputation of StudyFlow or its users

Violation of these terms may result in immediate termination of your account.`,
  },
  {
    title: '5. Intellectual Property',
    content: `The Service and its original content, features, and functionality are owned by StudyFlow and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.

You retain ownership of any content you create or upload to the Service (such as study plans and notes). By creating content on the Service, you grant us a limited, non-exclusive licence to store and display that content as necessary to provide the Service.

The blog content, articles, and educational resources on the StudyFlow website are © StudyFlow. You may share links to our content, but may not reproduce substantial portions without permission.`,
  },
  {
    title: '6. Disclaimer of Warranties',
    content: `The Service is provided on an "as is" and "as available" basis without any warranties, express or implied. We do not warrant that:

- The Service will be uninterrupted, timely, secure, or error-free
- The results obtained from using the Service will be accurate or reliable
- Any errors in the Service will be corrected

While StudyFlow is designed to support study habits and academic productivity, we make no guarantee of specific academic outcomes, grade improvements, or exam results. The effectiveness of study tools depends on individual effort, consistency, and circumstances beyond our control.`,
  },
  {
    title: '7. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, StudyFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of revenue, or academic consequences, arising from your use of or inability to use the Service.

Our total liability to you for any claim arising from these Terms or your use of the Service shall not exceed the amount you paid us in the twelve months prior to the claim (which may be zero, as the Service is currently free).`,
  },
  {
    title: '8. Privacy',
    content: `Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your personal information.

By using the Service, you consent to the data practices described in our Privacy Policy.`,
  },
  {
    title: '9. Termination',
    content: `You may terminate your account at any time by using the account deletion function in Settings or by contacting us at hello@studyflowapp.com.

We may terminate or suspend your account and access to the Service immediately, without prior notice, if you breach these Terms.

Upon termination, your right to use the Service ceases immediately. We will delete your personal data in accordance with our Privacy Policy.`,
  },
  {
    title: '10. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.

Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of India.

If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    title: '11. Contact',
    content: `For questions about these Terms, please contact us at:

**Email:** legal@studyflowapp.com
**General:** hello@studyflowapp.com

We aim to respond to all legal enquiries within 5 business days.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <LegalLayout
        title="Terms and Conditions"
        subtitle="Last updated: January 1, 2025 · Effective: January 1, 2025"
        sections={SECTIONS}
      />
      <Footer />
    </div>
  );
}
