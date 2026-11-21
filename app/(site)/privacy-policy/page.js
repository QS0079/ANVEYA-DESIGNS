import Legal from "@/components/site/Legal";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Privacy Policy | Anveya Designs",
  description: "Read the Anveya Designs Privacy Policy to understand how we collect, use, store and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return (
    <Legal
      title="Privacy Policy"
      swash="P"
      updated="19th Nov 26"
      intro={[
        "At Anveya Designs, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, process and protect your information when you visit our website or contact us regarding our residential and commercial interior design services.",
        "By accessing our website, you acknowledge that you have read and understood this Privacy Policy.",
      ]}
      sections={[
        { h: "Information We Collect", body: [
          "We may collect personal information that you voluntarily provide when interacting with our website, including:",
          { ul: ["Full name", "Contact number", "Email address", "Project location", "Property type", "Interior design requirements", "Budget preferences", "Any additional information shared through enquiry forms or communication channels."] },
          "We may also automatically collect certain technical information, including IP address, browser type, device information, pages visited and website usage data.",
        ]},
        { h: "How We Use Your Information", body: [
          "The information collected may be used for the following purposes:",
          { ul: ["To respond to enquiries and consultation requests.", "To understand your residential or commercial interior design requirements.", "To provide information about our services.", "To communicate project-related updates and information.", "To improve our website, services and user experience.", "To manage business operations and customer communication.", "To meet applicable legal and regulatory requirements."] },
        ]},
        { h: "Sharing of Personal Information", body: [
          "Anveya Designs does not sell or rent your personal information to third parties.",
          "However, information may be shared with trusted service providers, website hosting partners, analytics providers or other parties where necessary to operate our website, respond to enquiries or provide requested services.",
          "Information may also be disclosed where required by applicable law or a lawful request from an authorised authority.",
        ]},
        { h: "Data Security", body: [
          "We take reasonable technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration or loss.",
          "However, no method of data transmission or electronic storage can be guaranteed to be completely secure.",
        ]},
        { h: "Data Retention", body: [
          "We retain personal information only for as long as necessary to fulfil the purposes described in this Privacy Policy, meet business requirements or comply with applicable legal obligations.",
        ]},
        { h: "Third-Party Websites", body: [
          "Our website may contain links to third-party websites or platforms, including social media channels.",
          "These external websites operate under their own privacy policies. Anveya Designs is not responsible for their privacy practices or content.",
        ]},
        { h: "Your Privacy Rights", body: [
          "Subject to applicable laws, you may have the right to:",
          { ul: ["Request access to your personal information.", "Request correction or updating of inaccurate information.", "Request deletion of personal information where applicable.", "Withdraw consent where processing is based on consent.", "Raise concerns regarding how your personal information is handled."] },
          "You can contact us using the details provided below to exercise applicable rights.",
        ]},
        { h: "Children's Privacy", body: [
          "Our website and services are not specifically directed towards children. We do not knowingly collect personal information from children without the required consent or authorisation under applicable law.",
        ]},
        { h: "Changes to This Privacy Policy", body: [
          "We may update this Privacy Policy periodically to reflect changes in our business practices, website functionality or applicable legal requirements.",
          "Any updates will be published on this page with the revised date.",
        ]},
        { h: "Contact Us", body: [
          "For questions, concerns or requests related to this Privacy Policy, please contact:",
          { contact: true },
        ]},
      ]}
    />
  );
}
