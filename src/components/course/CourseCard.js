import ButtonLink from 'components/button/ButtonLink';
import React from 'react';

const CourseCard = ({data}) => {
    if(!data) return null
    return (
        <div className='w-full rounded-lg p-2 shadow-md'>
            <img src={data.image} alt="" className='w-full rounded-lg h-52 object-cover' loading='lazy'/>
            <div className="mt-3">
                <h3 className="font-semibold text-blue-500 mb-5 text-xl">
                    {data.title}
                </h3>
                <span className='text-sm block '>
                    Giáo viên: <strong className='text-blue-500'>
                        {data.author}
                    </strong>

                </span>
                <ButtonLink className='mt-2 block flex items-center justify-center' link={`course/${data.slug}`}>Xem chi tiết</ButtonLink>
            </div>
        </div>
    );
};

export default CourseCard;