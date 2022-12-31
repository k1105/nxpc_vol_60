import { useState, useEffect, useRef, MutableRefObject } from "react";
import { MenuContent } from "./MenuContent";

type MenuProps = {
  scrollY: MutableRefObject<number>;
};

export const Menu = ({ scrollY }: MenuProps) => {
  const menuIconRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (isActive) {
      menuIconRef.current?.classList.add("active");
      containerRef.current?.classList.add("active");
    } else {
      menuIconRef.current?.classList.remove("active");
      containerRef.current?.classList.remove("active");
    }
  }, [isActive]);

  return (
    <>
      <div className="wrapper">
        <button
          ref={menuIconRef}
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="menu-trigger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="container" ref={containerRef}>
        <MenuContent
          isActive={isActive}
          setIsActive={setIsActive}
          scrollY={scrollY}
        />
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
        .container {
          width: 100vw;
          height: 100vh;
          background: red;
          position: fixed;
          left: 0;
          top: -100vh;
          z-index: 95;
          transition: all 0.4s;
        }
        .container.active {
          top: 0vh;
        }

        @media screen and (max-width: 540px) {
          .wrapper {
            right: 5vw;
          }
        }
      `}</style>
    </>
  );
};
