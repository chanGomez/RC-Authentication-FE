import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import setSessionExpirationHandler from "../utils/jwtAuthentication";
import Cookies from "js-cookie";

const cardData = [
  {
    img: "https://m.media-amazon.com/images/S/pv-target-images/6c785b9877ce0e340988162f70377cc17cd3b95a5536b00cfa524d1a88f83f3b.jpg",
    tag: "Engineering",
    title: "Revolutionizing software development with cutting-edge tools",
    description:
      "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
    authors: [
      { name: "Remy Sharp", avatar: "/static/images/avatar/1.jpg" },
      { name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
  {
    img: "https://i.ytimg.com/vi/Fpxwj8QSUd0/maxresdefault.jpg",
    tag: "Product",
    title: "Innovative product features that drive success",
    description:
      "Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.",
    authors: [{ name: "Erica Johns", avatar: "/static/images/avatar/6.jpg" }],
  },
  {
    img: "https://facts.net/wp-content/uploads/2023/06/47-facts-about-the-movie-the-matrix-1687246419.jpg",
    tag: "Design",
    title: "Designing for the future: trends and insights",
    description:
      "Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.",
    authors: [{ name: "Kate Morrison", avatar: "/static/images/avatar/7.jpg" }],
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/507b2f30e4b066e116488db6/1388461316196-KJD51XFV7LJ6SLQE8ZP7/her-movie-poster.jpg",
    tag: "Company",
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    authors: [{ name: "Cindy Baker", avatar: "/static/images/avatar/3.jpg" }],
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/507b2f30e4b066e116488db6/1388461316196-KJD51XFV7LJ6SLQE8ZP7/her-movie-poster.jpg",
    tag: "Engineering",
    title: "Pioneering sustainable engineering solutions",
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      { name: "Agnes Walker", avatar: "/static/images/avatar/4.jpg" },
      { name: "Trevor Henderson", avatar: "/static/images/avatar/5.jpg" },
    ],
  },
  {
    img: "https://www.geektown.co.uk/wp-content/uploads/2011/09/source_code_movie.jpg",
    tag: "Product",
    title: "Maximizing efficiency with our latest product updates",
    description:
      "Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.",
    authors: [{ name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" }],
  },
];

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

function Movies() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  //token authentication check and expiration handling.
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setSessionExpirationHandler(token);
    }
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 10 }}
        style={{ maxWidth: 1200 }}
      >
        <div>
          <Typography variant="h1" gutterBottom>
            Movies
          </Typography>
          <Typography>
            Stay in the loop with the latest movies out now!
          </Typography>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            width: "100%",
            justifyContent: "space-between",
            alignItems: { xs: "start", md: "center" },
            gap: 4,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              gap: 3,
              overflow: "auto",
            }}
          >
            <Chip onClick={handleClick} size="medium" label="All categories" />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Company"
              sx={{
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Product"
              sx={{
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Design"
              sx={{
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Engineering"
              sx={{
                backgroundColor: "transparent",
                border: "none",
              }}
            />
          </Box>
        </Box>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(0)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 0 ? "Mui-focused" : ""}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardData[0].img}
                sx={{
                  aspectRatio: "16 / 9",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {cardData[0].tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData[0].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {cardData[0].description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={cardData[0].authors} />
            </SyledCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(1)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 1 ? "Mui-focused" : ""}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardData[1].img}
                aspect-ratio="16 / 9"
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {cardData[1].tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData[1].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {cardData[1].description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={cardData[1].authors} />
            </SyledCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(2)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 2 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardData[2].img}
                sx={{
                  height: { sm: "auto", md: "50%" },
                  aspectRatio: { sm: "16 / 9", md: "" },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {cardData[2].tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData[2].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {cardData[2].description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={cardData[2].authors} />
            </SyledCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(5)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 5 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardData[4].img}
                sx={{
                  height: { sm: "auto", md: "50%" },
                  aspectRatio: { sm: "16 / 9", md: "" },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {cardData[5].tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData[5].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {cardData[5].description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={cardData[5].authors} />
            </SyledCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(5)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 5 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardData[5].img}
                sx={{
                  height: { sm: "auto", md: "50%" },
                  aspectRatio: { sm: "16 / 9", md: "" },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {cardData[5].tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData[5].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {cardData[5].description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={cardData[5].authors} />
            </SyledCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Movies;
