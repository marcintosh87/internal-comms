import { Box, Button, Card, CardMedia } from "@mui/material";
import React, { useState } from "react";
import AdminPostCardEvent from "./AdminPostCardEvent";

export default function AdminEventsFeed({ eventPost, refresh, setRefresh }) {
  const [postsNum, setPostsNum] = useState(4);
  return (
    <>
      {eventPost &&
        eventPost
          .slice(0, postsNum)
          .map((each) => (
            <AdminPostCardEvent
              key={each.id}
              id={each.id}
              title={each.title}
              date={each.date}
              clicks={each.clicks}
              claps={each.claps}
              image={each.image}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
      <Box mb={10} sx={{ textAlign: "center" }}>
        <Button
          color="secondary"
          onClick={() => {
            setPostsNum(postsNum + 4);
          }}
        >
          {"Load More Posts"}
        </Button>

        {postsNum >= 5 ? (
          <Button
            color="secondary"
            onClick={() => {
              if (postsNum > 4) {
                setPostsNum(postsNum - 4);
              } else {
                setPostsNum(4);
              }
            }}
          >
            Show Less
          </Button>
        ) : null}
      </Box>
    </>
  );
}
