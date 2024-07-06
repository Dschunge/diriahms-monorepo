import {
  Amenities,
  Cleaning,
  Hotel,
  Room,
  RoomCategory,
  Season,
  Tour,
  TourPriceCategory,
} from '@prisma/client';

export type HotelWithRooms = Hotel & {
  rooms: Room[] | [];
  amenities: Amenities[] | [];
  roomcategories: RoomCategory[] | [];
};

export type HotelWithAmenities = Hotel & {
  amenities: Amenities[];
};

export type HotelWithRoomCategories = Hotel & {
  roomcategories: RoomCategory[];
};

export type RoomCategories = {
  roomcategories: RoomCategory[];
};

export type RoomCategoryWithSeason = RoomCategory & {
  seasons: Season[];
};

export type RoomWithCleanings = Room & {
  cleaning: Cleaning[];
};

export type TourWithPriceCategories = Tour & {
  pricecategories: TourPriceCategory[];
};
