import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface DefaultCardProps<T> {
  data?: T;
  name?: string;
  description?: string;
  image?: string;
  onUpdate?: (updated: T) => void;

  /** Ezek lehetnek sima React elemek vagy függvények, amik adatot várnak */
  updateButton?: ((row: T) => React.ReactNode) | React.ReactNode;
  deleteButton?: ((row: T) => React.ReactNode) | React.ReactNode;
  createButton?: React.ReactNode;
}

export default function DefaultCard<T>(props: DefaultCardProps<T>) {
  const { data, name, description, image, updateButton, deleteButton, createButton } = props;

  /** Segédfüggvény – ha a prop függvény, meghívjuk, különben megjelenítjük */
  const renderNode = (node?: ((row: T) => React.ReactNode) | React.ReactNode) => {
    if (typeof node === 'function' && data) return node(data);
    return node ?? null;
  };

  return (
    

    
    <Card sx={{ maxWidth: 200, minWidth:200, borderRadius: 4, boxShadow: 3, display: 'flex', flexDirection: 'column', height: '50%' }}>
      {image && <CardMedia
        component="img"
        alt={name ?? "Card image"}
        height="140"
        image={image ?? "/static/images/cards/contemplative-reptile.jpg"}
        sx={{ objectFit: 'cover' }}
      />}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {name ?? "Untitled"}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description ?? "No description available"}
        </Typography>
      </CardContent>

    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 'auto' }}>
        <>
          {renderNode(updateButton)}
          {renderNode(deleteButton)}
          {createButton}
        </>
      </CardActions>
    </Card>
  );
}
