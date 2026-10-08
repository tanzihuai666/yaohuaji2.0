/* Hand-drawn icons from the Stitch 添加约稿 screen (verbatim paths). */
export const Back = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
        <path d="M14.5 6.5 C12 9.5 9 11.5 8 12 C9.2 12.5 12.2 15 14.5 17.5" />
        <path d="M8.5 12 C11 11.7 15 11.8 17.5 12" opacity="0.6" strokeDasharray="1 0.5" />
      </svg>)
export const Brush = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3.5 19.5 C4.5 18 6.5 17 8 16 L17.5 6.5 C18.8 5.2 20.3 6.7 19 8 L9.5 17.5 C8.2 18.8 6 19.5 3.5 19.5Z" fill="#e9f0ea" stroke="#556b5e" strokeWidth="1.8" />
        <path d="M14 6 L18 10" stroke="#89a997" strokeWidth="1.8" />
        <path d="M3.5 19.5 L5 16 L8 19 Z" fill="#678978" stroke="#374136" strokeWidth="1.5" />
        <circle cx="4" cy="20" fill="#374136" r="0.8" />
        <path d="M10 13 L12.5 10.5" stroke="#89a997" strokeLinecap="round" strokeWidth="1.4" />
      </svg>)
export const Picture = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" viewBox="0 0 24 24">
              <rect fill="#fffaf0" height="18" rx="3" stroke="#678978" strokeWidth="1.8" transform="rotate(-3 12 12)" width="17" x="3.5" y="3" />
              <rect fill="#dbe8e0" height="10.5" rx="1.5" stroke="#89a997" strokeWidth="1.2" transform="rotate(-3 12 12)" width="13" x="5.5" y="5" />
              <path d="M7 13.5 C9 11 11.5 13 13 11 C14.5 9.5 16.5 12.5 17.5 12.5" stroke="#597969" strokeLinecap="round" strokeWidth="1.5" transform="rotate(-3 12 12)" />
              <circle cx="8.5" cy="8" fill="#f5c563" r="1.2" />
            </svg>)
export const Camera = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 32 32">
              <path d="M5 11 C5 9 6.5 8 8.5 8 H11 L12.5 5.5 C13 4.5 14.5 4.5 15.5 4.5 H18.5 C19.5 4.5 20.5 5 21 6 L22.5 8 H24.5 C26.5 8 28 9.5 28 11.5 V23.5 C28 25.5 26.5 27 24.5 27 H7.5 C5.5 27 5 25.5 5 23.5 Z" fill="#e3ece5" stroke="currentColor" strokeWidth="2" />
              <circle cx="16.5" cy="17.5" fill="#faf7ef" r="5.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="16.5" cy="17.5" fill="#678978" r="2.5" />
              <circle cx="24" cy="12" fill="#e49c86" r="1.2" />
              <path d="M8 12 H10.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
            </svg>)
export const Upload = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
            <path d="M3.5 15 C3.8 17.5 5 19.5 7.5 19.8 C10.5 20.1 14.5 20.1 17 19.8 C19.2 19.5 20.2 17.5 20.5 15" fill="#edf4ef" />
            <path d="M12 3.5 V15.5" />
            <path d="M7.8 11.5 C9.2 12.8 11 14.8 12 15.5 C13 14.8 14.8 12.8 16.2 11.5" />
            <circle cx="18" cy="6.5" fill="currentColor" r="0.8" />
            <circle cx="6" cy="7.5" fill="currentColor" r="0.8" />
          </svg>)
export const Coin = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" viewBox="0 0 20 20">
                <ellipse cx="10" cy="10" fill="#fef3c7" rx="8" ry="8" stroke="#b48332" strokeLinecap="round" strokeWidth="1.7" />
                <ellipse cx="10" cy="10" fill="#fffbeb" rx="5.5" ry="5.5" stroke="#dfad42" strokeDasharray="2 1" strokeWidth="1" />
                <text fill="#b48332" fontFamily="Nunito Sans, PingFang SC, sans-serif" fontSize="8.5" fontWeight="bold" textAnchor="middle" x="10" y="13">
                  ¥
                </text>
              </svg>)
export const Calendar = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
                <rect fill="#ffffff" height="14" rx="3" stroke="#678978" strokeWidth="1.6" width="15" x="2.5" y="4" />
                <path d="M2.5 8.5 H17.5" stroke="#d3ded6" strokeWidth="1.4" />
                <path d="M6 2 V5" stroke="#e08272" strokeLinecap="round" strokeWidth="2" />
                <path d="M14 2 V5" stroke="#e08272" strokeLinecap="round" strokeWidth="2" />
                <circle cx="6.5" cy="12" fill="#678978" r="1" />
                <circle cx="10" cy="12" fill="#678978" r="1" />
                <circle cx="13.5" cy="12" fill="#e08272" r="1" />
                <circle cx="6.5" cy="15" fill="#678978" r="1" />
                <circle cx="10" cy="15" fill="#678978" r="1" />
              </svg>)
export const Chevron = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 20 20">
                <path d="M5.5 7.5 C8 10 9.2 12.2 10 12.5 C10.8 12.2 12 10 14.5 7.5" />
              </svg>)
export const FolderY = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
              <path d="M2.5 5.5 C2.5 4.5 3.5 3.5 4.5 3.5 H7.5 C8.5 3.5 9 4.2 9.8 5 L10.5 5.8 H15.5 C16.5 5.8 17.5 6.8 17.5 7.8 V14.5 C17.5 15.5 16.5 16.5 15.5 16.5 H4.5 C3.5 16.5 2.5 15.5 2.5 14.5 Z" fill="#fceecb" stroke="#ca9b45" strokeWidth="1.6" />
              <path d="M2.5 8 C4.5 7.5 15.5 7.5 17.5 8" stroke="#dfb664" strokeWidth="1.4" />
              <path d="M6 11.5 H10" opacity="0.7" stroke="#a57625" strokeLinecap="round" strokeWidth="1.5" />
            </svg>)
export const Note = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
              <path d="M4 4 C4 3 5 2.5 6 2.5 H14 C15 2.5 16 3 16 4 V13 C16 13.5 15.5 14 15 14.5 L12.5 17 C12 17.5 11.5 17.5 11 17.5 H6 C5 17.5 4 16.5 4 15.5 Z" fill="#eaf4f0" stroke="#678978" strokeWidth="1.6" />
              <path d="M12 14 V17 L15.5 14 Z" fill="#cde2d7" stroke="#678978" strokeWidth="1.3" />
              <line stroke="#8ba89a" strokeLinecap="round" strokeWidth="1.4" x1="7" x2="13" y1="6.5" y2="6.5" />
              <line stroke="#8ba89a" strokeLinecap="round" strokeWidth="1.4" x1="7" x2="11.5" y1="9.5" y2="9.5" />
              <circle cx="14.5" cy="4" fill="#e08272" r="1.2" />
            </svg>)
export const Save = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 5 C4 4 5 3 6.5 3 H17.5 L20 6.5 V19 C20 20 19 21 17.5 21 H6.5 C5 21 4 20 4 19 Z" fill="rgba(255,255,255,0.15)" />
            <rect fill="rgba(255,255,255,0.25)" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" width="8" x="7.5" y="3" />
            <circle cx="12" cy="15" fill="rgba(255,255,255,0.2)" r="3" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="15" fill="currentColor" r="1" />
            <path d="M7 19.5 H17" opacity="0.6" stroke="currentColor" strokeDasharray="1 1" strokeWidth="1.5" />
          </svg>)
export const FolderSmall = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
              <path d="M2.5 5.5 C2.5 4.5 3.5 3.5 4.5 3.5 H7.5 C8.5 3.5 9 4.2 9.8 5 L10.5 5.8 H15.5 C16.5 5.8 17.5 6.8 17.5 7.8 V14.5 C17.5 15.5 16.5 16.5 15.5 16.5 H4.5 C3.5 16.5 2.5 15.5 2.5 14.5 Z" fill="#fceecb" stroke="#ca9b45" strokeWidth="1.4" />
              <path d="M2.5 8 C4.5 7.5 15.5 7.5 17.5 8" stroke="#dfb664" strokeWidth="1.2" />
            </svg>)
export const X = ({ className = '' }: { className?: string }) => (<svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>)
