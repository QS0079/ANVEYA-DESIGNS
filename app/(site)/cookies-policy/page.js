import Legal from "@/components/site/Legal";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Cookies Policy | Anveya Designs",
  description: "Learn how Anveya Designs uses cookies and similar technologies to improve website functionality, user experience and performance.",
  alternates: { canonical: "/cookies-policy" },
};

export default function Page() {
  return (
    <Legal
      title="Cookies Policy"
      swash="C"
      updated="19th Nov 26"
      intro={[
        "At Anveya Designs, we use cookies and similar technologies to improve website functionality, understand visitor behaviour and provide a better browsing experience.",
        "This Cookies Policy explains what cookies are, how we may use them and how you can manage your cookie preferences.",
      ]}
      sections={[
        { h: "What Are Cookies?", body: [
          "Cookies are small text files stored on your device when you visit a website. They help websites remember certain information about your visit, preferences and interactions.",
          "Cookies may improve website functionality, help analyse website traffic and support personalised experiences.",
        ]},
        { h: "Why Do We Use Cookies?", body: [
          "Anveya Designs may use cookies for the following purposes:",
          { ul: ["To ensure the website functions properly.", "To remember user preferences and settings.", "To understand how visitors interact with our website.", "To analyse website performance and traffic.", "To improve website navigation and user experience.", "To support marketing and advertising activities, where applicable."] },
        ]},
        { h: "Types of Cookies We May Use", body: [
          { h3: "Essential Cookies" }, "These cookies are necessary for basic website functionality, security and navigation.",
          { h3: "Performance and Analytics Cookies" }, "These cookies help us understand website traffic, visitor behaviour and overall website performance.",
          { h3: "Functional Cookies" }, "These cookies may remember preferences and settings to improve your browsing experience.",
          { h3: "Advertising and Marketing Cookies" }, "These cookies may be used to measure advertising effectiveness and deliver relevant marketing content, where applicable.",
        ]},
        { h: "Third-Party Cookies", body: [
          "Certain third-party services integrated into our website may use their own cookies or similar technologies.",
          "These may include analytics tools, advertising platforms, embedded content and social media integrations.",
          "The use of such cookies is governed by the respective third-party privacy and cookie policies.",
        ]},
        { h: "Managing Your Cookie Preferences", body: [
          "You can manage your cookie preferences through the cookie consent banner displayed on our website, where available.",
          "You may also control or delete cookies through your browser settings.",
          "Please note that disabling certain cookies may affect some website features and functionality.",
        ]},
        { h: "Consent to Cookies", body: [
          "Where required by applicable law, we will seek your consent before placing non-essential cookies on your device.",
          "You may change or withdraw your cookie preferences at any time through the available cookie management options.",
        ]},
        { h: "Updates to This Cookies Policy", body: [
          "We may update this Cookies Policy from time to time to reflect changes in our website, technologies or applicable legal requirements.",
          "Any changes will be published on this page along with the revised date.",
        ]},
        { h: "Contact Us", body: [
          "If you have questions about our Cookies Policy, please contact:",
          { contact: true },
        ]},
      ]}
    />
  );
}
