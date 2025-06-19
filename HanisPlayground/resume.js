downloadResume() {
  // Create download functionality for the latest resume
  const link = document.createElement('a');
  link.href = 'attached_assets/Resume june 2024.pdf';
  link.download = 'Wan_Mohamad_Hanis_Resume_2024.pdf';
  link.click();
},

contactMe() {
  window.open('https://www.linkedin.com/in/wanmohamadhanis/', '_blank');
}