import React, { useState, useEffect } from "react";

import { Wrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadButton } from './Button/Button';
import { Loader } from './Loader/Loader';

export function App () {
  const [searchImg, setSearchImg] = useState("");
  const [imageModal, setImageModal] = useState("");
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);


  const openModal = (e) => {
    const imgIndex = e.target.id;
    const largeImage = data[imgIndex];

    setImageModal(largeImage);
    setModalShow(true);
  };

  const closeModal = () => {
    setImageModal('');
    setModalShow(false);
  };
  
  const LoadMore = () => {
    setPage(state => state + 1);
    console.log(window.innerHeight);
  };

  const searchImage = (e) => {
    setSearchImg(e.search)
    setPage(1)
  };

  function scrollGallery() {
    window.scrollBy({
        top: window.innerHeight*2,
        behavior: "smooth",
    });
}

  useEffect(() => {
    if (searchImg === '') {
      setData([])
      return;
    }
    setLoader(true)
    getImages(searchImg, page)
      .then((response) => {
        setData(state => [...state, ...response.data.hits]);
      })
      .catch(error => console.log(error))
      .finally(()=>
      {
        setLoader(false);
        scrollGallery();
      }
      )    
  }, [page, searchImg])

  return <Wrapper>
    <Searchbar  searchImage={searchImage} />   
    <ImageGallery images={data} openModal={openModal} />
    {modalShow && <Modal img={imageModal} closeModal={closeModal} />}
    {data.length > 0 && <LoadButton LoadMore={LoadMore} />}
    {loader && <Loader/>}
  </Wrapper>
};








// export class App extends Component {
//   state = {
//     searchImg: "",
//     imageModal: '',
//     data: [],
//     modalShow: false,
//     loader: false,
//     page: 1,
//   };

//   openModal = (e) => {
//     const {data} = this.state
//     const imgIndex = e.target.id
//     const largeImage = data[imgIndex]
//     this.setState({
//       imageModal: largeImage,
//       modalShow: true,
//     })
//   };

//   closeModal = () => {
//     this.setState({
//       imageModal: '',
//       modalShow: false,
//     })
//   };
  
//   LoadMore = () => {
//     const { page } = this.state;

//     this.setState({
//       page: page + 1,
//     });
//   };

//   async componentDidUpdate(_, prew) {
//     const { searchImg, page, data } = this.state;

//     if (page !== prew.page) {
//     const response = await getImages(searchImg, page);
//     this.setState({
//       data: [...data, ...response.data.hits],
//     });
//     }
//     if(searchImg !== prew.searchImg){
//         this.setState({
//       loader: true,
//     });
//     const response = await getImages(searchImg);
//     this.setState({
//       data: response.data.hits,
//       loader: false,
//     });
//     }
//   };

//   // async componentDidMount() {
//   //   const {page, searchImg} = this.state
//   //     this.setState({
//   //     loader: true,
//   //   });
//   //   const response = await getImages(searchImg);
//   //   const data = response.data.hits;
//   //   this.setState({
//   //     data,
//   //     page: page + 1,
//   //     loader: false,
//   //   });
//   // };
  
//   // LoadMore = async () => {
//     // const { searchImg, page, data } = this.state;
//     // const response = await getImages(searchImg, page);

//     // this.setState({
//     //   data: [...data, ...response.data.hits],
//     //   page: page + 1,
//     // });
//   // };

//   searchImage = (e) => {
//     if (e.search !== this.state.searchImg) {
//       this.setState({
//       searchImg: e.search,
//     })
//     };
//   };


//   render() {
//     const { data, imageModal, modalShow, loader } = this.state;
//     return <Wrapper>
//       <Searchbar  searchImage={this.searchImage} />   
//       <ImageGallery images={data} openModal={this.openModal} />
//       {modalShow && <Modal img={imageModal} closeModal={this.closeModal} />}
//       {data.length > 0 && <LoadButton LoadMore={this.LoadMore} />}
//       {loader && <Loader/>}
//     </Wrapper>
//   };
// };


//  render() {
//     const { data, imageModal, modalShow, loader } = this.state;
//     return <Wrapper>
//       <Searchbar searchImage={this.searchImg} changeInputValue={this.changeInputValue} value={this.state.searchImg } />   
//       <ImageGallery images={data} openModal={this.openModal} />
//       {modalShow && <Modal img={imageModal} closeModal={this.closeModal} />}
//       {data.length > 0 && <LoadButton LoadMore={this.LoadMore} />}
//       {loader && <Loader/>}
//     </Wrapper>
//   };

  // searchImg = async () => {
  //    this.setState({
  //     loader: true,
  //   });
  //   const response = await getImages(this.state.searchImg);
  //   this.setState({
  //     data: response.data.hits,
  //     loader: false,
  //   });
  // };