import React from "react";
import Slider from "react-slick";

import { Image, Grid } from "../../elements/element";

const Banner = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <Grid
        padding="0 1px"
        hover
        _onClick={() =>
          window.open("https://forms.gle/c3oqW5aNZo96tVMf6", "_blank")
        }
      >
        <Image
          width="100%"
          height="100px"
          borderRadius="10px"
          src={require("../../assets/images/Banner_1.png")}
        />
      </Grid>
      <Grid
        padding="0 1px"
        hover
        _onClick={() =>
          window.open("https://forms.gle/c3oqW5aNZo96tVMf6", "_blank")
        }
      >
        <Image
          width="100%"
          height="100px"
          borderRadius="10px"
          src={require("../../assets/images/Banner_2.png")}
        />
      </Grid>
    </Slider>
  );
};

export default Banner;
