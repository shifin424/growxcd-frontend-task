import pageNotFound from '../assets/images/notFound.png'

const NotFound = () => {
    return (
        <div className="flex justify-center items-center">
            <img src={pageNotFound} className='w-96 mt-24 h-96' alt="" />
        </div>
    )
};
export default NotFound;
