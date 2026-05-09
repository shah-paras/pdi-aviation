import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-sky-400 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p className="text-slate-300 text-sm leading-relaxed mb-3">{children}</p>;
}

function List({ items }) {
  return (
    <ul className="space-y-2 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-300">
          <span className="text-sky-500 mt-1 shrink-0">&bull;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto mb-4 rounded-lg border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/5">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-slate-300 font-medium px-4 py-2.5 border-b border-white/10">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="text-slate-400 px-4 py-2.5">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-500">
            PDI Aviation &middot; Operated by PlaneDekho &middot; Effective May 10, 2026
          </p>
        </div>

        <div className="h-px bg-white/10 mb-10" />

        <Section title="1. Who We Are">
          <P>PDI Aviation ("we", "us", "our") is India's private aviation intelligence platform, operated by PlaneDekho. Our platform is accessible at <a href="https://www.pdiaviation.co.in" className="text-sky-400 hover:text-sky-300">www.pdiaviation.co.in</a> and <a href="https://www.planedekhoindia.com" className="text-sky-400 hover:text-sky-300">www.planedekhoindia.com</a>, and provides aircraft comparison, range mapping, finance calculation, fleet directory, and related aviation intelligence services.</P>
          <P>For any privacy-related queries, contact us at: <strong className="text-white">info@planedekhoindia.com</strong></P>
        </Section>

        <Section title="2. Information We Collect">
          <h3 className="text-sm font-medium text-white mb-2">2.1 Information You Provide Directly</h3>
          <List items={[
            <><strong className="text-white">Account information</strong> — name, email address, and password when you register</>,
            <><strong className="text-white">Billing information</strong> — payment details processed securely via Razorpay (we do not store your card or UPI details)</>,
            <><strong className="text-white">Profile preferences</strong> — aircraft interests, budget range, subscription tier</>,
            <><strong className="text-white">Communications</strong> — messages you send us via email or contact forms</>,
          ]} />
          <h3 className="text-sm font-medium text-white mb-2">2.2 Information Collected Automatically</h3>
          <List items={[
            <><strong className="text-white">Usage data</strong> — pages visited, features used, aircraft compared, searches performed</>,
            <><strong className="text-white">Device information</strong> — browser type, operating system, screen resolution, IP address</>,
            <><strong className="text-white">Session data</strong> — time spent on pages, click patterns, feature interactions</>,
            <><strong className="text-white">Cookies and local storage</strong> — to maintain your session and remember your preferences</>,
          ]} />
          <h3 className="text-sm font-medium text-white mb-2">2.3 Information From Third Parties</h3>
          <List items={[
            <><strong className="text-white">Payment processors</strong> — Razorpay may share transaction confirmation data with us</>,
            <><strong className="text-white">Authentication providers</strong> — if you sign in via Google or other OAuth providers, we receive your name and email</>,
          ]} />
        </Section>

        <Section title="3. How We Use Your Information">
          <P>We use the information we collect to:</P>
          <List items={[
            <><strong className="text-white">Provide and operate the platform</strong> — deliver the features you have subscribed to</>,
            <><strong className="text-white">Personalise your experience</strong> — remember saved aircraft, comparisons, and budget preferences</>,
            <><strong className="text-white">Process payments</strong> — manage your subscription, renewals, and billing</>,
            <><strong className="text-white">Send service communications</strong> — account confirmations, price alerts, subscription receipts</>,
            <><strong className="text-white">Send product updates</strong> — new aircraft added, new features launched (you may opt out at any time)</>,
            <><strong className="text-white">Improve the platform</strong> — analyse usage patterns to fix bugs and build better features</>,
            <><strong className="text-white">Comply with legal obligations</strong> — GST compliance, DPDP Act obligations, and regulatory requirements</>,
          ]} />
          <P>We do <strong className="text-white">not</strong> use your data for selling to third-party advertisers, building advertising profiles, or any purpose unrelated to operating PDI Aviation.</P>
        </Section>

        <Section title="4. Legal Basis for Processing">
          <P>Under India's Digital Personal Data Protection Act 2023 (DPDP Act), we process your personal data on the following bases:</P>
          <List items={[
            <><strong className="text-white">Consent</strong> — you have provided explicit consent at sign-up</>,
            <><strong className="text-white">Contractual necessity</strong> — to fulfil your subscription and deliver services you have paid for</>,
            <><strong className="text-white">Legitimate interests</strong> — improving platform security, preventing fraud, and sending relevant product updates</>,
            <><strong className="text-white">Legal obligation</strong> — compliance with applicable Indian laws including GST and financial record-keeping</>,
          ]} />
        </Section>

        <Section title="5. Cookies">
          <DataTable
            headers={['Cookie Type', 'Purpose', 'Can You Opt Out?']}
            rows={[
              ['Essential', 'Login session, security, core functionality', 'No — required'],
              ['Functional', 'Saved preferences, language, currency selection', 'No — required'],
              ['Analytics', 'Usage patterns via privacy-respecting analytics', 'Yes — via browser settings'],
            ]}
          />
          <P>We do not use advertising or tracking cookies.</P>
        </Section>

        <Section title="6. Data Sharing">
          <P>We share your data only in the following circumstances:</P>
          <List items={[
            <><strong className="text-white">Razorpay</strong> — to process subscription payments securely</>,
            <><strong className="text-white">Email service providers</strong> — to send transactional emails</>,
            <><strong className="text-white">Cloud infrastructure providers</strong> — to host and serve the platform</>,
            <><strong className="text-white">Legal authorities</strong> — only when required by law, court order, or regulatory direction</>,
          ]} />
          <P>We do not sell, rent, or trade your personal data to any third party.</P>
        </Section>

        <Section title="7. Data Retention">
          <DataTable
            headers={['Data Type', 'Retention Period']}
            rows={[
              ['Account and profile data', 'Duration of account + 2 years'],
              ['Billing and payment records', '7 years (GST compliance)'],
              ['Usage and analytics data', '12 months rolling'],
              ['Emails and communications', '3 years'],
            ]}
          />
          <P>When you delete your account, we delete your personal data within 30 days, except where retention is required by law.</P>
        </Section>

        <Section title="8. Your Rights">
          <P>Under the DPDP Act 2023, you have the right to:</P>
          <List items={[
            <><strong className="text-white">Access</strong> — request a copy of the personal data we hold about you</>,
            <><strong className="text-white">Correction</strong> — request correction of inaccurate or incomplete data</>,
            <><strong className="text-white">Erasure</strong> — request deletion of your personal data</>,
            <><strong className="text-white">Withdrawal of consent</strong> — withdraw consent at any time</>,
            <><strong className="text-white">Grievance redressal</strong> — raise a complaint with us or with the Data Protection Board of India</>,
          ]} />
          <P>To exercise any of these rights, email us at <strong className="text-white">info@planedekhoindia.com</strong>. We will respond within 30 days.</P>
        </Section>

        <Section title="9. Data Security">
          <P>We protect your data using HTTPS encryption for all data in transit, encrypted storage for sensitive account data, secure access-controlled infrastructure, and regular security reviews.</P>
          <P>No system is 100% secure. In the event of a data breach that affects your rights, we will notify you as required under the DPDP Act.</P>
        </Section>

        <Section title="10. Children's Privacy">
          <P>PDI Aviation is intended for adults making or researching significant financial decisions. We do not knowingly collect personal data from anyone under 18. If you believe a minor has created an account, contact us at <strong className="text-white">info@planedekhoindia.com</strong>.</P>
        </Section>

        <Section title="11. Changes to This Policy">
          <P>We may update this Privacy Policy from time to time. Material changes will be communicated via email and a 14-day banner on the platform. Continued use after notification constitutes acceptance.</P>
        </Section>

        <Section title="12. Contact Us">
          <div className="bg-white/5 rounded-xl border border-white/10 p-5">
            <p className="text-white font-medium mb-2">PDI Aviation — Privacy Team</p>
            <div className="text-sm text-slate-400 space-y-1">
              <p>Email: info@planedekhoindia.com</p>
              <p>Business: business@pdiaviation.co.in</p>
              <p>Phone: +91 8879126239 | +91 7977072673</p>
              <p>Website: <a href="https://www.pdiaviation.co.in" className="text-sky-400 hover:text-sky-300">www.pdiaviation.co.in</a> | <a href="https://www.planedekhoindia.com" className="text-sky-400 hover:text-sky-300">www.planedekhoindia.com</a></p>
            </div>
          </div>
        </Section>

        <div className="h-px bg-white/10 my-8" />
        <p className="text-xs text-slate-600 italic">This Privacy Policy is governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Mumbai, Maharashtra.</p>
      </div>
    </div>
  );
}
