import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../common/constants";

const Navbar = () => {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="rounded-r bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
        <div className="flex justify-between  items-center space-x-3">
          <p className="text-2xl leading-6 text-white">Zeply</p>
        </div>
      </div>
      <div
        id="Main"
        className="xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-indigo-900 flex-col"
      >
        <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
          <p className="text-2xl leading-6 text-white">Zeply</p>
        </div>
        <div className="flex flex-col justify-start items-centerpx-6 border-b border-gray-600 w-full  ">
          <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 space-y-3 pb-5 ">
            <Link
              to={ROUTES.ADDRESS}
              className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
            >
              <p className="text-base leading-4 ">Search For Address</p>
            </Link>
          </div>
          <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 space-y-3 pb-5 ">
            <Link
              to={ROUTES.TRANSACTION}
              className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
            >
              <p className="text-base leading-4 ">Search For Transaction</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-centerpx-6 border-gray-600 w-full  ">
          <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 space-y-3 pb-5 ">
            <Link
              to={ROUTES.TOP_ADDRESS}
              className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
            >
              <p className="text-base leading-4 ">Top Searched Addresses</p>
            </Link>
          </div>
          <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 space-y-3 pb-5 ">
            <Link
              to={ROUTES.TOP_TRANSACTION}
              className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
            >
              <p className="text-base leading-4 ">Top Searched Transactions</p>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
