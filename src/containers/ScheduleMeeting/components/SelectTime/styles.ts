export const timeSlotsWrapperStyles = {
  width: { base: "90%", md: "50%" }
}

export const timeSlotsStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(40px, 100px))",
  // gridTemplateColumns: { base: "repeat(auto-fit, minmax(100px, 150px))", md: "repeat(auto-fit, minmax(40px, 100px))" },
  gridGap: "20px",
  marginLeft: "0",
  marginBottom: "20px",
  listStyleType: "none"
};

export const timeSlotStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  background: "#f5f7f6",
  padding: "10px 20px",
  borderRadius: "4px",
  ':hover': {
    background: "#e1e3e2",
  },
  '&.active': {
    background: '#FED8B1',
  },
  '&.unavailable': {
    background: 'orange',
    color: 'white',
    cursor: "default",
  },
};

export const ctaStyles = {
  display: "flex",
  justifyContent: "center",
  gridGap: "20px"
}
