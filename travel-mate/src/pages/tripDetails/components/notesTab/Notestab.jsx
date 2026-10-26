import { useState } from "react";
import { useDispatch } from "react-redux";
import { Building2, AlertCircle, Ticket, Plus, X } from "lucide-react";
import { addNote } from "../../../../redux/slices/tripDetails";
import "./NotesTab.css";
export default function NotesTab({trip}){
const dispatch=useDispatch();const [showNote,setShowNote]=useState(false);
const [noteForm,setNoteForm]=useState({title:"",description:"",type:"normal"});
    function saveNote(e) {
        e.preventDefault();

        if (!noteForm.title.trim() || !noteForm.description.trim()) {
            return;
        }

        dispatch(addNote({
            tripId: trip.id,
            note: {
                id: Date.now(),
                title: noteForm.title.trim(),
                description: noteForm.description.trim(),
                type: noteForm.type
            }
        }));

        setNoteForm({
            title: "",
            description: "",
            type: "normal"
        });

        setShowNote(false);
    }



return (<>{/* NOTES */}


                <div className="detailsTwoColumn">

                        <div className="detailsNotesList">

                            {trip.notes.map((note) => (

                                <div className="detailsNoteCard" key={note.id}>

                                    {note.type === "hotel" ? (
                                        <Building2 size={20} />
                                    ) : note.type === "important" ? (
                                        <AlertCircle size={20} color="#d32f2f" />
                                    ) : (
                                        <Ticket size={20} />
                                    )}

                                    <h4>{note.title}</h4>

                                    <p>{note.description}</p>

                                </div>

                            ))}

                            {trip.notes.length === 0 && (
                                <p>No notes added yet.</p>
                            )}

                        </div>

                        <button
                            className="detailsAddBtn detailsSideBtn"
                            onClick={() => setShowNote(true)}
                        >
                            <Plus size={18} />
                            Add Note
                        </button>

                    </div>
{showNote && <div className="detailsOverlay"><form className="detailsForm" onSubmit={saveNote}><div className="detailsFormHead"><h2>Add Travel Note</h2><button type="button" onClick={()=>setShowNote(false)}><X size={20}/></button></div><label>Title</label><input value={noteForm.title} onChange={e=>setNoteForm({...noteForm,title:e.target.value})} required/><label>Type</label><select value={noteForm.type} onChange={e=>setNoteForm({...noteForm,type:e.target.value})}><option value="normal">General</option><option value="hotel">Hotel</option><option value="important">Important</option></select><label>Description</label><textarea value={noteForm.description} onChange={e=>setNoteForm({...noteForm,description:e.target.value})} required/><div className="detailsFormBottom"><button type="button" onClick={()=>setShowNote(false)}>Cancel</button><button type="submit">Save Note</button></div></form></div>}</>);
}
