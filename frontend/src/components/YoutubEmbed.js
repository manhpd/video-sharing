import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, title, description, shareBy }) => (
  <div className="d-flex gap-2 justify-content-center align-items-center w-100">
    <iframe
      width="400"
      height="220"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
    <div className="d-flex flex-column align-items-start w-25">
        <span className="title text-danger"><strong>{title}</strong></span>
        <span>Share by: <strong>{shareBy}</strong></span>
        <span><strong> Description </strong></span>
        <p className="description">{description}</p>
    </div>
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;