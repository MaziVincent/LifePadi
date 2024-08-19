const Favourite = () => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-green-500 font-bold">
          {" "}
          You Currently have no Favourites {" "}
          <span>
            {" "}
            <i className="line-icon-Heart text-yellow"></i>{" "}
          </span>{" "}
        </h1>
      </div>
    </div>
  );
};

export default Favourite;
