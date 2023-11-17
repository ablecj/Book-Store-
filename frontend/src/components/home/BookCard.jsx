// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import {PiBookOpenTextLight} from "react-icons/pi";
import {BiUserCircle} from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const BookCard = ({books}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((book)=>(
            <div key={book._id}
                className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4'
            >

            </div>

        ))}
    </div>
  )
}

export default BookCard