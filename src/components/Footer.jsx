import "boxicons/css/boxicons.min.css";
//import { TbFileCv } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between lg:mt-[15%] mt-[25%] py-8 lg:px-32 md:px-16 px-8 border-t-[0.3px] border-[#babaff]">
        
        <img className="h-10" src="public/images/illu-text.png" alt="Illu-text" />
        
        <img className="h-16 md:inline" src="public/images/illu-logo.png" alt="Illu-logo" />

        <div className="flex gap-4">
            <a className="md:text-3xl text-2xl hover:text-violet-600 duration-300" 
               href="https://www.linkedin.com/in/luigi-morandini-22307b34b" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="LinkedIn Profile">
                <i className="bx bxl-linkedin"></i>
            </a>

            
            <a className="md:text-3xl text-2xl hover:text-violet-600 duration-300" 
               href="https://github.com/yukikaze-coder" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="GitHub Profile">
                <i className="bx bxl-github"></i>
            </a>

            
            <a className="md:text-3xl text-2xl hover:text-violet-600 duration-300" 
               href="https://morandini.online" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Website">
                <i className="bx bx-envelope"></i>
            </a>
            
        </div>
    </footer>
  )
}

export default Footer