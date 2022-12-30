import { forwardRef, ReactElement, RefObject } from "react";
import Image from "next/image";

type PerformerProps = Required<{
  name: string;
  text: string;
  img: string;
}>;

export const Performer = forwardRef(function Modal(
  { name, text, img }: PerformerProps,
  ref
) {
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="container">
      <div className="imgContainer">
        <Image layout="fill" src={img} alt="noImage" />
      </div>

      <h1>{name}</h1>
      <p>{text}</p>

      <style jsx>{`
        .imgContainer {
          position: relative;
          margin: 0 auto;
          width: 300px;
          height: 300px;
        }
        .container {
          font-family: "Noto Serif JP", serif;
          color: white;
          position: absolute;
          z-index: 99;
          opacity: 0;
          width: 100vw;
          padding: 0 100px;
          padding-top: 300px;
          pointer-events: none;
        }

        @media screen and (max-width: 540px) {
          .imgContainer {
            width: 80vw;
            height: 80vw;
          }
          .container {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
});
