import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { FiLogOut, FiSettings, FiHelpCircle, FiTrash2, FiKey } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { path } from "../constant";
import { useDispatch } from "react-redux";
import logoutUser from "../../utils/logout";
import useCustomToast from "../toast/useCustomToast";

const getUserNameInitial = (username: string | null) => {
  if (!username) return null;
  const firstLetter = username.trim().charAt(0).toUpperCase();
  return firstLetter || null;
};

const UserTab: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useCustomToast()
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const initial = getUserNameInitial(userInfo?.name ?? null);

  const Fauser = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const Fikey = FiKey as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FiTrash = FiTrash2 as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FihelpCircle = FiHelpCircle as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FilogOut = FiLogOut as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  const handleLogout = () => {
          logoutUser(dispatch, navigate)
          toast.success('You have been logged out.')
      };
  

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center justify-center w-9 h-9 md:w-12 md:h-12 bg-teal-500 text-white rounded-full font-bold text-sm md:text-lg">
          {initial ? (
            initial
          ) : (
            <Fauser className="text-white text-lg md:text-xl" />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-700">Signed in as</p>
            <p className="truncate font-medium text-gray-900">{userInfo?.email}</p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleNavigate(path.RESET_PASSWORD)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex w-full px-4 py-2 text-sm text-gray-700 items-center gap-2`}
                >
                  <Fikey /> Change Password
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleNavigate(path.DELETE_ACCOUNT)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex w-full px-4 py-2 text-sm text-gray-700 items-center gap-2`}
                >
                  <FiTrash /> Delete Account
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleNavigate("/help")}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex w-full px-4 py-2 text-sm text-gray-700 items-center gap-2`}
                >
                  <FihelpCircle /> Help
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex w-full px-4 py-2 text-sm text-red-600 items-center gap-2`}
                >
                  <FilogOut /> Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserTab;
