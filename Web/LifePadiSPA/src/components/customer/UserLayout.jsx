
import { Outlet } from "react-router-dom";
import { useState } from "react";
const UserLayout = () => {
  //const [cart, setCart] = useState(false);
  return (
      <main className="dark:bg-darkBg dark:text-primary w-full">
       
        <div className="pt-28">
          <Outlet  />
        </div>

        
      </main>
  );
};

export default UserLayout;
