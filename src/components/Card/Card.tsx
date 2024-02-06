import React from 'react';
import Grid from '@mui/material/Grid';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as styles from '../../pages/Home/home.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Posts } from '../../core/endPoints/types.endPoints';

interface Props {
   list: Posts[]

}
export const Cards : React.FC<Props> = ({ list }) => {
   return (
      <Grid
         container
         justifyContent='space-between'
         alignItems='center'
      >
         {list && list.map(({ id, name, date, description, photo }) => (
            <Grid
               item
               key={id}
               md={4}
               style={{ marginBottom: '20px', cursor: 'pointer' }}
            >
               <Card sx={{ height: 450, width: 350 }} >
                  <CardHeader
                     avatar={
                        <Avatar sx={{ bgcolor: 'blue' }} aria-label='recipe'>
                           A
                        </Avatar>
                     }
                     action={
                        <IconButton aria-label='settings'>
                           <MoreVertIcon />
                        </IconButton>
                     }
                     title={name}
                     subheader={date}
                     className={styles.title}
                  />
                  <CardMedia
                     component='img'
                     height='200'
                     width='300'
                     image={photo}
                     alt='Paella dish'
                  />
                  <CardContent>
                     <Typography variant='body2' color='text.secondary'>
                        {description}
                     </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                     <IconButton aria-label='add to favorites'>
                        <FavoriteIcon />
                     </IconButton>
                     <IconButton aria-label='share'>
                        <ShareIcon />
                     </IconButton>
                  </CardActions>
               </Card>
            </Grid>
         ))}
      </Grid>
   );
};