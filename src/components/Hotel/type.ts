export type selectHotelOptionsType =
{country : string, cityCode : string, radius : string, ratings : string}


export type searchHotelOfferOptionType = {
    hotelId: string;
    adults: string;
    checkInDate : Date | null;
    checkOutDate: Date | null;
    roomQuantity: string;
}