import SelectedLeftSidebar from "../modules/selected/SelectedLeftSidebar";
import { Outlet } from "react-router-dom";
import SelectedBottombar from "../modules/selected/SelectedBottombar";
import SelectedHeader from "../modules/selected/SelectedHeader";
import ReactModal from "react-modal";
import CreatePlayListForm from "modules/playlist/CreatePlayListForm";
import { useDispatch, useSelector } from "react-redux";
import getModalContent from "utils/getModalContent";
import { forms } from "constants/forms";
import { closeModal } from "store/global/global-slice";
import Modal from "react-modal";
const LayoutSeleted = () => {
  Modal.setAppElement("#root");
  Modal.defaultStyles = {};
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.global);

  return (
    <div className="container relative mb-player-height">
      <SelectedLeftSidebar></SelectedLeftSidebar>
      <SelectedHeader></SelectedHeader>

      <div className="mt-header-height">
        <Outlet></Outlet>
      </div>
      <SelectedBottombar></SelectedBottombar>
      <ReactModal
        isOpen={modal.isShow}
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-[999] flex items-center justify-center"
        className="modal-content w-full max-w-[800px] rounded-2xl outline-none p-10 relative max-h-[60vh] bg-dark-alt"
      >
        <span className="absolute top-0 right-0 z-[999] w-12 h-12 bg-gray-300 rounded-full cursor-pointer translate-x-1/3 -translate-y-1/3 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
            onClick={() => dispatch(closeModal())}
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeDasharray={16}
              strokeDashoffset={16}
              strokeLinecap="round"
              strokeWidth={2}
            >
              <path d="M7 7L17 17">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.4s"
                  values="16;0"
                />
              </path>
              <path d="M17 7L7 17">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.4s"
                  values="16;0"
                />
              </path>
            </g>
          </svg>
        </span>
        {forms[modal.content]}
      </ReactModal>
    </div>
  );
};
export default LayoutSeleted;
