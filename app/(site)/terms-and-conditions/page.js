import Legal from "@/components/site/Legal";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Terms & Conditions | Anveya Designs",
  description: "Read the Terms & Conditions governing the use of the Anveya Designs website and its interior design information and services.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function Page() {
  return (
    <Legal
      title="Terms & Conditions"
      swash="C"
      updated="19th Nov 26"
      intro={[
        "Welcome to Anveya Designs. These Terms & Conditions govern your access to and use of our website.",
        "By visiting or using this website, you agree to comply with the terms outlined below. If you do not agree with these terms, please discontinue using our website.",
      ]}
      sections={[
        { h: "About Anveya Designs", body: [
          "Anveya Designs provides residential and commercial interior design solutions. Information available on this website is intended to introduce our services, design approach, portfolio and business offerings.",
          "Actual project services and deliverables are subject to individual project requirements and mutually agreed terms.",
        ]},
        { h: "Website Usage", body: [
          "You agree to use this website only for lawful purposes.",
          "You must not:",
          { ul: ["Use the website for any unlawful or unauthorised activity.", "Attempt to disrupt or damage the website or its functionality.", "Submit false, misleading or inaccurate information.", "Attempt to gain unauthorised access to website systems.", "Copy or misuse website content without permission."] },
        ]},
        { h: "Intellectual Property Rights", body: [
          "All website content, including text, images, photographs, graphics, logos, designs, illustrations and other materials, belongs to Anveya Designs or its respective owners unless otherwise stated.",
          "Unauthorised reproduction, distribution, modification or commercial use of website content without prior written permission is prohibited.",
        ]},
        { h: "Interior Design Services", body: [
          "Anveya Designs provides interior design solutions based on individual client requirements.",
          "The scope of services, project specifications, design deliverables, execution responsibilities and other relevant details will be discussed and agreed upon separately for each project.",
          "Submitting an enquiry through the website does not constitute a confirmed project booking or service agreement.",
        ]},
        { h: "Project Estimates and Quotations", body: [
          "Any prices, estimates or cost-related information shared through the website or other communication channels are indicative unless formally confirmed.",
          "Final project costs may vary depending on:",
          { ul: ["Property size and condition.", "Design complexity and requirements.", "Material and finish selections.", "Furniture and fixture specifications.", "Execution requirements.", "Changes to the approved project scope."] },
          "A formal quotation or project agreement will govern the applicable project costs and payment terms.",
        ]},
        { h: "Project Timelines", body: [
          "Project timelines depend on the agreed scope of work, approvals, material availability, site conditions and other project-related factors.",
          "Any project-specific timelines will be communicated separately and agreed upon with the client.",
        ]},
        { h: "Portfolio and Design Representations", body: [
          "Images, photographs, 3D visualisations and other design representations displayed on this website are intended to showcase design concepts and completed projects.",
          "Actual project outcomes may vary depending on site conditions, material availability, technical requirements and execution considerations.",
          "Design visualisations should not be treated as a guarantee of identical final results.",
        ]},
        { h: "Third-Party Links", body: [
          "Our website may contain links to external websites, platforms or service providers.",
          "These links are provided for convenience. Anveya Designs does not control or take responsibility for third-party content, services or privacy practices.",
        ]},
        { h: "Limitation of Liability", body: [
          "We make reasonable efforts to ensure that website information is accurate and updated.",
          "However, we do not guarantee that all information will always be complete, accurate or uninterrupted.",
          "To the extent permitted by applicable law, Anveya Designs shall not be liable for losses arising from website interruptions, unauthorised use, reliance on general website information or third-party website interactions.",
        ]},
        { h: "Privacy", body: [
          "Any personal information collected through our website will be handled in accordance with our Privacy Policy.",
          "Please review our Privacy Policy to understand how your information is collected and processed.",
        ]},
        { h: "Changes to Terms & Conditions", body: [
          "Anveya Designs reserves the right to modify or update these Terms & Conditions whenever necessary.",
          "Revised terms will be published on this page with the updated date. Continued use of the website after such changes constitutes acceptance of the revised terms, subject to applicable law.",
        ]},
        { h: "Governing Law and Jurisdiction", body: [
          "These Terms & Conditions shall be governed by the applicable laws of India.",
          "Any disputes arising from the use of this website shall be subject to the jurisdiction of the competent courts at {jurisdiction}, India, subject to applicable law.",
        ]},
        { h: "Contact Information", body: [
          "For any questions regarding these Terms & Conditions, please contact:",
          { contact: true },
        ]},
      ]}
    />
  );
}
