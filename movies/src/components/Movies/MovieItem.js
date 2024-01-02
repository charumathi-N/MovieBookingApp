import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button
} from "@mui/material";
import { Link } from 'react-router-dom';
function MovieItem({title,releaseDate,posterUrl,id}) {
    return (
        <Card sx={{width:250, margin:2, height:320, borderRadius:5, ":hover":{
            boxShadow:"10px 10px 20px #ccc"
        }}}>
            <img height={"50%"} width={"100%"} src={posterUrl} alt={title}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" alt="">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button LinkComponent={Link} to={`/booking/${id}`} sx={{margin:"auto"}} size='small'>Book</Button>
        </CardActions>
      </Card>
    )
}

export default MovieItem
