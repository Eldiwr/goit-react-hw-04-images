import './App.css';
import { useState, useEffect } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import imagesApi from './services/services';
import { Modal } from "components/Modal/Modal";


export const App = () => {

  const[imageName, setImageName] = useState('');
  const[images, setImages] = useState([]);
  const[totalHits, setTotalHits] = useState(0);
  const[page, setPage] = useState(1);
  const[status, setStatus] = useState('idle');
  const[showModal, setShowModal] = useState(false);
  const[modalImage, setModalImage] = useState([]);
  const[tag, setTag] = useState([]);

  const handleFormSubmit = (value) => {
    setImageName(value);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    setStatus('pending');
  
    apiFetchImages();
  }, [imageName, page]);


  const apiFetchImages = () => {
    imagesApi.fetchImages(imageName, page).then(response => {
            if (response.totalHits === 0) {
                setStatus('empty');
            } else {
              
              const resDes = response.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }));
              setImages([...images, ...resDes]);
              setStatus('resolved');
            };   
        });
  };

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
        {showModal && (
          <Modal toggleModal={toggleModal}>
            <img src={modalImage.largeImageURL} alt={modalImage.tags} />
          </Modal>
        )}
      </div>
    );
};
