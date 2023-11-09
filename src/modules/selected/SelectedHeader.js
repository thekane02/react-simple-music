import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import useOnChange from "hooks/useOnChange";
import LiveSearch from "modules/user/LiveSearch";

const SelectedHeader = ({ sticky }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const navButtonClass = "p-3 bg-[rgba(0,0,0,0.4)] rounded-full cursor-pointer";
  const user = useSelector((state) => state.auth.currentUser);
  // const handleOnchange = debounce((e) => {
  //   if (e.target.value !== "") setUrl(`/search?keyword=${e.target.value}`);
  //   else setUrl("");
  // }, 300);

  return (
    <div
      className={`fixed w-full top-0 left-0 right-0 px-[68px] z-50 flex items-center justify-between h-header-height transition-all backdrop-blur-lg ${
        sticky ? "bg-[#37075de3] backdrop-blur-2xl" : ""
      }`}
    >
      {/* <div className="absolute left-0 right-0 h-full -z-10 bg-bg-color bg-opacity-60 backdrop-blur-2xl"></div> */}

      <div className="flex items-center gap-6">
        <Link to="/">
          <img
            srcSet="/logo.png"
            // className="w-6 h-6"
            className="object-cover w-12 h-12 drop-shadow-darkness"
            alt="Selected Logo"
          />
        </Link>
        <div className="hidden gap-2 xl:flex">
          <button
            disabled={pathname === "/"}
            onClick={() => navigate(-1)}
            className={`${navButtonClass}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
          <button onClick={() => navigate(1)} className={`${navButtonClass}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </div>
        <LiveSearch></LiveSearch>
      </div>
      <div className="cursor-pointer">
        <div className="max-w-[36px]">
          <img className="w-full rounded-full" src={user?.picture} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SelectedHeader;
