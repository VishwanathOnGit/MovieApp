import React, {Fragment, useEffect, useState} from "react";
import Header from "../../common/header/Header";
import {createMuiTheme, GridList, GridListTile, GridListTileBar} from "@material-ui/core";
import './Home.css';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const UpcomingMovies = () => {
    const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);

    async function loadData() {
        const rawResponse = await fetch("http://localhost:8085/api/v1/movies?status=PUBLISHED");
        const data = await rawResponse.json();
        setUpcomingMoviesList(data.movies);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <Fragment>
            <div className="upcoming-movies-style">Upcoming Movies</div>
            <GridList cols={6} style={{
                flexWrap: 'nowrap',
                transform: 'translateZ(0)',
            }}>
                {upcomingMoviesList.map(movie => (
                    <GridListTile
                        key={movie.id}
                        style={{
                            height: "250px"
                        }}>
                        <img
                            src={movie.poster_url}
                            alt={movie.title}/>
                        <GridListTileBar
                            title={movie.title}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </Fragment>
    );
}

const ReleasedMovies = () => {
    const theme = createMuiTheme({
        palette: {
            color: 'dark',
        }
    });


    const [releasedMoviesList, setReleasedMoviesList] = useState([]);

    async function loadData() {
        const rawResponse = await fetch("http://localhost:8085/api/v1/movies?status=RELEASED");
        const data = await rawResponse.json();
        setReleasedMoviesList(data.movies);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Fragment>
            <div style={{
                display: 'flex'
            }}>
                <GridList cols={4} style={{
                    width: "76%",
                    margin: "16px",
                    overflow: "hidden"
                }}>
                    {releasedMoviesList.map(movie => (
                        <GridListTile
                            key={movie.id}
                            style={{
                                height: "250px",
                                cursor: "pointer"
                            }}>
                            <Link to={"/movie/" + movie.id}>
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}/>
                                <GridListTileBar
                                    title={movie.title}
                                />
                            </Link>
                        </GridListTile>
                    ))}
                </GridList>

                <div className="filter-container" style={{
                    width: "24%",
                    margin: "16px"
                }}>
                    <Card theme={theme}>
                        <CardContent>
                            <Typography>
                                FIND MOVIES BY:
                            </Typography>
                            <br/>

                            <Button
                                variant="contained"
                                color="primary"
                            >
                                BOOK SHOW
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </Fragment>
    );
}

const Home = function (props) {

    return (
        <Fragment>
            <Header {...props} />
            <UpcomingMovies/>
            <ReleasedMovies/>
        </Fragment>
    )
}

export default Home;