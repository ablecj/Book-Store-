// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const DeleteBooks = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const handleDeleteBook = ()=>{
    setLoader(true);
    axios.get(`http://localhost:5050/books/${id}`)
    .then(()=>{
      setLoader(false);
      navigate('/');
    })
    .catch((error)=>{
      setLoader(false);
      alert("An Error Occured. Please check console")
      console.log("error", error)
    });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loader ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You Want To Delete This Book?</h3>

        <button className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          yes, Delete it.
        </button>
      </div>
    </div>
  )
}

export default DeleteBooks