import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, title, description, shareBy }) => (
  <div className="d-flex gap-2">
    <iframe
      width="400"
      height="220"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
    <div className="d-flex flex-column align-items-start">
        <h2 className="title">{title}</h2>
        <span>Share by: <strong>{shareBy}</strong></span>
        <h3> Description </h3>
        <p className="title">{description}</p>
    </div>
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;