import React from "react";
import Grid from "./Grid";
import Icon from "./Icon";
import Progress from "./Progress";

const Profile = (props) => {
  return (
    <Grid
      width="240px"
      height="60px"
      radius="12px"
      margin="10px 0"
      bg="#F2F2F2"
      isFlex
    >
      <Grid width="214px" height="45px" isFlex margin="7.5px auto">
        <Grid width="40px" height="40px">
          <Progress width="40px" height="40px">
            <Icon width="34px" height="34px" margin="0 auto" />
          </Progress>
        </Grid>
        <Grid width="198px" height="45px" margin="0 0 0 10px">
          <div>
            <Grid
              width="53px"
              height="19px"
              bg="#ffffff"
              textAlign
              lineHeight="19px"
              radius="10px"
              fontWeight="500"
              fontSize="12px"
            >
              lv.100
            </Grid>
            <p
              style={{
                width: "166px",
                height: "22px",
                margin: "4px 0",
                fontSize: "18px",
                lineHeight: "22px",
                fontWeight: 500,
              }}
            >
              가나다라마바사아자
            </p>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
