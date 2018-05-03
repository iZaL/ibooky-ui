import merge from 'lodash/merge';

export function reducer(
  state = {
    users: {},
    categories: {},
    products: {
      1: {
        id: 1,
        category: {
          id: 1,
          name: 'samsung',
        },
        title: 'Offer 1',
        description: 'Offer Description Offer Description  Offer Description Offer Description Offer Description Offer Description Offer Description',
        offer_percentage: 50,
        offer_percentage_formatted: '50%',
        price_old: 60,
        price_old_formatted: '60 KD',
        price: 30,
        price_formatted: '30 KD',
        show_attributes: true,
        time_remaining_formatted: '10:00:00 hrs',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
        attributes: [
          {
            id: 1, name: 'Color', price: 13, required: false,
            children: [
              {id: 2, name: 'Gold', price: 15, parent_id: 1},
              {id: 3, name: 'Black', price: 12, parent_id: 1},
              {id: 4, name: 'Silver', price: 12, parent_id: 1},
              {id: 5, name: 'Red', price: 10, parent_id: 1},
            ]
          },
          {
            id: 6, name: 'Type', required: true,
            children: [
              {id: 7, name: '1050 mAh', parent_id: 6},
              {id: 8, name: '2680 mAh', parent_id: 6},
            ],
          }
        ],
      },
      2: {
        id: 2,
        category: {
          id: 1,
          name: 'iphone',
        },
        title: 'Offer 1',
        description: 'Offer Description Offer Description  Offer Description Offer Description Offer Description Offer Description Offer Description',
        offer_percentage: 50,
        offer_percentage_formatted: '50%',
        price_old: 60,
        price_old_formatted: '60 KD',
        price: 30,
        price_formatted: '30 KD',
        show_attributes: true,
        time_remaining_formatted: '10:00:00 hrs',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
        attributes: [
          {
            id: 1, name: 'Color', price: 13, required: false,
            children: [
              {id: 2, name: 'Gold', price: 15, parent_id: 1},
              {id: 3, name: 'Black', price: 12, parent_id: 1},
              {id: 4, name: 'Silver', price: 12, parent_id: 1},
              {id: 5, name: 'Red', price: 10, parent_id: 1},
            ]
          },
          {
            id: 6, name: 'Type', required: true,
            children: [
              {id: 7, name: '1050 mAh', parent_id: 6},
              {id: 8, name: '2680 mAh', parent_id: 6},
            ],
          }
        ],
      }
    },
    attributes:{}
  },
  action = {},
) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}
