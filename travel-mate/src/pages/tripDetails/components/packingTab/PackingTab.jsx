
import { useState } from "react";
import { Folder, Laptop, Plus, X } from "lucide-react";

import useTripStore from "../../../../store/tripStore";

import "./PackingTab.css";

export default function PackingTab({ trip }) {

    const addPacking = useTripStore((state) => state.addPacking);

    const togglePacking = useTripStore((state) => state.togglePacking);

    const [showPacking, setShowPacking] = useState(false);

    const [packingForm, setPackingForm] = useState({
        title: "",
        category: "Documents"
    });

    const packedCount = trip.packingItems.filter(
        (item) => item.checked
    ).length;

    const packingPercent = trip.packingItems.length
        ? Math.round(packedCount / trip.packingItems.length * 100)
        : 0;

    function savePacking(e) {
        e.preventDefault();

        if (!packingForm.title.trim()) return;

        addPacking({
            tripId: trip.id,
            item: {
                id: Date.now(),
                title: packingForm.title.trim(),
                category: packingForm.category,
                checked: false
            }
        });

        setPackingForm({
            title: "",
            category: "Documents"
        });

        setShowPacking(false);
    }

    return (
        <>
            <div className="detailsTwoColumn">

                <div className="detailsPackingBox">

                    <div className="detailsPackingTop">

                        <div>
                            <h3>
                                {packedCount}/{trip.packingItems.length} Packed
                            </h3>

                            <p>
                                {packingPercent === 100
                                    ? "All packed!"
                                    : "Almost ready!"}
                            </p>
                        </div>

                        <h2>{packingPercent}%</h2>

                    </div>

                    <div className="detailsProgress">

                        <div
                            style={{ width: `${packingPercent}%` }}
                        ></div>

                    </div>

                    <div className="detailsPackingGroups">

                        {[...new Set(
                            trip.packingItems.map(
                                (item) => item.category || "Other"
                            )
                        )].map((group) => (

                            <div
                                className="detailsPackingGroup"
                                key={group}
                            >

                                <h4>
                                    {group === "Documents"
                                        ? <Folder size={16} />
                                        : <Laptop size={16} />
                                    }

                                    {group}
                                </h4>

                                {trip.packingItems
                                    .filter(
                                        (item) =>
                                            (item.category || "Other") === group
                                    )
                                    .map((item) => (

                                        <label
                                            className="detailsPackingItem"
                                            key={item.id}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={() =>
                                                    togglePacking({
                                                        tripId: trip.id,
                                                        itemId: item.id
                                                    })
                                                }
                                            />

                                            <span
                                                className={
                                                    item.checked ? "packedItem" : ""
                                                }
                                            >
                                                {item.title}
                                            </span>

                                        </label>

                                    ))}

                            </div>

                        ))}

                    </div>

                </div>

                <button
                    className="detailsAddBtn detailsSideBtn"
                    onClick={() => setShowPacking(true)}
                >
                    <Plus size={18} />
                    Add Packing
                </button>

            </div>

            {showPacking && (

                <div className="detailsOverlay">

                    <form
                        className="detailsForm"
                        onSubmit={savePacking}
                    >

                        <div className="detailsFormHead">

                            <h2>Add Packing Item</h2>

                            <button
                                type="button"
                                onClick={() => setShowPacking(false)}
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <label>Item Name</label>

                        <input
                            value={packingForm.title}
                            onChange={(e) =>
                                setPackingForm({
                                    ...packingForm,
                                    title: e.target.value
                                })
                            }
                            required
                        />

                        <label>Category</label>

                        <select
                            value={packingForm.category}
                            onChange={(e) =>
                                setPackingForm({
                                    ...packingForm,
                                    category: e.target.value
                                })
                            }
                        >

                            {[
                                "Documents",
                                "Electronics",
                                "Clothes",
                                "Personal Care",
                                "Other"
                            ].map((item) => (

                                <option key={item}>
                                    {item}
                                </option>

                            ))}

                        </select>

                        <div className="detailsFormBottom">

                            <button
                                type="button"
                                onClick={() => setShowPacking(false)}
                            >
                                Cancel
                            </button>

                            <button type="submit">
                                Add Item
                            </button>

                        </div>

                    </form>

                </div>

            )}

        </>
    );
}
