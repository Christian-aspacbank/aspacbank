import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-300 py-10 px-6">
    
        
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
  <p className="text-lg font-medium">
    Deposits are insured by PDIC up to P1,000,000 per depositor
  </p>          
</div>

      <hr />
  
      <br />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
        
        {/* Contact and Regulatory Info */}
        <div className="space-y-4">
          <p>
            For concerns, call ASPAC Bank’s Customer Service Hotline at 
            <span className="font-semibold"> (032) 345-0929 / 345-0930</span>
          </p>
          <p>ASPAC Bank is regulated by the Bangko Sentral ng Pilipinas (BSP)</p>
          <p>Email: <a href="mailto:aspacbank@aspacbank.com" className="text-green-700 hover:underline">aspacbank@aspacbank.com</a> | </p>
          
        </div>

        {/* Address + App Icons + Socials */}
        <div className="text-center md:text-right space-y-4">
          <div>
            <h4 className="text-base font-semibold">Head Office Address</h4>
            <p>ASPAC Bank Building,Guizo Mandaue City, Cebu City, Philippines</p>
          </div>
          <div className="flex justify-center md:justify-end gap-4 mt-4">
            <img src="/appstore.png" alt="App Store" className="h-10" />
            <img src="/googleplay.png" alt="Google Play" className="h-10" />
          </div>
          <div className="flex justify-center md:justify-end gap-4 mt-4 text-gray-600 text-xl">
            <a href="#"><i className="fab fa-facebook-square hover:text-green-700"></i></a>
            <a href="#"><i className="fab fa-twitter hover:text-green-700"></i></a>
            <a href="#"><i className="fab fa-instagram hover:text-green-700"></i></a>
            <a href="#"><i className="fab fa-linkedin hover:text-green-700"></i></a>
            <a href="#"><i className="fab fa-youtube hover:text-green-700"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
