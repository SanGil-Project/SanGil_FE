import React from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element"
// import { Desktop, Mobile } from "../shared/MediaQuery";

const Menubar = () => {
  return (
    <React.Fragment>
      <Grid isFlex bg="#c4c4c4">
        <Grid flexColumn>
          <Icon type="feedIcon" width="36px" height="36px" margin="0 auto" />
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0">Feed</Text>
        </Grid>
        <Grid flexColumn>
          <Icon type="partyIcon" width="36px" height="36px" margin="0 auto" />
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0">동호회</Text>
        </Grid>
        <Grid flexColumn>
          <Icon type="homeIcon" width="36px" height="36px" margin="0 auto" />
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0">홈버튼</Text>
        </Grid>
        <Grid flexColumn>
          <Icon type="searchIcon" width="36px" height="36px" margin="0 auto" />
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0">검색</Text>
        </Grid>
        <Grid flexColumn>
          <Icon type="mypageIcon" width="36px" height="36px" margin="0 auto" />
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0">마이페이지</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );



}

export default Menubar;