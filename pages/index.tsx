import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import Scene from "../components/Scene";
import { Performer } from "../components/Performer";
import { Menu } from "../components/Menu";
import { About } from "../components/About";
import { Seo } from "../components/Seo";
import { Information } from "../components/Information";

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
              opacity: "0",
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
            text="岐阜県出身のハードライマー。
第９回高校生ラップ選手権の優勝を皮切りに〝SCHOOL OF RAP〟〝SPOTLIGHT〟優勝、2016年KING OF KINGS本戦出場等、現在のバトルシーンの最前線に躍り出る。そして2017年夏、現在のバトルブームを生み出したと言っても過言ではない企画、テレビ朝日『フリースタイルダンジョン』の２代目モンスターに選出されその名を全国レベルに広げる。"
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
            text="3DCG / VR,AR / Video Creator based in Tokyo , JAPAN and also he is DJ plays in Shibuya.
Influenced by the culture of alternative electronic music (IDM / Experimental / Avant-garde / UK Bass), he focuses on the extended expression of music through new media such as 3DCG / VR/AR."
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
          <Information ref={infoPanel} />
          <Canvas>
            <Scene panelRefs={panelRefs} scrollY={scrollY} />
          </Canvas>
        </div>
      </main>
    </div>
  );
}
