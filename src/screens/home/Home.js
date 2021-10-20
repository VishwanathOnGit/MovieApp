import React, {Fragment, useEffect, useState} from "react";
import Header from "../../common/header/Header";
import {
    Checkbox,
    createMuiTheme,
    GridList,
    GridListTile,
    GridListTileBar,
    ListItemText,
    MuiThemeProvider, TextField
} from "@material-ui/core";
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
import {withStyles} from "@material-ui/core/styles";


const styles = (theme) => ({
    margin: {
        margin: theme.spacing.unit,
        minWidth: "240px",
        maxWidth: "240px"
    },
    primary: {
        primary: theme.palette.primary.light
    },
});

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

const ReleasedMovies = (props) => {

    const {classes} = props;

    const theme = createMuiTheme({
        palette: {
            secondary: {main: "#7986cb"}
        },
    });

    const [releasedMoviesList, setReleasedMoviesList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [genreFormList, setGenreFormList] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [artistFormList, setArtistFormList] = useState([]);
    const [startDateForm, setStartDateForm] = useState([]);
    const [endDateForm, setEndDateForm] = useState([]);
    const [nameForm, setNameForm] = useState([]);

    // Date formatter
    function dateFormat(dateValue) {
        const tempDate = new Date(dateValue);
        return tempDate.toDateString();
    }

    const onFilterFormSubmitted = (e) => {
        e.preventDefault();
        let filterData = "";
        let genreFilter = "";
        let nameFilter = "";
        let artistFilter = "";
        let startDateFilter = "";
        let endDateFilter = "";

        if (nameForm.length > 0) {
            nameFilter = "&title=";
            nameFilter += nameForm;
            filterData += nameFilter;
        }

        if (genreFormList.length > 0) {
            genreFilter = "&genre=";
            genreFilter += genreFormList.join(",");
            filterData += genreFilter;
        }

        if (artistFormList.length > 0) {
            artistFilter = "&artists=";
            artistFilter += artistFormList.join(",");
            filterData += artistFilter;
        }

        if (startDateForm.length > 0) {
            startDateFilter = "&start_date=";
            startDateFilter += startDateForm;
            filterData += startDateFilter;
        }

        if (endDateForm.length > 0) {
            endDateFilter = "&end_date=";
            endDateFilter += endDateForm;
            filterData += endDateFilter;
        }

        loadData(filterData);
    }

    async function loadData(filterData = "") {
        const rawResponse = await fetch("http://localhost:8085/api/v1/movies?status=RELEASED" + filterData);
        const data = await rawResponse.json();

        setReleasedMoviesList(data.movies);
    }

    async function loadGenreData() {
        const rawResponse = await fetch("http://localhost:8085/api/v1/genres");
        const data = await rawResponse.json();

        setGenreList(data.genres);
    }

    async function loadArtistData() {
        const rawResponse = await fetch("http://localhost:8085/api/v1/artists");
        const data = await rawResponse.json();

        setArtistList(data.artists);
    }

    useEffect(() => {
        loadData();
        loadGenreData();
        loadArtistData();
    }, []);


    const onGenreChangeHandler = (e) => {
        setGenreFormList(e.target.value);
    }

    const movieNameChangedHandler = (e) => {
        setNameForm(e.target.value);
    }

    const onArtistChangeHandler = (e) => {
        setArtistFormList(e.target.value);
    }

    const onStartDateChangeHandler = (e) => {
        setStartDateForm(e.target.value);
    }

    const onEndDateChangeHandler = (e) => {
        setEndDateForm(e.target.value);
    }

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
                                    subtitle={"Release Date:" + dateFormat(movie.release_date)}
                                />
                            </Link>
                        </GridListTile>
                    ))}
                </GridList>

                <div className="filter-container" style={{
                    width: "24%",
                    margin: "16px"
                }}>
                    <MuiThemeProvider theme={theme}>
                        <Card>
                            <CardContent>
                                <Typography color={"secondary"}>
                                    FIND MOVIES BY:
                                </Typography>
                                <br/>
                                <form onSubmit={onFilterFormSubmitted}>
                                    <FormControl className="formControl">
                                        <InputLabel htmlFor="movie-name">
                                            Movie Name
                                        </InputLabel>
                                        <Input
                                            id="movie-name"
                                            onChange={movieNameChangedHandler}
                                        />
                                    </FormControl>

                                    <FormControl className="formControl">
                                        <InputLabel htmlFor="genreList">
                                            Genres
                                        </InputLabel>
                                        <Select
                                            multiple
                                            id="genreList"
                                            value={genreFormList}
                                            onChange={onGenreChangeHandler}
                                            input={<Input id="select-multiple-checkbox"/>}
                                            renderValue={selected => selected.join(', ')}
                                        >
                                            {genreList.map(data => (
                                                <MenuItem key={data.id} value={data.genre}>
                                                    <Checkbox checked={genreFormList.indexOf(data.genre) > -1}/>
                                                    <ListItemText primary={data.genre}/>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl className="formControl">
                                        <InputLabel htmlFor="artistList">
                                            Artists
                                        </InputLabel>
                                        <Select
                                            multiple
                                            id="artistList"
                                            value={artistFormList}
                                            onChange={onArtistChangeHandler}
                                            input={<Input id="select-multiple-checkbox"/>}
                                            renderValue={selected => selected.join(', ')}
                                        >
                                            {artistList.map(data => (
                                                <MenuItem key={data.id} value={`${data.first_name} ${data.last_name}`}>
                                                    <Checkbox
                                                        checked={artistFormList.indexOf(`${data.first_name} ${data.last_name}`) > -1}/>
                                                    <ListItemText primary={`${data.first_name} ${data.last_name}`}/>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl className="formControl">
                                        <InputLabel htmlFor="start-date" shrink={true}>
                                            Release Start Date
                                        </InputLabel>
                                        <TextField
                                            id="start-date"
                                            name="start-date"
                                            type="date"
                                            value={startDateForm}
                                            onChange={onStartDateChangeHandler}
                                            style={{
                                                marginTop: "10px"
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl className="formControl">
                                        <InputLabel htmlFor="end-date" shrink={true}>
                                            Release Start Date
                                        </InputLabel>
                                        <TextField
                                            id="end-date"
                                            name="end-date"
                                            type="date"
                                            value={endDateForm}
                                            onChange={onEndDateChangeHandler}
                                            style={{
                                                marginTop: "10px"
                                            }}
                                        />
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        color={"primary"}
                                        type="submit"
                                        fullWidth
                                        style={{
                                            marginTop: "20px"
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </form>


                            </CardContent>
                        </Card>
                    </MuiThemeProvider>
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
            <ReleasedMovies {...props}/>
        </Fragment>
    )
}

export default withStyles(styles)(Home);