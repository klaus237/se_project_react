import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>Developed by klaus</p>

      <p>{new Date().getFullYear()}</p>
    </footer>
  );
}
export default Footer;
