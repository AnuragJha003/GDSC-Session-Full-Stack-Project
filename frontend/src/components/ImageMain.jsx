import React,{useState} from 'react'
import Loading from './Loading.jsx'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm';


const ImageMain = () => {
  const [selectedImage,setSelectedImage]=useState(null);
  const [question,setQuestion]=useState('');
  const [answer,setAnswer]=useState('');
  const [image,setimage]=useState('default.jpg');
  const [loading,setloading]=useState(false);
  const [showanswer,setshowanswer]=useState(false);

  const handleImageChange=(event)=>{
    const file=event.target.files[0];
    setSelectedImage(file);
    setimage(URL.createObjectURL(file));
  }

  const handleSubmit= async(event)=>{
    event.preventDefault();
    setloading(true);

    try {
      const formData=new FormData();
      formData.append('image',selectedImage);
      formData.append('question',question);

    /*const response=await axios.post('http://localhost:3000/upload', formData,
    {
      headers:{
        'Content-Type':'multipart/form-data',
      },
    });*/
    //https://gdsc-session-full-stack-project-backend2.onrender.com/
    const response=await axios.post('https://gdsc-session-full-stack-project-backend2.onrender.com/upload', formData,
    {
      headers:{
        'Content-Type':'multipart/form-data',
      },
    });
    if (response.status === 200) 
    {
        console.log('Image uploaded successfully');
        console.log('Generated Text:', response.data);
        setAnswer(response.data);
        setshowanswer(true); 
    } else 
    {
        console.error('Image upload failed');
        
    }
    } catch (error) {
      console.error('Error:', error);
            setAnswer('Error fetching data due to image size or some internal error');
            setshowanswer(true);
    }
    finally{
      setloading(false);
    }
  }
  return (
    <>
            <div className='container' style={{
                marginTop:"150px",
                color:"black",
            }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                <input type="text" name="question" value={question} onChange={(event) => setQuestion(event.target.value)} />
                <button type="submit">Upload</button>
            </form>
          
            <div>
                {image && <img src={image} alt="image" style={{width:'400px',}} className='input-img'/>}
                <div style={{textAlign:'left',display:'flex',justifyContent:'center'}}>
                    {showanswer && <ReactMarkdown remarkPlugins={[gfm]}>{answer}</ReactMarkdown>}
                </div>
               
            </div>
            </div>
        
            {loading && <Loading/>}
        </>
  )
}

export default ImageMain