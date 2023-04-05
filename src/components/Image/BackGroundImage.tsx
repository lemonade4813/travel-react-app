import backGroundImage from  "../../image/backGroundImage.jpg"

export default function BackGroundImage() {
    return (
      <div style = 
      {{width : '100%', height : '300px', backgroundPosition: 'center center',
      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backGroundImage})`,
      backgroundSize: 'cover'}}>
      </div>
    );
  }