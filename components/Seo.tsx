import Head from "next/head";

export const Seo = ({}) => {
  return (
    <Head>
      <title>CLUBTRAIN2023</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta
        name="description"
        content=" 大垣市から本巣市を走るローカル線の樽見鉄道の車両を丸ごと使用して、一夜限りのクラブイベント「ネオ・天国」を開催いたします。本線はイベント中、大垣-樽見駅間を往復して運行いたします。発車時刻には乗り遅れませぬよう、くれぐれもご注意、そしてクラブトレインをお楽しみください。"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content="/ogp.png" />
      <meta
        name="twitter:image"
        content="https://clubtrain2023.vercel.app/ogp.png"
      />
      <meta property="og:title" content="CLUBTRAIN2023 | NxPC.Live vol.60" />
      <meta
        property="og:site_name"
        content="CLUBTRAIN2023 | NxPC.Live vol.60"
      />
      <meta
        property="og:description"
        content=" 大垣市から本巣市を走るローカル線の樽見鉄道の車両を丸ごと使用して、一夜限りのクラブイベント「ネオ・天国」を開催いたします。本線はイベント中、大垣-樽見駅間を往復して運行いたします。発車時刻には乗り遅れませぬよう、くれぐれもご注意、そしてクラブトレインをお楽しみください。"
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="ogp.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
};
