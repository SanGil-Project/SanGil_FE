import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { Grid, Icon, Text } from "../elements/element";

const Menubar = (props) => {
  const { menuColor } = props;
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state?.user?.userInfo);
  const token = sessionStorage?.getItem("token");
  const isLogin = token && userInfo ? true : false;

  const textColor = menuColor.map((m) => {
    return m ? "#43CA3B" : "#C0C0C0";
  });

  return (
    <React.Fragment>
      <Grid isFlex bg="#fff" borderTop="1px solid #DEDEDE">
        <Grid
          flexColumn
          hover
          _onClick={() => {
            navigate("/feed");
            window.location.reload();
          }}
        >
          <Icon
            type="feedIcon"
            width="36px"
            height="36px"
            margin="0 auto"
            page={menuColor[0]}
          />
          <Text
            width="auto"
            size="10px"
            align="center"
            bold="600"
            margin="5.6px auto 0"
            color={textColor[0]}
          >
            Feed
          </Text>
        </Grid>
        <Grid
          flexColumn
          hover
          _onClick={() => {
            navigate("/party");
            window.location.reload();
          }}
        >
          <Icon
            type="partyIcon"
            width="36px"
            height="36px"
            margin="0 auto"
            page={menuColor[1]}
          />
          <Text
            width="auto"
            size="10px"
            align="center"
            bold="600"
            margin="5.6px auto 0"
            color={textColor[1]}
          >
            동호회
          </Text>
        </Grid>
        <Grid
          flexColumn
          hover
          _onClick={() => {
            navigate("/main");
          }}
        >
          <Icon
            type="homeIcon"
            width="36px"
            height="36px"
            margin="0 auto"
            page={menuColor[2]}
          />
          <Text
            width="auto"
            size="10px"
            align="center"
            bold="600"
            margin="5.6px auto 0"
            color={textColor[2]}
          >
            홈버튼
          </Text>
        </Grid>
        <Grid
          flexColumn
          hover
          _onClick={() => {
            navigate("/search");
            window.location.reload();
          }}
        >
          <Icon
            type="mountain"
            width="41px"
            height="36px"
            margin="0 auto"
            page={menuColor[3]}
          />
          <Text
            width="auto"
            size="10px"
            align="center"
            bold="600"
            margin="5.6px auto 0"
            color={textColor[3]}
          >
            산코스
          </Text>
        </Grid>
        <Grid
          flexColumn
          hover
          _onClick={() => {
            navigate("/mypage");
            window.location.reload();
          }}
        >
          <Icon
            type="mypageIcon"
            width="36px"
            height="36px"
            margin="0 auto"
            page={menuColor[4]}
          />
          <Text
            width="auto"
            size="10px"
            align="center"
            bold="600"
            margin="5.6px auto 0"
            color={textColor[4]}
          >
            마이페이지
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Menubar;
