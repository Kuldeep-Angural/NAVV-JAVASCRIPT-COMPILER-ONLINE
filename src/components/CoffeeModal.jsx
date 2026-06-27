import React from 'react';

const CoffeeModal = ({ closeCoffeeModal }) => {
  return (
    <div
      className="modal-overlay"
      onClick={closeCoffeeModal}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        padding: '20px',
      }}
    >
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '450px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,.15), 0 10px 20px rgba(0,0,0,.08)',
          animation: 'fadeIn .2s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg,#18181B,#27272A)',
            padding: '10px 14px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '50px', marginBottom: '0px' }}>☕</div>

          <h2
            style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            Buy Me a Coffee
          </h2>

          <p
            style={{
              marginTop: '2px',
              color: '#d4d4d8',
              fontSize: '14px',
            }}
          >
            Support my work and keep creating amazing things.
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
          }}
        >
          {/* Author Card */}
          <div
            style={{
              border: '1px solid #ececec',
              borderRadius: '14px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '16px' }}>👨‍💻 Kuldeep Kumar</div>

            <div style={{ color: '#525252', fontSize: '14px' }}>
              📧{' '}
              <a
                href="mailto:kuldeep@insonix.com"
                style={{
                  color: '#2563eb',
                  textDecoration: 'none',
                }}
              >
                kuldeep@insonix.com
              </a>
            </div>

            <div style={{ color: '#525252', fontSize: '14px' }}>
              🌐{' '}
              <a
                href="https://kuldeepinfo.vercel.app"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#2563eb',
                  textDecoration: 'none',
                }}
              >
                kuldeepinfo.vercel.app
              </a>
            </div>
          </div>

          {/* QR */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '18px',
                border: '1px solid #eee',
                borderRadius: '18px',
                background: '#fff',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <img
                src="./upipe-qr.png"
                alt="Support QR"
                style={{
                  width: '180px',
                  height: '180px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                }}
              />

              <div
                style={{
                  fontSize: '14px',
                  color: '#71717a',
                }}
              >
                Scan QR to support ❤️
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={closeCoffeeModal}
              style={{
                border: 'none',
                background: '#18181B',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '10px',
                cursor: 'pointer',
                width: '100%',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeModal;
