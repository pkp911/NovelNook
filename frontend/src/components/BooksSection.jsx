import React from 'react';

const BooksSection = ({ data }) => {
    console.log(data);
    return (
        <div className='d-flex justify-content-around align-items-center flex-wrap my-3'>
            {data && data.map((item, index) => (
                <div
                    key={index}
                    className='d-flex flex-column align-items-center'
                    style={{
                        width: "200px",
                        height: "350px",
                        backgroundColor: "orange",
                        margin: "10px",
                        padding: "10px",
                        borderRadius: "8px",
                    }}
                >
                    <div>
                    <img
                        style={{ width: "200px", borderTopLeftRadius:"20px", borderTopRightRadius:"20px" }}
                        className='img-fluid'
                        src={item.image}
                        alt={item.bookname}
                    />
                    </div>
                   <h6 style={{fontSize:"15px"}} className='px-2 my-1 text-white'>
                    {item.bookname.slice(0, 20)}...
                   </h6>
                   <b style={{fontSize:"30px", color:'red'}}className='m-0 px-2'>Rs.{item.price}</b>
                  <div classname='d-flex justify-content-around align-items'>
                    <button className='btn btn-primary'>UPDATE</button>
                    <button className='btn btn-danger'>DELETE</button>
                   </div>
                   

                </div>
            ))}
        </div>
    );
};

export default BooksSection;
