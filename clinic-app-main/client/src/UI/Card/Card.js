import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DashboardCard = (props) => {
  return (
    <Card >
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {props.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;