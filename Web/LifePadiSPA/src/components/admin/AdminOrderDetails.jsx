const AdminOrderDetails = () => {
  return (
    <section className="bg-white dark:bg-gray-900 p-2 text-gray-900 dark:text-gray-50">
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-3  ">
        <div className="col-span-2 border-2">
          {" "}
          <h1> Order Details</h1>{" "}
        </div>
        <div className="border-2">
          {" "}
          <h1>Rider Details </h1>{" "}
        </div>
        <div className="border-2 ">
          {" "}
          <h1>Transaction Details</h1>{" "}
        </div>
        <div className="border-2 col-span-2">
          {" "}
          <h1>Delivery Details</h1>{" "}
        </div>
      </div>
    </section>
  );
};

export default AdminOrderDetails;
