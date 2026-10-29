const initialPlans = {
    plans: [
        {
            id: 1,
            name: "Goa, India",
            title: "Goa Adventure",
            date: "Dec 12 - Dec 18, 2023",
            year: "2023",
            status: "Completed",
            type: "Beach",
            days: 7,
            budget: 27450,
            currency: "₹",
            activities: 16,
            packing: 100,
            favorite: true,
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900",

            travelers: 4,
            tripDate: "12 - 18 Dec",

            itinerary: [
                {
                    day: 1,
                    date: "12 Dec",
                    title: "Arrival & North Goa",
                    activities: [
                        {
                            id: 1,
                            time: "09:00 AM",
                            title: "Breakfast at Infantaria",
                            category: "Food",
                            amount: 800
                        },
                        {
                            id: 2,
                            time: "10:30 AM",
                            title: "Baga Beach",
                            category: "Sightseeing",
                            amount: 0,
                            notes: "Relax by the shacks, maybe try parasailing."
                        },
                        {
                            id: 3,
                            time: "01:00 PM",
                            title: "Lunch at Britto's",
                            category: "Food",
                            amount: 1500
                        }
                    ]
                },
                {
                    day: 2,
                    date: "13 Dec",
                    title: "Explore North Goa",
                    activities: [
                        {
                            id: 4,
                            time: "10:00 AM",
                            title: "Fort Aguada",
                            category: "Sightseeing",
                            amount: 0
                        },
                        {
                            id: 5,
                            time: "02:00 PM",
                            title: "Anjuna Beach",
                            category: "Sightseeing",
                            amount: 500
                        }
                    ]
                },
                {
                    day: 3,
                    date: "14 Dec",
                    title: "South Goa",
                    activities: [
                        {
                            id: 6,
                            time: "09:00 AM",
                            title: "Colva Beach",
                            category: "Sightseeing",
                            amount: 0
                        }
                    ]
                },
                {
                    day: 4,
                    date: "15 Dec",
                    title: "Adventure Day",
                    activities: [
                        {
                            id: 7,
                            time: "11:00 AM",
                            title: "Water Sports",
                            category: "Activities",
                            amount: 2500
                        }
                    ]
                },
                {
                    day: 5,
                    date: "16 Dec",
                    title: "Shopping & Relaxation",
                    activities: [
                        {
                            id: 8,
                            time: "04:00 PM",
                            title: "Local Market",
                            category: "Shopping",
                            amount: 1200
                        }
                    ]
                },
                {
                    day: 6,
                    date: "17 Dec",
                    title: "Beach Day",
                    activities: []
                },
                {
                    day: 7,
                    date: "18 Dec",
                    title: "Departure",
                    activities: []
                }
            ],


            expenses: [
                {
                    id: 1,
                    title: "Hotel",
                    category: "Stay",
                    description: "Stay",
                    date: "Oct 15",
                    amount: 8000
                },
                {
                    id: 2,
                    title: "Food",
                    category: "Food",
                    description: "Dining",
                    date: "Oct 16",
                    amount: 3500
                },
                {
                    id: 3,
                    title: "Transport",
                    category: "Transport",
                    description: "Travel",
                    date: "Oct 16",
                    amount: 4000
                }
            ],

            packingItems: [
                {
                    id: 1,
                    title: "Passport",
                    category: "Documents",
                    checked: true
                },
                {
                    id: 2,
                    title: "Flight Tickets",
                    category: "Documents",
                    checked: true
                },
                {
                    id: 3,
                    title: "Phone Charger",
                    category: "Electronics",
                    checked: false
                },
                {
                    id: 4,
                    title: "Power Bank",
                    category: "Electronics",
                    checked: false
                }
            ],

            notes: [
                {
                    id: 1,
                    title: "Hotel Info",
                    description: "Check-in at 2 PM. Sea View Resort, Baga Beach.",
                    type: "hotel"
                },
                {
                    id: 2,
                    title: "Things to Remember",
                    description: "Buy sunscreen, carry cash for local markets.",
                    type: "important"
                }
            ],

            gallery: [
                "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900",
                "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900",
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900"
            ]
        },

        {
            id: 2,
            name: "Paris, France",
            title: "Paris Adventure",
            date: "May 10 - May 24, 2024",
            year: "2024",
            status: "Upcoming",
            type: "City",
            days: 15,
            budget: 2500,
            currency: "€",
            activities: 5,
            packing: 40,
            favorite: false,
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900",

            travelers: 2,
            tripDate: "10 - 24 May",

            itinerary: [
                {
                    day: 1,
                    date: "10 May",
                    title: "Arrival in Paris",
                    activities: [
                        {
                            id: 1,
                            time: "10:00 AM",
                            title: "Hotel Check-in",
                            category: "Stay",
                            amount: 300
                        },
                        {
                            id: 2,
                            time: "04:00 PM",
                            title: "Eiffel Tower",
                            category: "Sightseeing",
                            amount: 50
                        }
                    ]
                },
                {
                    day: 2,
                    date: "11 May",
                    title: "Explore Paris",
                    activities: [
                        {
                            id: 3,
                            time: "10:00 AM",
                            title: "Louvre Museum",
                            category: "Sightseeing",
                            amount: 40
                        }
                    ]
                }
            ],

            expenses: [],
            packingItems: [],
            notes: [],
            gallery: [
                "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900"
            ]
        }
    ],

    selectedTripId: null
};

export default initialPlans;