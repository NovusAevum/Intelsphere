module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
const ReconLab = () => {
  return (
    <div className="ReconLab">
      <h2>Reconnaissance Lab</h2>
      {/* Add OSINT task components here */}
    </div>
  );
};

export default ReconLab;