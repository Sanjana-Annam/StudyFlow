// app/privacy-policy/page.tsx
import type { Metadata } from 'next';
import PublicNav from '@/components/layout/PublicNav';
import Footer from '@/components/layout/Footer';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy — StudyFlow',
  description: 'Read StudyFlow\'s Privacy Policy to understand how we collect, use, and protect your personal data.',
  alternates: { canonical: 'https://studyflowapp.com/privacy-policy' },
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect the following categories of personal information when you use StudyFlow:

**Account Information:** When you register, we collect your name, email address, and optionally a profile photo. If you sign in with Google, we receive the information you have authorised Google to share, which typically includes your name, email, and profile picture.

**Study Data:** We collect information about your study activity, including study sessions, completed tasks, Pomodoro timer records, distraction logs, and study plans. This data is tied to your account and is used solely to provide and improve the StudyFlow service.

**Usage Data:** We automatically collect certain technical information when you use our service, including your browser type, device type, operating system, IP address (for security purposes only), pages visited, and time spent on pages. This information is collected in aggregate and is not used to personally identify you.

**Communications:** If you contact us via email or our contact form, we retain those communications to respond to you and improve our service.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect for the following purposes:

**Providing the Service:** Your account and study data are used to operate StudyFlow — to display your study plans, track your sessions, calculate your productivity score, and power all app features.

**Improving the Service:** Aggregated, anonymised usage data helps us understand how students use StudyFlow, identify bugs, and prioritise new features. We never use individual user data for product decisions.

**Communications:** We may send you transactional emails (password resets, account confirmations) and, if you opt in, our weekly study tips newsletter. You can unsubscribe from marketing emails at any time.

**Security:** We use technical information to detect and prevent fraudulent activity, abuse, and security incidents.

We do not sell your personal data to any third party. We do not use your personal information for advertising targeting.`,
  },
  {
    title: '3. Data Storage and Security',
    content: `StudyFlow uses Google Firebase for authentication and data storage. Firebase stores data on Google's secure cloud infrastructure, which complies with ISO 27001, SOC 1, SOC 2, and SOC 3 standards.

All data transmitted between your browser and our service is encrypted using TLS (HTTPS). Passwords are never stored in plain text — Firebase Auth handles authentication using industry-standard security practices.

Your study data is stored in Google Firestore and is accessible only to your authenticated account. We do not have the ability to view your personal study data unless you explicitly share it with us for support purposes.

We retain your data for as long as your account is active. If you delete your account, your personal data and study history will be permanently deleted within 30 days.`,
  },
  {
    title: '4. Cookies and Tracking',
    content: `StudyFlow uses the following types of cookies and local storage:

**Essential Cookies:** Required for the app to function — session management, authentication state, and user preferences (such as dark/light mode).

**Analytics:** We use anonymised analytics to understand how the app is used. This data is collected in aggregate and does not include personally identifiable information.

**No Third-Party Advertising Cookies:** We do not use advertising cookies or allow third-party advertisers to track users on our platform.

You can control cookies through your browser settings. Disabling essential cookies may affect the functionality of the app.`,
  },
  {
    title: '5. Third-Party Services',
    content: `StudyFlow uses the following third-party services:

**Google Firebase:** Authentication and database storage. Firebase is governed by Google's Privacy Policy (policies.google.com/privacy).

**Google Analytics (if applicable):** We may use anonymised, aggregated analytics. No personally identifiable information is shared with Google Analytics.

**Google AdSense:** We may display advertisements on certain pages of our website. Google may use cookies to show relevant ads based on your browsing history. You can opt out of personalised advertising at google.com/settings/ads.

We carefully select third-party providers and require that they maintain data protection standards consistent with applicable privacy laws.`,
  },
  {
    title: '6. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

**Access:** You can request a copy of the personal data we hold about you.

**Correction:** You can update your profile information directly within the app settings.

**Deletion:** You can delete your account and all associated data from the settings page. We will permanently delete your data within 30 days.

**Data Portability:** You can request an export of your study data in a standard format.

**Objection to Processing:** You can object to certain uses of your data by contacting us.

To exercise any of these rights, please contact us at privacy@studyflowapp.com.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `StudyFlow is intended for users who are 13 years of age or older. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child under 13 has provided personal information to us, please contact us immediately and we will take steps to delete that information.

Users aged 13–17 may use StudyFlow with parental awareness. We encourage parents to review this policy and discuss online privacy with their children.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make significant changes, we will notify you via email (if you have an account) or through a prominent notice on our website.

Your continued use of StudyFlow after the effective date of any changes constitutes your acceptance of the updated policy. We recommend reviewing this policy periodically.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Email:** privacy@studyflowapp.com
**General Contact:** hello@studyflowapp.com
**Address:** StudyFlow, India

We take all privacy inquiries seriously and aim to respond within 5 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <LegalLayout
        title="Privacy Policy"
        subtitle="Last updated: January 1, 2025"
        sections={SECTIONS}
      />
      <Footer />
    </div>
  );
}
