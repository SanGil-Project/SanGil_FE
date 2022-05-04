import React from "react";
import { Star } from "../components/component";
import { Grid, Text, Button } from "../elements/element";

const Comment = (props) => {
  const { showIndex } = props;
  return (
    <div>
      <Grid margin="25px auto">
        <Grid
          width="386px"
          height="0"
          border="1px solid #DEDEDE"
          margin="5px auto"
        />
        <Grid maxWidth="386px" margin="23px auto 0 auto" height="18px" isFlex>
          <div>
            <Grid height="18px" lineHeight="18px" isFlex>
              <Star
                type="showStar"
                width="77px"
                starMargin="0 1px"
                showIndex={showIndex}
              />
              <Text
                maxWidth="220px"
                height="18px"
                lineHeight="18px"
                size="1.4rem"
              >
                [엄홍길] 등산왕
              </Text>
            </Grid>
          </div>
          <Text bold="500" size="1.4rem" lineHeight="18px">
            2022.05.03
          </Text>
        </Grid>
        <Grid maxWidth="386px" margin="12px auto 0 auto" height="18px" isFlex>
          <div>
            <Text size="1.8rem" bold="500" height="18px" lineHeight="18px">
              타다가 천국행
            </Text>
          </div>
          <Grid width="44px" isFlex>
            <Button
              bgColor="lightgreen"
              fontSize="18px"
              width="18px"
              height="18px"
            ></Button>
            <Button
              bgColor="lightgreen"
              fontSize="18px"
              width="18px"
              height="18px"
            ></Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comment;
