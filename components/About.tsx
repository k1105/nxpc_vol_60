import { forwardRef, RefObject } from "react";
import Image from "next/image";

export const About = forwardRef(function About(_, ref) {
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="container">
      <div className="imgContainer">
        <Image src="/img/about/live_image.jpg" alt="noImage" layout="fill" />
      </div>

      <div className="textContainer">
        <div className="textWrapper">
          <p>
            大垣市から本巣市を走るローカル線の樽見鉄道の車両を丸ごと使用して、一夜限りのクラブイベント「ネオ・天国」を開催いたします。本線はイベント中、大垣-樽見駅間を往復して運行いたします。発車時刻には乗り遅れませぬよう、くれぐれもご注意、そしてクラブトレインをお楽しみください。
          </p>
        </div>
      </div>

      <style jsx>{`
        .imgContainer {
          position: relative;
          width: 40vw;
          height: 33.75vw;
          margin: 30px auto 0;
        }

        p {
          display: inline;
          margin-top: 0;
          line-height: 1.3em;
          background: linear-gradient(transparent 0%, #fff 0%);
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          font-size: 1.3em;
          font-weight: 600;
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

        .textWrapper {
          position: absolute;
          top: -5em;
          left: -10em;
        }

        @media screen and (max-width: 540px) {
          .imgContainer {
            width: 90vw;
            height: 67.5vw;
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
            top: -1em;
            left: -0.5em;
          }
          h1 {
            font-size: 1.5em;
          }

          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
});
