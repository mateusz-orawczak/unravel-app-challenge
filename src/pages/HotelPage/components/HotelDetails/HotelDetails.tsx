import './HotelDetails.css';
import { useHotel } from '../../../../context/hotel/HotelContext';
import { HotelImage } from './components/HotelImage';

function HotelDetails() {
  const { hotel } = useHotel();

  if (!hotel) {
    return <div>Loading hotel details...</div>;
  }

  const { 
    display_name, 
    name, 
    address, 
    description, 
    images,
  } = hotel;

  const displayAddress = `${address.city} ${address.country}`;

  return (
    <div className="hotel-details">
      <HotelImage 
        images={images}
        alt={display_name || name}
      />
      
      <div className="hotel-info">
        <h1 className="hotel-name">{display_name || name}</h1>
        
        {displayAddress && (
          <div className="hotel-address">
            <p>{displayAddress}</p>
          </div>
        )}

        {description && (
          <div className="hotel-description">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelDetails;


