import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import logo from "/logo.png";
import { ScrollRestoration } from "react-router";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import authImg from "../assets/authImg.jpg"
const AuthLayout = () => {
  return (
    <section className="flex justify-center items-center min-h-screen p-10 lg:p-20 bg-black">
      <div className=" flex flex-col lg:flex-row justify-between items-center gap-6 ">
        {/* left */}
        <div className="flex-1">
          <div className="p-4">
            <img
              className="w-[50px] h-[50px] bg-yellow-400 shadow-xl shadow-yellow-400 rounded-full mx-auto object-cover"
              src={logo}
              alt=""
            />
            <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center py-2">
              Spendly
            </h2>
            <p className=" text-center">Your Personal Budget Buddy</p>
          </div>

          <div className="py-10">
            <Tabs>
              <TabList className="flex justify-center items-center border-1 text-center mb-10">
                <Tab className="w-full rounded-0 p-4 text-primary mx-auto border-0 border-r-1">
                  Log In
                </Tab>
                <Tab className="w-full rounded-0 border-0 p-4 text-primary  mx-auto">
                  Register
                </Tab>
              </TabList>

              {/* Login */}
              <TabPanel>
                <Login />
              </TabPanel>

              {/* Register */}
              <TabPanel>
                <Register />
              </TabPanel>
            </Tabs>
          </div>
        </div>

        {/* right */}
        <div className="flex-1">
          <img className="w-[100vw] p-6" src={authImg} alt="" />
        </div>



      </div>
      <ScrollRestoration />
    </section>
  );
};

export default AuthLayout;
