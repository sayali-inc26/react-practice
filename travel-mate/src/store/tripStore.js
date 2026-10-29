import { create } from "zustand";
import  initialPlans  from "./tripData";



const useTripStore = create((set) => ({

    plans: initialPlans.plans,

    selectedTripId: null,


    selectTrip: (id) => {
        set({
            selectedTripId: id
        });
    },

    addActivity: ({ tripId, day, activity }) => {
        set((state) => ({
            plans: state.plans.map((trip) =>
                trip.id === tripId
                    ? {
                        ...trip,
                        itinerary: trip.itinerary.map((item) =>
                            item.day === day
                                ? {
                                    ...item,
                                    activities: [...item.activities, activity]
                                }
                                : item
                        )
                    }
                    : trip
            )
        }));
    },

    updateActivity: ({ tripId, day, activity }) => {
        set((state) => ({
            plans: state.plans.map((trip) =>
                trip.id === tripId
                    ? {
                        ...trip,
                        itinerary: trip.itinerary.map((item) =>
                            item.day === day
                                ? {
                                    ...item,
                                    activities: item.activities.map((a) =>
                                        a.id === activity.id ? activity : a
                                    )
                                }
                                : item
                        )
                    }
                    : trip
            )
        }));
    },


    togglePacking: ({ tripId, itemId }) => {
        set((state) => ({
            plans: state.plans.map((trip) => {

                if (trip.id !== tripId) return trip;

                const items = trip.packingItems.map((item) =>
                    item.id === itemId
                        ? { ...item, checked: !item.checked }
                        : item
                );

                if (!trip.packingItems.some((item) => item.id === itemId)) {
                    return trip;
                }

                const packing = Math.round(
                    items.filter((item) => item.checked).length /
                    items.length * 100
                );

                return {
                    ...trip,
                    packingItems: items,
                    packing: packing
                };
            })
        }));
    },

    addExpense: ({ tripId, expense }) => {
        set((state) => ({
            plans: state.plans.map((trip) =>
                trip.id === tripId
                    ? {
                        ...trip,
                        expenses: [...trip.expenses, expense]
                    }
                    : trip
            )
        }));
    },

    addPacking: ({ tripId, item }) => {
        set((state) => ({
            plans: state.plans.map((trip) => {

                if (trip.id !== tripId) return trip;

                const items = [...trip.packingItems, item];

                return {
                    ...trip,
                    packingItems: items,
                    packing: Math.round(
                        items.filter((item) => item.checked).length /
                        items.length * 100
                    )
                };
            })
        }));
    },
    addNote: ({ tripId, note }) => {
        set((state) => ({
            plans: state.plans.map((trip) =>
                trip.id === tripId
                    ? {
                        ...trip,
                        notes: [...trip.notes, note]
                    }
                    : trip
            )
        }));
    },

    addPhoto: ({ tripId, photo }) => {
        set((state) => ({
            plans: state.plans.map((trip) =>
                trip.id === tripId
                    ? {
                        ...trip,
                        gallery: [...trip.gallery, photo]
                    }
                    : trip
            )
        }));
    }

}));

export default useTripStore; 