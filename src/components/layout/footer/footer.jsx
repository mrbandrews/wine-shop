function Footer() {
  const year = new Date().getFullYear();

  return (
    <div>
      {year} @ (demo)
    </div>
  );
}
export default Footer;
