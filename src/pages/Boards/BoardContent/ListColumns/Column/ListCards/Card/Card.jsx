/* eslint-disable react/jsx-closing-tag-location */
import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } });
  const dndkitCardStyles = {
    // touchAction: 'none', // Dành cho sensor default dạng pointer sensor
    // Nếu sử dụng CSS.Tranform có thể sẽ bị lỗi strecth
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  };
  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length && !!card?.comments?.length && !!card?.attachments?.length;
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndkitCardStyles}
      {...attributes}
      {...listeners}
      sx={
        {
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset',
          display: card?.FE_PlaceholderCard ? 'none' : 'block',
          border: '1px solid transparent',
          '&:hover' : { borderColor: theme => theme.palette.primary.main },
        }
      }>
      {
        card?.cover && (
          <CardMedia
            component="img"
            height="140"
            image={card?.cover}
            alt="green iguana"
          />
        )
      }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>
          {card?.title}
        </Typography>
      </CardContent>
      {
        shouldShowCardAction() && (<CardActions sx={{ pt: '0' }}>
          {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>}
          {!!card?.comments?.length && <Button size="small" startIcon={<ModeCommentIcon />}>{card?.comments?.length}</Button>}
          {!!card?.attachments?.length && <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>}
        </CardActions>)
      }
    </MuiCard>
  )
}

export default Card;