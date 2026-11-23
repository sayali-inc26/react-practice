import "./BranchesSection.css"

export default function BranchesSection(){
    return(
        <>
            <section>
                <div className="book-appointment-card">
                        <img src="https://cdn.prod.website-files.com/5ee7039040ea6efb80d7521c/67ec01f15a9a8d6565ae945a_Pune.svg" alt="" />
                        <p>Best Maternity Hospital in Pune</p>
                        <button>Book An Appointment</button>
                        <button id="callBack">Request a CallBack</button>
                </div>

                <div className="branches-grid">
                    <div className="branch branch1">
                        <img src="https://cdn.prod.website-files.com/5ee7039040ea6efb80d7521c/6808af2669f35f2e089ecf87_Baner-centre.jpg" alt="" />
                        <figcaption>Baner</figcaption>

                    </div>
                    <div className="branch branch2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6avTlf4jsbLJJgMUn_-dJ5KL8gjheIh8fGeF5XjvSng&s=10" alt="" />
                        <figcaption>Pimpli Saudagar</figcaption>
                    </div>
                    <div className="branch branch3">
                        <img src="https://cdn.prod.website-files.com/5ee7039040ea6efb80d7521c/69808e4d45b412ea17ae73cc_SBRoad-centre.jpg" alt="" />
                        <figcaption>SB Road</figcaption>
                    </div>
                    <div className="branch branch4">
                        <img src="https://cdn.prod.website-files.com/5ee7039040ea6efb80d7521c/6808af14643c9217cdcbd534_Kalyani-nagar-centre.jpg" alt="" />
                        <figcaption>Kalyani Nagar</figcaption>
                    </div>
                </div>
            </section>
        </>
    )
}