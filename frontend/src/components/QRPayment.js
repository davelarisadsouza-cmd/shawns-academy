import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FiCopy, FiCheck, FiShield } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QRPayment = ({ productName, price, compact }) => {
  const [copied, setCopied] = useState(false);
  const upiId = 'shawnsaldana75@okaxis';

  const upiLink = (amount) => {
    const base = `upi://pay?pa=${upiId}&pn=Shawn%20Saldana`;
    return amount ? `${base}&am=${amount}&cu=INR` : base;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`qr-payment ${compact ? 'qr-compact' : ''}`}>
      <div className="qr-payment-header">
        <h3>Secure Payment</h3>
        <p>Scan to pay via any UPI app</p>
      </div>

      <div className="qr-codePlaceholder">
        <QRCodeSVG
          value={upiLink(price)}
          size={170}
          bgColor="#ffffff"
          fgColor="#0a0a0f"
          level="M"
          includeMargin={false}
          imageSettings={{
            src: '',
            height: 36,
            width: 36,
            excavate: true
          }}
        />
        <span className="qr-code-text">SCAN ME</span>
      </div>

      <div className="upi-details">
        <div className="upi-row">
          <div className="upi-label">
            <FiShield /> GPay UPI ID
          </div>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? <FiCheck /> : <FiCopy />} {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="upi-id-display">{upiId}</div>
        {price && (
          <p className="upi-amount">Amount to pay: <strong>₹{price}</strong></p>
        )}
      </div>

      <div className="payment-steps">
        <p><strong>How to pay:</strong></p>
        <ol>
          <li>Open your favorite UPI app (GPay, PhonePe, Paytm)</li>
          <li>Scan the QR code or enter the UPI ID</li>
          <li>Enter the amount & complete payment</li>
          <li>Send us a screenshot to confirm your purchase</li>
        </ol>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default QRPayment;