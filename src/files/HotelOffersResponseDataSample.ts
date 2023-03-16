export const HotelOffersResponseDataSample ={
    "data": [
      {
        "type": "hotel-offers",
        "hotel": {
          "type": "hotel",
          "hotelId": "MCLONGHM",
          "chainCode": "MC",
          "dupeId": "700031300",
          "name": "JW Marriott Grosvenor House London",
          "cityCode": "LON",
          "latitude": 51.50988,
          "longitude": -0.15509
        },
        "available": true,
        "offers": [
          {
            "id": "TSXOJ6LFQ2",
            "checkInDate": "2023-11-22",
            "checkOutDate": "2023-11-23",
            "rateCode": "V  ",
            "rateFamilyEstimated": {
              "code": "PRO",
              "type": "P"
            },
            "room": {
              "type": "ELE",
              "typeEstimated": {
                "category": "EXECUTIVE_ROOM",
                "beds": 1,
                "bedType": "DOUBLE"
              },
              "description": {
                "text": "Prepay Non-refundable Non-changeable, prepay in full\nExecutive King Room, Executive Lounge Access,\n1 King, 35sqm/377sqft-40sqm/430sqft, Wireless",
                "lang": "EN"
              }
            },
            "guests": {
              "adults": 1
            },
            "price": {
              "currency": "GBP",
              "base": "716.00",
              "total": "716.00",
              "variations": {
                "average": {
                  "base": "716.00"
                },
                "changes": [
                  {
                    "startDate": "2023-11-22",
                    "endDate": "2023-11-23",
                    "total": "716.00"
                  }
                ]
              }
            },
            "policies": {
              "paymentType": "deposit",
              "cancellation": {
                "description": {
                  "text": "NON-REFUNDABLE RATE"
                },
                "type": "FULL_STAY"
              }
            },
            "self": "https://test.api.amadeus.com/v3/shopping/hotel-offers/TSXOJ6LFQ2"
          }
        ],
        "self": "https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2023-11-22&paymentPolicy=NONE&roomQuantity=1"
      }
    ]
  }