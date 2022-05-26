import React from "react";
import Slider from "react-slick";

import { Image, Grid } from "../elements/element";

const Banner = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
  };
  return (
    <Slider {...settings}>
      <Grid>
        <Image
          width="100%"
          height="100px"
          borderRadius="10px"
          src={require("../assets/images/Banner_1.png")}
        />
      </Grid>
      <Grid>
        <Image
          width="100%"
          height="100px"
          borderRadius="10px"
          src={require("../assets/images/Banner_2.png")}
        />
      </Grid>
    </Slider>
  );
};

export default Banner;
