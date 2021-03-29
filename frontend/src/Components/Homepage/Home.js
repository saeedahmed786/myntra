import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../assets/17c7a23a045e30cbd8a8b7afd4c89d9b-shopping-discount-poster-design.jpg';
import img2 from '../../assets/Coupon-Banner.jpg';
import img3 from '../../assets/Deal-Post-Banner.jpg';
import img4 from '../../assets/6d6370077521e3716da9cfef15c0a7d1.jpg';
import { CategoriesToBag } from './CategoriesToBag';
import { ExploreTopBrands } from './ExploreTopBrands';
import { Trendings } from './Trendings';
 
export const Home = () => {
  return ( 
    <div>
      <header>
        <Carousel autoPlay autoFocus className='carousel text-center'>
          <div>
            <img alt = 'img' src={img1} />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img alt = 'img' src={img2} />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img alt = 'img' src={img3} />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img alt = 'img' src={img4} />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </header>

      <div style = {{marginTop: '200px'}}>
      <h1 className = 'mb-5 ml-3'>Deals of the day</h1>  
        <div className = 'row text-center'>
        <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/12/31/c5f5e4fb-8469-440c-9be8-0bd550e4b9b61609386142982-Falt_50.jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/12/30/7e59d551-4a6b-4b2f-83b0-9a6296a706d41609313117232-Min.40.jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/12/30/4773cdd7-8549-46d0-bdcc-059a36d2a7e51609313304924-Western-wear.jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/12/13/35eb905c-b3c9-4eaa-a4dc-de7e858428671607870033733-Lakme.jpg' width = '250'/>
         </div>
        </div>
      </div>

      <div style = {{marginTop: '20px'}}>
      <h1 className = 'mb-5 ml-3'>Biggest Deals of the day</h1>  
        <div className = 'row text-center'>
        <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/14/6e0a9fa0-9e8d-4c29-9250-995c9f1ba9331605363273176-Home---U.S.-Polo-Assn..jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/e72c82f2-cfd5-4f9a-b1b0-ba9e2b3e51251598892519506-W.jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/14/0524cbd5-f034-4155-9e3b-336c4e530ee41605363272658-Home---Levis.jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/64ecc170-58af-473f-8144-b1639895a8291598892519457-Veromodo.jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/14/6e0a9fa0-9e8d-4c29-9250-995c9f1ba9331605363273176-Home---U.S.-Polo-Assn..jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/e72c82f2-cfd5-4f9a-b1b0-ba9e2b3e51251598892519506-W.jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/14/0524cbd5-f034-4155-9e3b-336c4e530ee41605363272658-Home---Levis.jpg' width = '250'/>
         </div>
         <div className = 'col-md-3'>
          <img alt = 'img' src = 'https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/64ecc170-58af-473f-8144-b1639895a8291598892519457-Veromodo.jpg' width = '250'/>
         </div>
        </div>
      </div>
      <div>
       <CategoriesToBag/>
       </div>
       <div>
         <ExploreTopBrands/>
       </div>
       <div>
         <Trendings/>
       </div>


    </div>
  )
}

