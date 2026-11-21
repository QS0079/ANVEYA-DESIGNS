import "../admin.css";
import LoginForm from "@/components/admin/LoginForm";
import { IMG } from "@/lib/defaults";

export const metadata = { title: "Admin Login | Anveya Designs", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="login">
      <div className="art">
        <img src={IMG.hero} alt="" />
        <div className="txt">
          <div className="eyebrow" style={{ color: "rgba(249,243,232,.7)" }}>Admin Panel</div>
          <img src="/brand/logo-light.png" alt="Anveya Designs" className="login-logo" width="800" height="745" />
        </div>
      </div>
      <div className="side"><LoginForm /></div>
    </div>
  );
}
