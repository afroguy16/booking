export const scheduleMeetingWrapperStyles = {
  padding: "12% 0"
}

// NB: These Alert styles are supposed to be moved up from this folder, but I won't focus on CSS architecture in this project
export const alertWrapperStyles = {
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  top: "20px",
  width: "100vw",
  zIndex: "1"
}

export const alertMessageStyles = {
  width: { base: "90%", md: "50%" },
  flexDirection: "row",
  justifyContent: "space-between"
}

export const alertMessageCloseButtonStyles = {
  alignSelf: "flex-start",
  position: "relative",
  right: -1,
  top: -1
}

export const headingStyles = {
  textAlign: "center",
  marginBottom: "60px",
  h2: {
    marginBottom: "20px",
  }
}

export const keyStyles = {
  textAlign: "center",
  display: "inline-flex",
  p: {
    "&:first-of-type": {
      marginRight: "20px"
    }
  },
  span: {
    display: "inline-flex",
    width: "14px",
    height: "14px",
    marginRight: "6px",
    borderRadius: "50%",
  }
}

export const availableKeyStyles = {
  background: "orange"
}

export const unavailableKeyStyles = {
  background: "#f5f7f6",
  border: "1px solid #d1d1cf"
}

export const slotSelectorsStyles = {
  display: "flex",
  justifyContent: "center",
  gridGap: "40px",
  flexDirection: { base: "column", md: "row", lg: "row" },
  alignItems: { base: "center", md: "flex-start", lg: "flex-start" },
}
