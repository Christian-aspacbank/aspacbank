// Allow importing plain CSS files (side-effect imports like "./index.css")
declare module "*.css";
// Optional: if you ever use CSS Modules (e.g., styles from './x.module.css')
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
// Swiper CSS side-effect imports
declare module "swiper/css";
declare module "swiper/css/*";