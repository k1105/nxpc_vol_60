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
        <Image src={img} alt="noImage" layout="fill" />
      </div>

      <div className="textContainer">
        <div className="textWrapper">
          <h1>{name}</h1>
          <br />
          <p>{text}</p>
        </div>
      </div>

      <style jsx>{`
        .imgContainer {
          position: relative;
          width: 450px;
          height: 450px;
          margin-left: 32vw;
        }

        h1 {
          display: inline-block;
          font-weight: 600;
          margin: 5px 0;
          margin-top: -30px;
          background: linear-gradient(transparent 0%, #fff 0%);
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
        }

        p {
          display: inline;
          margin-top: 0;
          line-height: 0.5em;
          background: linear-gradient(transparent 0%, #fff 0%);
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
        }

        .container {
          font-family: "Noto Serif JP", serif;
          color: black;
          position: absolute;
          z-index: 90;
          opacity: 0;
          width: 100vw;
          padding-top: 150px;
          pointer-events: none;
        }

        .textContainer {
          width: 40vw;
          margin: 0 auto;
          position: relative;
        }

        @media screen and (max-width: 540px) {
          .imgContainer {
            width: 70vw;
            height: 70vw;
            margin: 0 auto;
          }
          .container {
            padding-top: 36vh;
          }
          .textContainer {
            width: 90vw;
            margin: 0 auto;
          }

          .textWrapper {
            position: absolute;
            top: -5.2em;
            font-size: 0.8rem;
          }
          h1 {
            font-size: 1.5em;
            line-height: 1.5rem;
          }

          p {
            line-height: 1rem;
          }
        }
      `}</style>
    </div>
  );
});
