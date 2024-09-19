import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Oid } from "../oid.svg";
import { ReactComponent as Email } from "../Email.svg";
import { ReactComponent as Github } from "../Github.svg";
import { ReactComponent as Share } from "../Share.svg";

import ReactGA from "react-ga4";

function AboutUs({}) {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const burgerMenuRef = useRef(null);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(getRandomColor());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setBgColor(getRandomColor());
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <div className="about-us-wrapper">
      <div
        id="logo-main"
        className="logo-main"
        onClick={() => navigate("/")}
        onMouseOver={handleMouseOver}
      >
        <svg className="logo" fill={bgColor}>
          <Oid />
        </svg>
        <h1
          className="title"
          style={{
            color: bgColor,
            fontFamily: "Sanchez-Regular",
          }}
        >
          FCK ALGOS
        </h1>
      </div>
      <div className="about-us-content">
        <h2
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="about-us-title"
        >
          {" "}
          About us{" "}
        </h2>
        Hi, we believe that music recommendations should not be driven by
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          {" "}
          algorithms
        </span>{" "}
        that trap you in{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          echo chambers
        </span>
        . Instead, we think the best discoveries come from{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          real people
        </span>{" "}
        with unique tastes. <br />
        Our platform is built around the idea that music is best explored
        through personal connections and{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          serendipity{" "}
        </span>
        . Here, you can follow fellow music heads and dig randomly through their
        collections, stumbling upon an 80s synth-wave melody a click away from a
        doom metal banger.
        <br />
        <br />
        We believe in the album as an art form. In a world of endless playlists,
        we’re here to bring back the intentional listening. Albums tell stories,
        reveal layers, and reflect an artist’s full vision. Here, you’ll explore
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          {" "}
          handpicked albums from others.
        </span>
        <br />
        <br />
        This website is proudly{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          DIY
        </span>
        , embracing a{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          geeky open-source philosophy
        </span>
        . We welcome all kinds of recommendations, no matter the genre or
        obscurity. Your taste and voice are what make this community vibrant and
        diverse. We're all about{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          {" "}
          collaboration, experimentation.
        </span>
        <br />
        <br />
        <h2
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="about-us-title"
        >
          {" "}
          How the site works{" "}
        </h2>
        At its core, our platform functions like a{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          social network for music discovery
        </span>
        . You’ll dive into the personal collections of those you follow,
        experiencing music in the way it was meant to be—
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          randomly stumbled upon
        </span>
        , not calculated by an algorithm. <br />
        When you first log in, you’ll be automatically connected to{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          our profile
        </span>
        , providing you a starting point for exploration. To unlock more, simply
        log in via{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          Spotify
        </span>{" "}
        (yes, a free account works too). Once you're in, it's up to you to
        follow others. <br />
        <br />
        Want to refine your search? You can apply different filters to tailor
        your discoveries:
        <ul>
          <li>
            <span
              style={{
                color: bgColor,
                textTransform: hovered ? "uppercase" : "none",
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              className="colored"
            >
              Genres
            </span>{" "}
            – Zero in on the sound that fits your mood, from obscure
            micro-genres to mainstream classics. Whether you’re hunting for
            ambient, shoegaze, or Afrobeat, it’s all here.
          </li>
          <li>
            <span
              style={{
                color: bgColor,
                textTransform: hovered ? "uppercase" : "none",
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              className="colored"
            >
              People
            </span>{" "}
            – Love someone’s taste? Dig deeper into their collection, or explore
            what people with similar tastes are recommending. Each user has a
            unique fingerprint of sound.
          </li>
          <li>
            <span
              style={{
                color: bgColor,
                textTransform: hovered ? "uppercase" : "none",
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              className="colored"
            >
              Year
            </span>{" "}
            – Travel through time, from the psychedelic 60s to the electronic
            pulse of the 2020s. Discover albums that defined an era or those
            that flew under the radar.
          </li>
          <li>
            <span
              style={{
                color: bgColor,
                textTransform: hovered ? "uppercase" : "none",
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              className="colored"
            >
              Label
            </span>{" "}
            – Ever been obsessed with the output of a particular label? Now you
            can track their influence across different artists and releases.
            It’s perfect for label hunters who know where the real gems lie.
          </li>
        </ul>
        <br />
        Once you’ve built up your own collection,{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          share it with the world
        </span>
        . Head to your profile and hit the{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          start sharing
        </span>{" "}
        button. Our backend will then{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          automatically process your albums
        </span>
        , so others can discover them through your lens. <br />
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="colored"
        >
          <br />
          Your catalog becomes part of the community
        </span>
        , allowing your followers to explore your albums as recommendations.{" "}
        <br />
      </div>
      <div className="about-us-logos">
        <a href="mailto:rax@fck-algos.com">
          <Email className="about-us-logo" fill={bgColor} />
        </a>
        <Github
          onClick={() =>
            window.open("https://github.com/maxenceroux/fck-algos")
          }
          className="about-us-logo github"
          fill={bgColor}
        />
        <a href="mailto:?subject=Check out FCK ALGOS&body=Hey!%0D%0A%0D%0ASomeone wants you to take a tour of FCK ALGOS, a music rec platform!%0D%0A%0D%0AVisit here: https://fck-algos.com">
          <Share className="about-us-logo share" fill={bgColor} />
        </a>
      </div>
    </div>
  );
}

export default AboutUs;
