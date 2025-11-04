export type FetchHotelResponse = {
  avail_id: string;
  hotel_details: HotelDetails;
  rooms_by_serial_no: Array<{
    serial_no: string;
    rooms: Room[];
  }>;
};

type HotelDetails = {
    name: string;
    display_name: string;
};

export type Room = {
    name: string;
    room_type_code: string;
    variants_count?: number;
    variants?: Variant[];
    properties?: {
        room_images?: Array<{
            image_urls: string[];
        }>;
        video_url?: {
            med?: string;
        };
    };
};

export type Variant = {
    name?: string;
    room_name?: string;
    displayName?: string;
    price_info?: string;
    display_properties?: DisplayProperties[];
    total_price?: {
        currency: string;
        discounted_price: number;
        total_price: number;
    };
};

type DisplayProperties = {
    display_name: string;
    value: string;
};

