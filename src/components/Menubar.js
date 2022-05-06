import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { Grid, Icon, Text } from "../elements/element"
// import { Desktop, Mobile } from "../shared/MediaQuery";

const Menubar = (props) => {
  const { menuColor } = props;
  const navigate = useNavigate();

  const textColor = menuColor.map((m) => {
    return m ? "#fff" : "#6F6F6F"
  })


  return (
    <React.Fragment>
      <Grid isFlex bg="#c4c4c4">
        <Grid flexColumn hover _onClick={()=>{navigate("/feed");}}>
          <Icon type="feedIcon" width="36px" height="36px" margin="0 auto" page={menuColor[0]}/>
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0" color={textColor[0]}>Feed</Text>
        </Grid>
        <Grid flexColumn hover _onClick={()=>{navigate("/party");}}>
          <Icon type="partyIcon" width="36px" height="36px" margin="0 auto" page={menuColor[1]}/>
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0" color={textColor[1]}>동호회</Text>
        </Grid>
        <Grid flexColumn hover _onClick={()=>{navigate("/");}}>
          <Icon type="homeIcon" width="36px" height="36px" margin="0 auto" page={menuColor[2]}/>
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0" color={textColor[2]}>홈버튼</Text>
        </Grid>
        <Grid flexColumn hover _onClick={()=>{navigate("/search");}}>
          <Icon type="mountain" width="41px" height="36px" margin="0 auto" page={menuColor[3]}/>
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0" color={textColor[3]}>산코스</Text>
        </Grid>
        <Grid flexColumn hover _onClick={()=>{navigate("/mypage");}}>
          <Icon type="mypageIcon" width="36px" height="36px" margin="0 auto" page={menuColor[4]}/>
          <Text width="auto" size="10px" align="center" bold="600" margin="5.6px auto 0" color={textColor[4]}>마이페이지</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );

}

// Menubar.defaultProps = {
//   menuColor: "#6F6F6F",
// };


export default Menubar;