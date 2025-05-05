const Reviewcard = ({ name, review , rating}) => {
    return(
        <div className="p-3 mt-4">
        <div className=" font-poppins w-80 h-44 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-opacity-10 p-4 rounded-xl shadow-md m-2">
            <h3 className=" font-poppins font-semibold">{name}</h3>
            <p className="font-poppins text-sm italic">"{review}"</p>
            <p className="font-poppins mt-1">{rating}</p>
        </div>
        </div>
    );
};

export default Reviewcard;