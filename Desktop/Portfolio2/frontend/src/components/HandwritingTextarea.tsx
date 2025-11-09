"use client";

import { useEffect, useRef } from "react";
import "./handwriting/hand.css";

interface HandwritingTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export default function HandwritingTextarea({
  value,
  onChange,
  placeholder,
  name,
  required = false,
  rows = 6,
  className = ""
}: HandwritingTextareaProps) {
  const signatureRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Same letter bank as HandwritingInput
  const letterBank = {
    uppercase: {
      a: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 51" height="51" width="46"><path d="M14.9987 32.0003C20.8769 23.2406 40.7942 1.02295 44.6176 1.58265C48.4411 2.14235 25.4397 26.0685 19.6688 50.0398C28.2839 11.7157 5.83642 32.6888 1.46688 33.1804C4.63512 27.4831 32.8719 20.946 44.7496 24.6628"></path></svg>',
      h: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 51" height="51" width="54"><path d="M35.957 3.99976C23.1235 22.025 18.442 31.2217 10.457 47.4998C26.957 5.99983 30.457 37.5 52.957 7.5C33.957 29.4998 32.957 37.6924 29.457 38.5C25.957 39.3076 0.957031 32.5 0.957031 29.4998C23.1446 22.8906 34.5662 20.6514 50.957 22.4998"></path></svg>',
      e: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 51" height="51" width="46"><path d="M38.6505 10.5127C38.6505 10.5127 50.1156 2.77326 42.1993 4.69163C34.283 6.61 7.29611 24.5362 9.21359 27.9759C11.1311 31.4157 26.8097 26.7853 26.8097 26.7853C12.5763 31.9276 -0.576393 42.3963 1.21022 45.8361C2.99682 49.2758 27.2051 38.229 27.2051 38.229"></path></svg>',
      l: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 51" height="51" width="30"><path d="M28.5059 3.6123C19.5058 9.1123 -1.12359 39.6123 1.00666 46.6123C2.22398 50.6123 28.5059 38.6123 28.5059 38.6123"></path></svg>',
      o: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 51" height="51" width="34"><path d="M19.2264 13.6837C12.2264 15.1837 -0.773614 43.6837 6.72639 46.1837C14.2264 48.6837 43.2258 13.6837 28.7272 5.68376C13.2266 -2.86957 -2.2744 33.1838 2.22656 40.6838C6.72753 48.1839 20.7264 29.6837 20.7264 29.6837"></path></svg>'
    },
    lowercase: {
      a: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 51" height="51" width="13"><path d="M5.99958 25C5.73591 21.1582 1.99899 25.5 1.49941 28C1.00013 30.5 7.65454 23.3545 7.65454 23.3545C3.5802 27.3691 3.29278 30.5313 4.09638 30.7478C5.08629 31.0263 12.2012 24.7466 12.2012 24.7466"></path></svg>',
      b: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 51" height="51" width="17"><path d="M15.9206 5.40527L2.07203 28.8782C1.02375 28.8035 6.74541 22.7468 8.7643 23.9805C10.5595 25.4012 1.88642 33.589 1.17541 32.0187C0.464395 30.4485 9.73655 25.9621 13.9253 24.7283"></path></svg>',
      c: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 51" height="51" width="11"><path d="M5.63386 24.0707C5.12282 21.6404 0.607995 27.2758 1.82723 28.005C3.15925 28.5935 9.75939 24.6736 9.75939 24.6736"></path></svg>',
      d: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M6.08732 26.1229C8.23611 18.5681 -0.331592 27.5316 1.908 28.6301C7.01852 28.6767 10.2741 20.6086 19.1923 6.23315C9.56633 22.4841 2.35848 34.2032 2.35848 34.2032"></path></svg>',
      e: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 51" height="51" width="11"><path d="M3.07713 25.3392C3.03314 27.7282 6.78706 24.9554 6.03999 23.505C4.44172 21.2653 -0.294204 28.3892 2.71291 28.2186C5.35941 27.9626 10.2422 24.7207 10.2422 24.7207"></path></svg>',
      g: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 51" height="51" width="23"><path d="M15.8299 24.1058C14.7224 20.2293 8.05794 29.529 11.1896 27.8486C13.4811 26.531 17.2991 22.5381 17.2991 22.5381C15.8865 28.7238 1.15713 50.9628 1.47176 43.8335C1.59134 36.4678 10.0592 36.074 20.9856 24.7167"></path></svg>',
      h: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 51" height="51" width="18"><path d="M14.75 6.08472C8.75724 15.6124 5.74081 20.6113 1.16797 28.7222C2.27051 26.7174 7.40879 23.7648 9.19185 23.8223C10.4381 23.8798 8.46919 26.815 9.75037 27.5733C11.2054 28.4346 16.3726 24.6677 16.3726 24.6677"></path></svg>',
      i: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 51" height="51" width="9"><path d="M3.7548 22.9229C2.60207 23.529 -0.752212 29.5295 1.61166 28.7618C3.97553 27.994 5.61205 25.8726 7.67374 24.721"></path></svg>',
      l: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 51" height="51" width="19"><path d="M0.800781,34.0845C7.00167,23.7712 10.562,17.889 17.543,6.64502"></path></svg>',
      m: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 51" height="51" width="19"><path d="M4.23047 23.5026L0.871094 29.4474C3.50472 25.5411 6.75255 22.8947 9.44272 21.6504C7.06863 25.4683 5.83806 27.9029 6.63039 28.2444C7.09897 28.3943 7.92245 27.8359 12.5443 24.6228C11.5082 26.1726 11.4655 26.753 11.9412 27.2936C12.31 27.6478 13.3286 27.1883 17.2828 24.5797"></path></svg>',
      n: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 51" height="51" width="15"><path d="M4.42188 23.1724L1.16211 28.4658C3.87099 25.9122 7.65167 23.2024 8.42922 23.7108C8.87781 23.9799 6.69468 26.9705 7.8311 27.4191C8.96753 27.8677 11.8983 25.565 14.0814 24.7575"></path></svg>',
      o: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 7 51" height="51" width="7"><path d="M3.30217 23.604C2.72482 23.9566 0.574341 28.3484 1.66563 28.4119C2.75692 28.4755 7.24524 21.8731 4.4886 23.027C3.29045 23.5286 2.14727 24.4054 2.14727 24.4054"></path></svg>',
      r: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 51" height="51" width="13"><path d="M4.04688 23.3381L1.02539 30.1005C7.1047 22.5828 11.8527 19.8132 11.2412 24.1654"></path></svg>',
      s: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 51" height="51" width="14"><path d="M8.95035 23.3347C8.289 21.833 5.66489 23.7794 5.71956 28.8314C5.77422 33.8834 1.12107 35.424 0.98514 33.3617C0.883641 31.4008 3.52325 32.4975 12.6583 24.7513"></path></svg>',
      t: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 51" height="51" width="24"><path d="M0.966797 16.3342C6.66806 14.1572 15.5438 14.1786 22.957 15.9795C12.1532 14.4252 15.852 9.92493 18.1685 5.96021C9.87226 17.3225 -0.709346 36.7351 1.78362 36.9101C3.40185 37.0413 9.39371 29.0376 13.8793 24.8435"></path></svg>',
      u: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 51" height="51" width="13"><path d="M4.02467 23.277C3.02512 22.8065 0.89338 26.614 1.20215 28.0439C1.51091 29.4737 7.5177 23.0864 7.5177 23.0864C7.5177 23.0864 4.71947 27.0005 5.80301 28.3576C6.96087 28.8941 10.5935 24.8364 11.7727 24.2932"></path></svg>',
      v: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 51" height="51" width="9"><path d="M3.3522 23.8316C1.86784 24.4052 0.653752 28.489 0.990061 28.894C1.93472 29.1302 3.78484 26.7863 7.70664 21.334"></path></svg>',
      w: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 51" height="51" width="12"><path d="M4.44922 23.4512C2.98177 24.6314 2.45348 25.9122 1.51172 28.1755C2.13496 28.0666 3.11068 27.0596 5.82622 24.4928C5.82622 24.4928 5.56819 27.1648 6.38421 27.4688C8.28137 28.1756 10.8109 23.4513 10.8109 23.4513"></path></svg>',
      y: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 51" height="51" width="21"><path d="M12.7596 23.2466C11.7764 22.8447 9.49733 28.5405 10.2142 28.4672C10.931 28.3939 16.2577 23.541 16.1552 24.1849C16.7988 27.8118 2.76345 49.8665 1.16523 44.1016C0.00381581 39.4883 5.35733 40.4355 20.0861 24.6317"></path></svg>'
    }
  };

  const drawLetter = (key: string, animate: boolean = true) => {
    if (!signatureRef.current) return;

    if (key === " ") {
      const space = document.createElement("div");
      space.style.minWidth = "12px";
      signatureRef.current.appendChild(space);
    } else if (key === "\n") {
      const lineBreak = document.createElement("br");
      signatureRef.current.appendChild(lineBreak);
    } else if (/\d/.test(key)) {
      // Handle numbers with cursive SVGs (same as input)
      const numberSVGs = {
        '0': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M10 5C5 5 2 10 2 25.5C2 41 5 46 10 46C15 46 18 41 18 25.5C18 10 15 5 10 5Z"></path></svg>',
        '1': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 51" height="51" width="15"><path d="M7 5L7 46M4 8L7 5"></path></svg>',
        '2': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M3 15C3 10 6 5 10 5C14 5 17 8 17 12C17 16 14 20 10 25L3 35L3 46L17 46"></path></svg>',
        '3': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M3 8C3 6 5 5 8 5C12 5 15 7 15 11C15 14 13 16 10 16C13 16 16 18 16 22C16 26 13 28 9 28C6 28 3 27 3 25"></path></svg>',
        '4': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M13 5L13 46M13 30L2 30M2 30L13 5"></path></svg>',
        '5': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M16 5L4 5L4 20L10 20C14 20 17 23 17 27C17 31 14 34 10 34C6 34 3 31 3 28"></path></svg>',
        '6': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M15 8C12 5 8 5 6 8C4 12 4 20 4 25C4 30 6 33 10 33C14 33 17 30 17 26C17 22 14 19 10 19C6 19 4 22 4 25"></path></svg>',
        '7': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M2 5L18 5L8 46"></path></svg>',
        '8': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M10 5C6 5 4 7 4 10C4 13 6 15 10 15C14 15 16 13 16 10C16 7 14 5 10 5ZM10 15C6 15 4 17 4 21C4 25 6 27 10 27C14 27 16 25 16 21C16 17 14 15 10 15Z"></path></svg>',
        '9': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 51" height="51" width="20"><path d="M5 23C5 19 8 16 12 16C16 16 19 19 19 23C19 27 16 30 12 30C8 30 5 27 5 23ZM19 23C19 28 19 36 17 40C15 44 11 46 8 43"></path></svg>'
      };
      
      const letter = document.createElement("div");
      letter.innerHTML = numberSVGs[key as keyof typeof numberSVGs] || `<span style="font-family: cursive; font-size: 16px;">${key}</span>`;
      letter.style.display = "inline-block";
      letter.style.verticalAlign = "baseline";
      letter.classList.add('num', key);
      
      if (animate) {
        setTimeout(() => {
          const path = letter.querySelector('svg path') as SVGPathElement;
          if (path) {
            path.style.strokeDashoffset = '0';
          }
        }, 100);
      } else {
        const path = letter.querySelector('svg path') as SVGPathElement;
        if (path) {
          path.style.strokeDashoffset = '0';
        }
      }
      
      signatureRef.current.appendChild(letter);
    } else if (/[a-zA-Z]/.test(key)) {
      // Handle letters
      const letter = document.createElement("div");
      const isUppercase = key === key.toUpperCase();
      const letterKey = key.toLowerCase() as keyof typeof letterBank.lowercase;
      
      if (isUppercase && letterBank.uppercase[letterKey]) {
        letter.innerHTML = letterBank.uppercase[letterKey];
        letter.classList.add('up', letterKey);
      } else if (letterBank.lowercase[letterKey]) {
        letter.innerHTML = letterBank.lowercase[letterKey];
        letter.classList.add('lo', letterKey);
      } else {
        // Fallback for letters not in our bank
        letter.innerHTML = `<span style="font-family: cursive; font-size: 16px; vertical-align: baseline;">${key}</span>`;
      }
      
      letter.style.display = "inline-block";
      letter.style.verticalAlign = "baseline";
      
      if (animate) {
        setTimeout(() => {
          const path = letter.querySelector('svg path') as SVGPathElement;
          if (path) {
            path.style.strokeDashoffset = '0';
          }
        }, 100);
      } else {
        const path = letter.querySelector('svg path') as SVGPathElement;
        if (path) {
          path.style.strokeDashoffset = '0';
        }
      }
      
      signatureRef.current.appendChild(letter);
    } else {
      // Handle special characters and punctuation with cursive SVGs
      const symbolSVGs = {
        '.': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 51" height="51" width="8"><circle cx="4" cy="40" r="2" fill="#000"></circle></svg>',
        ',': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 51" height="51" width="8"><path d="M4 40C5.5 40 6 41 6 42C6 44 4 46 2 46" fill="none" stroke="#000"></path></svg>',
        '!': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 51" height="51" width="8"><path d="M4 8L4 30M4 38L4 40" stroke="#000" stroke-width="2" stroke-linecap="round"></path></svg>',
        '?': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 51" height="51" width="15"><path d="M3 12C3 8 6 5 10 5C14 5 17 8 17 12C17 16 14 18 12 22L12 28M12 36L12 38" stroke="#000" stroke-width="1.5" stroke-linecap="round"></path></svg>',
        '@': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 51" height="51" width="25"><path d="M12 8C6 8 2 12 2 18C2 24 6 28 12 28C18 28 22 24 22 18C22 15 21 12 19 10M19 18C19 15 17 13 15 13C13 13 11 15 11 18C11 21 13 23 15 23C17 23 19 21 19 18Z" stroke="#000" stroke-width="1"></path></svg>',
        ':': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 51" height="51" width="8"><circle cx="4" cy="20" r="1.5" fill="#000"></circle><circle cx="4" cy="31" r="1.5" fill="#000"></circle></svg>',
        ';': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 51" height="51" width="8"><circle cx="4" cy="20" r="1.5" fill="#000"></circle><path d="M4 31C5.5 31 6 32 6 33C6 35 4 37 2 37" fill="none" stroke="#000"></path></svg>'
      };
      
      const letter = document.createElement("div");
      
      if (symbolSVGs[key as keyof typeof symbolSVGs]) {
        // Use cursive SVG for common symbols
        letter.innerHTML = symbolSVGs[key as keyof typeof symbolSVGs];
        letter.style.display = "inline-block";
        letter.style.verticalAlign = "baseline";
        letter.classList.add('sym', key.replace(/[^a-zA-Z0-9]/g, 'sym'));
        
        if (animate) {
          setTimeout(() => {
            const path = letter.querySelector('svg path') as SVGPathElement;
            const circle = letter.querySelector('svg circle') as SVGCircleElement;
            if (path) {
              path.style.strokeDashoffset = '0';
            }
            if (circle) {
              circle.style.opacity = '1';
            }
          }, 100);
        } else {
          const path = letter.querySelector('svg path') as SVGPathElement;
          const circle = letter.querySelector('svg circle') as SVGCircleElement;
          if (path) {
            path.style.strokeDashoffset = '0';
          }
          if (circle) {
            circle.style.opacity = '1';
          }
        }
      } else {
        // Fallback for other symbols
        letter.innerHTML = `<span style="font-family: cursive; font-size: 16px; vertical-align: baseline;">${key}</span>`;
        letter.style.display = "inline-block";
        letter.style.verticalAlign = "baseline";
      }
      
      signatureRef.current.appendChild(letter);
    }
  };

  const redrawSignature = (text: string) => {
    if (!signatureRef.current) return;
    
    signatureRef.current.innerHTML = '';
    const letters = text.split('');
    letters.forEach((letter) => {
      drawLetter(letter, false);
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = event.key;
    
    if ((event.code === `Key${key.toUpperCase()}`) || (event.code === 'Space') || (event.code === 'Enter')) {
      const drawKey = event.code === 'Enter' ? '\n' : key;
      drawLetter(drawKey, true);
    } else if (event.code === 'Backspace') {
      setTimeout(() => {
        redrawSignature(value.slice(0, -1));
      }, 50);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    
    // Redraw signature if value changed programmatically
    setTimeout(() => {
      redrawSignature(newValue);
    }, 50);
  };

  useEffect(() => {
    redrawSignature(value);
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      {/* Visible textarea field - transparent but interactive */}
      <textarea
        ref={textareaRef}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder=""
        required={required}
        rows={rows}
        className="w-full px-4 py-3 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black/40 focus:border-black/40 transition-colors bg-white text-transparent caret-black resize-vertical"
        style={{ caretColor: 'black' }}
      />
      
      {/* Handwriting signature display */}
      <div className="absolute inset-0 px-4 py-3 pointer-events-none overflow-hidden">
        <div 
          ref={signatureRef}
          className="signature-main flex flex-wrap items-start leading-relaxed"
          style={{ 
            minHeight: `${rows * 24}px`,
            lineHeight: '24px',
            wordBreak: 'break-word'
          }}
        />
      </div>
      
      {/* Placeholder when empty */}
      {!value && placeholder && (
        <div className="absolute inset-0 px-4 py-3 pointer-events-none flex items-start pt-3 text-black/50">
          {placeholder}
        </div>
      )}
    </div>
  );
}