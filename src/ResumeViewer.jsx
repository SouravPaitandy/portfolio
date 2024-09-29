/* eslint-disable react/prop-types */
import myResume from './assets/Sourav-Paitandy.pdf';

const ResumeViewer = ({ heading }) => {
  const handleResumeClick = () => {
    const newWindow = window.open(myResume, '_blank');
    
    if (newWindow) {
      setTimeout(() => {
        newWindow.document.title = heading;
        
        const link = newWindow.document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = 'https://www.mobieg.co.za/wp-content/uploads/2016/10/cv-icon-7-336x336.png';
        newWindow.document.head.appendChild(link);
      }, 500);
    }
  };

  return (
    <span onClick={handleResumeClick}>{heading}</span>
  );
};

export default ResumeViewer;