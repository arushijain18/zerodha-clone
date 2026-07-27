import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobile, setMobile] = useState("");

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGetOtp = async () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    try {
      const res = await axios.post("https://zerodha-clone-vr52.onrender.com/login", { mobile });
window.location.href = `https://arushijain18-zerodha-dashboard.onrender.com?token=${res.data.token}`;
    } catch (err) {
      alert("Login failed. Try again.");
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "What is a Zerodha account", a: "A Zerodha account lets you invest in stocks, mutual funds, and more through a single demat and trading account." },
    { q: "What documents are required to open a demat account?", a: "PAN card, Aadhaar card, bank account details, and a signature are required." },
    { q: "Is Zerodha account opening free?", a: "Yes, account opening is free of cost." },
    { q: "Are there any AMC (Account Maintenance Charges) for a demat account?", a: "Yes, AMC is applicable as per standard charges." },
    { q: "Can I open a demat account without a bank account?", a: "No, a linked bank account is mandatory to open a demat account." },
    { q: "What is a Basic Services Demat Account (BSDA)?", a: "BSDA is a demat account with reduced charges for investors with holdings below a certain value." },
    { q: "Can I open a demat and trading account using the mobile app?", a: "Yes, you can open an account entirely through the mobile app." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="container mt-5">
        <h1 className="fs-3 text-center" style={{ marginTop: "40px" }}>
          Open a free demat and trading account online
        </h1>
        <h4
          style={{
            textAlign: "center",
            color: "grey",
            fontWeight: "500",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Start investing brokerage free and join a community of 1.6+ crore investors and traders
        </h4>

        <div className="row mt-5 align-items-center">
          <div className="col-md-7">
            <div className="border rounded p-4 bg-light">
              <img src="/media/images/account_open.svg" alt="Open account" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-5">
            <h3>Signup now</h3>
            <p className="text-muted">Or track your existing application</p>
            <div className="input-group mb-3">
              <span className="input-group-text">🇮🇳 +91</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your mobile number"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100 mb-3"
              style={{ padding: "12px" }}
              onClick={handleGetOtp}
            >
              Get OTP
            </button>
            <p className="small text-muted">
              By proceeding, you agree to the Zerodha <a href="#">terms</a> & <a href="#">privacy policy</a>
            </p>
            <p className="small text-muted">
              Looking to open NRI account? <a href="#">Click here</a>
            </p>
          </div>
        </div>
      </div>

      {/* Investment Options */}
      <div className="container mt-5 pt-5 text-center">
        <h2 className="mb-5">Investment options with Zerodha demat account</h2>
        <div className="row g-4">
          <div className="col-md-6 text-start">
            <img src="/media/images/stocks-acop.svg" alt="Stocks" />
            <h4>Stocks</h4>
            <p className="text-muted">Invest in all exchange-listed securities</p>
          </div>
          <div className="col-md-6 text-start">
            <img src="/media/images/mf-acop.svg" alt="Mutual funds" />
            <h4>Mutual funds</h4>
            <p className="text-muted">Invest in commission-free direct mutual funds</p>
          </div>
          <div className="col-md-6 text-start">
            <img src="/media/images/ipo-acop.svg" alt="IPO" />
            <h4>IPO</h4>
            <p className="text-muted">Apply to the latest IPOs instantly via UPI</p>
          </div>
          <div className="col-md-6 text-start">
            <img src="/media/images/fo-acop.svg" alt="Futures and options" />
            <h4>Futures & options</h4>
            <p className="text-muted">Hedge and mitigate market risk through simplified F&O trading</p>
          </div>
        </div>
        <button className="btn btn-primary mt-4 px-4 py-2">Explore Investments</button>
      </div>

      {/* Steps Section */}
      <div className="container mt-5 pt-5">
        <h2 className="text-center mb-5">Steps to open a demat account with Zerodha</h2>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="border rounded p-5 bg-light text-center text-muted">
              <img src="/media/images/steps-acop.svg" alt="Steps" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="border-bottom py-3">
              <strong>01</strong> &nbsp; Enter the requested details
            </div>
            <div className="border-bottom py-3">
              <strong>02</strong> &nbsp; Complete e-sign & verification
            </div>
            <div className="py-3">
              <strong>03</strong> &nbsp; Start investing!
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mt-5 pt-5">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="border rounded p-5 bg-light text-center text-muted">
              <img src="/media/images/acop-benefits.svg" alt="Benefits" />
            </div>
            <h2 className="mt-4">Benefits of opening a Zerodha demat account</h2>
          </div>
          <div className="col-md-7">
            <h4>Unbeatable pricing</h4>
            <p className="text-muted">Zero charges for equity & mutual fund investments. Flat ₹20 fees for intraday and F&O trades.</p>

            <h4 className="mt-4">Best investing experience</h4>
            <p className="text-muted">Simple and intuitive trading platform with an easy-to-understand user interface.</p>

            <h4 className="mt-4">No spam or gimmicks</h4>
            <p className="text-muted">Committed to transparency — no gimmicks, spam, "gamification", or intrusive push notifications.</p>

            <h4 className="mt-4">The Zerodha universe</h4>
            <p className="text-muted">More than just an app — gain free access to the entire ecosystem of our partner products.</p>
          </div>
        </div>
      </div>

      {/* Account Types */}
      <div className="container mt-5 pt-5 text-center">
        <h2 className="mb-5">Explore different account types</h2>
        <div className="row g-4">
          <div className="col-md-4 text-start">
            <h5>👤 Individual Account</h5>
            <p className="text-muted">Invest in equity, mutual funds and derivatives</p>
          </div>
          <div className="col-md-4 text-start">
            <h5>👥 HUF Account</h5>
            <p className="text-muted">Make tax-efficient investments for your family</p>
          </div>
          <div className="col-md-4 text-start">
            <h5>🌐 NRI Account</h5>
            <p className="text-muted">Invest in equity, mutual funds, debentures, and more</p>
          </div>
          <div className="col-md-4 text-start">
            <h5>🧒 Minor Account</h5>
            <p className="text-muted">Teach your little ones about money & invest for their future with them</p>
          </div>
          <div className="col-md-4 text-start">
            <h5>🏢 Corporate / LLP / Partnership</h5>
            <p className="text-muted">Manage your business surplus and investments easily</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="container mt-5 pt-5">
        <h2 className="mb-4">FAQs</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border-top py-3">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => toggleFaq(index)}
            >
              <span>{faq.q}</span>
              <span>{openFaq === index ? "▲" : "▼"}</span>
            </div>
            {openFaq === index && <p className="text-muted mt-2">{faq.a}</p>}
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="container mt-5 pt-5 pb-5 text-center">
        <h2 className="mb-3">Open a Zerodha account</h2>
        <p className="text-muted mb-4">
          Simple and intuitive apps · ₹0 for investments · ₹20 for intraday and F&O trades.
        </p>
        <button className="btn btn-primary px-4 py-2" onClick={handleScrollTop}>
          Signup for free
        </button>
      </div>
    </div>
  );
}

export default Signup;