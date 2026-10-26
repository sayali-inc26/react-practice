import { useState } from "react";
import { useDispatch } from "react-redux";
import { Camera } from "lucide-react";
import { addPhoto } from "../../../../redux/slices/tripDetails";
import "./GalleryTab.css";
export default function GalleryTab({trip}){
const dispatch=useDispatch();
    function uploadPhotos(e) {

        const files = Array.from(e.target.files);

        files.forEach((file) => {

            if (!file.type.startsWith("image/")) return;

            const reader = new FileReader();

            reader.onload = () => {
                dispatch(addPhoto({
                    tripId: trip.id,
                    photo: reader.result
                }));
            };

            reader.readAsDataURL(file);
        });

        e.target.value = "";
    }

return (<>{/* GALLERY */}


                <div className="detailsGallerySection">

                        <div className="detailsGalleryHead">

                            <h3>Moments Captured</h3>

                            <label className="uploadBtn">

                                <Camera size={18} />
                                Upload Photos

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={uploadPhotos}
                                    hidden
                                />

                            </label>

                        </div>

                        <div className="detailsGalleryGrid">

                            {trip.gallery.map((photo, index) => (

                                <img
                                    key={index}
                                    src={photo}
                                    alt={`${trip.name} photo ${index + 1}`}
                                />

                            ))}

                        </div>

                        {trip.gallery.length === 0 && (
                            <p>No photos uploaded yet.</p>
                        )}

                    </div>
</>);
}
