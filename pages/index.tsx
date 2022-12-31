import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Modal } from "../components/Modal";
import Scene from "../components/Scene";
import { Performer } from "../components/Performer";
import { Menu } from "../components/Menu";
import { About } from "../components/About";
import { Seo } from "../components/Seo";

export default function Home() {
  const noticePanel = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);

  /**
   * About
   */
  const aboutPanel = useRef<HTMLDivElement>(null);
  /**
   * Performer
   */
  const rekkoPanel = useRef<HTMLDivElement>(null);
  const motivePanel = useRef<HTMLDivElement>(null);
  const ishizukaPanel = useRef<HTMLDivElement>(null);
  const kakiPanel = useRef<HTMLDivElement>(null);
  const sagyou2Panel = useRef<HTMLDivElement>(null);
  /**
   * Information
   */
  const infoPanel = useRef<HTMLDivElement>(null);

  const panelRefs: RefsProp = {
    notice: noticePanel,
    about: aboutPanel,
    rekko: rekkoPanel,
    motive: motivePanel,
    ishizuka: ishizukaPanel,
    kaki: kakiPanel,
    sagyou2: sagyou2Panel,
    info: infoPanel,
  };

  return (
    <div>
      <Seo />

      <main>
        <div id="root">
          <Menu scrollY={scrollY} />
          <div
            ref={noticePanel}
            style={{
              color: "black",
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              textAlign: "center",
              zIndex: "10",
              display: "grid",
              placeItems: "center",
              fontFamily: "Noto Serif JP",
            }}
          >
            <p
              style={{
                width: "300px",
                height: "300px",
                lineHeight: "30px",
                border: "1px solid #000",
                background: "white",
                margin: "auto",
                opacity: "0.9",
                display: "grid",
                placeItems: "center",
              }}
            >
              スクロールで前に進みます。
              <br />
              Scroll to proceed.
            </p>
          </div>
          <About ref={aboutPanel} />
          <Performer
            name="裂固"
            text=""
            img="/img/performer/rekko.jpg"
            ref={rekkoPanel}
          />
          <Performer
            name="DJ MOTIVE"
            text="2008年アルバム“CURE”がiTUNESのHIPHOPアルバムチャートで最高1位。2008年インディーズHIPHOPベストアルバムに選出される。12インチアナログ、REMIX、CM音楽、サウンドトラックなどコラボレーション多数。"
            img="/img/performer/motive.jpg"
            ref={motivePanel}
          />
          <Performer
            name="Ryu Ishizuka"
            text="Talkboxという80'sに流行したエフェクターを用いて、チューブを口にくわえてシンセサイザーの音を送り、口の中で共鳴させて人間の声のように発声する演奏法と、音に同期した映像による視覚表現を合わせることで、新旧を織り交ぜたパフォーマンスを行う。"
            img="/img/performer/ryu_ishizuka.jpg"
            ref={ishizukaPanel}
          />
          <Performer
            name="JACKSON Kaki"
            text=""
            img="/img/performer/jackson_kaki.png"
            ref={kakiPanel}
          />
          <Performer
            name="作業用BGM"
            text="作業用BGMを演奏するグループ
作業 (さぎょう、英語: occupation) とは、日々の生活で行われ、名付けられている一群の活動と課題であり、個人と文化によって価値と意味があたえられたものである。
作業として音楽の演奏を行う。"
            img="/img/performer/sagyoyo_bgm.png"
            ref={sagyou2Panel}
          />
          <Modal ref={infoPanel}>
            <>
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
            </>
          </Modal>
          <Canvas>
            <Scene panelRefs={panelRefs} scrollY={scrollY} />
          </Canvas>
        </div>
      </main>
    </div>
  );
}
