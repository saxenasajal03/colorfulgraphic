import React from "react";

const WHATSAPP_NUMBER = "8448128620"; // Replace with your WhatsApp number
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center transition-colors duration-200"
    aria-label="Chat on WhatsApp"
  >
    {/* WhatsApp SVG icon */}
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 012.1 12.045c0-5.439 4.423-9.863 9.864-9.863 2.636 0 5.112 1.027 6.988 2.896a9.825 9.825 0 012.875 6.979c-.003 5.439-4.426 9.862-9.865 9.862zm8.413-18.276A11.815 11.815 0 0011.964 0C5.364 0 0 5.364 0 11.963c0 2.114.552 4.174 1.597 5.981L.057 24l6.184-1.623a11.93 11.93 0 005.724 1.463h.005c6.599 0 11.963-5.364 11.963-11.963a11.89 11.89 0 00-3.487-8.474z"/>
    </svg>
  </a>
);

export default WhatsAppButton; 