
// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import ItionaryTab from "./components/itionaryTab/itionaryTab";

// import {
//     Search,
//     ListFilter,
//     BedDouble,
//     Utensils,
//     CarFront,
//     Folder,
//     Laptop,
//     Building2,
//     AlertCircle,
//     Camera,
//     Upload,
//     CalendarDays,
//     Users,
//     Wallet,
//     Plus,
//     GripVertical,
//     Pencil,
//     X
// } from "lucide-react";

// import {
//     addExpense,
//     addPacking,
//     addNote,
//     addPhoto
// } from "../../redux/slices/tripDetails";

// import Header from "../../layout/header/Header";
// import Footer from "../../layout/footer/Footer";

// import "./TripDetailsPage.css";



// export default function TripDetailsPage() {

//     const { id } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const trip = useSelector((state) =>
//         state.tripDetails.plans.find(
//             (item) => item.id === Number(id)
//         )
//     );

//     const [activeTab, setActiveTab] = useState("Itinerary");
//     const [selectedDay, setSelectedDay] = useState(1);

//     const [showForm, setShowForm] = useState(false);
//     const [editId, setEditId] = useState(null);


//     const [expenseSearch, setExpenseSearch] = useState("");
//     const [expenseTab, setExpenseTab] = useState("All");
//     const [sortExpenses, setSortExpenses] = useState(false);

//     const [showExpense, setShowExpense] = useState(false);
//     const [showPacking, setShowPacking] = useState(false);
//     const [showNote, setShowNote] = useState(false);

//     const [expenseForm, setExpenseForm] = useState({
//         title: "",
//         category: "Stay",
//         amount: ""
//     });

//     const [packingForm, setPackingForm] = useState({
//         title: "",
//         category: "Documents"
//     });

//     const [noteForm, setNoteForm] = useState({
//         title: "",
//         description: "",
//         type: "normal"
//     });


//     const [activity, setActivity] = useState({
//         title: "",
//         time: "",
//         category: "Food",
//         amount: "",
//         notes: ""
//     });

//     if (!trip) {
//         return (
//             <>
//                 <Header />
//                 <main className="tripDetailsMain">
//                     <h2>Trip not found</h2>
//                     <button onClick={() => navigate("/myTrips")}>
//                         Back to My Trips
//                     </button>
//                 </main>
//                 <Footer />
//             </>
//         );
//     }

//     const tabs = [
//         "Itinerary",
//         "Expenses",
//         "Packing",
//         "Notes",
//         "Gallery"
//     ];

//     const dayData = trip.itinerary.find(
//         (item) => item.day === selectedDay
//     );

//     const spent = trip.expenses.reduce(
//         (total, item) => total + item.amount, 0
//     );

//     const packedCount = trip.packingItems.filter(
//         (item) => item.checked
//     ).length;

//     const packingPercent = trip.packingItems.length
//         ? Math.round(packedCount / trip.packingItems.length * 100)
//         : 0;

//     // function openAddForm() {
//     //     setEditId(null);

//     //     setActivity({
//     //         title: "",
//     //         time: "",
//     //         category: "Food",
//     //         amount: "",
//     //         notes: ""
//     //     });

//     //     setShowForm(true);
//     // }

//     // function openEditForm(item) {
//     //     setEditId(item.id);

//     //     setActivity({
//     //         title: item.title,
//     //         time: item.time,
//     //         category: item.category,
//     //         amount: item.amount,
//     //         notes: item.notes || ""
//     //     });

//     //     setShowForm(true);
//     // }

//     function saveActivity(e) {
//         e.preventDefault();

//         const data = {
//             ...activity,
//             id: editId || Date.now(),
//             amount: Number(activity.amount)
//         };

//         if (editId) {
//             dispatch(updateActivity({
//                 tripId: trip.id,
//                 day: selectedDay,
//                 activity: data
//             }));
//         } else {
//             dispatch(addActivity({
//                 tripId: trip.id,
//                 day: selectedDay,
//                 activity: data
//             }));
//         }

//         setShowForm(false);
//     }


//     // Save Expense

//     function saveExpense(e) {
//         e.preventDefault();

//         if (!expenseForm.title.trim() || Number(expenseForm.amount) <= 0) {
//             return;
//         }

//         dispatch(addExpense({
//             tripId: trip.id,
//             expense: {
//                 id: Date.now(),
//                 title: expenseForm.title.trim(),
//                 category: expenseForm.category,
//                 description: expenseForm.category,
//                 amount: Number(expenseForm.amount),
//                 date: new Date().toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric"
//                 })
//             }
//         }));

//         setExpenseForm({
//             title: "",
//             category: "Stay",
//             amount: ""
//         });

//         setExpenseTab("All");
//         setExpenseSearch("");
//         setShowExpense(false);
//     }


//     // Save Packing Item

//     function savePacking(e) {
//         e.preventDefault();

//         if (!packingForm.title.trim()) return;

//         dispatch(addPacking({
//             tripId: trip.id,
//             item: {
//                 id: Date.now(),
//                 title: packingForm.title.trim(),
//                 category: packingForm.category,
//                 checked: false
//             }
//         }));

//         setPackingForm({
//             title: "",
//             category: "Documents"
//         });

//         setShowPacking(false);
//     }


//     // Save Note

//     function saveNote(e) {
//         e.preventDefault();

//         if (!noteForm.title.trim() || !noteForm.description.trim()) {
//             return;
//         }

//         dispatch(addNote({
//             tripId: trip.id,
//             note: {
//                 id: Date.now(),
//                 title: noteForm.title.trim(),
//                 description: noteForm.description.trim(),
//                 type: noteForm.type
//             }
//         }));

//         setNoteForm({
//             title: "",
//             description: "",
//             type: "normal"
//         });

//         setShowNote(false);
//     }


//     // Upload Photos

//     function uploadPhotos(e) {

//         const files = Array.from(e.target.files);

//         files.forEach((file) => {

//             if (!file.type.startsWith("image/")) return;

//             const reader = new FileReader();

//             reader.onload = () => {
//                 dispatch(addPhoto({
//                     tripId: trip.id,
//                     photo: reader.result
//                 }));
//             };

//             reader.readAsDataURL(file);
//         });

//         e.target.value = "";
//     }
//     const filteredExpenses = trip
//         ? trip.expenses.filter((item) => {

//             const matchSearch = item.title
//                 .toLowerCase()
//                 .includes(expenseSearch.toLowerCase());

//             const matchTab =
//                 expenseTab === "All" ||
//                 item.category === expenseTab;

//             return matchSearch && matchTab;

//         })
//         : [];

//     if (sortExpenses) {
//         filteredExpenses.sort((a, b) => b.amount - a.amount);
//     }

//     return (
//         <>
//             <Header />

//             <main className="tripDetailsMain">

//                 {/* Trip Banner */}

//                 <div className="detailsBanner">

//                     <img src={trip.image} alt={trip.name} />

//                     <div className="bannerText">

//                         <h1>{trip.title}</h1>

//                         <div className="bannerInfo">

//                             <span>
//                                 <CalendarDays size={18} />
//                                 {trip.tripDate} ({trip.days} Days)
//                             </span>

//                             <span>
//                                 <Users size={18} />
//                                 {trip.travelers} Travelers
//                             </span>

//                             <span>
//                                 <Wallet size={18} />
//                                 {trip.currency}
//                                 {trip.budget.toLocaleString()} Budget
//                             </span>

//                         </div>

//                     </div>

//                 </div>

//                 {/* Clickable Tabs */}

//                 <div className="detailsTabs">

//                     {tabs.map((tab) => (
//                         <button
//                             key={tab}
//                             className={
//                                 activeTab === tab ? "detailsActive" : ""
//                             }
//                             onClick={() => setActiveTab(tab)}
//                         >
//                             {tab}
//                         </button>
//                     ))}

//                 </div>

//                 {/* ITINERARY */}

//                 {activeTab === "Itinerary" && (

//                     // <ItionaryTab/>

//                     <div className="itineraryLayout">

//                         {/* Day Sidebar */}

//                         <div className="daysList">

//                             {trip.itinerary.map((item) => (

//                                 <button
//                                     key={item.day}
//                                     className={
//                                         selectedDay === item.day
//                                             ? "selectedDay"
//                                             : ""
//                                     }
//                                     onClick={() => setSelectedDay(item.day)}
//                                 >

//                                     <span>
//                                         <strong>Day {item.day}</strong>
//                                         <small>{item.date}</small>
//                                     </span>

//                                     {selectedDay === item.day && (
//                                         <span>›</span>
//                                     )}

//                                 </button>

//                             ))}

//                         </div>

//                         {/* Day Activities */}

//                         <div className="dayContent">

//                             <div className="dayHeading">

//                                 <h2>
//                                     Day {selectedDay} - {dayData?.title}
//                                 </h2>

//                                 <button
//                                     className="addActivity"
//                                 // onClick={openAddForm}
//                                 >
//                                     <Plus size={16} />
//                                     Add Activity
//                                 </button>

//                             </div>

//                             <div className="timeline">

//                                 {dayData?.activities.length === 0 && (
//                                     <p>No activities added for this day.</p>
//                                 )}

//                                 {dayData?.activities.map((item, index) => (

//                                     <div
//                                         className={
//                                             index % 2 === 0
//                                                 ? "timelineItem rightItem"
//                                                 : "timelineItem leftItem"
//                                         }
//                                         key={item.id}
//                                     >

//                                         <div className="timelineDot">
//                                             <GripVertical size={15} />
//                                         </div>

//                                         <div className="activityCard">

//                                             <button
//                                                 className="editActivity"
//                                                 onClick={() => openEditForm(item)}
//                                                 aria-label={`Edit ${item.title}`}
//                                             >
//                                                 <Pencil size={16} />
//                                             </button>

//                                             <h4>{item.time}</h4>

//                                             <h3>{item.title}</h3>

//                                             <div className="activityTags">

//                                                 <span>
//                                                     {item.category === "Food"
//                                                         ? <Utensils size={12} />
//                                                         : <Camera size={12} />
//                                                     }

//                                                     {item.category}
//                                                 </span>

//                                                 <span>
//                                                     <Wallet size={12} />

//                                                     {item.amount === 0
//                                                         ? "Free"
//                                                         : `${trip.currency}${item.amount}`
//                                                     }
//                                                 </span>

//                                             </div>

//                                             {item.notes && (
//                                                 <p>{item.notes}</p>
//                                             )}

//                                         </div>

//                                     </div>

//                                 ))}

//                             </div>

//                         </div>

//                     </div>

//                 )}

//                 {/* EXPENSES */}


//                 {activeTab === "Expenses" && (

//                     <div className="detailsExpenseBox">

//                         <div className="detailsExpenseTop">

//                             <div className="detailsExpenseSearch">

//                                 <Search size={20} />

//                                 <input
//                                     type="text"
//                                     placeholder="Search expenses..."
//                                     value={expenseSearch}
//                                     onChange={(e) => setExpenseSearch(e.target.value)}
//                                 />

//                             </div>

//                             <button
//                                 className="detailsSort"
//                                 onClick={() => setSortExpenses(!sortExpenses)}
//                                 title="Sort by amount"
//                                 aria-label="Sort expenses by amount"
//                             >
//                                 <ListFilter size={20} />
//                             </button>

//                             <button
//                                 className="detailsAddBtn"
//                                 onClick={() => setShowExpense(true)}
//                             >
//                                 <Plus size={18} />
//                                 Add Expense
//                             </button>

//                         </div>

//                         {/* Category Tabs */}

//                         <div className="detailsExpenseTabs">

//                             {["All", "Stay", "Food", "Transport"].map((tab) => (

//                                 <button
//                                     key={tab}
//                                     className={
//                                         expenseTab === tab ? "selectedExpenseTab" : ""
//                                     }
//                                     onClick={() => setExpenseTab(tab)}
//                                 >
//                                     {tab}
//                                 </button>

//                             ))}

//                         </div>

//                         {/* Expense List */}

//                         <div className="detailsExpenseList">

//                             {filteredExpenses.map((item) => (

//                                 <div className="detailsExpenseItem" key={item.id}>

//                                     <div className="detailsExpenseIcon">

//                                         {item.category === "Stay" && <BedDouble size={20} />}

//                                         {item.category === "Food" && <Utensils size={20} />}

//                                         {item.category === "Transport" && <CarFront size={20} />}

//                                         {!["Stay", "Food", "Transport"].includes(item.category)
//                                             && <Wallet size={20} />
//                                         }

//                                     </div>

//                                     <div className="detailsExpenseInfo">

//                                         <h4>{item.title}</h4>

//                                         <p>
//                                             {item.description || item.category} • {item.date}
//                                         </p>

//                                     </div>

//                                     <strong className="detailsExpenseAmount">
//                                         {trip.currency}{item.amount.toLocaleString()}
//                                     </strong>

//                                 </div>

//                             ))}

//                             {filteredExpenses.length === 0 && (
//                                 <p className="detailsEmpty">No expenses found.</p>
//                             )}

//                         </div>

//                     </div>

//                 )}


//                 {/* PACKING */}


//                 {activeTab === "Packing" && (

//                     <div className="detailsTwoColumn">

//                         <div className="detailsPackingBox">

//                             <div className="detailsPackingTop">

//                                 <div>
//                                     <h3>
//                                         {packedCount}/{trip.packingItems.length} Packed
//                                     </h3>

//                                     <p>
//                                         {packingPercent === 100
//                                             ? "All packed!"
//                                             : "Almost ready!"}
//                                     </p>
//                                 </div>

//                                 <h2>{packingPercent}%</h2>

//                             </div>

//                             {/* Progress Bar */}

//                             <div className="detailsProgress">

//                                 <div
//                                     style={{ width: `${packingPercent}%` }}
//                                 ></div>

//                             </div>

//                             {/* Grouped Packing Items */}

//                             <div className="detailsPackingGroups">

//                                 {[...new Set(
//                                     trip.packingItems.map((item) => item.category || "Other")
//                                 )].map((group) => (

//                                     <div className="detailsPackingGroup" key={group}>

//                                         <h4>

//                                             {group === "Documents"
//                                                 ? <Folder size={16} />
//                                                 : <Laptop size={16} />
//                                             }

//                                             {group}

//                                         </h4>

//                                         {trip.packingItems
//                                             .filter((item) => (item.category || "Other") === group)
//                                             .map((item) => (

//                                                 <label
//                                                     className="detailsPackingItem"
//                                                     key={item.id}
//                                                 >

//                                                     <input
//                                                         type="checkbox"
//                                                         checked={item.checked}
//                                                         onChange={() => dispatch(togglePacking({
//                                                             tripId: trip.id,
//                                                             itemId: item.id
//                                                         }))}
//                                                     />

//                                                     <span className={
//                                                         item.checked ? "packedItem" : ""
//                                                     }>
//                                                         {item.title}
//                                                     </span>

//                                                 </label>

//                                             ))}

//                                     </div>

//                                 ))}

//                             </div>

//                         </div>

//                         <button
//                             className="detailsAddBtn detailsSideBtn"
//                             onClick={() => setShowPacking(true)}
//                         >
//                             <Plus size={18} />
//                             Add Packing
//                         </button>

//                     </div>

//                 )}


//                 {/* NOTES */}


//                 {activeTab === "Notes" && (

//                     <div className="detailsTwoColumn">

//                         <div className="detailsNotesList">

//                             {trip.notes.map((note) => (

//                                 <div className="detailsNoteCard" key={note.id}>

//                                     {note.type === "hotel" ? (
//                                         <Building2 size={20} />
//                                     ) : note.type === "important" ? (
//                                         <AlertCircle size={20} color="#d32f2f" />
//                                     ) : (
//                                         <Ticket size={20} />
//                                     )}

//                                     <h4>{note.title}</h4>

//                                     <p>{note.description}</p>

//                                 </div>

//                             ))}

//                             {trip.notes.length === 0 && (
//                                 <p>No notes added yet.</p>
//                             )}

//                         </div>

//                         <button
//                             className="detailsAddBtn detailsSideBtn"
//                             onClick={() => setShowNote(true)}
//                         >
//                             <Plus size={18} />
//                             Add Note
//                         </button>

//                     </div>

//                 )}


//                 {/* GALLERY */}


//                 {activeTab === "Gallery" && (

//                     <div className="detailsGallerySection">

//                         <div className="detailsGalleryHead">

//                             <h3>Moments Captured</h3>

//                             <label className="uploadBtn">

//                                 <Camera size={18} />
//                                 Upload Photos

//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     multiple
//                                     onChange={uploadPhotos}
//                                     hidden
//                                 />

//                             </label>

//                         </div>

//                         <div className="detailsGalleryGrid">

//                             {trip.gallery.map((photo, index) => (

//                                 <img
//                                     key={index}
//                                     src={photo}
//                                     alt={`${trip.name} photo ${index + 1}`}
//                                 />

//                             ))}

//                         </div>

//                         {trip.gallery.length === 0 && (
//                             <p>No photos uploaded yet.</p>
//                         )}

//                     </div>

//                 )}


//             </main>

//             <Footer />

//             {/* Add / Edit Activity Form */}

//             {/* {showForm && (

//                 <div className="activityOverlay">

//                     <form
//                         className="activityForm"
//                         onSubmit={saveActivity}
//                     >

//                         <h2>
//                             {editId ? "Edit Activity" : "Add Activity"}
//                         </h2>

//                         <label>Activity Name</label>

//                         <input
//                             type="text"
//                             value={activity.title}
//                             onChange={(e) => setActivity({
//                                 ...activity,
//                                 title: e.target.value
//                             })}
//                             required
//                         />

//                         <label>Time</label>

//                         <input
//                             type="time"
//                             value={activity.time}
//                             onChange={(e) => setActivity({
//                                 ...activity,
//                                 time: e.target.value
//                             })}
//                             required
//                         />

//                         <label>Category</label>

//                         <select
//                             value={activity.category}
//                             onChange={(e) => setActivity({
//                                 ...activity,
//                                 category: e.target.value
//                             })}
//                         >
//                             <option>Food</option>
//                             <option>Sightseeing</option>
//                             <option>Activities</option>
//                             <option>Shopping</option>
//                             <option>Stay</option>
//                         </select>

//                         <label>Amount</label>

//                         <input
//                             type="number"
//                             min="0"
//                             value={activity.amount}
//                             onChange={(e) => setActivity({
//                                 ...activity,
//                                 amount: e.target.value
//                             })}
//                             required
//                         />

//                         <label>Notes</label>

//                         <textarea
//                             value={activity.notes}
//                             onChange={(e) => setActivity({
//                                 ...activity,
//                                 notes: e.target.value
//                             })}
//                         />

//                         <div className="activityButtons">

//                             <button
//                                 type="button"
//                                 onClick={() => setShowForm(false)}
//                             >
//                                 Cancel
//                             </button>

//                             <button type="submit">
//                                 Save Activity
//                             </button>

//                         </div>

//                     </form>

//                 </div>

//             )} */}

//         </>
//     );
// }
