import { useEffect, useRef } from 'react';
import { useRoomsList } from '../../../../context/roomsList/RoomsListContext';
import { RoomCard } from './components/RoomCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import './RoomsList.css';

export function RoomsList() {
  const { roomsList, allRooms, isLoading, loadNextPage } = useRoomsList();
  const lastCardRef = useRef<HTMLDivElement>(null);

  if (!roomsList || roomsList.length === 0) {
    return <div className="no-rooms">No rooms available</div>;
  }

  const remainingCount = allRooms.length - roomsList.length;
  const hasMoreRooms = remainingCount > 0;

  useEffect(() => {
    const lastCardElement = lastCardRef.current;
    if (!lastCardElement || !hasMoreRooms || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMoreRooms && !isLoading) {
            loadNextPage();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(lastCardElement);

    return () => {
      observer.disconnect();
    };
  }, [roomsList.length, hasMoreRooms, isLoading, loadNextPage]);

  return (
    <div className="rooms-list">
      <h2 className="rooms-title">Available Rooms</h2>
      <div className="rooms-grid">
        {roomsList.map((room, index) => {
          const isLastCard = index === roomsList.length - 1;
          return (
            <div
              key={`${room.room_type_code}-${index}`}
              ref={isLastCard ? lastCardRef : null}
            >
              <RoomCard room={room} />
            </div>
          );
        })}
      </div>
      {isLoading && (
        <div className="rooms-loading-container">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default RoomsList;
