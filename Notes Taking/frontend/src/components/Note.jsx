import Navbar from "./Navbar"
import NoteCard from "./NoteCard"

const Note = () => {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center">
                <NoteCard />

            </div>

        </div>
    )
}

export default Note
