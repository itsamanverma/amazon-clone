export const initialState = {
    basket: [
        {
            id: "pro1",
            title: "SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls.",
            price: 11.96,
            rating: 5,
            image: '/media/aman/a9490b27-5ef4-4f31-a889-1b16e6841e22/Reactjs/amazon-clone/src/assests/pro1.jpg',
        },
        {
            id: "pro1",
            title: "SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls.",
            price: 11.96,
            rating: 5,
            image: '/media/aman/a9490b27-5ef4-4f31-a889-1b16e6841e22/Reactjs/amazon-clone/src/assests/pro1.jpg',
        },
    ],
    user: null,
};

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            //logic to add items  to basket
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'REMOVE_FROM_BASKET':
            // logic for removing item from basket...

            //we  clone the  basket
            let newBasket = [...state.basket];

            //we check to see if product exists
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

            if (index >= 0) {
                // item exists in basket, remove it...
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product (id: ${action.id}) as its not in basket`
                );
            }
            return {
                ...state,
                basket: newBasket,
            };
        default:
            return state;
    }
}

export default reducer;