import axios from "axios"
import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"

const CreateBlog = () => {
  const availableTags = [
    "React",
    "Node",
    "MongoDB",
    "JavaScript",
    "AI",
    "Web Development"
  ]
  const [selectedTags, setSelectedTags] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")


  const handleTagClick = (tag) => {

    if (selectedTags.includes(tag)) {

      setSelectedTags(
        selectedTags.filter(
          item => item !== tag
        )
      )

    } else {

      setSelectedTags([
        ...selectedTags,
        tag
      ])

    }

  }


  const handlePublish = async() =>{

    try{
    const res = await axios.post(import.meta.env.VITE_BASE_URL+ "/blog", {title, content, tags:selectedTags},{withCredentials:true})
    console.log(res.data.message);
    }
    catch(err){
      console.log(err.message);
      
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">

      <div className="border border-gray-300 max-w-4xl rounded-md p-8 h-170 overflow-y-scroll">
        <TextareaAutosize className="outline-none w-full placeholder:text-5xl font-bold text-5xl h-full" placeholder="New post title here..." 
        onChange={(e)=>setTitle(e.target.value)}
        />
        <div className="my-4">

          <p className="font-semibold mb-2">
            Choose tags:
          </p>


          <div className="flex flex-wrap gap-2">

            {
              availableTags.map((tag) => (

                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`
                        px-3 py-1 rounded-full border
                        ${selectedTags.includes(tag)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                    }
                    `}
                >
                  {tag}
                </button>

              ))
            }

          </div>


          <p className="font-semibold mt-4">
            Selected:
          </p>


          <div className="flex gap-2 flex-wrap">

            {
              selectedTags.map((tag) => (

                <span
                  key={tag}
                  className="bg-gray-200 px-3 py-1 rounded-full"
                >

                  {tag}

                  <button
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    ×
                  </button>

                </span>

              ))
            }

          </div>

        </div>

        <div>
          <TextareaAutosize
            minRows={5}
            placeholder="Write your blog..."
            className="w-full border p-4 rounded-lg outline-none"
            onChange={(e)=> setContent(e.target.value)}
          />
        </div>

      </div>
      <div className="mt-4">
        <button onClick={handlePublish} className="font-medium text-xl text-white bg-indigo-600 p-1 px-4 rounded-md cursor-pointer hover:bg-indigo-800">Publish</button>
        <button></button>
      </div>
    </div>
  )
}

export default CreateBlog
