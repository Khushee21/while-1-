const LoginFooter = () => {
    return (
      <div className=" bg-black bg-opacity-80  text-white py-8 px-8   text-lg font-poppins">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mb-4">
          <div>
            <h3 className="font-semibold mb-2">Roadmap</h3>
            <p>Follow structured paths to grow in development, design & more.</p>
          </div>
  
          <div>
            <h3 className="font-semibold mb-2">SkillSwap</h3>
            <p>Exchange skills with peers and grow through real-world collaboration.</p>
          </div>
  
          <div>
            <h3 className="font-semibold mb-2">Mentors</h3>
            <p>Connect with experienced mentors and get career guidance.</p>
          </div>
  
          <div>
            <h3 className="font-semibold mb-2">Communication</h3>
            <p>Sharpen your soft skills with real-time interactions and resources.</p>
          </div>
  
          <div>
            <h3 className="font-semibold mb-2">Top MNCs</h3>
            <p>Prepare for companies like Google, Microsoft, Amazon, and more.</p>
          </div>
        </div>
  
        <div className="border-t pt-3 text-center text-sm text-white">
          📧 Contact us at: <a href="mailto:connect@skillswap.com" className="text-blue-500 hover:underline">connect@skillswap.com</a>
          <br />
          📞 Phone: +91-9876543210
        </div>
      </div>
    );
  };
  
  export default LoginFooter;
  