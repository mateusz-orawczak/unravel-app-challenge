import { useRef, memo } from 'react';
import { Room } from '../../../../../api/hotel/types';
import { RoomMedia } from './RoomMedia';
import { VariantsList } from './VariantsList';
import { useVideoIntersection } from '../hooks/useVideoIntersection';
import './RoomCard.css';

interface RoomCardProps {
  room: Room
}

function RoomCardComponent({ room }: RoomCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  useVideoIntersection(cardRef);

  return (
    <div ref={cardRef} className="room-card">
      <div className="room-details-overlay">
        <h3 className="room-name">{room.name}</h3>
      </div>
      <div className="room-media">
        <RoomMedia room={room} />
      </div>
      {room.variants && room.variants.length > 0 && (
        <div className="room-variants">
          <VariantsList variants={room.variants} />
        </div>
      )}
    </div>
  );
}

export const RoomCard = memo(RoomCardComponent);

