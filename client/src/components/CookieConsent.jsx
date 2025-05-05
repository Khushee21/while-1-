import react, { useEffect, useState } from "react";
const CookieConsent=() =>{

    const [isVisible , setIsVisible]=useState(false);
    useEffect(()=>{
        const accepted=localStorage.getItem("cookieAccepted");
        if(!accepted)
        {
            setIsVisible(true);
        }
    },[]);

    const handleAccept = () => {
        localStorage.setItem("cookieAccepted","true" );
        setIsVisible(false);
    }

    if(!isVisible) return null;

    return(
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                 <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-opacity-10 p-6 rounded-lg max-w-md text-center shadow-xl">
                <h2 className="text-xl font-semibold mb-3">We value your privacy</h2>
                <p className="text-sm text-gray-600 mb-4">
                    This website uses cookies to ensure you get the best experience. By continuing, you agree to our cookie policy.
                </p>
                <button
                    onClick={handleAccept}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                 >
                Accept & Continue
                </button>
                </div>
             </div>
        </div>
    );
};

export default CookieConsent;