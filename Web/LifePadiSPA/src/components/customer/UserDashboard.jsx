import useRefreshToken from "../../hooks/useRefreshToken";
import { useEffect } from "react";

const UserDashboard = () => {
    const refresh = useRefreshToken()
    const getrefresh = async () => {
       const tok =  await refresh();
       console.log(tok)
    }

    return ( <section>
        <h1> USER DASHBOARD</h1>
        <button onClick={getrefresh}> get refresh</button>
    </section> );
}
 
export default UserDashboard;