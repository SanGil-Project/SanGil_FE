import React from "react";
import { Grid } from "../elements/element";
import { Header } from "../components/component";

const FeedDetail = () => {
  return (
    <Grid border="1px solid black" width="414px" margin="0 auto">
      <Header />
      <Grid overflowY="scroll" height="1080px">
        <Grid border="1px solid red" height="50px" margin="82px 0 0 0"></Grid>
      </Grid>
    </Grid>
  );
};

export default FeedDetail;
