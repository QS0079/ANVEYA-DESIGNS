import "../admin.css";
import LoginForm from "@/components/admin/LoginForm";
import { IMG } from "@/lib/defaults";

export const metadata = { title: "Admin Login | Anveya Designs", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="l2" style={{ "--l2-img": `url(${IMG.hero})` }}>
      <aside className="l2-art" aria-hidden="true">
        <img className="l2-bg" src={IMG.hero} alt="" />
        <div className="l2-shade" />
        <img className="l2-logo" src="/brand/logo-light.png" alt="" width="800" height="745" />
        <div className="l2-copy">
          <div className="l2-eye"><span />Admin Panel</div>
          <p className="l2-quote">Every beautiful space starts with an <em>idea</em>.</p>
          <p className="l2-sub">Enquiries, leads and FAQs for anveyadesigns.com, in one place.</p>
        </div>
      </aside>
      <main className="l2-side">
        <img className="l2-mark" src="/brand/logo-mark.png" alt="" aria-hidden="true" width="500" height="495" />
        <LoginForm />
        <p className="l2-foot">© {new Date().getFullYear()} Anveya Designs · Admin access only</p>
      </main>
    </div>
  );
}
