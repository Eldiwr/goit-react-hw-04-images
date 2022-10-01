import './App.css';
import { useState, useEffect } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import imagesApi from './services/services';
import { Modal } from "components/Modal/Modal";
import { Loader } from './Loader/Loader';


export const App = () => {

  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState([]);
  const [tag, setTag] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleFormSubmit = (value) => {
    setImageName(value);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    setLoading(page === 1 ? false : true);

        imagesApi.fetchImages(imageName, page).then(response => {
      if (response.totalHits === 0) {
        setStatus('empty');
      } else {
        const resDes = response.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }));
        setImages(prevState => (page === 1 ? resDes : [...prevState, ...resDes]));
        setStatus('resolved');
      };
        }).finally(() => setLoading(false));
    
  }, [imageName, page]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);    
  };
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };
            
  const openModal = (image, tag) => {
      const modalImg = images.filter(e => {return e.webformatURL === image});

    setModalImage(modalImg[0]);
    setTag(tag);

    toggleModal();        
  };
  
    return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery status={status} images={images} openModal={openModal} loadMore={loadMore} />
        {loading && <Loader loading={loading} />}
        {showModal && (
          <Modal toggleModal={toggleModal}>
            <img src={modalImage.largeImageURL} alt={tag} />
          </Modal>
        )}
      </div>
    );
};
