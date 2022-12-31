import { Dispatch, MutableRefObject, SetStateAction } from "react";

type Props = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  scrollY: MutableRefObject<number>;
};

export const MenuContent = ({ isActive, setIsActive, scrollY }: Props) => {
  return (
    <>
      <div className="container">
        <div className="flex-item">
          <ul>
            <li>
              <a
                onClick={() => {
                  setIsActive(!isActive);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Top
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setIsActive(!isActive);
                  window.scrollTo({
                    top: window.innerHeight * 25,
                    behavior: "smooth",
                  });
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setIsActive(!isActive);
                  window.scrollTo({
                    top: window.innerHeight * 43,
                    behavior: "smooth",
                  });
                }}
              >
                Performer
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setIsActive(!isActive);
                  window.scrollTo({
                    top: window.innerHeight * 80,
                    behavior: "smooth",
                  });
                }}
              >
                Information
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-item location">
          <h3>開催場所</h3>
          <hr />
          <p
            style={{
              fontSize: "min(4.2vw, 24px)",
              fontWeight: "700",
              lineHeight: "150%",
            }}
          >
            樽見鉄道大垣駅
          </p>
          <h3>開催日程</h3>
          <hr />
          <p>2023年1月14日（土） 17:50 集合</p>
          <h3>運賃</h3>
          <hr />
          <p>4,000円 (学生3,500円)+ワンドリンク付</p>
        </div>
        <div className="links">
          <a href="https://twitter.com/nxpclab/" className="sns-icon">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/nxpclab/" className="sns-icon">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.youtube.com/user/nxpclab" className="sns-icon">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a
            href="https://www.instagram.com/iamas.nxpc.lab/"
            className="sns-icon"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
      <style jsx>{`
        h3 {
          font-size: min(3.6vw, 16px);
          margin-bottom: 10px;
        }

        p {
          font-size: min(4.2vw, 24px);
          font-weight: 600;
          margin-top: 5px;
        }

        ul {
          padding: 0;
        }

        hr {
          border: #000 0.5px solid;
          margin-bottom: 0px;
        }

        .links {
          width: 100%;
          text-align: center;
          font-size: min(4.2vw, 24px);
        }

        .sns-icon {
          text-decoration: none;
          color: #000;
          margin-right: 10px;
        }

        .flex-item {
          width: 45%;
        }

        .container {
          padding: 0 15vw;
          width: 80%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin: 0 auto 100px;
          font-family: "Noto Serif JP", serif;
          padding: 70px 10px 0;
        }

        .container ul li {
          border-bottom: solid 1px #000;
          list-style: none;
        }
        .container ul li a {
          display: block;
          width: 100%;

          font-size: min(7.2vw, 48px);
          font-weight: 600;
          font-style: normal;
          box-sizing: border-box;
          color: #000;
          text-decoration: none;
          padding: 9px 15px 10px 0;
          position: relative;
        }
        .container ul li a::before {
          content: "";
          width: 7px;
          height: 7px;
          border-top: solid 2px #000;
          border-right: solid 2px #000;
          transform: rotate(45deg);
          position: absolute;
          right: 11px;
          top: min(7.2vw, 48px);
        }

        @media screen and (max-width: 520px) {
          /*for smartphone*/

          .menu-content {
            padding: 5vw;
          }

          .flex-item {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};
