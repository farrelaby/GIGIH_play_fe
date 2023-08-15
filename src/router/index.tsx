import { Navbar } from "../components/navbar";

import { Link } from "react-router-dom";

import { BE_URL } from "../configs";

import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

type MainVideos = {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
};

export default function Home() {
  const videoData = useQuery<MainVideos[]>({
    queryKey: ["main-videos"],
    queryFn: async () => {
      const response = await fetch(`${BE_URL}/v1/videos`);
      const data = await response.json();
      return data;
    },
  });

  // videoData.isSuccess && console.log(videoData.data);

  return (
    <main>
      <Navbar />
      <div className="cards-container">
        {videoData.isSuccess ? (
          videoData.data?.map((video) => {
            return <ProductCard video={video} key={video.id} />;
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
}

function ProductCard({ video }: { video: MainVideos }) {
  return (
    <Link to={`/${video.id}`} className="card">
      <img src={video.thumbnail} alt="" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{video.title}</h2>
        <p className="card-description">{video.channel}</p>
      </div>
    </Link>
  );
}
