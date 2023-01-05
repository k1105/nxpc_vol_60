import { forwardRef, RefObject } from "react";

export const Information = forwardRef(function Information(_, ref) {
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="container">
      <div className="textContainer">
        <div className="textWrapper">
          <p>
            料金： 一般4,000円、学生3,500円
            <br />
            定員： 45名
            <br />
            申し込み方法：
            <br />
            CLUB TRAIN 2023
            参加応募フォームに必要事項をご記入ください。先着順とさせていただきますのでお早めにお申し込みください。
            <br />
            <small style={{ fontSize: "0.7rem" }}>
              ※料金には樽見鉄道乗車往復分の運賃を含みます。
              <br />
              ※学生のお客様は、イベント当日は学生証または類似する証明書をお持ち下さい。
              <br />
              ※お支払いは当日現地での現金払いのみです。現金のご用意をお願いします。
              <br />
              ※ご乗車の際は手指の消毒と体温の測定を行います。発熱等の症状が見られる場合はご乗車をご遠慮頂くこともあります。また、マスクの着用をお願いします。
            </small>
          </p>
        </div>
      </div>

      <style jsx>{`
        .imgContainer {
          position: relative;
          width: 45vw;
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
          margin: 20vh auto 0;
          position: relative;
        }

        .textWrapper {
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
            margin: 10vh auto 0;
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
