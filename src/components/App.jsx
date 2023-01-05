import  { useState, useEffect} from 'react';
import Notiflix from 'notiflix';
import fetchPictures from './Api';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';


export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [modalURL, setModalURL] = useState('');

  useEffect(() => {
    if (!searchQuery){return;} 
    
      setIsLoading( true );
      const findPictures = fetchPictures(searchQuery, pageNumber);
    setLoadMore(true);

  findPictures
    .then(res => {
      if (res.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        setLoadMore(false);
        setIsLoading(false);
  }

        if (res.length < 12) {
        setLoadMore (false);
        setIsLoading(false);
  }
  setPictures(prevPictures => [...prevPictures, ...res]);
})

.finally(() => {
  setIsLoading(false);
});
}, [searchQuery, pageNumber]);

const formSubmitHandler = query => { 
  setSearchQuery(query); 
  pageNumber(1); 
  pictures ([]); 
  setLoadMore(false); };

const imageClickHandler = url => {
    setModalURL(url);
    toggleModal();
  };

 const toggleModal = () => {
  setShowModal( showModal =>  !showModal );
  };
    return (
      <div>
        <SearchBar onSubmit={formSubmitHandler} />
        <div className="gallery-wrap">
          <ImageGallery>
            {pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                picture={picture}
                onClick={imageClickHandler}
              ></ImageGalleryItem>
            ))}
          </ImageGallery>
          {loadMore && (
            <Button
              onClick= {setPageNumber}
              page={pageNumber}
            ></Button>
          )}
        </div>
        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalURL} alt={pictures.tags} />
          </Modal>
        )}
      </div>
    );
  }



Notiflix.Notify.init({
  position: 'left-top',
  cssAnimationStyle: 'zoom',
  fontSize: '20px',
});
