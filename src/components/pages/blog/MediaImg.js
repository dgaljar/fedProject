import React, { useEffect, useState } from "react";

const PLACEHOLDER_IMG = "https://placehold.co/600x400?text=Loading...";

const MediaImg = ({ id, size }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/media/${id}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setImage(data);
      } catch (err) {
        console.error("Error fetching image:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading)
    return <img src={PLACEHOLDER_IMG} alt="Loading..." />;

  if (error)
    return <img src={PLACEHOLDER_IMG} alt="Failed to load image" />;

  const imgSize =
    image?.media_details?.sizes?.[size]?.source_url ||
    image?.guid?.rendered ||
    PLACEHOLDER_IMG;

  return (
    <img
      className="postimg"
      src={imgSize}
      alt={image?.alt_text || "Image"}
    />
  );
};

export default MediaImg;
