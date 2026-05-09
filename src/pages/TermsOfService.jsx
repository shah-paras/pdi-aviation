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

export default function TermsOfService() {
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
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-500">
            PDI Aviation &middot; Operated by PlaneDekho &middot; Effective May 10, 2026
          </p>
        </div>

        <div className="h-px bg-white/10 mb-10" />

        <Section title="1. Agreement to Terms">
          <P>By accessing or using PDI Aviation at <a href="https://www.pdiaviation.co.in" className="text-sky-400 hover:text-sky-300">www.pdiaviation.co.in</a> or <a href="https://www.planedekhoindia.com" className="text-sky-400 hover:text-sky-300">www.planedekhoindia.com</a> ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Platform.</P>
          <P>These Terms form a legally binding agreement between you ("User", "you") and PlaneDekho ("we", "us", "our"), the operator of PDI Aviation.</P>
          <P>For questions about these Terms, contact us at: <strong className="text-white">business@pdiaviation.co.in</strong></P>
        </Section>

        <Section title="2. Description of Service">
          <P>PDI Aviation is a private aviation intelligence platform providing:</P>
          <List items={[
            <><strong className="text-white">Compare Aircraft</strong> — side-by-side specification comparison of 70+ aircraft models</>,
            <><strong className="text-white">Range Map</strong> — real-time range visualisation from any Indian origin airport</>,
            <><strong className="text-white">Finance Calculator</strong> — total cost of ownership modelling including acquisition, operating, and fixed costs</>,
            <><strong className="text-white">Fleet Directory</strong> — Indian NSOP operator and registration database</>,
            <><strong className="text-white">Blog</strong> — aviation industry analysis and buying guides</>,
          ]} />
          <P>Access to features varies by subscription tier as described in Section 5.</P>
        </Section>

        <Section title="3. Eligibility">
          <P>You must be at least 18 years of age, capable of entering into a legally binding agreement under Indian law, and not prohibited from using the Platform under any applicable law. By using the Platform, you represent and warrant that you meet these requirements.</P>
        </Section>

        <Section title="4. Account Registration">
          <h3 className="text-sm font-medium text-white mb-2">4.1 Creating an Account</h3>
          <P>To access features beyond the free Curious tier, you must register an account with a valid email address and password.</P>
          <h3 className="text-sm font-medium text-white mb-2">4.2 Account Security</h3>
          <P>You are responsible for maintaining the confidentiality of your login credentials, all activity that occurs under your account, and notifying us immediately at <strong className="text-white">info@planedekhoindia.com</strong> if you suspect unauthorised access.</P>
          <h3 className="text-sm font-medium text-white mb-2">4.3 Accurate Information</h3>
          <P>You agree to provide accurate, current, and complete information during registration and to keep it updated.</P>
          <h3 className="text-sm font-medium text-white mb-2">4.4 One Account Per User</h3>
          <P>Each user may maintain only one account. Creating multiple accounts to circumvent feature restrictions or subscription limits is prohibited and may result in termination of all associated accounts.</P>
        </Section>

        <Section title="5. Subscription Plans and Payments">
          <h3 className="text-sm font-medium text-white mb-2">5.1 Available Plans</h3>
          <DataTable
            headers={['Plan', 'Price', 'Key Features']}
            rows={[
              ['Curious', 'Free', '1 aircraft slot, default Range Map, Finance Calculator demo'],
              ['Enthusiast', '₹299/month', '3 aircraft slots, full Range Map, all Finance inputs, all operators'],
              ['Insider', '₹499/month', 'Everything in Enthusiast + multi-city range, PDF & CSV export'],
            ]}
          />
          <P>Annual plans are available at a discount equivalent to 2 months free.</P>

          <h3 className="text-sm font-medium text-white mb-2">5.2 Payment Processing</h3>
          <P>All payments are processed securely via <strong className="text-white">Razorpay</strong>. We accept UPI, debit cards, credit cards, and net banking.</P>

          <h3 className="text-sm font-medium text-white mb-2">5.3 Billing Cycle</h3>
          <P>Monthly plans are billed on the same date each month. Annual plans are billed once per year. Failed payments will be retried; after 3 failed attempts, access is downgraded to the Curious tier.</P>

          <h3 className="text-sm font-medium text-white mb-2">5.4 Refund Policy</h3>
          <List items={[
            <><strong className="text-white">Monthly plans</strong> — no refunds for the current billing period. Cancel anytime and retain access until the period ends.</>,
            <><strong className="text-white">Annual plans</strong> — pro-rated refund available within 30 days if you have not materially used the platform. After 30 days, no refunds.</>,
            <><strong className="text-white">Technical issues</strong> — if a confirmed outage of 24+ hours prevents use, you may request a credit for the affected period.</>,
          ]} />
          <P>To request a refund, email <strong className="text-white">business@pdiaviation.co.in</strong> with your account email and reason.</P>

          <h3 className="text-sm font-medium text-white mb-2">5.5 Price Changes</h3>
          <P>We may change subscription prices with 30 days advance notice via email. If you do not cancel before the new price takes effect, you consent to the new pricing.</P>

          <h3 className="text-sm font-medium text-white mb-2">5.6 Cancellation</h3>
          <P>You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period.</P>
        </Section>

        <Section title="6. Acceptable Use">
          <h3 className="text-sm font-medium text-white mb-2">6.1 Permitted Use</h3>
          <P>You may use PDI Aviation solely for your own personal or internal business research and decision-making related to private aviation.</P>
          <h3 className="text-sm font-medium text-white mb-2">6.2 Prohibited Use</h3>
          <P>You must not:</P>
          <List items={[
            'Scrape, crawl, or systematically extract data from the Platform by automated means',
            'Resell, sublicense, or commercially distribute any data or content from the Platform',
            'Share your account credentials with other individuals or organisations',
            'Attempt to reverse-engineer, decompile, or extract source code from the Platform',
            'Use the Platform to transmit spam, malware, or harmful code',
            'Impersonate another person or misrepresent your affiliation with any entity',
            'Use the Platform for any unlawful purpose under Indian law',
            'Attempt to circumvent subscription restrictions through technical or other means',
          ]} />
          <P>Violation of any prohibited use may result in immediate account termination without refund.</P>
        </Section>

        <Section title="7. Intellectual Property">
          <P>All content on PDI Aviation — including aircraft data compilations, range calculations, cost models, interface design, software, graphics, and written content — is owned by or licensed to PlaneDekho and protected by applicable intellectual property laws.</P>
          <P>We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for the purposes described in these Terms.</P>
          <P>Aircraft specifications, pricing, and operating cost data are sourced from publicly available manufacturer specifications and industry references. We do not claim ownership of underlying manufacturer specifications.</P>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-200 font-medium mb-2">The Platform is provided "as is" and "as available" without warranties of any kind, express or implied.</p>
            <p className="text-xs text-amber-200/70">All data on PDI Aviation is for informational and research purposes only. It does not constitute financial, legal, or aviation regulatory advice. You should verify all data independently and consult qualified professionals before making any aircraft acquisition decision.</p>
          </div>
        </Section>

        <Section title="9. Limitation of Liability">
          <P>Our total liability to you for any claim arising from your use of the Platform shall not exceed the amount you paid us in the 3 months preceding the claim. We shall not be liable for any indirect, incidental, consequential, or special damages.</P>
        </Section>

        <Section title="10. Indemnification">
          <P>You agree to indemnify, defend, and hold harmless PlaneDekho, its directors, employees, and agents from any claims, losses, damages, liabilities, and costs arising from your use of the Platform in violation of these Terms.</P>
        </Section>

        <Section title="11. Third-Party Services">
          <P>The Platform integrates with third-party services including Razorpay (payments) and Mapbox (mapping). Your use of these services is subject to their respective terms and privacy policies.</P>
        </Section>

        <Section title="12. Platform Availability">
          <P>We aim to maintain platform availability but do not guarantee uninterrupted access. We may perform scheduled maintenance, suspend access temporarily to address security issues, or modify features with reasonable notice.</P>
        </Section>

        <Section title="13. Termination">
          <P>You may terminate your account at any time by cancelling your subscription and requesting account deletion at <strong className="text-white">info@planedekhoindia.com</strong>. We may suspend or terminate your account if you violate these Terms, engage in fraud, or are required to do so by law. Upon termination, your license to use the Platform ends immediately.</P>
        </Section>

        <Section title="14. Modifications to These Terms">
          <P>We may update these Terms from time to time. Material changes will be communicated via email at least 14 days before taking effect. Continued use after the effective date constitutes acceptance.</P>
        </Section>

        <Section title="15. Governing Law and Disputes">
          <P>These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts in <strong className="text-white">Mumbai, Maharashtra</strong>. Before initiating legal proceedings, you agree to contact us at <strong className="text-white">business@pdiaviation.co.in</strong> and give us 30 days to resolve the matter in good faith.</P>
        </Section>

        <Section title="16. General Provisions">
          <List items={[
            <><strong className="text-white">Entire Agreement</strong> — these Terms and our Privacy Policy constitute the entire agreement between you and us</>,
            <><strong className="text-white">Severability</strong> — if any provision is found unenforceable, the remaining provisions remain in full effect</>,
            <><strong className="text-white">No Waiver</strong> — failure to enforce any provision does not waive our right to enforce it in the future</>,
            <><strong className="text-white">Assignment</strong> — you may not assign your rights. We may assign ours in connection with a merger, acquisition, or sale of assets.</>,
            <><strong className="text-white">Force Majeure</strong> — we are not liable for failure to perform due to circumstances beyond our reasonable control</>,
          ]} />
        </Section>

        <Section title="17. Contact Us">
          <div className="bg-white/5 rounded-xl border border-white/10 p-5">
            <p className="text-white font-medium mb-2">PDI Aviation — PlaneDekho</p>
            <div className="text-sm text-slate-400 space-y-1">
              <p>General: info@planedekhoindia.com</p>
              <p>Business: business@pdiaviation.co.in</p>
              <p>Phone: +91 8879126239 | +91 7977072673</p>
              <p>Website: <a href="https://www.pdiaviation.co.in" className="text-sky-400 hover:text-sky-300">www.pdiaviation.co.in</a> | <a href="https://www.planedekhoindia.com" className="text-sky-400 hover:text-sky-300">www.planedekhoindia.com</a></p>
            </div>
          </div>
        </Section>

        <div className="h-px bg-white/10 my-8" />
        <p className="text-xs text-slate-600 italic">These Terms of Service are governed by the laws of India, including the Information Technology Act 2000, the Digital Personal Data Protection Act 2023, and the Consumer Protection Act 2019.</p>
      </div>
    </div>
  );
}
