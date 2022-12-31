import { forwardRef, RefObject, useRef } from "react";

export const MenuIcon = forwardRef(function MenuIcon(_, ref) {
  const isActive = useRef<boolean>(false);
  return (
    <>
      <div className="wrapper">
        <button
          ref={ref as RefObject<HTMLButtonElement>}
          onClick={() => {
            if (!isActive.current) {
              (ref as RefObject<HTMLButtonElement>).current?.classList.add(
                "active"
              );
            } else {
              (ref as RefObject<HTMLButtonElement>).current?.classList.remove(
                "active"
              );
            }
            isActive.current = !isActive.current;
          }}
          className="menu-trigger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <style jsx>{`
        .wrapper {
          position: absolute;
          top: 50px;
          right: 50px;
          z-index: 99;
        }
        .menu-trigger,
        .menu-trigger span {
          display: inline-block;
          transition: all 0.4s;
          box-sizing: border-box;
        }
        .menu-trigger {
          position: relative;
          width: 50px;
          height: 24px;
          background: none;
          border: none;
          appearance: none;
          cursor: pointer;
        }
        .menu-trigger span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: #ff0000;
          border-radius: 4px;
        }
        .menu-trigger span:nth-of-type(1) {
          top: 0;
        }
        .menu-trigger span:nth-of-type(2) {
          top: 10px;
        }
        .menu-trigger span:nth-of-type(3) {
          bottom: 0;
        }

        .menu-trigger.active span {
          background-color: #fff;
        }

        .menu-trigger.active span:nth-of-type(1) {
          transform: translateY(10px) rotate(-20deg);
        }
        .menu-trigger.active span:nth-of-type(2) {
          opacity: 0;
        }
        .menu-trigger.active span:nth-of-type(3) {
          transform: translateY(-10px) rotate(20deg);
        }
      `}</style>
    </>
  );
});
