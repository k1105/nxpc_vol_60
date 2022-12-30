import { forwardRef, ReactElement, RefObject } from "react";

type ModalProps = Required<{
  readonly children: ReactElement;
}>;

export const Modal = forwardRef(function Modal({ children }: ModalProps, ref) {
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="container">
      {children}
      <style jsx>{`
        .container {
          color: white;
          position: absolute;
          z-index: 99;
          opacity: 0;
          width: 100vw;
          padding: 100px 100px;
          pointer-events: none;
          font-family: "Noto Serif JP", serif;
          font-weight: 600;
          color: black;
        }

        @media screen and (max-width: 540px) {
          .container {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
});
