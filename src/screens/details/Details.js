import React, {Fragment, useEffect, useState} from "react";
import Header from "../../common/header/Header";
import {createMuiTheme, GridList, GridListTile, GridListTileBar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import './Details.css';
import YouTube from "react-youtube";
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

const Content = (props) => {

    const [movieData, setMovieDetail] = useState({});
    const [ytData, setYTDetail] = useState("");
    const [genreData, setGenreDetail] = useState("");
    const [dateData, setDateDetail] = useState("");
    const [artistData, setArtistDetail] = useState([]);

    async function loadData() {
        const rawResponse = await fetch(props.baseUrl + "movies/" + props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        });

        const data = await rawResponse.json();

        const youTubeString = data.trailer_url.split("=")[1];
        const genreString = data.genres.join(", ");
        const tempDate = new Date(data.release_date);
        const releaseDateString = tempDate.toDateString();
        const artistData = data.artists;

        setArtistDetail(artistData);
        setGenreDetail(genreString);
        setYTDetail(youTubeString);
        setDateDetail(releaseDateString);
        setMovieDetail(data);
    }

    useEffect(() => {
        loadData();
    }, []);


    return (
        <Fragment>
            <div className="detail-container">
                <div className="section-left">
                    <img src={movieData.poster_url} alt={movieData.title}/>
                </div>
                <div className="section-center">
                    <Typography variant="headline" component="h2">{movieData.title}</Typography>
                    <br/>
                    <Typography><b>Genre:</b> {genreData}</Typography>
                    <br/>
                    <Typography>
                        <b>Duration:</b> {movieData.duration}
                    </Typography>
                    <br/>
                    <Typography>
                        <b>Release Date:</b> {dateData}
                    </Typography>
                    <br/>
                    <Typography>
                        <b>Rating:</b> {movieData.rating}
                    </Typography>
                    <br/>
                    <Typography className="plot">
                        <b>Plot:</b> ( <a href={movieData.wiki_url}>Wiki Link</a>) {movieData.storyline}
                    </Typography>
                    <br/>
                    <Typography className="plot">
                        <b>Trailer:</b>
                    </Typography>
                    <br/>
                    <YouTube
                        videoId={ytData}
                        className="player"
                    />
                </div>
                <div className="section-right">
                    <Typography>
                        <b>Rate this movie:</b><br/>
                    </Typography>
                    <StarBorderOutlinedIcon className="hover-star"/>
                    <StarBorderOutlinedIcon className="hover-star"/>
                    <StarBorderOutlinedIcon className="hover-star"/>
                    <StarBorderOutlinedIcon className="hover-star"/>
                    <StarBorderOutlinedIcon className="hover-star"/>
                    <Typography className="artist">
                        <b>Artists:</b><br/>
                    </Typography>
                    <GridList cols={2}>
                        {artistData.map(artist => (
                            <GridListTile
                                key={artist.id}>
                                <img
                                    src={artist.profile_url}
                                    alt={`${artist.first_name} ${artist.last_name}`}/>
                                <GridListTileBar
                                    title={`${artist.first_name} ${artist.last_name}`}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        </Fragment>
    );
}

const Details = function (props) {

    return (
        <Fragment>
            <Header {...props}/>
            <Link to={"/"} className="link">
                <Typography className="back">&#60; Back to Book Show</Typography>
            </Link>
            <Content {...props}/>
        </Fragment>
    );
}

export default Details;