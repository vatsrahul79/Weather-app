import React from 'react';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import dayjs from "dayjs";
import WeatherChart from '../Chart'
import './DisplayData.css'
dayjs.extend(advancedFormat)

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const DisplayData = (props) => {
    const classes = useStyles();
    const { data, loading } = props
    const changeFormat = (dates) => {
        const date = dayjs(dates);
        const dated = dayjs(date).format("ddd");
        return `${dated}`;
    };

    if (loading) {
        return <div className="loader"></div>;
    }

    const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}.png`
    return (
        <div>
            <div className="row">
                {data ? data.daily.map((all, i) => {
                    return (
                        <div key={i} className="col d-flex card">
                            <Card item xs={2} className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {changeFormat(all.dt)}
                                    </Typography>
                                    <Typography className={classes.pos} variant="h5" color="textSecondary">
                                        {Math.floor(all.temp.day - 273.15)}
                                        <sup>o</sup>C
                                    </Typography>
                                    <img src={iconUrl(all.weather[0].icon)} alt="weather" />
                                    <Typography variant="body2" component="p">
                                        {all.weather[0].main}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </div>
                    )
                }) : null}
            </div>
            <div className="mt-4">
                <WeatherChart data={data} />
            </div>
        </div>
    )
};

export default DisplayData;