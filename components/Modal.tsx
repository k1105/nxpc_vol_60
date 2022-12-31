import { forwardRef, ReactElement, RefObject } from "react";

type ModalProps = Required<{
  readonly children: ReactElement;
}>;

export const Modal = forwardRef(function Modal({ children }: ModalProps, ref) {
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="container">
      <div className="wrapper">{children}</div>

      <style jsx>{`
        .container {
          color: white;
          position: absolute;
          z-index: 10;
          opacity: 0;
          width: 100vw;
          pointer-events: none;
          font-family: "Noto Serif JP", serif;
          font-weight: 600;
          color: black;
        }

        .wrapper {
          position: fixed;
          left: 10vw;
          bottom: 20vh;
          width: 500px;
        }

        @media screen and (max-width: 540px) {
          .container {
            padding: 10px;
          }
          .wrapper {
            position: fixed;
            left: 5vw;
            bottom: 20vh;
            width: 90vw;
          }
        }
      `}</style>
    </div>
  );
});
